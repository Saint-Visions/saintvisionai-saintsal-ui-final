"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Rocket } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  icon: React.ReactNode
  popular?: boolean
  cta: string
  ctaLink: string
  gradient: string
  borderColor: string
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$297",
    period: "/month",
    description:
      "Perfect for getting started with AI-powered business automation",
    icon: <Zap className="size-6" />,
    features: [
      "50 AI-powered lead discoveries per month",
      "Basic referral tracking system",
      "Standard deal analysis with GPT-4",
      "Email support",
      "Basic mobile app access",
      "Standard integrations"
    ],
    cta: "Start Your Journey",
    ctaLink: "/en/setup",
    gradient: "from-blue-500 to-blue-700",
    borderColor: "border-blue-500/20"
  },
  {
    name: "Pro",
    price: "$597",
    period: "/month",
    description: "Command Your Future - Most popular for scaling businesses",
    icon: <Crown className="size-6" />,
    popular: true,
    features: [
      "Unlimited AI lead discoveries",
      "Advanced referral network management",
      "Premium GPT-4o deal analysis",
      "Priority support & dedicated success manager",
      "Full mobile app suite with custom branding",
      "Advanced CRM integrations (GoHighLevel, HubSpot)",
      "Custom AI training on your business data",
      "White-label partner portal access"
    ],
    cta: "Command Your Future",
    ctaLink: "/en/setup",
    gradient: "from-yellow-500 to-yellow-700",
    borderColor: "border-yellow-500/20"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Fully customized solutions for enterprise-level operations",
    icon: <Rocket className="size-6" />,
    features: [
      "Everything in Pro plan",
      "Custom AI model training & deployment",
      "Dedicated infrastructure & security",
      "24/7 white-glove support",
      "Custom integrations & API access",
      "Multi-workspace management",
      "Advanced analytics & reporting",
      "On-premise deployment options"
    ],
    cta: "Contact Sales",
    ctaLink: "/en/setup",
    gradient: "from-purple-500 to-purple-700",
    borderColor: "border-purple-500/20"
  }
]

export function PricingCards() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
      {plans.map((plan, index) => (
        <Card
          key={plan.name}
          className={`relative border bg-gradient-to-br from-gray-900/50 to-gray-800/30 ${plan.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.popular ? "shadow-yellow-500/25 ring-2 ring-yellow-500/50" : ""}`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-1 font-semibold text-black">
                🔥 MOST POPULAR
              </Badge>
            </div>
          )}

          <CardHeader className="pb-4 text-center">
            <div
              className={`inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-r ${plan.gradient} mx-auto mb-4 text-white`}
            >
              {plan.icon}
            </div>
            <CardTitle className="mb-2 text-2xl font-bold text-white">
              {plan.name}
            </CardTitle>
            <div className="mb-4 flex items-baseline justify-center">
              <span className="text-4xl font-bold text-white">
                {plan.price}
              </span>
              <span className="ml-2 text-gray-400">{plan.period}</span>
            </div>
            <p className="text-sm text-gray-300">{plan.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="mr-3 mt-0.5 size-5 shrink-0 text-green-400" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className={`w-full bg-gradient-to-r ${plan.gradient} py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg ${plan.popular ? "shadow-yellow-500/25" : ""}`}
            >
              <a href={plan.ctaLink}>{plan.cta}</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
