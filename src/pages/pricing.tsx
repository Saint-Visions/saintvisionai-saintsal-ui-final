import React from "react"
import {
  EmpireContainer,
  EmpireSection,
  EmpireHero,
  SaintVisionAIPricingCards,
  EmpireStats,
  EmpireCTA,
  EmpireFeatureGrid
} from "../components"

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <EmpireHero
            title="🏆 Empire Pricing Plans"
            subtitle="CHOOSE YOUR POWER LEVEL"
            description="Select the perfect plan to unleash the full potential of your SaintSal™ Empire. From startup to enterprise domination."
            primaryAction={{
              text: "Start Free Trial",
              href: "/chat"
            }}
            secondaryAction={{
              text: "Contact Sales",
              href: "/console"
            }}
            size="xl"
            centered={true}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <SaintVisionAIPricingCards
            plans={[
              {
                title: "Empire Starter",
                price: "$0/mo",
                features: [
                  "AI Chat Interface",
                  "Basic Empire Components",
                  "5 Chat Sessions/day",
                  "Community Support",
                  "Builder.io Integration"
                ],
                button: "Start Free",
                link: "/chat"
              },
              {
                title: "Empire Pro",
                price: "$99/mo",
                features: [
                  "Unlimited AI Chat",
                  "Full Empire System",
                  "Advanced Analytics",
                  "CRM Integration",
                  "Priority Support",
                  "Custom Branding",
                  "API Access"
                ],
                button: "Go Pro",
                link: "/upgrade"
              },
              {
                title: "Empire Unlimited",
                price: "$299/mo",
                features: [
                  "Everything in Pro",
                  "White-label Solution",
                  "Custom Development",
                  "Dedicated Support",
                  "Enterprise Features",
                  "Unlimited Everything",
                  "24/7 Phone Support"
                ],
                button: "Dominate",
                link: "/upgrade"
              },
              {
                title: "Empire Enterprise",
                price: "Custom",
                features: [
                  "Custom Implementation",
                  "On-premise Deployment",
                  "Dedicated Infrastructure",
                  "SLA Guarantees",
                  "Training & Onboarding",
                  "Custom Integrations",
                  "Executive Support"
                ],
                button: "Contact Sales",
                link: "/console"
              }
            ]}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireStats
            title="Empire Success Metrics"
            subtitle="Join thousands of successful Empire builders"
            columns={4}
            stats={[
              {
                value: "10K+",
                label: "Active Users",
                description: "Growing daily"
              },
              {
                value: "99.9%",
                label: "Uptime",
                description: "Enterprise reliability"
              },
              { value: "50+", label: "Countries", description: "Global reach" },
              {
                value: "24/7",
                label: "Support",
                description: "Always available"
              }
            ]}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireFeatureGrid
            title="Why Choose SaintSal™ Empire?"
            subtitle="The most comprehensive AI platform"
            columns={3}
            features={[
              {
                title: "🧠 Dual-AI Technology",
                description:
                  "Proprietary dual-AI system with SaintVision and Empire models for unmatched performance"
              },
              {
                title: "🏗️ Visual Builder",
                description:
                  "Complete Builder.io integration with Empire design system for visual content creation"
              },
              {
                title: "📊 Advanced Analytics",
                description:
                  "Real-time performance metrics, user insights, and business intelligence dashboards"
              },
              {
                title: "🔗 CRM Integration",
                description:
                  "Native GoHighLevel integration for seamless customer relationship management"
              },
              {
                title: "⚡ Lightning Fast",
                description:
                  "Optimized architecture delivering responses in under 1.2 seconds globally"
              },
              {
                title: "🔒 Enterprise Security",
                description:
                  "Bank-level security with encryption, compliance, and data protection guarantees"
              }
            ]}
          />
        </EmpireSection>

        <EmpireSection padding="xl">
          <EmpireCTA
            title="Ready to Build Your Empire?"
            description="Join thousands of successful businesses using SaintSal™ Empire to dominate their markets. Start your journey today."
            primaryAction={{
              text: "Start Free Trial",
              href: "/chat",
              variant: "primary"
            }}
            secondaryAction={{
              text: "Schedule Demo",
              href: "/console",
              variant: "outline"
            }}
            size="lg"
            centered={true}
          />
        </EmpireSection>
      </EmpireContainer>
    </div>
  )
}
