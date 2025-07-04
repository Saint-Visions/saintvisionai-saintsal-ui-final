import Stripe from "stripe"
import { supabase, StripeEvent } from "./supabase"

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20"
})

export interface SubscriptionData {
  customerId: string
  subscriptionId: string
  status: "active" | "canceled" | "past_due" | "trialing"
  planName: "free" | "pro" | "enterprise"
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

export interface PaymentData {
  customerId: string
  amount: number
  currency: string
  status: "succeeded" | "failed" | "pending"
  description: string
}

class StripeService {
  // Webhook handling
  async handleWebhook(eventType: string, data: any): Promise<void> {
    try {
      // Log the webhook event
      await this.logWebhookEvent(eventType, data)

      switch (eventType) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
          await this.handleSubscriptionUpdate(data.object)
          break

        case "customer.subscription.deleted":
          await this.handleSubscriptionCancellation(data.object)
          break

        case "invoice.payment_succeeded":
          await this.handlePaymentSuccess(data.object)
          break

        case "invoice.payment_failed":
          await this.handlePaymentFailed(data.object)
          break

        case "customer.created":
          await this.handleCustomerCreated(data.object)
          break

        case "customer.updated":
          await this.handleCustomerUpdated(data.object)
          break

        default:
          console.log(`Unhandled webhook event: ${eventType}`)
      }
    } catch (error) {
      console.error(`Error handling webhook ${eventType}:`, error)
      throw error
    }
  }

  private async logWebhookEvent(eventType: string, data: any): Promise<void> {
    await supabase.from("stripe_events").insert({
      stripe_event_id: data.id || crypto.randomUUID(),
      event_type: eventType,
      customer_id: data.object?.customer || null,
      data: data,
      processed: false,
      created_at: new Date().toISOString()
    })
  }

  private async handleSubscriptionUpdate(
    subscription: Stripe.Subscription
  ): Promise<void> {
    const customerId = subscription.customer as string
    const planName = this.getPlanFromPriceId(
      subscription.items.data[0]?.price.id
    )

    await supabase
      .from("customers")
      .update({
        subscription_status: subscription.status as any,
        subscription_plan: planName,
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString()
      })
      .eq("stripe_customer_id", customerId)

    console.log(
      `Updated subscription for customer ${customerId}: ${subscription.status}`
    )
  }

  private async handleSubscriptionCancellation(
    subscription: Stripe.Subscription
  ): Promise<void> {
    const customerId = subscription.customer as string

    await supabase
      .from("customers")
      .update({
        subscription_status: "canceled",
        subscription_plan: "free",
        updated_at: new Date().toISOString()
      })
      .eq("stripe_customer_id", customerId)

    console.log(`Canceled subscription for customer ${customerId}`)
  }

  private async handlePaymentSuccess(invoice: Stripe.Invoice): Promise<void> {
    const customerId = invoice.customer as string
    const amount = invoice.amount_paid / 100 // Convert from cents

    console.log(`Payment succeeded for customer ${customerId}: $${amount}`)

    // Update payment history or trigger any post-payment actions
    // Could send confirmation emails, update usage limits, etc.
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    const customerId = invoice.customer as string

    console.log(`Payment failed for customer ${customerId}`)

    // Handle failed payment - might downgrade subscription, send dunning emails, etc.
    await supabase
      .from("customers")
      .update({
        subscription_status: "past_due",
        updated_at: new Date().toISOString()
      })
      .eq("stripe_customer_id", customerId)
  }

  private async handleCustomerCreated(
    customer: Stripe.Customer
  ): Promise<void> {
    // Create customer record in Supabase if it doesn't exist
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("stripe_customer_id", customer.id)
      .single()

    if (!existingCustomer) {
      await supabase.from("customers").insert({
        email: customer.email || "",
        name: customer.name || "",
        stripe_customer_id: customer.id,
        subscription_status: "trialing",
        subscription_plan: "free",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      console.log(`Created customer record for ${customer.email}`)
    }
  }

  private async handleCustomerUpdated(
    customer: Stripe.Customer
  ): Promise<void> {
    await supabase
      .from("customers")
      .update({
        email: customer.email || "",
        name: customer.name || "",
        updated_at: new Date().toISOString()
      })
      .eq("stripe_customer_id", customer.id)
  }

  private getPlanFromPriceId(priceId?: string): "free" | "pro" | "enterprise" {
    const proPriceId = import.meta.env.VITE_STRIPE_PRO_PRICE_ID
    const enterprisePriceId = import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID

    if (priceId === proPriceId) return "pro"
    if (priceId === enterprisePriceId) return "enterprise"
    return "free"
  }

  // Customer and subscription management
  async createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
    return await stripe.customers.create({
      email,
      name
    })
  }

  async createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl
    })
  }

  async createPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<Stripe.BillingPortal.Session> {
    return await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    })
  }

  async getCustomerSubscriptions(
    customerId: string
  ): Promise<Stripe.Subscription[]> {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all"
    })
    return subscriptions.data
  }

  async cancelSubscription(
    subscriptionId: string
  ): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.cancel(subscriptionId)
  }

  // Revenue and analytics
  async getRevenueStats(startDate: Date, endDate: Date) {
    try {
      const charges = await stripe.charges.list({
        created: {
          gte: Math.floor(startDate.getTime() / 1000),
          lte: Math.floor(endDate.getTime() / 1000)
        },
        limit: 100
      })

      const totalRevenue =
        charges.data
          .filter(charge => charge.paid && charge.status === "succeeded")
          .reduce((sum, charge) => sum + charge.amount, 0) / 100

      const subscriptions = await stripe.subscriptions.list({
        status: "active",
        limit: 100
      })

      return {
        totalRevenue,
        activeSubscriptions: subscriptions.data.length,
        averageRevenue:
          subscriptions.data.length > 0
            ? totalRevenue / subscriptions.data.length
            : 0
      }
    } catch (error) {
      console.error("Error getting revenue stats:", error)
      return {
        totalRevenue: 0,
        activeSubscriptions: 0,
        averageRevenue: 0
      }
    }
  }
}

export const stripeService = new StripeService()

// Webhook endpoint handler (for Express.js or similar)
export const handleStripeWebhook = async (req: any, res: any) => {
  const signature = req.headers["stripe-signature"]
  const endpointSecret = import.meta.env.VITE_STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return res.status(400).send("Webhook Error: Invalid signature")
  }

  try {
    await stripeService.handleWebhook(event.type, event.data)
    res.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    res.status(500).json({ error: "Webhook processing failed" })
  }
}
