import React from "react"
import {
  EmpireContainer,
  EmpireSection,
  EmpireGrid,
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireHero,
  EmpireStats,
  Dashboard as EmpireDashboard,
  StatusPanel
} from "../components"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <EmpireHero
            title="🚀 SaintSal™ Dashboard"
            subtitle="EMPIRE COMMAND CENTER"
            description="Monitor your Empire's performance, metrics, and system status from this central command center."
            primaryAction={{
              text: "Launch AI Console",
              href: "/console"
            }}
            secondaryAction={{
              text: "View Analytics",
              href: "/console/analytics"
            }}
            size="lg"
            centered={true}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireStats
            title="Empire Performance"
            subtitle="Real-time metrics"
            columns={4}
            stats={[
              {
                value: "99.9%",
                label: "Uptime",
                description: "System availability"
              },
              {
                value: "1,234",
                label: "Active Users",
                description: "Current session count"
              },
              {
                value: "$50K",
                label: "Revenue",
                description: "Monthly recurring"
              },
              {
                value: "18",
                label: "Components",
                description: "Empire system ready"
              }
            ]}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={2} gap="lg">
            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                System Status
              </h3>
              <StatusPanel
                systemStatus="operational"
                services={[
                  { name: "AI Console", status: "operational" },
                  { name: "Builder.io CMS", status: "operational" },
                  { name: "CRM Integration", status: "operational" },
                  { name: "Payment Processing", status: "operational" }
                ]}
              />
            </EmpireCard>

            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <EmpireButton variant="primary" fullWidth>
                  Launch Dual-AI Chat
                </EmpireButton>
                <EmpireButton variant="outline" fullWidth>
                  View Analytics
                </EmpireButton>
                <EmpireButton variant="secondary" fullWidth>
                  Manage Deployments
                </EmpireButton>
                <EmpireButton variant="ghost" fullWidth>
                  System Settings
                </EmpireButton>
              </div>
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireCard variant="glow" padding="xl">
            <EmpireDashboard
              metrics={[
                { label: "Active AI Models", value: "2", trend: "stable" },
                { label: "Processing Tasks", value: "47", trend: "up" },
                { label: "System Load", value: "23%", trend: "down" },
                { label: "Response Time", value: "1.2s", trend: "stable" }
              ]}
            />
          </EmpireCard>
        </EmpireSection>
      </EmpireContainer>
    </div>
  )
}
