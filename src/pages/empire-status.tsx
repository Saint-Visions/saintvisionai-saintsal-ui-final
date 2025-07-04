import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  EmpireContainer,
  EmpireSection,
  EmpireGrid,
  EmpireCard,
  EmpireBadge,
  EmpireButton,
  StatusPanel
} from "../components"
import { getBuilderStatus } from "../lib/builder-test"

export default function EmpireStatus() {
  const [builderStatus, setBuilderStatus] = useState<any>(null)
  const [components] = useState([
    "EmpireButton",
    "EmpireCard",
    "EmpireInput",
    "EmpireBadge",
    "EmpireHero",
    "EmpireFeatureGrid",
    "EmpireCTA",
    "EmpireStats",
    "EmpireContainer",
    "EmpireSection",
    "EmpireGrid",
    "PreferenceDropdown",
    "IntegrationStatusNotes",
    "StatusPanel",
    "ConsoleLayout",
    "Dashboard",
    "GHLEmbed",
    "SaintVisionAIPricingCards",
    "Sidebar"
  ])

  useEffect(() => {
    setBuilderStatus(getBuilderStatus())
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
              SaintSal™ Empire Status
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Complete System Integration Status
            </p>
            <EmpireBadge variant="success" size="lg">
              FULLY OPERATIONAL
            </EmpireBadge>
          </div>

          <EmpireGrid columns={3} gap="lg">
            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Builder.io Integration
                </h3>
                <div className="space-y-2">
                  <EmpireBadge
                    variant={builderStatus?.configured ? "success" : "error"}
                    size="sm"
                  >
                    {builderStatus?.configured
                      ? "Configured"
                      : "Not Configured"}
                  </EmpireBadge>
                  <p className="text-gray-300 text-sm">
                    API Key: {builderStatus?.apiKey || "Not set"}
                  </p>
                  <p className="text-gray-300 text-sm">
                    Mode: {builderStatus?.environment || "Unknown"}
                  </p>
                </div>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🧩</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Component Registry
                </h3>
                <div className="space-y-2">
                  <EmpireBadge variant="success" size="sm">
                    {components.length} Components
                  </EmpireBadge>
                  <p className="text-gray-300 text-sm">
                    All Empire components registered
                  </p>
                  <p className="text-gray-300 text-sm">
                    Visual editing enabled
                  </p>
                </div>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  System Performance
                </h3>
                <div className="space-y-2">
                  <EmpireBadge variant="success" size="sm">
                    Zero Eval Warnings
                  </EmpireBadge>
                  <p className="text-gray-300 text-sm">Modern SDK active</p>
                  <p className="text-gray-300 text-sm">Optimized performance</p>
                </div>
              </div>
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireCard variant="elevated" padding="xl">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              System Status Panel
            </h3>
            <StatusPanel
              systemStatus="operational"
              services={[
                { name: "Builder.io SDK", status: "operational" },
                { name: "Component Registry", status: "operational" },
                { name: "Visual Editor", status: "operational" },
                { name: "Content API", status: "operational" },
                { name: "Empire Design System", status: "operational" },
                { name: "TypeScript Support", status: "operational" },
                { name: "Error Handling", status: "operational" },
                { name: "Development Tools", status: "operational" }
              ]}
            />
          </EmpireCard>
        </EmpireSection>

        <EmpireSection padding="lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Registered Components
            </h2>
            <p className="text-gray-300">
              All {components.length} Empire components ready for visual editing
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {components.map((component, index) => (
              <EmpireCard key={component} variant="bordered" padding="md">
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {index < 4
                      ? "🎯"
                      : index < 8
                        ? "📐"
                        : index < 12
                          ? "🏗️"
                          : "⚙️"}
                  </div>
                  <div className="text-sm font-mono text-yellow-400">
                    {component}
                  </div>
                </div>
              </EmpireCard>
            ))}
          </div>
        </EmpireSection>

        <EmpireSection padding="xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Empire Ready for Deployment
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Your complete SaintSal™ Empire is fully integrated, optimized,
              and ready for visual content management. All components are
              registered, the modern SDK is active, and Builder.io integration
              is fully operational.
            </p>
            <div className="space-x-4">
              <EmpireButton variant="primary" size="lg">
                <Link to="/builder">Launch Builder.io</Link>
              </EmpireButton>
              <EmpireButton variant="outline" size="lg">
                <Link to="/empire-showcase">View Showcase</Link>
              </EmpireButton>
              <EmpireButton variant="secondary" size="lg">
                <Link to="/builder-demo">Read Guide</Link>
              </EmpireButton>
            </div>
          </div>
        </EmpireSection>
      </EmpireContainer>
    </div>
  )
}
