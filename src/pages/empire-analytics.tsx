import React, { useState } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireGrid,
  EmpireSection,
  EmpireStats,
  EmpireContainer,
  PreferenceDropdown
} from "../components"

interface AnalyticsMetric {
  label: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
  period: string
}

interface ChartData {
  name: string
  value: number
  change: number
}

export default function EmpireAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("performance")

  const timeframeOptions = [
    { value: "1d", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" }
  ]

  const metricOptions = [
    { value: "performance", label: "Performance Metrics" },
    { value: "usage", label: "Usage Analytics" },
    { value: "errors", label: "Error Analysis" },
    { value: "users", label: "User Behavior" }
  ]

  const overviewStats = [
    {
      value: "98.7%",
      label: "System Performance",
      description: "Average performance score"
    },
    {
      value: "156ms",
      label: "Response Time",
      description: "Average API response time"
    },
    {
      value: "99.9%",
      label: "Uptime",
      description: "System availability"
    },
    {
      value: "2.4M",
      label: "Requests",
      description: "Total API requests"
    }
  ]

  const analyticsMetrics: AnalyticsMetric[] = [
    {
      label: "AI Processing Speed",
      value: "847ms",
      change: -12,
      trend: "down",
      period: "vs last week"
    },
    {
      label: "User Engagement",
      value: "94.2%",
      change: 8,
      trend: "up",
      period: "vs last month"
    },
    {
      label: "Error Rate",
      value: "0.03%",
      change: -0.01,
      trend: "down",
      period: "vs last week"
    },
    {
      label: "Component Usage",
      value: "15.7K",
      change: 23,
      trend: "up",
      period: "vs last month"
    },
    {
      label: "Builder.io Integration",
      value: "99.1%",
      change: 2,
      trend: "up",
      period: "success rate"
    },
    {
      label: "Memory Usage",
      value: "67.3%",
      change: -5,
      trend: "down",
      period: "vs last week"
    }
  ]

  const topComponents: ChartData[] = [
    { name: "EmpireButton", value: 3420, change: 12 },
    { name: "EmpireCard", value: 2890, change: 8 },
    { name: "EmpireGrid", value: 2156, change: -3 },
    { name: "EmpireHero", value: 1834, change: 15 },
    { name: "EmpireStats", value: 1567, change: 22 }
  ]

  const userBehavior = [
    { action: "Component Interactions", count: "45.2K", percentage: 68 },
    { action: "Page Views", count: "23.8K", percentage: 36 },
    { action: "AI Queries", count: "12.4K", percentage: 19 },
    { action: "Builder.io Sessions", count: "8.9K", percentage: 13 }
  ]

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      default:
        return "→"
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <EmpireContainer size="full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                EMPIRE <span className="text-yellow-400">ANALYTICS</span>
              </h1>
              <p className="text-xl text-gray-300">
                Performance insights • Usage analytics • Trend analysis
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <PreferenceDropdown
                options={timeframeOptions}
                value={selectedTimeframe}
                onChange={setSelectedTimeframe}
                backgroundColor="#1F2937"
                textColor="white"
                hoverColor="yellow-400"
              />
              <PreferenceDropdown
                options={metricOptions}
                value={selectedMetric}
                onChange={setSelectedMetric}
                backgroundColor="#1F2937"
                textColor="white"
                hoverColor="yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <EmpireStats stats={overviewStats} columns={4} centered={false} />

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2">
            <EmpireSection padding="lg" background="none">
              <div className="mb-6">
                <h2 className="text-3xl font-black text-white mb-2">
                  Performance <span className="text-yellow-400">Metrics</span>
                </h2>
                <p className="text-gray-400">
                  Detailed analytics and performance indicators
                </p>
              </div>

              <EmpireGrid columns={3} gap="lg">
                {analyticsMetrics.map(metric => (
                  <EmpireCard
                    key={metric.label}
                    variant="bordered"
                    padding="lg"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-3">
                        {metric.label}
                      </h3>
                      <div className="text-3xl font-black text-yellow-400 mb-3">
                        {metric.value}
                      </div>
                      <div
                        className={`flex items-center justify-center text-sm ${getTrendColor(metric.trend)}`}
                      >
                        <span className="mr-1">
                          {getTrendIcon(metric.trend)}
                        </span>
                        <span>
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {metric.period}
                      </div>
                    </div>
                  </EmpireCard>
                ))}
              </EmpireGrid>

              {/* Performance Chart */}
              <div className="mt-8">
                <EmpireCard variant="glow" padding="lg">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Performance Trends
                  </h3>
                  <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <p className="text-gray-400 mb-2">
                        Performance trend visualization
                      </p>
                      <p className="text-sm text-gray-500">
                        Interactive charts would be rendered here
                      </p>
                      <div className="mt-4 flex justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                          <span className="text-xs text-gray-400">
                            Performance
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded"></div>
                          <span className="text-xs text-gray-400">Uptime</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-400 rounded"></div>
                          <span className="text-xs text-gray-400">Usage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </EmpireCard>
              </div>
            </EmpireSection>
          </div>

          {/* Sidebar Analytics */}
          <div>
            <EmpireSection padding="lg" background="none">
              {/* Top Components */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Top <span className="text-yellow-400">Components</span>
                </h3>
                <EmpireCard variant="bordered" padding="lg">
                  <div className="space-y-4">
                    {topComponents.map((component, index) => (
                      <div
                        key={component.name}
                        className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-400 text-black rounded-lg flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {component.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {component.value.toLocaleString()} uses
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-sm font-bold ${
                            component.change > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {component.change > 0 ? "+" : ""}
                          {component.change}%
                        </div>
                      </div>
                    ))}
                  </div>
                </EmpireCard>
              </div>

              {/* User Behavior */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  User <span className="text-yellow-400">Behavior</span>
                </h3>
                <EmpireCard variant="bordered" padding="lg">
                  <div className="space-y-4">
                    {userBehavior.map(behavior => (
                      <div key={behavior.action}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">
                            {behavior.action}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {behavior.count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                            style={{ width: `${behavior.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </EmpireCard>
              </div>

              {/* Recent Alerts */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Recent <span className="text-yellow-400">Alerts</span>
                </h3>
                <EmpireCard variant="bordered" padding="lg">
                  <div className="space-y-3">
                    {[
                      {
                        type: "Performance",
                        message: "Response time improved by 15%",
                        time: "2 hours ago",
                        severity: "success"
                      },
                      {
                        type: "Usage",
                        message: "Component usage spike detected",
                        time: "4 hours ago",
                        severity: "info"
                      },
                      {
                        type: "System",
                        message: "Memory usage optimization needed",
                        time: "6 hours ago",
                        severity: "warning"
                      }
                    ].map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg"
                      >
                        <EmpireBadge variant={alert.severity as any} size="sm">
                          {alert.type}
                        </EmpireBadge>
                        <div className="flex-1">
                          <p className="text-sm text-white">{alert.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {alert.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </EmpireCard>
              </div>
            </EmpireSection>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Analytics Actions
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <EmpireButton variant="primary" size="lg">
              📊 Export Report
            </EmpireButton>
            <EmpireButton variant="outline" size="lg">
              📈 Custom Dashboard
            </EmpireButton>
            <EmpireButton variant="outline" size="lg">
              🔔 Set Alerts
            </EmpireButton>
            <EmpireButton variant="secondary" size="lg">
              ⚙️ Configure Metrics
            </EmpireButton>
          </div>
        </div>
      </EmpireContainer>
    </div>
  )
}
