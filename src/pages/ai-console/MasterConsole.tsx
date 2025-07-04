import React, { useState, useEffect } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireGrid,
  EmpireSection,
  EmpireStats,
  EmpireContainer,
  EmpireHero,
  StatusPanel,
  Dashboard,
  ConsoleLayout
} from "../../components/index"

interface AIStatus {
  name: string
  status: "online" | "offline" | "training" | "deploying"
  performance: number
  uptime: string
  requests: number
  accuracy: number
}

interface DeploymentMetric {
  label: string
  value: string
  change: number
  status: "up" | "down" | "stable"
}

export default function MasterConsole() {
  const [aiSystems, setAiSystems] = useState<AIStatus[]>([
    {
      name: "SaintVision AI",
      status: "online",
      performance: 98.7,
      uptime: "99.9%",
      requests: 15420,
      accuracy: 97.3
    },
    {
      name: "Empire AI",
      status: "online",
      performance: 96.2,
      uptime: "99.8%",
      requests: 12890,
      accuracy: 95.8
    }
  ])

  const [deploymentMetrics] = useState<DeploymentMetric[]>([
    { label: "Active Deployments", value: "8", change: 2, status: "up" },
    { label: "Server Load", value: "67%", change: -3, status: "down" },
    { label: "Response Time", value: "120ms", change: -15, status: "down" },
    { label: "Error Rate", value: "0.03%", change: -0.01, status: "down" }
  ])

  const [systemStats] = useState([
    { value: "99.9%", label: "System Uptime", description: "Last 30 days" },
    { value: "28.4K", label: "AI Requests", description: "Today" },
    { value: "156ms", label: "Avg Response", description: "Global average" },
    { value: "97.2%", label: "Accuracy", description: "Combined AI score" }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "success"
      case "offline":
        return "error"
      case "training":
        return "warning"
      case "deploying":
        return "info"
      default:
        return "secondary"
    }
  }

  const handleAIAction = (aiName: string, action: string) => {
    console.log(`${action} action triggered for ${aiName}`)
    // Add actual AI control logic here
  }

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          SAINTSAL™ <span className="text-yellow-400">DUAL-AI CONSOLE</span>
        </h1>
        <p className="text-xl text-gray-300">
          Master deployment stack • Real-time AI management • Empire control
          center
        </p>
      </div>

      {/* System Overview */}
      <EmpireStats stats={systemStats} columns={4} centered={false} />

      {/* Status Panel */}
      <EmpireSection padding="lg" background="none">
        <StatusPanel />
      </EmpireSection>

      {/* AI Systems Status */}
      <EmpireSection padding="lg" background="none">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            AI Systems <span className="text-yellow-400">Status</span>
          </h2>
        </div>

        <EmpireGrid columns={2} gap="lg">
          {aiSystems.map(ai => (
            <EmpireCard key={ai.name} variant="glow" padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{ai.name}</h3>
                <EmpireBadge
                  variant={getStatusColor(ai.status) as any}
                  size="lg"
                >
                  {ai.status.toUpperCase()}
                </EmpireBadge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">
                    {ai.performance}%
                  </div>
                  <div className="text-sm text-gray-400">Performance</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {ai.uptime}
                  </div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    {ai.requests.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Requests</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">
                    {ai.accuracy}%
                  </div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
              </div>

              <div className="flex gap-3">
                <EmpireButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleAIAction(ai.name, "monitor")}
                >
                  Monitor
                </EmpireButton>
                <EmpireButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIAction(ai.name, "configure")}
                >
                  Configure
                </EmpireButton>
                <EmpireButton
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAIAction(ai.name, "restart")}
                >
                  Restart
                </EmpireButton>
              </div>
            </EmpireCard>
          ))}
        </EmpireGrid>
      </EmpireSection>

      {/* Deployment Metrics */}
      <EmpireSection padding="lg" background="secondary">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            Deployment <span className="text-yellow-400">Metrics</span>
          </h2>
        </div>

        <EmpireGrid columns={4} gap="lg">
          {deploymentMetrics.map(metric => (
            <EmpireCard key={metric.label} variant="bordered" padding="lg">
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {metric.label}
                </div>
                <div
                  className={`flex items-center justify-center text-sm ${
                    metric.status === "up"
                      ? "text-green-400"
                      : metric.status === "down"
                        ? "text-red-400"
                        : "text-gray-400"
                  }`}
                >
                  {metric.status === "up"
                    ? "↗"
                    : metric.status === "down"
                      ? "↘"
                      : "→"}
                  <span className="ml-1">
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}
                  </span>
                </div>
              </div>
            </EmpireCard>
          ))}
        </EmpireGrid>
      </EmpireSection>

      {/* Quick Actions */}
      <EmpireSection padding="lg" background="gradient">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            Quick <span className="text-yellow-400">Actions</span>
          </h2>
        </div>

        <EmpireGrid columns={3} gap="lg">
          <EmpireCard variant="bordered" padding="lg" hoverable>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Deploy Update
              </h3>
              <p className="text-gray-400 mb-4">Push latest AI model updates</p>
              <EmpireButton variant="primary" fullWidth>
                Deploy Now
              </EmpireButton>
            </div>
          </EmpireCard>

          <EmpireCard variant="bordered" padding="lg" hoverable>
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-white mb-2">
                System Config
              </h3>
              <p className="text-gray-400 mb-4">Manage AI system settings</p>
              <EmpireButton variant="outline" fullWidth>
                Configure
              </EmpireButton>
            </div>
          </EmpireCard>

          <EmpireCard variant="bordered" padding="lg" hoverable>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
              <p className="text-gray-400 mb-4">View detailed AI analytics</p>
              <EmpireButton variant="secondary" fullWidth>
                View Reports
              </EmpireButton>
            </div>
          </EmpireCard>
        </EmpireGrid>
      </EmpireSection>

      {/* Console Navigation */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Console Modules</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <EmpireButton variant="primary" size="lg" href="/console/dual-chat">
            Dual-AI Chat
          </EmpireButton>
          <EmpireButton variant="outline" size="lg" href="/console/deployment">
            Deployment Manager
          </EmpireButton>
          <EmpireButton variant="outline" size="lg" href="/console/analytics">
            AI Analytics
          </EmpireButton>
          <EmpireButton variant="outline" size="lg" href="/console/settings">
            Console Settings
          </EmpireButton>
        </div>
      </div>
    </div>
  )
}
