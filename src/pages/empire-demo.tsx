import React, { useState } from "react"
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
  PreferenceDropdown
} from "../components"

export default function EmpireDemo() {
  const [selectedDemo, setSelectedDemo] = useState("hero")
  const [demoText, setDemoText] = useState("Welcome to the Empire")
  const [selectedVariant, setSelectedVariant] = useState("primary")

  const demoOptions = [
    { value: "hero", label: "Hero Sections" },
    { value: "cards", label: "Card Components" },
    { value: "buttons", label: "Button Variants" },
    { value: "forms", label: "Form Elements" },
    { value: "features", label: "Feature Grids" },
    { value: "stats", label: "Statistics" }
  ]

  const variantOptions = [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "outline", label: "Outline" },
    { value: "ghost", label: "Ghost" },
    { value: "danger", label: "Danger" }
  ]

  const renderDemo = () => {
    switch (selectedDemo) {
      case "hero":
        return (
          <EmpireHero
            title={demoText}
            subtitle="Interactive Demo"
            description="This is a live demo of the Empire Hero component. Customize the text above to see real-time changes."
            primaryAction={{
              text: "Primary Action",
              href: "#"
            }}
            secondaryAction={{
              text: "Secondary Action",
              href: "#"
            }}
            size="lg"
            centered={true}
          />
        )

      case "cards":
        return (
          <EmpireGrid columns={3} gap="lg">
            <EmpireCard variant="default" padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Default Card
              </h3>
              <p className="text-gray-300 mb-4">
                A standard Empire card with default styling.
              </p>
              <EmpireButton variant="primary" size="sm">
                Action
              </EmpireButton>
            </EmpireCard>
            <EmpireCard variant="glow" padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">Glow Card</h3>
              <p className="text-gray-300 mb-4">
                An Empire card with a subtle glow effect.
              </p>
              <EmpireButton variant="secondary" size="sm">
                Action
              </EmpireButton>
            </EmpireCard>
            <EmpireCard variant="bordered" padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Bordered Card
              </h3>
              <p className="text-gray-300 mb-4">
                An Empire card with a defined border.
              </p>
              <EmpireButton variant="outline" size="sm">
                Action
              </EmpireButton>
            </EmpireCard>
          </EmpireGrid>
        )

      case "buttons":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Button Variants
              </h3>
              <p className="text-gray-300 mb-6">
                All Empire button styles and sizes
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <EmpireCard variant="bordered" padding="lg">
                <h4 className="font-bold text-yellow-400 mb-4">Variants</h4>
                <div className="space-y-3">
                  <EmpireButton variant="primary" fullWidth>
                    Primary
                  </EmpireButton>
                  <EmpireButton variant="secondary" fullWidth>
                    Secondary
                  </EmpireButton>
                  <EmpireButton variant="outline" fullWidth>
                    Outline
                  </EmpireButton>
                  <EmpireButton variant="ghost" fullWidth>
                    Ghost
                  </EmpireButton>
                  <EmpireButton variant="danger" fullWidth>
                    Danger
                  </EmpireButton>
                </div>
              </EmpireCard>
              <EmpireCard variant="bordered" padding="lg">
                <h4 className="font-bold text-yellow-400 mb-4">Sizes</h4>
                <div className="space-y-3">
                  <EmpireButton variant="primary" size="xs" fullWidth>
                    Extra Small
                  </EmpireButton>
                  <EmpireButton variant="primary" size="sm" fullWidth>
                    Small
                  </EmpireButton>
                  <EmpireButton variant="primary" size="md" fullWidth>
                    Medium
                  </EmpireButton>
                  <EmpireButton variant="primary" size="lg" fullWidth>
                    Large
                  </EmpireButton>
                  <EmpireButton variant="primary" size="xl" fullWidth>
                    Extra Large
                  </EmpireButton>
                </div>
              </EmpireCard>
              <EmpireCard variant="bordered" padding="lg">
                <h4 className="font-bold text-yellow-400 mb-4">States</h4>
                <div className="space-y-3">
                  <EmpireButton variant="primary" fullWidth>
                    Normal
                  </EmpireButton>
                  <EmpireButton variant="primary" loading fullWidth>
                    Loading
                  </EmpireButton>
                  <EmpireButton variant="primary" disabled fullWidth>
                    Disabled
                  </EmpireButton>
                  <EmpireButton variant="primary" fullWidth>
                    🚀 With Icon
                  </EmpireButton>
                </div>
              </EmpireCard>
            </div>
          </div>
        )

      case "forms":
        return (
          <EmpireGrid columns={2} gap="lg">
            <EmpireCard variant="bordered" padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">Form Inputs</h3>
              <div className="space-y-4">
                <EmpireInput
                  label="Text Input"
                  placeholder="Enter text here"
                  type="text"
                />
                <EmpireInput
                  label="Email Input"
                  placeholder="Enter your email"
                  type="email"
                />
                <EmpireInput
                  label="Password Input"
                  placeholder="Enter password"
                  type="password"
                />
                <EmpireInput
                  label="Number Input"
                  placeholder="Enter a number"
                  type="number"
                />
              </div>
            </EmpireCard>
            <EmpireCard variant="bordered" padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Input States
              </h3>
              <div className="space-y-4">
                <EmpireInput
                  label="Default State"
                  placeholder="Normal input"
                  type="text"
                />
                <EmpireInput
                  label="Error State"
                  placeholder="Input with error"
                  type="text"
                  error="This field is required"
                />
                <EmpireInput
                  label="Disabled State"
                  placeholder="Disabled input"
                  type="text"
                  disabled
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Badges & Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <EmpireBadge variant="primary">Primary</EmpireBadge>
                    <EmpireBadge variant="success">Success</EmpireBadge>
                    <EmpireBadge variant="warning">Warning</EmpireBadge>
                    <EmpireBadge variant="error">Error</EmpireBadge>
                    <EmpireBadge variant="info">Info</EmpireBadge>
                  </div>
                </div>
              </div>
            </EmpireCard>
          </EmpireGrid>
        )

      case "features":
        return (
          <EmpireFeatureGrid
            title="Feature Grid Demo"
            subtitle="Customizable feature showcases"
            columns={3}
            features={[
              {
                title: "🚀 Fast Performance",
                description:
                  "Lightning-fast loading times and optimized rendering for the best user experience.",
                link: { text: "Learn More", href: "#" }
              },
              {
                title: "🎨 Beautiful Design",
                description:
                  "Stunning visual design with the Empire aesthetic that captivates and converts.",
                link: { text: "View Gallery", href: "#" }
              },
              {
                title: "🔧 Easy to Use",
                description:
                  "Intuitive interface design that makes complex tasks simple and enjoyable.",
                link: { text: "Get Started", href: "#" }
              },
              {
                title: "📱 Mobile First",
                description:
                  "Responsive design that works perfectly on all devices and screen sizes.",
                link: { text: "Test Mobile", href: "#" }
              },
              {
                title: "🛡️ Secure",
                description:
                  "Enterprise-grade security with data protection and privacy compliance.",
                link: { text: "Security Info", href: "#" }
              },
              {
                title: "🌍 Global",
                description:
                  "Multi-language support and global CDN for worldwide accessibility.",
                link: { text: "Global Reach", href: "#" }
              }
            ]}
          />
        )

      case "stats":
        return (
          <EmpireStats
            title="Statistics Demo"
            subtitle="Real-time metrics and KPIs"
            columns={4}
            stats={[
              {
                value: "99.9%",
                label: "Uptime",
                description: "System availability"
              },
              {
                value: "150ms",
                label: "Response Time",
                description: "Average API response"
              },
              {
                value: "10M+",
                label: "Requests",
                description: "Monthly API calls"
              },
              {
                value: "24/7",
                label: "Support",
                description: "Always available"
              }
            ]}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <EmpireContainer size="full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            EMPIRE <span className="text-yellow-400">DEMO</span>
          </h1>
          <p className="text-xl text-gray-300">
            Interactive component playground • Live demonstrations • Real-time
            customization
          </p>
        </div>

        {/* Demo Controls */}
        <EmpireSection padding="lg" background="secondary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Demo Section
              </label>
              <PreferenceDropdown
                options={demoOptions}
                value={selectedDemo}
                onChange={setSelectedDemo}
                backgroundColor="#374151"
                textColor="white"
                hoverColor="yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Custom Text (for applicable demos)
              </label>
              <EmpireInput
                type="text"
                value={demoText}
                onChange={e => setDemoText(e.target.value)}
                placeholder="Enter custom text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Variant (for buttons)
              </label>
              <PreferenceDropdown
                options={variantOptions}
                value={selectedVariant}
                onChange={setSelectedVariant}
                backgroundColor="#374151"
                textColor="white"
                hoverColor="yellow-400"
              />
            </div>
          </div>
        </EmpireSection>

        {/* Demo Area */}
        <EmpireSection padding="xl" background="gradient">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-white mb-2">
              Live <span className="text-yellow-400">Preview</span>
            </h2>
            <p className="text-gray-400">
              Interactive demonstration of Empire components
            </p>
          </div>

          <div className="bg-black/50 rounded-2xl p-8 border border-yellow-500/20">
            {renderDemo()}
          </div>
        </EmpireSection>

        {/* Component Code */}
        <EmpireSection padding="lg" background="none">
          <EmpireCard variant="bordered" padding="lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              Component <span className="text-yellow-400">Usage</span>
            </h3>
            <div className="bg-gray-900 p-6 rounded-lg overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono">
                <code>
                  {selectedDemo === "hero" &&
                    `<EmpireHero
  title="${demoText}"
  subtitle="Interactive Demo"
  description="This is a live demo of the Empire Hero component."
  primaryAction={{
    text: "Primary Action",
    href: "#"
  }}
  secondaryAction={{
    text: "Secondary Action", 
    href: "#"
  }}
  size="lg"
  centered={true}
/>`}
                  {selectedDemo === "cards" &&
                    `<EmpireCard variant="glow" padding="lg">
  <h3 className="text-xl font-bold text-white mb-4">Card Title</h3>
  <p className="text-gray-300 mb-4">Card description text.</p>
  <EmpireButton variant="primary" size="sm">Action</EmpireButton>
</EmpireCard>`}
                  {selectedDemo === "buttons" &&
                    `<EmpireButton 
  variant="${selectedVariant}" 
  size="md"
  loading={false}
  disabled={false}
>
  Button Text
</EmpireButton>`}
                  {selectedDemo === "forms" &&
                    `<EmpireInput
  label="Form Label"
  placeholder="Enter text here"
  type="text"
  error=""
  disabled={false}
/>`}
                  {selectedDemo === "features" &&
                    `<EmpireFeatureGrid
  title="Feature Grid Demo"
  subtitle="Customizable feature showcases"
  columns={3}
  features={[
    {
      title: "🚀 Fast Performance",
      description: "Lightning-fast loading times...",
      link: { text: "Learn More", href: "#" }
    }
  ]}
/>`}
                  {selectedDemo === "stats" &&
                    `<EmpireStats
  title="Statistics Demo"
  subtitle="Real-time metrics and KPIs"
  columns={4}
  stats={[
    {
      value: "99.9%",
      label: "Uptime",
      description: "System availability"
    }
  ]}
/>`}
                </code>
              </pre>
            </div>
          </EmpireCard>
        </EmpireSection>

        {/* Call to Action */}
        <EmpireSection padding="xl" background="none">
          <EmpireCTA
            title="Ready to Build with Empire?"
            description="Experience the full power of the Empire design system in Builder.io. Create stunning pages with drag-and-drop simplicity."
            primaryAction={{
              text: "Launch Builder.io",
              href: "/builder",
              variant: "primary"
            }}
            secondaryAction={{
              text: "View All Components",
              href: "/empire-showcase",
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
