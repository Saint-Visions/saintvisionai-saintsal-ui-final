import { supabase, Customer, ChatSession, ChatMessage } from "./supabase"

export interface CRMStats {
  totalCustomers: number
  activeSubscriptions: number
  totalRevenue: number
  chatSessions: number
  conversionRate: number
}

export interface CustomerActivity {
  id: string
  type: "chat" | "subscription" | "payment" | "login"
  description: string
  timestamp: Date
  metadata?: Record<string, any>
}

class CRMService {
  // Customer Management
  async getCustomers(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data as Customer[]
  }

  async getCustomerById(id: string) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data as Customer
  }

  async createCustomer(customer: Partial<Customer>) {
    const { data, error } = await supabase
      .from("customers")
      .insert({
        ...customer,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data as Customer
  }

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from("customers")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Customer
  }

  // Chat Session Management
  async getChatSessions(customerId?: string) {
    let query = supabase
      .from("chat_sessions")
      .select(
        `
        *,
        customer:customers(name, email),
        messages:chat_messages(count)
      `
      )
      .order("created_at", { ascending: false })

    if (customerId) {
      query = query.eq("customer_id", customerId)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  }

  async createChatSession(
    customerId: string,
    aiType: "saintvision" | "empire" | "both"
  ) {
    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({
        customer_id: customerId,
        ai_type: aiType,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data as ChatSession
  }

  async addChatMessage(
    sessionId: string,
    content: string,
    role: "user" | "saintvision" | "empire",
    metadata?: Record<string, any>
  ) {
    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        session_id: sessionId,
        content,
        role,
        metadata,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data as ChatMessage
  }

  async getChatMessages(sessionId: string) {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return data as ChatMessage[]
  }

  // Analytics and Stats
  async getCRMStats(): Promise<CRMStats> {
    try {
      // Get total customers
      const { count: totalCustomers } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true })

      // Get active subscriptions
      const { count: activeSubscriptions } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true })
        .eq("subscription_status", "active")

      // Get chat sessions
      const { count: chatSessions } = await supabase
        .from("chat_sessions")
        .select("*", { count: "exact", head: true })

      // Calculate conversion rate
      const conversionRate =
        totalCustomers > 0 ? (activeSubscriptions / totalCustomers) * 100 : 0

      return {
        totalCustomers: totalCustomers || 0,
        activeSubscriptions: activeSubscriptions || 0,
        totalRevenue: 0, // Would be calculated from Stripe data
        chatSessions: chatSessions || 0,
        conversionRate: Math.round(conversionRate * 100) / 100
      }
    } catch (error) {
      console.error("Error getting CRM stats:", error)
      return {
        totalCustomers: 0,
        activeSubscriptions: 0,
        totalRevenue: 0,
        chatSessions: 0,
        conversionRate: 0
      }
    }
  }

  async getCustomerActivity(customerId: string): Promise<CustomerActivity[]> {
    try {
      // Get chat activity
      const { data: chatData } = await supabase
        .from("chat_sessions")
        .select("created_at, ai_type")
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false })
        .limit(10)

      const chatActivities: CustomerActivity[] = (chatData || []).map(
        session => ({
          id: crypto.randomUUID(),
          type: "chat",
          description: `Started ${session.ai_type} AI chat session`,
          timestamp: new Date(session.created_at),
          metadata: { ai_type: session.ai_type }
        })
      )

      // Combine all activities and sort by timestamp
      const allActivities = [...chatActivities]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 20)

      return allActivities
    } catch (error) {
      console.error("Error getting customer activity:", error)
      return []
    }
  }

  // Search and filtering
  async searchCustomers(query: string) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .or(
        `name.ilike.%${query}%,email.ilike.%${query}%,company.ilike.%${query}%`
      )
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) throw error
    return data as Customer[]
  }

  async getCustomersByPlan(plan: "free" | "pro" | "enterprise") {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("subscription_plan", plan)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as Customer[]
  }
}

export const crmService = new CRMService()
