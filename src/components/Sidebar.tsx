import React from "react"
import { Link } from "react-router-dom"

interface NavigationItem {
  label: string
  path: string
}

interface SidebarProps {
  navigationItems?: NavigationItem[]
  backgroundColor?: string
  textColor?: string
  hoverColor?: string
  width?: string
}

const defaultNavigationItems = [
  { label: "🏠 Command Center", path: "/" },
  { label: "🚀 AI Console", path: "/console" },
  { label: "💬 Dual-AI Chat", path: "/console/dual-chat" },
  { label: "📊 AI Analytics", path: "/console/analytics" },
  { label: "⚙️ Deployment", path: "/console/deployment" },
  { label: "🔗 GHL Integration", path: "/ghl" },
  { label: "Chat", path: "/chat" },
  { label: "Pricing", path: "/pricing" },
  { label: "CRM", path: "/crm" },
  { label: "Builder", path: "/builder" },
  { label: "🎯 Demo", path: "/empire-demo" }
]

export function Sidebar(props: SidebarProps) {
  const {
    navigationItems = defaultNavigationItems,
    backgroundColor = "#10161C",
    textColor = "white",
    hoverColor = "yellow-500",
    width = "64"
  } = props

  return (
    <aside
      className={`w-${width} h-screen text-${textColor} p-4 space-y-4`}
      style={{ backgroundColor }}
    >
      <nav className="flex flex-col space-y-2">
        {navigationItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`hover:text-${hoverColor}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
