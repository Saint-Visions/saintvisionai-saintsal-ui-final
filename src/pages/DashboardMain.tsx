import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function DashboardMain() {
  const [user] = useState({
    name: "John Doe",
    email: "john@company.com",
    company: "Acme Corp",
    plan: "Pro",
    avatar: "JD"
  })

  const [stats] = useState([
    { label: "Active Projects", value: "12", change: "+8%", trend: "up" },
    { label: "Total Revenue", value: "$45,230", change: "+23%", trend: "up" },
    { label: "AI Requests", value: "1,234", change: "+12%", trend: "up" },
    { label: "Success Rate", value: "98.5%", change: "+2.1%", trend: "up" }
  ])

  const [recentActivity] = useState([
    { action: "AI Chat Session", time: "2 min ago", status: "completed" },
    { action: "New Project Created", time: "1 hour ago", status: "active" },
    { action: "Payment Processed", time: "3 hours ago", status: "completed" },
    { action: "Team Member Added", time: "1 day ago", status: "completed" }
  ])

  const [quickActions] = useState([
    {
      title: "Start AI Chat",
      description: "Begin a conversation with our AI",
      icon: "💬",
      link: "/chat",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Create Content",
      description: "Use Builder.io to create pages",
      icon: "🏗️",
      link: "/builder",
      color: "from-green-500 to-green-600"
    },
    {
      title: "View Analytics",
      description: "Check your performance metrics",
      icon: "📊",
      link: "/analytics",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Manage Team",
      description: "Add or remove team members",
      icon: "👥",
      link: "/team",
      color: "from-orange-500 to-orange-600"
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-md border-b border-yellow-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-sm">SV</span>
              </div>
              <div>
                <div className="text-lg font-black text-yellow-400">
                  SAINTSAL™
                </div>
                <div className="text-xs text-gray-400 -mt-1">EMPIRE</div>
              </div>
            </div>
            <div className="hidden md:block text-gray-400">|</div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome back, {user.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-yellow-400 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5-5-5h5V3h0z"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-white">
                  {user.name}
                </div>
                <div className="text-xs text-gray-400">{user.plan} Plan</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome back, {user.name}! 👋
                </h2>
                <p className="text-gray-300">
                  Your Empire is performing excellently. Here's what's happening
                  today.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="text-6xl opacity-20">🏆</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="flex items-center text-sm">
                <span
                  className={
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }
                >
                  {stat.trend === "up" ? "↗" : "↘"}
                </span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link} className="block group">
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all group-hover:transform group-hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-2xl`}
                      >
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Projects */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Recent Projects
              </h3>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white">Active Projects</h4>
                    <Link
                      to="/projects"
                      className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "E-commerce Platform",
                        progress: 85,
                        status: "In Progress",
                        team: 4
                      },
                      {
                        name: "Mobile App",
                        progress: 60,
                        status: "Development",
                        team: 3
                      },
                      {
                        name: "Marketing Website",
                        progress: 95,
                        status: "Review",
                        team: 2
                      }
                    ].map((project, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
                      >
                        <div>
                          <h5 className="font-medium text-white">
                            {project.name}
                          </h5>
                          <p className="text-sm text-gray-400">
                            {project.team} team members
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-yellow-400">
                            {project.progress}%
                          </div>
                          <div className="text-xs text-gray-400">
                            {project.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">
                Account Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-yellow-400 font-medium">
                    {user.plan}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Usage</span>
                  <span className="text-white">2.4GB / 10GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                    style={{ width: "24%" }}
                  ></div>
                </div>
                <Link
                  to="/upgrade"
                  className="block w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-center py-2 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all"
                >
                  Upgrade Plan
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "completed"
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/activity"
                className="block text-center text-yellow-400 hover:text-yellow-300 text-sm mt-4 transition-colors"
              >
                View All Activity →
              </Link>
            </div>

            {/* System Health */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">
                System Health
              </h3>
              <div className="space-y-3">
                {[
                  { service: "AI Engine", status: "operational" },
                  { service: "Database", status: "operational" },
                  { service: "API", status: "operational" },
                  { service: "CDN", status: "operational" }
                ].map((service, index) => (
                  <div
                    key={index}
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
          </div>
        </div>
      </div>
    </div>
  )
}
