import React, { useState, useEffect } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireGrid,
  EmpireSection,
  EmpireStats,
  EmpireContainer
} from "../components"

interface SystemMetric {
  name: string
  value: string
  status: "online" | "warning" | "offline"
  uptime: string
  lastUpdated: string
}

interface LiveEvent {
  id: string
  timestamp: string
  type: "deployment" | "alert" | "update" | "user_action"
  message: string
  severity: "info" | "warning" | "error" | "success"
}

export default function EmpireLive() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      name: "Empire Core",
      value: "98.7%",
      status: "online",
      uptime: "99.9%",
      lastUpdated: "2024-01-15 10:30:45"
    },
    {
      name: "AI Engine",
      value: "97.2%",
      status: "online",
      uptime: "99.8%",
      lastUpdated: "2024-01-15 10:30:44"
    },
    {
      name: "Builder.io SDK",
      value: "99.1%",
      status: "online",
      uptime: "99.9%",
      lastUpdated: "2024-01-15 10:30:43"
    },
    {
      name: "Database",
      value: "96.8%",
      status: "warning",
      uptime: "99.5%",
      lastUpdated: "2024-01-15 10:30:42"
    }
  ])

  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([
    {
      id: "1",
      timestamp: "10:30:45",
      type: "update",
      message: "AI Engine performance optimization completed",
      severity: "success"
    },
    {
      id: "2",
      timestamp: "10:28:12",
      type: "user_action",
      message: "New deployment initiated by admin user",
      severity: "info"
    },
    {
      id: "3",
      timestamp: "10:25:33",
      message: "Database connection pool optimization in progress",
      type: "alert",
      severity: "warning"
    },
    {
      id: "4",
      timestamp: "10:22:15",
      type: "deployment",
      message: "Component library v2.1.3 deployed successfully",
      severity: "success"
    }
  ])

  const [stats] = useState([
    {
      value: "15,342",
      label: "Active Sessions",
      description: "Current user sessions"
    },
    {
      value: "99.8%",
      label: "System Uptime",
      description: "Last 30 days"
    },
    {
      value: "2.3TB",
      label: "Data Processed",
      description: "Today"
    },
    {
      value: "156ms",
      label: "Avg Response",
      description: "Global average"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "offline":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      case "info":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "deployment":
        return "🚀"
      case "alert":
        return "⚠️"
      case "update":
        return "🔄"
      case "user_action":
        return "👤"
      default:
        return "📋"
    }
  }

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update timestamps and add new events occasionally
      if (Math.random() > 0.8) {
        const newEvent: LiveEvent = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          type: ["deployment", "alert", "update", "user_action"][
            Math.floor(Math.random() * 4)
          ] as any,
          message: [
            "System health check completed",
            "New user registration",
            "Cache optimization running",
            "Backup process initiated"
          ][Math.floor(Math.random() * 4)],
          severity: ["info", "success", "warning"][
            Math.floor(Math.random() * 3)
          ] as any
        }

        setLiveEvents(prev => [newEvent, ...prev.slice(0, 9)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black p-6">
      <EmpireContainer size="full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                EMPIRE <span className="text-yellow-400">LIVE</span>
              </h1>
              <p className="text-xl text-gray-300">
                Real-time system monitoring • Live performance metrics • Instant
                alerts
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold">LIVE</span>
              </div>
              <EmpireButton variant="outline" size="sm">
                🔄 Refresh
              </EmpireButton>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        <EmpireStats stats={stats} columns={4} centered={false} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* System Metrics */}
          <div className="lg:col-span-2">
            <EmpireSection padding="lg" background="none">
              <div className="mb-6">
                <h2 className="text-3xl font-black text-white mb-2">
                  System <span className="text-yellow-400">Metrics</span>
                </h2>
                <p className="text-gray-400">
                  Real-time performance monitoring
                </p>
              </div>

              <EmpireGrid columns={2} gap="lg">
                {systemMetrics.map(metric => (
                  <EmpireCard key={metric.name} variant="bordered" padding="lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {metric.name}
                      </h3>
                      <EmpireBadge
                        variant={
                          metric.status === "online"
                            ? "success"
                            : metric.status === "warning"
                              ? "warning"
                              : "error"
                        }
                        size="sm"
                      >
                        {metric.status.toUpperCase()}
                      </EmpireBadge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Performance</span>
                          <span
                            className={`text-xl font-bold ${getStatusColor(metric.status)}`}
                          >
                            {metric.value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              metric.status === "online"
                                ? "bg-green-400"
                                : metric.status === "warning"
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                            }`}
                            style={{
                              width: metric.value
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Uptime</span>
                        <span className="text-green-400 font-bold">
                          {metric.uptime}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500">
                        Last updated: {metric.lastUpdated}
                      </div>
                    </div>
                  </EmpireCard>
                ))}
              </EmpireGrid>

              {/* Performance Graph Placeholder */}
              <div className="mt-8">
                <EmpireCard variant="glow" padding="lg">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Performance Trends
                  </h3>
                  <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📈</div>
                      <p className="text-gray-400">
                        Real-time performance graph
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Chart visualization would be implemented here
                      </p>
                    </div>
                  </div>
                </EmpireCard>
              </div>
            </EmpireSection>
          </div>

          {/* Live Activity Feed */}
          <div>
            <EmpireSection padding="lg" background="none">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Live <span className="text-yellow-400">Activity</span>
                </h2>
                <p className="text-gray-400">Real-time system events</p>
              </div>

              <EmpireCard variant="bordered" padding="lg">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {liveEvents.map(event => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg"
                    >
                      <div className="text-lg">{getEventIcon(event.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">
                            {event.timestamp}
                          </span>
                          <span
                            className={`text-xs font-bold ${getSeverityColor(event.severity)}`}
                          >
                            {event.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-white">{event.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </EmpireCard>

              {/* Quick Actions */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <EmpireButton variant="primary" size="sm" fullWidth>
                    🚀 Deploy Update
                  </EmpireButton>
                  <EmpireButton variant="outline" size="sm" fullWidth>
                    ⚙️ System Config
                  </EmpireButton>
                  <EmpireButton variant="secondary" size="sm" fullWidth>
                    📊 View Reports
                  </EmpireButton>
                  <EmpireButton variant="outline" size="sm" fullWidth>
                    🔧 Maintenance
                  </EmpireButton>
                </div>
              </div>

              {/* System Health */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  System Health
                </h3>
                <div className="space-y-3">
                  {[
                    { service: "API Gateway", status: "online" },
                    { service: "Load Balancer", status: "online" },
                    { service: "CDN", status: "online" },
                    { service: "Monitoring", status: "online" }
                  ].map(service => (
                    <div
                      key={service.service}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-400 text-sm">
                        {service.service}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-xs font-medium">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </EmpireSection>
          </div>
        </div>
      </EmpireContainer>
    </div>
  )
}
