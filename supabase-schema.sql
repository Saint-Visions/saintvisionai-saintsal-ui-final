-- SaintSal Empire Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  stripe_customer_id VARCHAR(255) UNIQUE,
  subscription_status VARCHAR(50) DEFAULT 'free' CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  subscription_plan VARCHAR(50) DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  ai_type VARCHAR(50) NOT NULL CHECK (ai_type IN ('saintvision', 'empire', 'both')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'saintvision', 'empire')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stripe events table for webhook tracking
CREATE TABLE stripe_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id VARCHAR(255) UNIQUE NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  customer_id VARCHAR(255),
  data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_stripe_id ON customers(stripe_customer_id);
CREATE INDEX idx_customers_subscription_status ON customers(subscription_status);
CREATE INDEX idx_chat_sessions_customer_id ON chat_sessions(customer_id);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_role ON chat_messages(role);
CREATE INDEX idx_stripe_events_processed ON stripe_events(processed);
CREATE INDEX idx_stripe_events_event_type ON stripe_events(event_type);

-- Row Level Security (RLS) policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;

-- Customers can only see their own data
CREATE POLICY "Users can view own customer data" ON customers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own customer data" ON customers
  FOR UPDATE USING (auth.uid() = id);

-- Chat sessions policies
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Users can create own chat sessions" ON chat_sessions
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update own chat sessions" ON chat_sessions
  FOR UPDATE USING (auth.uid() = customer_id);

-- Chat messages policies  
CREATE POLICY "Users can view messages from own sessions" ON chat_messages
  FOR SELECT USING (
    auth.uid() = (
      SELECT customer_id FROM chat_sessions WHERE id = session_id
    )
  );

CREATE POLICY "Users can create messages in own sessions" ON chat_messages
  FOR INSERT WITH CHECK (
    auth.uid() = (
      SELECT customer_id FROM chat_sessions WHERE id = session_id
    )
  );

-- Stripe events - only service role can access
CREATE POLICY "Service role can manage stripe events" ON stripe_events
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get customer stats (callable from app)
CREATE OR REPLACE FUNCTION get_customer_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_customers', (SELECT COUNT(*) FROM customers),
    'active_subscriptions', (SELECT COUNT(*) FROM customers WHERE subscription_status = 'active'),
    'total_sessions', (SELECT COUNT(*) FROM chat_sessions),
    'conversion_rate', (
      CASE 
        WHEN (SELECT COUNT(*) FROM customers) > 0 
        THEN ROUND(
          (SELECT COUNT(*) FROM customers WHERE subscription_status = 'active')::numeric / 
          (SELECT COUNT(*) FROM customers)::numeric * 100, 2
        )
        ELSE 0 
      END
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_customer_stats() TO authenticated;

-- Sample data (optional - remove in production)
INSERT INTO customers (id, email, name, company, subscription_status, subscription_plan) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'demo@saintsal.com', 'Demo User', 'SaintSal Empire', 'active', 'pro'),
  ('550e8400-e29b-41d4-a716-446655440001', 'test@example.com', 'Test Customer', 'Example Corp', 'trialing', 'enterprise');
