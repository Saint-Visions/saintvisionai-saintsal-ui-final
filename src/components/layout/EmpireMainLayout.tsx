import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

interface NavigationItem {
  label: string
  path: string
  icon: string
  category: string
  description?: string
}

interface EmpireMainLayoutProps {
  children: React.ReactNode
}

const navigationItems: NavigationItem[] = [
  // Core Empire
  {
    label: "Empire Home",
    path: "/empire",
    icon: "🏆",
    category: "Empire Core",
    description: "Empire command center"
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "📊",
    category: "Empire Core",
    description: "Main dashboard overview"
  },
  {
    label: "Empire LIVE",
    path: "/empire-live",
    icon: "🚀",
    category: "Empire Core",
    description: "Live system monitoring"
  },

  // AI Console
  {
    label: "AI Console",
    path: "/console",
    icon: "🤖",
    category: "AI Systems",
    description: "Master AI control center"
  },
  {
    label: "Dual-AI Chat",
    path: "/console/dual-chat",
    icon: "💬",
    category: "AI Systems",
    description: "Dual AI conversation interface"
  },
  {
    label: "AI Analytics",
    path: "/console/analytics",
    icon: "📈",
    category: "AI Systems",
    description: "AI performance metrics"
  },
  {
    label: "Deployment",
    path: "/console/deployment",
    icon: "⚙️",
    category: "AI Systems",
    description: "AI deployment management"
  },

  // Business Tools
  {
    label: "CRM",
    path: "/crm",
    icon: "👥",
    category: "Business Tools",
    description: "Customer relationship management"
  },
  {
    label: "GHL Integration",
    path: "/ghl",
    icon: "🔗",
    category: "Business Tools",
    description: "GoHighLevel integration"
  },
  {
    label: "Pricing",
    path: "/pricing",
    icon: "💰",
    category: "Business Tools",
    description: "Pricing plans management"
  },

  // Empire Management
  {
    label: "Empire Showcase",
    path: "/empire-showcase",
    icon: "🎯",
    category: "Empire Management",
    description: "Component showcase"
  },
  {
    label: "Empire Analytics",
    path: "/empire-analytics",
    icon: "📊",
    category: "Empire Management",
    description: "Empire performance analytics"
  },
  {
    label: "Empire Status",
    path: "/empire-status",
    icon: "💡",
    category: "Empire Management",
    description: "System status monitoring"
  },
  {
    label: "Empire Admin",
    path: "/empire-admin",
    icon: "🔱",
    category: "Empire Management",
    description: "Empire administration"
  },

  // Content & Builder
  {
    label: "Builder.io CMS",
    path: "/builder",
    icon: "🏗️",
    category: "Content & Builder",
    description: "Visual content management"
  },
  {
    label: "Builder Demo",
    path: "/builder-demo",
    icon: "📖",
    category: "Content & Builder",
    description: "Builder.io integration demo"
  },
  {
    label: "Chat Interface",
    path: "/chat",
    icon: "💭",
    category: "Content & Builder",
    description: "Chat interface"
  }
]

export default function EmpireMainLayout({ children }: EmpireMainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const location = useLocation()

  const categories = Array.from(
    new Set(navigationItems.map(item => item.category))
  )

  const getFilteredItems = () => {
    if (!selectedCategory) return navigationItems
    return navigationItems.filter(item => item.category === selectedCategory)
  }

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    )
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-80"
        } bg-gradient-to-b from-gray-900 to-black border-r border-yellow-500/20 transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-yellow-500/20">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-black font-black text-sm">SS</span>
                </div>
                <div>
                  <div className="text-lg font-black text-yellow-400">
                    SAINTSAL™
                  </div>
                  <div className="text-xs text-gray-400 -mt-1">EMPIRE</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              {sidebarCollapsed ? "→" : "←"}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-700">
            <div className="mb-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Categories
              </h3>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !selectedCategory
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                All Sections
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {getFilteredItems().map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!sidebarCollapsed && (
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-gray-400 mt-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-2">System Status</div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400">
                  All Systems Online
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">{children}</div>
      </main>
    </div>
  )
}
