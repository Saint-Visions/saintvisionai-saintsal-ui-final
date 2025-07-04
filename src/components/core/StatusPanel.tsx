import React from "react"
import { EmpireCard, EmpireBadge, EmpireGrid } from "../index"

export interface SystemStatus {
  overall: "operational" | "degraded" | "outage"
  uptime: string
  responseTime: number
  activeUsers: number
  lastIncident?: Date
}

export interface ServiceStatus {
  id: string
  name: string
  status: "operational" | "degraded" | "outage" | "maintenance"
  responseTime?: number
  uptime?: string
}

interface StatusPanelProps {
  systemStatus?: SystemStatus
  services?: ServiceStatus[]
  className?: string
}

export function StatusPanel({
  systemStatus,
  services,
  className = ""
}: StatusPanelProps) {
  const defaultSystemStatus: SystemStatus = {
    overall: "operational",
    uptime: "99.9%",
    responseTime: 156,
    activeUsers: 1247,
    lastIncident: new Date(Date.now() - 86400000 * 3) // 3 days ago
  }

  const defaultServices: ServiceStatus[] = [
    {
      id: "ai-chat",
      name: "AI Chat Service",
      status: "operational",
      responseTime: 142,
      uptime: "99.9%"
    },
    {
      id: "crm",
      name: "CRM System",
      status: "operational",
      responseTime: 89,
      uptime: "99.8%"
    },
    {
      id: "payments",
      name: "Payment Processing",
      status: "operational",
      responseTime: 67,
      uptime: "100%"
    },
    {
      id: "analytics",
      name: "Analytics Engine",
      status: "degraded",
      responseTime: 234,
      uptime: "97.1%"
    },
    {
      id: "deployments",
      name: "Deployment Pipeline",
      status: "operational",
      responseTime: 123,
      uptime: "99.5%"
    },
    {
      id: "auth",
      name: "Authentication",
      status: "operational",
      responseTime: 45,
      uptime: "99.9%"
    }
  ]

  const currentSystemStatus = systemStatus || defaultSystemStatus
  const currentServices = services || defaultServices

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "success"
      case "degraded":
        return "warning"
      case "outage":
        return "error"
      case "maintenance":
        return "info"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return "🟢"
      case "degraded":
        return "🟡"
      case "outage":
        return "🔴"
      case "maintenance":
        return "🔵"
      default:
        return "⚪"
    }
  }

  const operationalCount = currentServices.filter(
    s => s.status === "operational"
  ).length
  const totalServices = currentServices.length

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Status */}
      <EmpireCard variant="glow" padding="lg">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {getStatusIcon(currentSystemStatus.overall)}
          </div>
          <h2 className="text-3xl font-black text-white mb-2">System Status</h2>
          <EmpireBadge
            variant={getStatusColor(currentSystemStatus.overall) as any}
            size="lg"
          >
            {currentSystemStatus.overall.toUpperCase()}
          </EmpireBadge>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {currentSystemStatus.uptime}
              </div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {currentSystemStatus.responseTime}ms
              </div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {currentSystemStatus.activeUsers}
              </div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {operationalCount}/{totalServices}
              </div>
              <div className="text-sm text-gray-400">Services Online</div>
            </div>
          </div>
        </div>
      </EmpireCard>

      {/* Services Status */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Service Status</h3>
        <EmpireGrid columns={2} gap="md">
          {currentServices.map(service => (
            <EmpireCard key={service.id} variant="bordered" padding="md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getStatusIcon(service.status)}
                  </span>
                  <span className="font-semibold text-white">
                    {service.name}
                  </span>
                </div>
                <EmpireBadge variant={getStatusColor(service.status) as any}>
                  {service.status}
                </EmpireBadge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {service.responseTime && (
                  <div>
                    <span className="text-gray-400">Response: </span>
                    <span className="text-white">{service.responseTime}ms</span>
                  </div>
                )}
                {service.uptime && (
                  <div>
                    <span className="text-gray-400">Uptime: </span>
                    <span className="text-white">{service.uptime}</span>
                  </div>
                )}
              </div>
            </EmpireCard>
          ))}
        </EmpireGrid>
      </div>

      {/* Recent Incidents */}
      {currentSystemStatus.lastIncident && (
        <EmpireCard variant="bordered" padding="lg">
          <h3 className="text-lg font-bold text-white mb-3">
            Recent Incidents
          </h3>
          <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
            <span className="text-yellow-400">⚠️</span>
            <div>
              <div className="text-white font-medium">
                Minor service degradation resolved
              </div>
              <div className="text-sm text-gray-400">
                {currentSystemStatus.lastIncident.toLocaleDateString()} -{" "}
                Analytics service experienced brief slowdown
              </div>
            </div>
          </div>
        </EmpireCard>
      )}
    </div>
  )
}

export default StatusPanel
