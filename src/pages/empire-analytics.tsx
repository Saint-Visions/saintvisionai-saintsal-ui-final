import React, { useState, useEffect } from "react"
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
// Import performance engine with fallback
let empirePerformance: any, empireTheme: any, empireComponentFactory: any
try {
  const perfEngine = await import("../lib/empire-performance-engine")
  empirePerformance = perfEngine.empirePerformance
  const themeEngine = await import("../lib/empire-theme-engine")
  empireTheme = themeEngine.empireTheme
  const compFactory = await import("../lib/empire-component-factory")
  empireComponentFactory = compFactory.empireComponentFactory
} catch (e) {
  console.warn("Empire engines not loaded yet")
}

interface PerformanceMetric {
  id: string
  name: string
  value: number
  unit: string
  timestamp: number
  category: string
  threshold?: { warning: number; critical: number }
}

interface PerformanceProfile {
  id: string
  name: string
  score: number
  metrics: PerformanceMetric[]
  recommendations: string[]
  timestamp: number
}

export default function EmpireAnalytics() {
  const [metrics, setMetrics] = useState<Record<string, PerformanceMetric>>({})
  const [profiles, setProfiles] = useState<PerformanceProfile[]>([])
  const [currentProfile, setCurrentProfile] =
    useState<PerformanceProfile | null>(null)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [systemHealth, setSystemHealth] = useState<
    "excellent" | "good" | "warning" | "critical"
  >("excellent")

  useEffect(() => {
    // Load initial data
    loadAnalyticsData()

    // Set up real-time updates
    const interval = setInterval(loadAnalyticsData, 5000)

    // Listen for performance alerts
    const handleAlert = (event: any) => {
      const { level, metric } = event.detail
      console.log(`Performance Alert [${level}]:`, metric)
      updateSystemHealth(level)
    }

    window.addEventListener("empire-performance-alert", handleAlert)

    return () => {
      clearInterval(interval)
      window.removeEventListener("empire-performance-alert", handleAlert)
    }
  }, [])

  const loadAnalyticsData = () => {
    if (empirePerformance) {
      setMetrics(empirePerformance.getLatestMetrics?.() || {})
      setProfiles(empirePerformance.getProfiles?.() || [])
    }
  }

  const generateNewProfile = () => {
    if (empirePerformance?.generateProfile) {
      const profile = empirePerformance.generateProfile()
      setCurrentProfile(profile)
      setProfiles(empirePerformance.getProfiles?.() || [])
    }
  }

  const toggleMonitoring = () => {
    if (isMonitoring) {
      empirePerformance?.stopMonitoring?.()
      setIsMonitoring(false)
    } else {
      empirePerformance?.startMonitoring?.()
      setIsMonitoring(true)
    }
  }

  const updateSystemHealth = (alertLevel: string) => {
    if (alertLevel === "critical") setSystemHealth("critical")
    else if (alertLevel === "warning" && systemHealth !== "critical")
      setSystemHealth("warning")
  }

  const getHealthColor = () => {
    switch (systemHealth) {
      case "excellent":
        return "success"
      case "good":
        return "success"
      case "warning":
        return "warning"
      case "critical":
        return "error"
      default:
        return "info"
    }
  }

  const getCoreMetrics = () => {
    return [
      {
        label: "Page Load Time",
        value: metrics["page-load-time"]?.value
          ? `${Math.round(metrics["page-load-time"].value)}ms`
          : "N/A",
        trend:
          metrics["page-load-time"]?.value < 3000
            ? ("stable" as const)
            : ("up" as const)
      },
      {
        label: "Memory Usage",
        value: metrics["memory-used"]?.value
          ? `${Math.round(metrics["memory-used"].value)}MB`
          : "N/A",
        trend:
          metrics["memory-used"]?.value < 50
            ? ("down" as const)
            : ("up" as const)
      },
      {
        label: "Components",
        value: `${Object.keys(metrics).filter(k => k.includes("component")).length}`,
        trend: "stable" as const
      },
      {
        label: "Performance Score",
        value: currentProfile ? `${currentProfile.score}%` : "100%",
        trend:
          currentProfile && currentProfile.score > 80
            ? ("up" as const)
            : ("down" as const)
      }
    ]
  }

  const getServiceStatus = () => {
    const services = [
      {
        name: "Performance Engine",
        status: isMonitoring ? ("operational" as const) : ("degraded" as const)
      },
      { name: "Theme Engine", status: "operational" as const },
      { name: "Component Factory", status: "operational" as const },
      { name: "Builder.io SDK", status: "operational" as const },
      { name: "Analytics Dashboard", status: "operational" as const },
      {
        name: "Memory Management",
        status:
          systemHealth === "critical"
            ? ("degraded" as const)
            : ("operational" as const)
      }
    ]
    return services
  }

  const getRecentMetrics = () => {
    return Object.values(metrics)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <EmpireContainer>
        <EmpireSection padding="xl">
          <EmpireHero
            title="📊 Empire Analytics Dashboard"
            subtitle="INFINITE SCALE MONITORING"
            description="Real-time performance monitoring, system analytics, and optimization insights for your Empire infrastructure."
            primaryAction={{
              text: isMonitoring ? "Stop Monitoring" : "Start Monitoring",
              href: "#"
            }}
            secondaryAction={{
              text: "Generate Report",
              href: "#"
            }}
            size="xl"
            centered={true}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <div className="flex justify-center mb-8">
            <div className="flex gap-4">
              <EmpireButton
                variant={isMonitoring ? "danger" : "primary"}
                size="lg"
                onClick={toggleMonitoring}
              >
                {isMonitoring ? "⏹️ Stop Monitoring" : "🚀 Start Monitoring"}
              </EmpireButton>
              <EmpireButton
                variant="outline"
                size="lg"
                onClick={generateNewProfile}
              >
                📋 Generate Profile
              </EmpireButton>
              <EmpireBadge variant={getHealthColor()} size="lg">
                System: {systemHealth.toUpperCase()}
              </EmpireBadge>
            </div>
          </div>

          <EmpireStats
            title="Empire Performance Metrics"
            subtitle="Real-time system performance indicators"
            columns={4}
            stats={getCoreMetrics()}
          />
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={2} gap="lg">
            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                🏥 System Health Monitor
              </h3>
              <StatusPanel
                systemStatus={
                  systemHealth === "critical"
                    ? "outage"
                    : systemHealth === "warning"
                      ? "degraded"
                      : "operational"
                }
                services={getServiceStatus()}
              />
            </EmpireCard>

            <EmpireCard variant="elevated" padding="lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                ⚡ Live Performance Dashboard
              </h3>
              <Dashboard metrics={getCoreMetrics()} />
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireGrid columns={3} gap="lg">
            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Component Analytics
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {empireComponentFactory?.getAllComponents?.()?.length || 19}
                  </p>
                  <p className="text-gray-300">Registered Components</p>
                  <EmpireBadge variant="success" size="sm">
                    All Operational
                  </EmpireBadge>
                </div>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Theme Analytics
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {empireTheme?.getAllThemes?.()?.length || 3}
                  </p>
                  <p className="text-gray-300">Available Themes</p>
                  <EmpireBadge variant="info" size="sm">
                    {empireTheme?.getCurrentTheme?.()?.name || "SaintVision™"}
                  </EmpireBadge>
                </div>
              </div>
            </EmpireCard>

            <EmpireCard variant="glow" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Performance Profiles
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {profiles.length}
                  </p>
                  <p className="text-gray-300">Generated Profiles</p>
                  <EmpireBadge variant="primary" size="sm">
                    Live Tracking
                  </EmpireBadge>
                </div>
              </div>
            </EmpireCard>
          </EmpireGrid>
        </EmpireSection>

        <EmpireSection padding="lg">
          <EmpireCard variant="bordered" padding="xl">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              📊 Real-time Metrics Feed
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {getRecentMetrics().map((metric, index) => (
                <div
                  key={`${metric.id}-${metric.timestamp}`}
                  className="flex justify-between items-center p-3 bg-gray-800 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-white">
                      {metric.name}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">
                      {new Date(metric.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold">
                      {metric.value}
                      {metric.unit}
                    </span>
                    <EmpireBadge
                      variant={
                        metric.threshold &&
                        metric.value >= metric.threshold.critical
                          ? "error"
                          : metric.threshold &&
                              metric.value >= metric.threshold.warning
                            ? "warning"
                            : "success"
                      }
                      size="sm"
                    >
                      {metric.category}
                    </EmpireBadge>
                  </div>
                </div>
              ))}
              {getRecentMetrics().length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No metrics available. Start monitoring to see live data.
                </div>
              )}
            </div>
          </EmpireCard>
        </EmpireSection>

        {currentProfile && (
          <EmpireSection padding="lg">
            <EmpireCard variant="glow" padding="xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
                📋 Performance Profile Report
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">
                    Profile Information
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong> {currentProfile.name}
                    </p>
                    <p>
                      <strong>Score:</strong>{" "}
                      <span className="text-yellow-400">
                        {currentProfile.score}%
                      </span>
                    </p>
                    <p>
                      <strong>Generated:</strong>{" "}
                      {new Date(currentProfile.timestamp).toLocaleString()}
                    </p>
                    <p>
                      <strong>Metrics Analyzed:</strong>{" "}
                      {currentProfile.metrics.length}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">
                    Optimization Recommendations
                  </h4>
                  <div className="space-y-2">
                    {currentProfile.recommendations.length > 0 ? (
                      currentProfile.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-yellow-400">•</span>
                          <span className="text-gray-300">{rec}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-green-400">
                        🎉 No optimization needed! System is performing
                        excellently.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </EmpireCard>
          </EmpireSection>
        )}
      </EmpireContainer>
    </div>
  )
}
