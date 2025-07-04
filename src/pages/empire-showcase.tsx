import React from "react"
import {
  EmpireContainer,
  EmpireSection,
  EmpireGrid,
  EmpireButton,
  EmpireCard,
  EmpireInput,
  EmpireBadge,
  EmpireHero,
  EmpireFeatureGrid,
  EmpireCTA,
  EmpireStats,
  PreferenceDropdown,
  IntegrationStatusNotes,
  StatusPanel,
  ConsoleLayout,
  Dashboard,
  SaintVisionAIPricingCards
} from "../components"

export default function EmpireShowcase() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ConsoleLayout title="🏆 SaintSal™ Empire - Complete System Showcase">
        <EmpireContainer>
          {/* Hero Section */}
          <EmpireSection padding="xl">
            <EmpireHero
              title="🏆 The Complete SaintSal™ Empire"
              subtitle="FULLY INTEGRATED SYSTEM"
              description="Witness the full power of the Empire design system - every component, every interaction, fully integrated with Builder.io visual management. This is the future of AI-powered content creation."
              primaryAction={{
                text: "Launch Empire Builder",
                href: "/builder"
              }}
              secondaryAction={{
                text: "View Documentation",
                href: "/builder-demo"
              }}
              size="xl"
              centered={true}
            />
          </EmpireSection>

          {/* Stats Section */}
          <EmpireSection padding="lg">
            <EmpireStats
              title="Empire Performance Metrics"
              subtitle="Real-time system statistics"
              columns={4}
              stats={[
                {
                  value: "18+",
                  label: "Components",
                  description: "Fully integrated"
                },
                {
                  value: "100%",
                  label: "Builder.io Ready",
                  description: "Visual editing enabled"
                },
                {
                  value: "∞",
                  label: "Possibilities",
                  description: "Unlimited content creation"
                },
                {
                  value: "🏆",
                  label: "Empire Status",
                  description: "Fully operational"
                }
              ]}
            />
          </EmpireSection>

          {/* Core Components Grid */}
          <EmpireSection padding="lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                Core Empire Components
              </h2>
              <p className="text-gray-300">
                The foundational building blocks of your Empire
              </p>
            </div>

            <EmpireGrid columns={3} gap="lg">
              <EmpireCard variant="glow" padding="lg">
                <div className="text-center space-y-4">
                  <div className="text-4xl">🎯</div>
                  <h3 className="text-xl font-bold text-yellow-400">
                    EmpireButton
                  </h3>
                  <div className="space-y-2">
                    <EmpireButton variant="primary" size="sm">
                      Primary
                    </EmpireButton>
                    <EmpireButton variant="secondary" size="sm">
                      Secondary
                    </EmpireButton>
                    <EmpireButton variant="outline" size="sm">
                      Outline
                    </EmpireButton>
                  </div>
                </div>
              </EmpireCard>

              <EmpireCard variant="glow" padding="lg">
                <div className="text-center space-y-4">
                  <div className="text-4xl">📝</div>
                  <h3 className="text-xl font-bold text-yellow-400">
                    EmpireInput
                  </h3>
                  <div className="space-y-2">
                    <EmpireInput placeholder="Text input" size="sm" />
                    <EmpireInput
                      type="email"
                      placeholder="Email input"
                      size="sm"
                    />
                  </div>
                </div>
              </EmpireCard>

              <EmpireCard variant="glow" padding="lg">
                <div className="text-center space-y-4">
                  <div className="text-4xl">🏷️</div>
                  <h3 className="text-xl font-bold text-yellow-400">
                    EmpireBadge
                  </h3>
                  <div className="space-y-2 flex flex-wrap gap-2 justify-center">
                    <EmpireBadge variant="primary" size="sm">
                      Live
                    </EmpireBadge>
                    <EmpireBadge variant="success" size="sm">
                      Ready
                    </EmpireBadge>
                    <EmpireBadge variant="warning" size="sm">
                      Beta
                    </EmpireBadge>
                  </div>
                </div>
              </EmpireCard>
            </EmpireGrid>
          </EmpireSection>

          {/* Advanced Components */}
          <EmpireSection padding="lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                Advanced Empire Components
              </h2>
              <p className="text-gray-300">
                Sophisticated components for complex interfaces
              </p>
            </div>

            <EmpireGrid columns={2} gap="xl">
              <EmpireCard variant="bordered" padding="lg">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  Console Controls
                </h3>
                <div className="space-y-4">
                  <PreferenceDropdown
                    value="gpt-4"
                    label="AI Model Selection"
                  />
                  <IntegrationStatusNotes
                    status="connected"
                    serviceName="Builder.io CMS"
                    notes="Fully operational with all components registered"
                  />
                </div>
              </EmpireCard>

              <EmpireCard variant="bordered" padding="lg">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  System Status
                </h3>
                <StatusPanel
                  systemStatus="operational"
                  services={[
                    { name: "Builder.io SDK", status: "operational" },
                    { name: "Empire Components", status: "operational" },
                    { name: "Visual Editor", status: "operational" },
                    { name: "Content API", status: "operational" }
                  ]}
                />
              </EmpireCard>
            </EmpireGrid>
          </EmpireSection>

          {/* Dashboard Metrics */}
          <EmpireSection padding="lg">
            <EmpireCard variant="elevated" padding="xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
                Empire Dashboard
              </h3>
              <Dashboard
                metrics={[
                  { label: "Components Registered", value: "18", trend: "up" },
                  { label: "Builder.io Pages", value: "∞", trend: "up" },
                  { label: "Visual Editor", value: "Active", trend: "stable" },
                  { label: "Empire Status", value: "Dominating", trend: "up" }
                ]}
              />
            </EmpireCard>
          </EmpireSection>

          {/* Feature Grid */}
          <EmpireSection padding="lg">
            <EmpireFeatureGrid
              title="Empire Capabilities"
              subtitle="Everything you need to dominate"
              columns={3}
              features={[
                {
                  title: "🏗️ Visual Content Management",
                  description:
                    "Create pages visually with drag-and-drop Empire components in Builder.io",
                  link: { text: "Start Building", href: "/builder" }
                },
                {
                  title: "🎨 Design System Consistency",
                  description:
                    "Every component maintains perfect Empire branding and styling automatically",
                  link: { text: "View Components", href: "/empire-showcase" }
                },
                {
                  title: "⚡ Real-time Preview",
                  description:
                    "See changes instantly with live preview and editing capabilities",
                  link: { text: "Live Demo", href: "/builder-demo" }
                },
                {
                  title: "🚀 Performance Optimized",
                  description:
                    "Modern SDK with zero eval warnings and optimized bundle size",
                  link: { text: "Technical Details", href: "/builder-demo" }
                },
                {
                  title: "🔧 Developer Friendly",
                  description:
                    "Full TypeScript support with comprehensive error handling",
                  link: { text: "Documentation", href: "/builder-demo" }
                },
                {
                  title: "🏆 Production Ready",
                  description:
                    "Scalable, secure, and ready for enterprise deployment",
                  link: { text: "Deploy Now", href: "/builder" }
                }
              ]}
            />
          </EmpireSection>

          {/* Pricing Cards */}
          <EmpireSection padding="lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                Empire Pricing
              </h2>
              <p className="text-gray-300">Choose your Empire expansion plan</p>
            </div>
            <SaintVisionAIPricingCards
              plans={[
                {
                  title: "Empire Starter",
                  price: "$0/mo",
                  features: [
                    "Basic Empire components",
                    "Builder.io integration",
                    "Visual editing",
                    "Community support"
                  ],
                  button: "Start Free",
                  link: "/builder"
                },
                {
                  title: "Empire Pro",
                  price: "$99/mo",
                  features: [
                    "All Empire components",
                    "Advanced Builder.io features",
                    "Priority support",
                    "Custom components",
                    "Team collaboration"
                  ],
                  button: "Go Pro",
                  link: "/pricing"
                },
                {
                  title: "Empire Unlimited",
                  price: "$299/mo",
                  features: [
                    "Unlimited everything",
                    "White-label solutions",
                    "Custom development",
                    "24/7 dedicated support",
                    "Enterprise features"
                  ],
                  button: "Dominate",
                  link: "/upgrade"
                }
              ]}
            />
          </EmpireSection>

          {/* Final CTA */}
          <EmpireSection padding="xl">
            <EmpireCTA
              title="Ready to Build Your Empire?"
              description="Join the revolution of visual content management with the complete SaintSal™ Empire design system. Every component, every feature, every possibility at your fingertips."
              primaryAction={{
                text: "Launch Empire Builder",
                href: "/builder",
                variant: "primary"
              }}
              secondaryAction={{
                text: "Explore Documentation",
                href: "/builder-demo",
                variant: "outline"
              }}
              size="lg"
              centered={true}
            />
          </EmpireSection>
        </EmpireContainer>
      </ConsoleLayout>
    </div>
  )
}
