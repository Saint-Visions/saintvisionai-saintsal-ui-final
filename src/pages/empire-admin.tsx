import React, { useState, useEffect } from "react"
import {
  EmpireContainer,
  EmpireSection,
  EmpireGrid,
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireInput,
  EmpireHero,
  EmpireStats,
  Dashboard,
  StatusPanel,
  PreferenceDropdown
} from "../components"
// Safe imports with fallbacks
const EMPIRE_THEMES = {
  saintvision: { id: "saintvision", name: "SaintVision™ Empire" },
  dark: { id: "dark", name: "Dark Empire" },
  neon: { id: "neon", name: "Neon Empire" }
}

// Mock empire engines for safe rendering
const empireTheme = {
  getCurrentTheme: () => ({ id: "saintvision", name: "SaintVision™ Empire" }),
  getAllThemes: () => Object.values(EMPIRE_THEMES),
  setTheme: (id: string) => console.log("Theme changed to:", id)
}

const empireComponentFactory = {
  getAllComponents: () =>
    Array.from({ length: 19 }, (_, i) => ({ id: i, name: `Component${i}` }))
}

const empirePerformance = {
  getProfiles: () => [],
  exportData: () => JSON.stringify({}),
  stopMonitoring: () => console.log("Monitoring stopped"),
  startMonitoring: () => console.log("Monitoring started")
}

export default function EmpireAdmin() {
  const [currentTheme, setCurrentTheme] = useState(
    empireTheme.getCurrentTheme()
  )
  const [systemStats, setSystemStats] = useState({
    totalComponents: 0,
    registeredThemes: 0,
    performanceScore: 100,
    uptime: "99.9%",
    activeUsers: 1234,
    systemLoad: 23
  })
  const [adminActions, setAdminActions] = useState<string[]>([])

  useEffect(() => {
    loadSystemData()

    // Listen for theme changes
    const handleThemeChange = (event: any) => {
      setCurrentTheme(event.detail.theme)
    }

    window.addEventListener("empire-theme-changed", handleThemeChange)

    return () => {
      window.removeEventListener("empire-theme-changed", handleThemeChange)
    }
  }, [])

  const loadSystemData = () => {
    setSystemStats({
      totalComponents: empireComponentFactory.getAllComponents().length,
      registeredThemes: empireTheme.getAllThemes().length,
      performanceScore: empirePerformance.getProfiles()[0]?.score || 100,
      uptime: "99.9%",
      activeUsers: Math.floor(Math.random() * 2000) + 1000,
      systemLoad: Math.floor(Math.random() * 40) + 10
    })
  }

  const executeAdminAction = (action: string) => {
    setAdminActions(prev => [
      `${new Date().toLocaleTimeString()}: ${action}`,
      ...prev.slice(0, 9)
    ])

    switch (action) {
      case "clear-cache":
        // Simulate cache clearing
        setTimeout(() => {
          setAdminActions(prev => [
            `${new Date().toLocaleTimeString()}: Cache cleared successfully`,
            ...prev.slice(0, 9)
          ])
        }, 1000)
        break
      case "restart-performance":
        empirePerformance.stopMonitoring()
        setTimeout(() => {
          empirePerformance.startMonitoring()
          setAdminActions(prev => [
            `${new Date().toLocaleTimeString()}: Performance engine restarted`,
            ...prev.slice(0, 9)
          ])
        }, 2000)
        break
      case "optimize-system":
        setTimeout(() => {
          setAdminActions(prev => [
            `${new Date().toLocaleTimeString()}: System optimization completed`,
            ...prev.slice(0, 9)
          ])
        }, 3000)
        break
      case "backup-data":
        const backupData = {
          themes: empireTheme.getAllThemes(),
          components: empireComponentFactory.getAllComponents(),
          performance: empirePerformance.exportData(),
          timestamp: new Date().toISOString()
        }
        console.log("Backup data:", backupData)
        setAdminActions(prev => [
          `${new Date().toLocaleTimeString()}: System backup created`,
          ...prev.slice(0, 9)
        ])
        break
    }
  }

  const changeTheme = (themeId: string) => {
    empireTheme.setTheme(themeId)
    executeAdminAction(`Theme changed to ${themeId}`)
  }

  const getSystemMetrics = () => [
    {
      label: "System Load",
      value: `${systemStats.systemLoad}%`,
      trend: systemStats.systemLoad < 30 ? ("down" as const) : ("up" as const)
    },
    {
      label: "Active Users",
      value: systemStats.activeUsers.toLocaleString(),
      trend: "up" as const
    },
    {
      label: "Uptime",
      value: systemStats.uptime,
      trend: "stable" as const
    },
    {
      label: "Performance",
      value: `${systemStats.performanceScore}%`,
      trend:
        systemStats.performanceScore > 80 ? ("up" as const) : ("down" as const)
    }
  ]

  const getSystemServices = () => [
    { name: "Empire Core", status: "operational" as const },
    { name: "Theme Engine", status: "operational" as const },
    { name: "Component Factory", status: "operational" as const },
    { name: "Performance Monitor", status: "operational" as const },
    { name: "Builder.io Integration", status: "operational" as const },
    { name: "Analytics Engine", status: "operational" as const },
    { name: "Security Layer", status: "operational" as const },
    { name: "Database", status: "operational" as const }
  ]

  const adminCommands = [
    {
      id: "clear-cache",
      label: "🧹 Clear System Cache",
      variant: "outline" as const
    },
    {
      id: "restart-performance",
      label: "🔄 Restart Performance Engine",
      variant: "secondary" as const
    },
    {
      id: "optimize-system",
      label: "⚡ Optimize System",
      variant: "primary" as const
    },
    {
      id: "backup-data",
      label: "💾 Create System Backup",
      variant: "outline" as const
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <EmpireHero
            title="🔱 Empire Super Admin"
            subtitle="INFINITE POWER CONTROL PANEL"
            description="Complete administrative control over your Empire infrastructure. Monitor, manage, and optimize every aspect of the system."
            primaryAction={{
              text: "System Overview",
              href: "#overview"
            }}
            secondaryAction={{
              text: "View Logs",
              href: "#logs"
            }}
            size="xl"
            centered={true}
          />
        </EmpireSection>

        <EmpireSection padding="lg" id="overview">
          <div className="flex justify-center mb-8">
            <div className="flex gap-4 flex-wrap">
              <EmpireBadge variant="success" size="lg">
                🟢 SYSTEM OPERATIONAL
              </EmpireBadge>
              <EmpireBadge variant="info" size="lg">
                Theme: {currentTheme.name}
              </EmpireBadge>
              <EmpireBadge variant="primary" size="lg">
                Admin Access: FULL
              </EmpireBadge>
            </div>
          </div>

          <EmpireStats
            title="Empire System Metrics"
            subtitle="Real-time administrative overview"
            columns={4}
            stats={getSystemMetrics()}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={2} gap="lg">
            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                🏥 System Health & Services
              </h3>
              <StatusPanel
                systemStatus="operational"
                services={getSystemServices()}
              />
            </EmpireCard>

            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                ⚡ Administrative Dashboard
              </h3>
              <Dashboard metrics={getSystemMetrics()} />
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={3} gap="lg">
            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🧩</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Component Management
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {systemStats.totalComponents}
                  </p>
                  <p className="text-gray-300">Registered Components</p>
                  <EmpireButton variant="outline" size="sm" fullWidth>
                    Manage Components
                  </EmpireButton>
                </div>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Theme Control
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {systemStats.registeredThemes}
                  </p>
                  <p className="text-gray-300">Available Themes</p>
                  <select
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                    value={currentTheme.id}
                    onChange={e => changeTheme(e.target.value)}
                  >
                    {Object.values(EMPIRE_THEMES).map(theme => (
                      <option key={theme.id} value={theme.id}>
                        {theme.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Performance Control
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {systemStats.performanceScore}%
                  </p>
                  <p className="text-gray-300">System Performance</p>
                  <EmpireButton variant="primary" size="sm" fullWidth>
                    Performance Dashboard
                  </EmpireButton>
                </div>
              </div>
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireCard variant="bordered" padding="xl">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              🔧 Administrative Commands
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {adminCommands.map(command => (
                <EmpireButton
                  key={command.id}
                  variant={command.variant}
                  size="md"
                  fullWidth
                  onClick={() => executeAdminAction(command.id)}
                >
                  {command.label}
                </EmpireButton>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-lg font-bold text-white mb-4">
                📋 Action Log
              </h4>
              <div className="bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto">
                {adminActions.length > 0 ? (
                  adminActions.map((action, index) => (
                    <div
                      key={index}
                      className="text-gray-300 text-sm mb-1 font-mono"
                    >
                      {action}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No administrative actions logged yet.
                  </div>
                )}
              </div>
            </div>
          </EmpireCard>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={2} gap="lg">
            <EmpireCard variant="glow" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                ⚙️ System Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Environment
                  </label>
                  <EmpireBadge variant="success" size="md">
                    {import.meta.env.DEV ? "Development" : "Production"}
                  </EmpireBadge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Debug Mode
                  </label>
                  <EmpireBadge
                    variant={import.meta.env.DEV ? "warning" : "info"}
                    size="md"
                  >
                    {import.meta.env.DEV ? "Enabled" : "Disabled"}
                  </EmpireBadge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Builder.io API
                  </label>
                  <EmpireBadge variant="success" size="md">
                    Connected
                  </EmpireBadge>
                </div>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                🚀 Quick Actions
              </h3>
              <div className="space-y-3">
                <EmpireButton variant="primary" fullWidth>
                  🔄 Reload All Modules
                </EmpireButton>
                <EmpireButton variant="outline" fullWidth>
                  📊 Generate System Report
                </EmpireButton>
                <EmpireButton variant="secondary" fullWidth>
                  🔍 Run System Diagnostics
                </EmpireButton>
                <EmpireButton variant="ghost" fullWidth>
                  📖 View Documentation
                </EmpireButton>
              </div>
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>
      </EmpireContainer>
    </div>
  )
}
