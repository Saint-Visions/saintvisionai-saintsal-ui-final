import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types
export interface Customer {
  id: string
  email: string
  name?: string
  phone?: string
  company?: string
  stripe_customer_id?: string
  subscription_status?: "active" | "canceled" | "past_due" | "trialing"
  subscription_plan?: "free" | "pro" | "enterprise"
  created_at: string
  updated_at: string
}

export interface ChatSession {
  id: string
  customer_id: string
  ai_type: "saintvision" | "empire" | "both"
  status: "active" | "completed" | "archived"
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  session_id: string
  content: string
  role: "user" | "saintvision" | "empire"
  metadata?: Record<string, any>
  created_at: string
}

export interface StripeEvent {
  id: string
  stripe_event_id: string
  event_type: string
  customer_id?: string
  data: Record<string, any>
  processed: boolean
  created_at: string
}

// Auth helpers
export const getCurrentUser = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user
}

export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const signUpWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}
