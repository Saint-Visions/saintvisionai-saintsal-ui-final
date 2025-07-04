import React from "react"
import {
  EmpireHero,
  EmpireFeatureGrid,
  EmpireStats,
  EmpireCTA,
  EmpireButton,
  EmpireCard,
  EmpireInput,
  EmpireBadge,
  EmpireSection,
  EmpireGrid
} from "../components"

const features = [
  {
    title: "Lightning Fast Performance",
    description:
      "Built with cutting-edge technology for maximum speed and efficiency. Experience the future of AI-powered platforms.",
    link: { text: "Learn More", href: "/features" }
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-level security with end-to-end encryption. Your empire's data is protected with military-grade protocols.",
    link: { text: "Security Details", href: "/security" }
  },
  {
    title: "24/7 Empire Support",
    description:
      "Our empire experts are always ready to help you dominate your market. Premium support for premium results.",
    link: { text: "Contact Support", href: "/support" }
  },
  {
    title: "Global Scalability",
    description:
      "Scale your empire worldwide with our distributed infrastructure. From startup to enterprise, we grow with you.",
    link: { text: "Scale Now", href: "/scale" }
  },
  {
    title: "AI-Powered Insights",
    description:
      "Make data-driven decisions with our advanced AI analytics. Turn information into empire-building intelligence.",
    link: { text: "See Analytics", href: "/analytics" }
  },
  {
    title: "Revenue Optimization",
    description:
      "Maximize your empire's profitability with our proven optimization algorithms. More revenue, less effort.",
    link: { text: "Optimize Revenue", href: "/revenue" }
  }
]

const stats = [
  {
    value: "10K+",
    label: "Empire Builders",
    description: "Active entrepreneurs growing their empires"
  },
  {
    value: "99.9%",
    label: "Uptime",
    description: "Rock-solid reliability you can trust"
  },
  {
    value: "$2.5M+",
    label: "Revenue Generated",
    description: "Total revenue created by our users"
  },
  {
    value: "50+",
    label: "Countries",
    description: "Global empire expansion worldwide"
  }
]

export default function EmpireDemo() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <EmpireHero
        title="Build Your Digital Empire"
        subtitle="SaintSal™ Vision"
        description="Revolutionary AI-powered platform designed for modern entrepreneurs who refuse to settle for ordinary. Transform your vision into a thriving digital empire with cutting-edge technology and proven strategies."
        primaryAction={{
          text: "Start Building Empire",
          href: "/signup",
          variant: "primary"
        }}
        secondaryAction={{
          text: "Watch Demo",
          href: "/demo",
          variant: "outline"
        }}
        size="xl"
      />

      {/* Component Showcase Section */}
      <EmpireSection padding="xl" background="secondary">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Empire <span className="text-yellow-400">Components</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the power of our comprehensive design system built for
            empire builders
          </p>
        </div>

        <EmpireGrid columns={4} gap="lg">
          {/* Buttons */}
          <EmpireCard variant="bordered" padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Buttons</h3>
            <div className="space-y-3">
              <EmpireButton variant="primary" fullWidth>
                Primary
              </EmpireButton>
              <EmpireButton variant="outline" fullWidth>
                Outline
              </EmpireButton>
              <EmpireButton variant="secondary" fullWidth>
                Secondary
              </EmpireButton>
            </div>
          </EmpireCard>

          {/* Badges */}
          <EmpireCard variant="bordered" padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Badges</h3>
            <div className="space-y-3">
              <div>
                <EmpireBadge variant="primary">Primary</EmpireBadge>
              </div>
              <div>
                <EmpireBadge variant="success">Success</EmpireBadge>
              </div>
              <div>
                <EmpireBadge variant="warning">Warning</EmpireBadge>
              </div>
            </div>
          </EmpireCard>

          {/* Inputs */}
          <EmpireCard variant="bordered" padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Inputs</h3>
            <div className="space-y-3">
              <EmpireInput placeholder="Text input" size="sm" />
              <EmpireInput type="email" placeholder="Email input" />
              <EmpireInput placeholder="Large input" size="lg" />
            </div>
          </EmpireCard>

          {/* Cards */}
          <EmpireCard variant="bordered" padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Cards</h3>
            <div className="space-y-3">
              <EmpireCard variant="default" padding="sm">
                <p className="text-sm text-gray-300">Default</p>
              </EmpireCard>
              <EmpireCard variant="glow" padding="sm">
                <p className="text-sm text-gray-300">Glow Effect</p>
              </EmpireCard>
            </div>
          </EmpireCard>
        </EmpireGrid>
      </EmpireSection>

      {/* Features Grid */}
      <EmpireFeatureGrid
        title="Empire-Grade Features"
        subtitle="Built for Dominance"
        columns={3}
        features={features}
      />

      {/* Stats Section */}
      <EmpireStats
        title="Empire by the Numbers"
        subtitle="Proven Results"
        stats={stats}
        columns={4}
      />

      {/* Form Example */}
      <EmpireSection padding="xl" background="gradient">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Join the <span className="text-yellow-400">Empire</span>
            </h2>
            <p className="text-xl text-gray-300">
              Start building your digital empire today
            </p>
          </div>

          <EmpireCard variant="glow" padding="xl">
            <div className="space-y-6">
              <EmpireInput
                label="Full Name"
                placeholder="Enter your name"
                required
              />
              <EmpireInput
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                required
              />
              <EmpireInput
                label="Company"
                placeholder="Your company or startup"
              />
              <EmpireButton variant="primary" size="lg" fullWidth>
                Build My Empire
              </EmpireButton>
            </div>
          </EmpireCard>
        </div>
      </EmpireSection>

      {/* Final CTA */}
      <EmpireCTA
        title="Ready to Dominate Your Market?"
        description="Join thousands of entrepreneurs who've chosen SaintSal Empire to transform their vision into reality. Your empire awaits."
        primaryAction={{
          text: "Start Your Empire",
          href: "/signup",
          variant: "primary"
        }}
        secondaryAction={{
          text: "Schedule Demo",
          href: "/demo",
          variant: "outline"
        }}
        size="lg"
      />

      {/* Footer */}
      <EmpireSection padding="lg" background="primary">
        <div className="text-center">
          <h3 className="text-2xl font-black text-white mb-4">
            SaintSal™ <span className="text-yellow-400">Empire</span>
          </h3>
          <p className="text-gray-300 mb-6">
            Building the future, one empire at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <EmpireBadge variant="primary">AI-Powered</EmpireBadge>
            <EmpireBadge variant="success">Enterprise Ready</EmpireBadge>
            <EmpireBadge variant="info">Global Scale</EmpireBadge>
            <EmpireBadge variant="warning">24/7 Support</EmpireBadge>
          </div>
        </div>
      </EmpireSection>
    </div>
  )
}
