import React from "react"
import { Link } from "react-router-dom"
import {
  EmpireContainer,
  EmpireSection,
  EmpireButton,
  EmpireCard,
  EmpireHero
} from "../components"

export default function BuilderDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <EmpireHero
            title="🏗️ Builder.io Integration Ready!"
            subtitle="EMPIRE CMS"
            description="Your Empire design system is now fully integrated with Builder.io. Create dynamic content with visual editing while maintaining your brand consistency."
            primaryAction={{
              text: "Open Builder.io CMS",
              href: "https://builder.io/content"
            }}
            secondaryAction={{
              text: "View Integration",
              href: "/builder"
            }}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EmpireCard variant="bordered" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Content Management
                </h3>
                <p className="text-gray-300 mb-4">
                  Create and edit pages visually with your Empire components.
                </p>
                <EmpireButton variant="outline" size="sm">
                  <Link to="/builder">Start Building</Link>
                </EmpireButton>
              </div>
            </EmpireCard>

            <EmpireCard variant="bordered" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Design System
                </h3>
                <p className="text-gray-300 mb-4">
                  All Empire components are registered and ready to use.
                </p>
                <EmpireButton variant="outline" size="sm">
                  <a
                    href="https://builder.io/content"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Builder.io
                  </a>
                </EmpireButton>
              </div>
            </EmpireCard>

            <EmpireCard variant="bordered" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Live Preview
                </h3>
                <p className="text-gray-300 mb-4">
                  See changes instantly with real-time preview and editing.
                </p>
                <EmpireButton variant="outline" size="sm">
                  <Link to="/builder">Preview Mode</Link>
                </EmpireButton>
              </div>
            </EmpireCard>
          </div>
        </EmpireSection>

        <EmpireSection padding="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              Quick Start Guide
            </h2>
            <div className="space-y-6">
              <EmpireCard variant="glow" padding="lg">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Create Content</h3>
                    <p className="text-gray-300">
                      Visit{" "}
                      <a
                        href="https://builder.io/content"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-500 hover:text-yellow-400 underline"
                      >
                        Builder.io Content
                      </a>{" "}
                      and create a new page with any URL path like{" "}
                      <code className="bg-gray-800 px-2 py-1 rounded">
                        /welcome
                      </code>
                    </p>
                  </div>
                </div>
              </EmpireCard>

              <EmpireCard variant="glow" padding="lg">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Use Empire Components
                    </h3>
                    <p className="text-gray-300">
                      Drag and drop Empire components from the left panel. All
                      your design system components are available including
                      EmpireHero, EmpireButton, EmpireCard, and more.
                    </p>
                  </div>
                </div>
              </EmpireCard>

              <EmpireCard variant="glow" padding="lg">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Publish & View</h3>
                    <p className="text-gray-300">
                      Click "Publish" in Builder.io, then visit{" "}
                      <code className="bg-gray-800 px-2 py-1 rounded">
                        /builder/your-path
                      </code>{" "}
                      to see your content live with full Empire styling.
                    </p>
                  </div>
                </div>
              </EmpireCard>
            </div>
          </div>
        </EmpireSection>

        <EmpireSection padding="lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Available Components
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
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
                "Sidebar"
              ].map(component => (
                <div
                  key={component}
                  className="bg-gray-800 p-3 rounded text-sm font-mono text-yellow-400"
                >
                  {component}
                </div>
              ))}
            </div>
          </div>
        </EmpireSection>

        <EmpireSection padding="xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              Ready to Build Your Empire?
            </h2>
            <div className="space-x-4">
              <EmpireButton variant="primary" size="lg">
                <a
                  href="https://builder.io/content"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                >
                  Start Creating Content
                </a>
              </EmpireButton>
              <EmpireButton variant="outline" size="lg">
                <Link to="/builder">View Builder Interface</Link>
              </EmpireButton>
            </div>
          </div>
        </EmpireSection>
      </EmpireContainer>
    </div>
  )
}
