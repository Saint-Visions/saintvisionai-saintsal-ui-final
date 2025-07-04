import React, { useState } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireInput,
  EmpireGrid,
  EmpireSection
} from "../components"
import { GHLEmbed } from "../components/integrations/GHLEmbed"

export default function GHLIntegration() {
  const [ghlUrl, setGhlUrl] = useState("")
  const [embedUrl, setEmbedUrl] = useState("")

  // Default GHL embed URLs (replace with your actual URLs)
  const defaultEmbeds = [
    {
      title: "GHL CRM Dashboard",
      url: "https://app.gohighlevel.com/embed/dashboard",
      description: "Complete CRM overview and pipeline management"
    },
    {
      title: "Lead Capture Forms",
      url: "https://app.gohighlevel.com/embed/forms",
      description: "Integrated lead capture and form builder"
    },
    {
      title: "Calendar Booking",
      url: "https://app.gohighlevel.com/embed/calendar",
      description: "Appointment scheduling and calendar management"
    }
  ]

  const handleLoadEmbed = () => {
    if (ghlUrl.trim()) {
      setEmbedUrl(ghlUrl.trim())
    }
  }

  const loadPresetEmbed = (url: string) => {
    setEmbedUrl(url)
    setGhlUrl(url)
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          GHL <span className="text-yellow-400">INTEGRATION</span>
        </h1>
        <p className="text-xl text-gray-300">
          GoHighLevel CRM and automation platform integration • Seamless
          workflow management
        </p>
      </div>

      {/* URL Input */}
      <EmpireSection padding="lg" background="none">
        <EmpireCard variant="bordered" padding="lg">
          <h3 className="text-xl font-bold text-white mb-4">
            🔗 Custom GHL Embed
          </h3>
          <div className="flex gap-4 mb-4">
            <EmpireInput
              placeholder="Enter GoHighLevel URL (e.g., https://app.gohighlevel.com/...)"
              value={ghlUrl}
              onChange={e => setGhlUrl(e.target.value)}
              className="flex-1"
            />
            <EmpireButton
              variant="primary"
              onClick={handleLoadEmbed}
              disabled={!ghlUrl.trim()}
            >
              Load Embed
            </EmpireButton>
          </div>
          <p className="text-sm text-gray-400">
            Enter any GoHighLevel URL to embed it within the SaintSal Empire
            interface
          </p>
        </EmpireCard>
      </EmpireSection>

      {/* Preset Embeds */}
      <EmpireSection padding="lg" background="secondary">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            Quick <span className="text-yellow-400">Access</span>
          </h2>
          <p className="text-gray-300">
            Pre-configured GoHighLevel integrations
          </p>
        </div>

        <EmpireGrid columns={3} gap="lg">
          {defaultEmbeds.map((embed, index) => (
            <EmpireCard key={index} variant="bordered" padding="lg" hoverable>
              <div className="text-center">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {embed.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  {embed.description}
                </p>
                <EmpireButton
                  variant={embedUrl === embed.url ? "primary" : "outline"}
                  fullWidth
                  onClick={() => loadPresetEmbed(embed.url)}
                >
                  {embedUrl === embed.url ? "Active" : "Load"}
                </EmpireButton>
              </div>
            </EmpireCard>
          ))}
        </EmpireGrid>
      </EmpireSection>

      {/* Active Embed */}
      {embedUrl && (
        <EmpireSection padding="lg" background="gradient">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-4">
              Active <span className="text-yellow-400">Integration</span>
            </h2>
          </div>

          <GHLEmbed
            src={embedUrl}
            title="GoHighLevel Integration"
            height={800}
            showControls={true}
          />
        </EmpireSection>
      )}

      {/* Integration Info */}
      <EmpireSection padding="lg" background="none">
        <EmpireCard variant="glow" padding="lg">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Supercharge Your Empire with GoHighLevel
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Integrate powerful CRM, automation, and marketing tools directly
              into your SaintSal Empire dashboard. Manage leads, automate
              workflows, and scale your operations seamlessly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <EmpireButton variant="primary" size="lg">
                🚀 Setup Integration
              </EmpireButton>
              <EmpireButton variant="outline" size="lg">
                📚 View Documentation
              </EmpireButton>
              <EmpireButton variant="secondary" size="lg">
                ⚙️ Configure Settings
              </EmpireButton>
            </div>
          </div>
        </EmpireCard>
      </EmpireSection>
    </div>
  )
}
