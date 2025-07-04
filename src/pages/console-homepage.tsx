import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireGrid,
  EmpireContainer,
  EmpireSection,
  EmpireHero,
  EmpireStats,
  StatusPanel,
  Dashboard,
  PreferenceDropdown,
  AIModelPreference
} from "../components"
import { crmService } from "../lib/crm-service"
import { getCurrentUser } from "../lib/supabase"

interface LiveMetric {
  label: string
  value: string
  trend: "up" | "down" | "stable"
  icon: string
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  route: string
  status: "active" | "ready" | "premium"
  aiPowered: boolean
}

export default function ConsoleHomepage() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveMetrics, setLiveMetrics] = useState<LiveMetric[]>([])
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [modelPreference, setModelPreference] =
    useState<AIModelPreference>("gpt-4")
  const [activeConnections, setActiveConnections] = useState(847)

  // Real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate real-time metric updates
      setActiveConnections(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Load user and metrics
  useEffect(() => {
    loadSystemMetrics()
    checkUserStatus()
  }, [])

  const loadSystemMetrics = async () => {
    try {
      const stats = await crmService.getCRMStats()
      setLiveMetrics([
        {
          label: "Active Users",
          value: activeConnections.toString(),
          trend: "up",
          icon: "👥"
        },
        {
          label: "AI Queries/min",
          value: "127",
          trend: "up",
          icon: "🧠"
        },
        {
          label: "Revenue Today",
          value: "$12.4K",
          trend: "up",
          icon: "💰"
        },
        {
          label: "System Load",
          value: "23%",
          trend: "stable",
          icon: "⚡"
        }
      ])
    } catch (error) {
      console.error("Failed to load metrics:", error)
    }
  }

  const checkUserStatus = async () => {
    try {
      const user = await getCurrentUser()
      setIsUserLoaded(!!user)
    } catch (error) {
      console.error("User check failed:", error)
    }
  }

  const quickActions: QuickAction[] = [
    {
      id: "ai-chat",
      title: "AI Command Center",
      description: "Dual-AI chat with strategic & operational intelligence",
      icon: "🤖",
      route: "/console/dual-chat",
      status: "active",
      aiPowered: true
    },
    {
      id: "crm-flow",
      title: "CRM Intelligence",
      description: "AI-powered customer relationship management",
      icon: "📊",
      route: "/crm",
      status: "active",
      aiPowered: true
    },
    {
      id: "billing-flow",
      title: "Smart Billing",
      description: "Automated payments & subscription management",
      icon: "💳",
      route: "/pricing",
      status: "ready",
      aiPowered: false
    },
    {
      id: "analytics",
      title: "AI Analytics",
      description: "Real-time performance insights & predictions",
      icon: "📈",
      route: "/console/analytics",
      status: "active",
      aiPowered: true
    },
    {
      id: "ghl-integration",
      title: "GHL Command",
      description: "GoHighLevel CRM automation & workflows",
      icon: "🔗",
      route: "/ghl",
      status: "ready",
      aiPowered: false
    },
    {
      id: "deployment",
      title: "Deploy Control",
      description: "AI-assisted deployment & infrastructure management",
      icon: "🚀",
      route: "/console/deployment",
      status: "premium",
      aiPowered: true
    }
  ]

  const handleQuickAction = (action: QuickAction) => {
    // Add AI flow initialization logic here
    if (action.aiPowered) {
      console.log(
        `Initializing AI flow for ${action.title} with ${modelPreference}`
      )
    }
    navigate(action.route)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "ready":
        return "warning"
      case "premium":
        return "info"
      default:
        return "secondary"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "📈"
      case "down":
        return "📉"
      default:
        return "➡️"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-auto">
      {/* Console Header */}
      <div className="border-b border-gold bg-[#10161C]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                SAINTSAL™ EMPIRE
              </h1>
              <p className="text-xl text-gray-300 mt-2">
                Real-Time AI Command Console •{" "}
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-2">👑</div>
              <EmpireBadge variant="success" size="lg">
                OPERATIONAL
              </EmpireBadge>
            </div>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {liveMetrics.map((metric, index) => (
              <div
                key={index}
                className="relative bg-[#10161C] text-white border border-gold rounded-xl px-6 py-4 text-center shadow-md"
              >
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">{metric.icon}</span>
                    <span className="text-lg">
                      {getTrendIcon(metric.trend)}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Model Selection */}
          <div className="relative bg-[#10161C] text-white border border-gold rounded-xl px-6 py-4 flex items-center gap-4 shadow-md">
            <span className="text-yellow-400 font-semibold">AI Model:</span>
            <PreferenceDropdown
              value={modelPreference}
              onChange={setModelPreference}
              className="w-64"
            />
            <EmpireBadge variant="info">Ready for AI flows</EmpireBadge>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white mb-4">
            AI-Powered <span className="text-yellow-400">Command Center</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Every action connects to intelligent workflows. Choose your path to
            empire dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map(action => (
            <div
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="relative bg-[#10161C] text-white border border-gold rounded-xl px-6 py-6 cursor-pointer transform hover:scale-105 transition-transform duration-200 shadow-md"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{action.icon}</div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {action.title}
                  </h3>
                  {action.aiPowered && (
                    <EmpireBadge variant="primary" size="sm">
                      AI
                    </EmpireBadge>
                  )}
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {action.description}
                </p>
                <EmpireBadge
                  variant={getStatusColor(action.status) as any}
                  size="lg"
                  className="mb-4"
                >
                  {action.status.toUpperCase()}
                </EmpireBadge>
                <div className="mt-4">
                  <EmpireButton
                    variant="primary"
                    fullWidth
                    onClick={e => {
                      e.stopPropagation()
                      handleQuickAction(action)
                    }}
                  >
                    {action.aiPowered ? "🧠 Launch AI Flow" : "⚡ Access Now"}
                  </EmpireButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Status Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white mb-6">
            System <span className="text-yellow-400">Status</span>
          </h2>
          <StatusPanel />
        </div>

        {/* Quick Chat Access */}
        <div className="relative bg-[#10161C] text-white border border-gold rounded-xl px-6 py-8 max-w-4xl mx-auto text-center shadow-md">
          <div>
            <div className="text-5xl mb-6">🧠⚡</div>
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to Command Your{" "}
              <span className="text-yellow-400">Empire</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start with AI-powered chat for strategic insights or operational
              commands. Your empire intelligence is one click away.
            </p>
            <div className="flex gap-4 justify-center">
              <EmpireButton
                variant="primary"
                size="xl"
                onClick={() => navigate("/console/dual-chat")}
              >
                🧠 Strategic AI Chat
              </EmpireButton>
              <EmpireButton
                variant="outline"
                size="xl"
                onClick={() => navigate("/chat")}
              >
                ⚡ Quick AI Command
              </EmpireButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
