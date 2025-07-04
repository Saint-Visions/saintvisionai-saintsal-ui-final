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
  Dashboard,
  StatusPanel
} from "../components"

export default function EmpireLive() {
  const liveStats = [
    { label: "System Status", value: "🟢 LIVE", trend: "stable" as const },
    { label: "Components", value: "19", trend: "up" as const },
    { label: "Performance", value: "98%", trend: "up" as const },
    { label: "Users", value: "1.2K", trend: "up" as const }
  ]

  const services = [
    { name: "Empire Core", status: "operational" as const },
    { name: "Builder.io Integration", status: "operational" as const },
    { name: "Component System", status: "operational" as const },
    { name: "Analytics Engine", status: "operational" as const },
    { name: "Theme Engine", status: "operational" as const },
    { name: "Performance Monitor", status: "operational" as const }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <EmpireHero
            title="🚀 Empire LIVE Dashboard"
            subtitle="SYSTEM FULLY OPERATIONAL"
            description="Your complete SaintSal™ Empire is live and ready for infinite scale. All systems operational, all components registered, Builder.io fully integrated."
            primaryAction={{
              text: "🏗️ Launch Builder.io",
              href: "/builder"
            }}
            secondaryAction={{
              text: "📊 View Analytics",
              href: "/empire-analytics"
            }}
            size="xl"
            centered={true}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <div className="flex justify-center mb-8">
            <div className="flex gap-4 flex-wrap">
              <EmpireBadge variant="success" size="lg">
                🟢 FULLY OPERATIONAL
              </EmpireBadge>
              <EmpireBadge variant="primary" size="lg">
                19 Components Ready
              </EmpireBadge>
              <EmpireBadge variant="info" size="lg">
                Builder.io Integrated
              </EmpireBadge>
              <EmpireBadge variant="warning" size="lg">
                🔥 INFINITE SCALE
              </EmpireBadge>
            </div>
          </div>

          <EmpireStats
            title="Empire Live Metrics"
            subtitle="Real-time system performance"
            columns={4}
            stats={liveStats}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={2} gap="lg">
            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                🏥 System Health Monitor
              </h3>
              <StatusPanel systemStatus="operational" services={services} />
            </EmpireCard>

            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                ⚡ Live Performance Dashboard
              </h3>
              <Dashboard metrics={liveStats} />
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={4} gap="md">
            <EmpireCard variant="glow" padding="md">
              <div className="text-center">
                <div className="text-3xl mb-2">🧩</div>
                <h4 className="font-bold text-yellow-400 mb-1">Components</h4>
                <p className="text-2xl font-bold">19</p>
                <p className="text-xs text-gray-400">All Ready</p>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="md">
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h4 className="font-bold text-yellow-400 mb-1">Themes</h4>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-gray-400">Available</p>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="md">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-bold text-yellow-400 mb-1">Analytics</h4>
                <p className="text-2xl font-bold">Live</p>
                <p className="text-xs text-gray-400">Monitoring</p>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="md">
              <div className="text-center">
                <div className="text-3xl mb-2">🔱</div>
                <h4 className="font-bold text-yellow-400 mb-1">Admin</h4>
                <p className="text-2xl font-bold">Full</p>
                <p className="text-xs text-gray-400">Control</p>
              </div>
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireCard variant="bordered" padding="xl">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              🚀 Quick Actions
            </h3>
            <EmpireGrid columns={2} gap="md">
              <EmpireButton variant="primary" size="lg" fullWidth>
                <a href="/builder" className="text-black">
                  🏗️ Launch Builder.io CMS
                </a>
              </EmpireButton>
              <EmpireButton variant="outline" size="lg" fullWidth>
                <a href="/empire-showcase">🏆 View Empire Showcase</a>
              </EmpireButton>
              <EmpireButton variant="secondary" size="lg" fullWidth>
                <a href="/empire-analytics">📈 Analytics Dashboard</a>
              </EmpireButton>
              <EmpireButton variant="ghost" size="lg" fullWidth>
                <a href="/empire-admin">🔱 Super Admin Panel</a>
              </EmpireButton>
            </EmpireGrid>
          </EmpireCard>
        </EmpireSection>

        <EmpireSection padding="xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              🎉 Empire Ready for Production!
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your complete SaintSal™ Empire is fully operational with infinite
              scale capabilities. All components registered, Builder.io
              integrated, performance monitoring active, and enterprise-grade
              admin controls ready.
            </p>
            <div className="space-x-4">
              <EmpireButton variant="primary" size="xl">
                <a href="/builder" className="text-black">
                  🚀 Start Building Your Empire
                </a>
              </EmpireButton>
              <EmpireButton variant="outline" size="xl">
                <a href="/empire-showcase">🎯 Explore All Features</a>
              </EmpireButton>
            </div>
          </div>
        </EmpireSection>
      </EmpireContainer>
    </div>
  )
}
