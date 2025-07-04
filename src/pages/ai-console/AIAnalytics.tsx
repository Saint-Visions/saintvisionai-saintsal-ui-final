import React, { useState } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireGrid,
  EmpireSection,
  EmpireStats,
  EmpireContainer,
  ConsoleLayout,
  Dashboard,
  StatusPanel
} from "../../components/index"

interface AIMetric {
  name: string
  value: number
  unit: string
  change: number
  status: "up" | "down" | "stable"
  color: string
}

interface PerformanceData {
  timestamp: string
  saintvision: number
  empire: number
}

export default function AIAnalytics() {
  const [timeRange, setTimeRange] = useState("24h")
  const [selectedAI, setSelectedAI] = useState<
    "both" | "saintvision" | "empire"
  >("both")

  const overallStats = [
    {
      value: "97.3%",
      label: "Combined Accuracy",
      description: "Weighted average"
    },
    { value: "156ms", label: "Avg Response", description: "P95 latency" },
    { value: "28.4K", label: "Requests Today", description: "Active queries" },
    { value: "99.9%", label: "Uptime", description: "Last 30 days" }
  ]

  const aiMetrics: Record<string, AIMetric[]> = {
    saintvision: [
      {
        name: "Strategic Accuracy",
        value: 97.3,
        unit: "%",
        change: 2.1,
        status: "up",
        color: "blue"
      },
      {
        name: "Analysis Speed",
        value: 142,
        unit: "ms",
        change: -8,
        status: "down",
        color: "green"
      },
      {
        name: "Market Predictions",
        value: 89.7,
        unit: "%",
        change: 1.5,
        status: "up",
        color: "purple"
      },
      {
        name: "Intelligence Score",
        value: 94.2,
        unit: "/100",
        change: 0.8,
        status: "up",
        color: "yellow"
      }
    ],
    empire: [
      {
        name: "Deployment Success",
        value: 98.9,
        unit: "%",
        change: 1.2,
        status: "up",
        color: "green"
      },
      {
        name: "System Response",
        value: 89,
        unit: "ms",
        change: -12,
        status: "down",
        color: "blue"
      },
      {
        name: "Resource Efficiency",
        value: 92.4,
        unit: "%",
        change: 3.1,
        status: "up",
        color: "yellow"
      },
      {
        name: "Operation Score",
        value: 96.7,
        unit: "/100",
        change: 2.3,
        status: "up",
        color: "purple"
      }
    ]
  }

  const recentActivities = [
    {
      time: "2 min ago",
      ai: "SaintVision",
      action: "Market analysis completed",
      status: "success"
    },
    {
      time: "5 min ago",
      ai: "Empire",
      action: "Deployment pipeline executed",
      status: "success"
    },
    {
      time: "8 min ago",
      ai: "SaintVision",
      action: "Competitive intelligence gathered",
      status: "success"
    },
    {
      time: "12 min ago",
      ai: "Empire",
      action: "System optimization applied",
      status: "success"
    },
    {
      time: "15 min ago",
      ai: "SaintVision",
      action: "Strategic forecast generated",
      status: "success"
    },
    {
      time: "18 min ago",
      ai: "Empire",
      action: "Resource allocation optimized",
      status: "success"
    }
  ]

  const performanceData: PerformanceData[] = [
    { timestamp: "00:00", saintvision: 95, empire: 93 },
    { timestamp: "04:00", saintvision: 97, empire: 95 },
    { timestamp: "08:00", saintvision: 96, empire: 97 },
    { timestamp: "12:00", saintvision: 98, empire: 96 },
    { timestamp: "16:00", saintvision: 97, empire: 98 },
    { timestamp: "20:00", saintvision: 97, empire: 97 },
    { timestamp: "24:00", saintvision: 98, empire: 96 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return "↗️"
      case "down":
        return "↘️"
      default:
        return "➡️"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          AI <span className="text-yellow-400">ANALYTICS</span>
        </h1>
        <p className="text-xl text-gray-300">
          Real-time performance monitoring • Intelligence metrics • System
          analytics
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex gap-2">
          <EmpireButton
            variant={timeRange === "1h" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeRange("1h")}
          >
            1H
          </EmpireButton>
          <EmpireButton
            variant={timeRange === "24h" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeRange("24h")}
          >
            24H
          </EmpireButton>
          <EmpireButton
            variant={timeRange === "7d" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            7D
          </EmpireButton>
          <EmpireButton
            variant={timeRange === "30d" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            30D
          </EmpireButton>
        </div>

        <div className="flex gap-2">
          <EmpireButton
            variant={selectedAI === "both" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedAI("both")}
          >
            Both AIs
          </EmpireButton>
          <EmpireButton
            variant={selectedAI === "saintvision" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedAI("saintvision")}
          >
            SaintVision
          </EmpireButton>
          <EmpireButton
            variant={selectedAI === "empire" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedAI("empire")}
          >
            Empire
          </EmpireButton>
        </div>
      </div>

      {/* Overall Stats */}
      <EmpireStats stats={overallStats} columns={4} centered={false} />

      {/* Performance Metrics */}
      <EmpireSection padding="lg" background="none">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            Performance <span className="text-yellow-400">Metrics</span>
          </h2>
        </div>

        {selectedAI !== "both" ? (
          <EmpireGrid columns={4} gap="lg">
            {aiMetrics[selectedAI].map(metric => (
              <EmpireCard key={metric.name} variant="bordered" padding="lg">
                <div className="text-center">
                  <div
                    className={`text-3xl font-black text-${metric.color}-400 mb-2`}
                  >
                    {metric.value}
                    {metric.unit}
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">
                    {metric.name}
                  </div>
                  <div
                    className={`flex items-center justify-center text-sm ${getStatusColor(metric.status)}`}
                  >
                    <span className="mr-1">{getStatusIcon(metric.status)}</span>
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}
                  </div>
                </div>
              </EmpireCard>
            ))}
          </EmpireGrid>
        ) : (
          <EmpireGrid columns={2} gap="lg">
            {Object.entries(aiMetrics).map(([aiName, metrics]) => (
              <EmpireCard key={aiName} variant="glow" padding="lg">
                <h3 className="text-2xl font-bold text-white mb-6 text-center capitalize">
                  {aiName === "saintvision" ? "SaintVision AI" : "Empire AI"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map(metric => (
                    <div
                      key={metric.name}
                      className="text-center p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div
                        className={`text-xl font-bold text-${metric.color}-400`}
                      >
                        {metric.value}
                        {metric.unit}
                      </div>
                      <div className="text-sm text-gray-300 mb-1">
                        {metric.name}
                      </div>
                      <div
                        className={`text-xs ${getStatusColor(metric.status)}`}
                      >
                        {getStatusIcon(metric.status)}{" "}
                        {metric.change > 0 ? "+" : ""}
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </EmpireCard>
            ))}
          </EmpireGrid>
        )}
      </EmpireSection>

      {/* Performance Chart Placeholder */}
      <EmpireSection padding="lg" background="secondary">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            Performance <span className="text-yellow-400">Trends</span>
          </h2>
        </div>

        <EmpireCard variant="bordered" padding="lg">
          <div className="h-64 flex items-center justify-center bg-gray-800/30 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <div className="text-xl font-bold text-white mb-2">
                Performance Chart
              </div>
              <div className="text-gray-400">
                Real-time performance visualization
              </div>
              <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm">
                {performanceData.map((data, index) => (
                  <div key={index} className="bg-gray-700/50 p-2 rounded">
                    <div className="text-blue-400 font-bold">
                      {data.saintvision}%
                    </div>
                    <div className="text-yellow-400 font-bold">
                      {data.empire}%
                    </div>
                    <div className="text-gray-400 text-xs">
                      {data.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EmpireCard>
      </EmpireSection>

      {/* Recent Activity */}
      <EmpireSection padding="lg" background="gradient">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            Recent <span className="text-yellow-400">Activity</span>
          </h2>
        </div>

        <EmpireCard variant="bordered" padding="lg">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {activity.ai === "SaintVision" ? "🧠" : "⚡"}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {activity.action}
                    </div>
                    <div className="text-sm text-gray-400">
                      {activity.ai} AI • {activity.time}
                    </div>
                  </div>
                </div>
                <EmpireBadge variant="success" size="sm">
                  {activity.status}
                </EmpireBadge>
              </div>
            ))}
          </div>
        </EmpireCard>
      </EmpireSection>

      {/* Export Options */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Export Analytics</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <EmpireButton variant="outline" size="lg">
            📊 Export CSV
          </EmpireButton>
          <EmpireButton variant="outline" size="lg">
            📋 Generate Report
          </EmpireButton>
          <EmpireButton variant="outline" size="lg">
            📈 Performance PDF
          </EmpireButton>
          <EmpireButton variant="primary" size="lg">
            🔄 Auto-Reports
          </EmpireButton>
        </div>
      </div>
    </div>
  )
}
