import React, { useState } from "react"
import {
  EmpireContainer,
  EmpireSection,
  EmpireGrid,
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireHero,
  EmpireStats,
  EmpireCTA,
  SaintVisionAIPricingCards
} from "../components"

export default function Upgrade() {
  const [currentPlan] = useState("Empire Starter")

  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <EmpireHero
            title="⬆️ Upgrade Your Empire"
            subtitle="UNLOCK UNLIMITED POWER"
            description="Take your Empire to the next level with advanced features, unlimited access, and enterprise-grade capabilities."
            primaryAction={{
              text: "Upgrade Now",
              href: "#plans"
            }}
            secondaryAction={{
              text: "Compare Plans",
              href: "/pricing"
            }}
            size="xl"
            centered={true}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <div className="text-center mb-8">
            <EmpireBadge variant="info" size="lg">
              Current Plan: {currentPlan}
            </EmpireBadge>
          </div>

          <EmpireStats
            title="What You'll Unlock"
            subtitle="See the difference upgrading makes"
            columns={4}
            stats={[
              {
                value: "∞",
                label: "Chat Sessions",
                description: "Unlimited AI conversations"
              },
              {
                value: "100+",
                label: "Integrations",
                description: "Connect everything"
              },
              {
                value: "24/7",
                label: "Support",
                description: "Priority assistance"
              },
              {
                value: "99.9%",
                label: "SLA",
                description: "Enterprise reliability"
              }
            ]}
          />
        </EmpireSection>

        <EmpireSection padding="lg" id="plans">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Choose Your Upgrade Path
            </h2>
            <p className="text-gray-300">
              Select the plan that matches your Empire's ambitions
            </p>
          </div>

          <SaintVisionAIPricingCards
            plans={[
              {
                title: "Empire Pro",
                price: "$99/mo",
                features: [
                  "✅ Unlimited AI Chat",
                  "✅ Advanced Analytics",
                  "✅ CRM Integration",
                  "✅ Custom Branding",
                  "✅ API Access",
                  "✅ Priority Support",
                  "✅ Team Collaboration"
                ],
                button: "Upgrade to Pro",
                link: "#checkout-pro"
              },
              {
                title: "Empire Unlimited",
                price: "$299/mo",
                features: [
                  "✅ Everything in Pro",
                  "✅ White-label Solution",
                  "✅ Custom Development",
                  "✅ Dedicated Support",
                  "✅ Enterprise Features",
                  "✅ Unlimited Everything",
                  "✅ Phone Support"
                ],
                button: "Go Unlimited",
                link: "#checkout-unlimited"
              },
              {
                title: "Empire Enterprise",
                price: "Custom",
                features: [
                  "✅ Custom Implementation",
                  "✅ On-premise Options",
                  "✅ Dedicated Infrastructure",
                  "✅ SLA Guarantees",
                  "✅ Training Included",
                  "✅ Custom Integrations",
                  "✅ Executive Support"
                ],
                button: "Contact Sales",
                link: "/console"
              }
            ]}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={2} gap="lg">
            <EmpireCard variant="glow" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                🚀 Instant Benefits
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Immediate access to all features</li>
                <li>• No downtime during upgrade</li>
                <li>• Keep all your existing data</li>
                <li>• 30-day money-back guarantee</li>
                <li>• Free migration assistance</li>
              </ul>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                💎 Premium Support
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Priority response times</li>
                <li>• Dedicated account manager</li>
                <li>• Phone & video support</li>
                <li>• Custom training sessions</li>
                <li>• Strategic consultation</li>
              </ul>
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="xl">
          <EmpireCTA
            title="Ready to Dominate?"
            description="Join the elite tier of Empire builders. Upgrade now and unlock the full potential of your SaintSal™ Empire."
            primaryAction={{
              text: "Upgrade Now",
              href: "#plans",
              variant: "primary"
            }}
            secondaryAction={{
              text: "Talk to Sales",
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
