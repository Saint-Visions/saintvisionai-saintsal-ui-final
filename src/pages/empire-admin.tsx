import React, { useState } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireBadge,
  EmpireGrid,
  EmpireSection,
  EmpireInput,
  EmpireContainer
} from "../components"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "super_admin" | "admin" | "user"
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  permissions: string[]
}

interface SystemSetting {
  id: string
  category: string
  name: string
  value: string
  type: "text" | "boolean" | "number" | "select"
  description: string
  options?: string[]
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  status: "success" | "failed" | "warning"
}

export default function EmpireAdmin() {
  const [activeTab, setActiveTab] = useState("users")
  const [searchTerm, setSearchTerm] = useState("")

  const adminUsers: AdminUser[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@saintsal.com",
      role: "super_admin",
      status: "active",
      lastLogin: "2024-01-15 10:30",
      permissions: [
        "system_config",
        "user_management",
        "data_access",
        "deployment"
      ]
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@saintsal.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 09:15",
      permissions: ["user_management", "content_edit", "analytics"]
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@saintsal.com",
      role: "user",
      status: "suspended",
      lastLogin: "2024-01-12 14:20",
      permissions: ["content_view"]
    }
  ]

  const systemSettings: SystemSetting[] = [
    {
      id: "1",
      category: "Performance",
      name: "Max API Requests/Min",
      value: "1000",
      type: "number",
      description: "Maximum API requests per minute per user"
    },
    {
      id: "2",
      category: "Security",
      name: "Enable 2FA",
      value: "true",
      type: "boolean",
      description: "Require two-factor authentication for admin users"
    },
    {
      id: "3",
      category: "AI",
      name: "AI Model Version",
      value: "v2.1.3",
      type: "select",
      description: "Active AI model version",
      options: ["v2.1.3", "v2.1.2", "v2.0.9"]
    },
    {
      id: "4",
      category: "Builder",
      name: "Builder.io API Key",
      value: "pk_xxx...xxx",
      type: "text",
      description: "Builder.io public API key"
    }
  ]

  const auditLogs: AuditLog[] = [
    {
      id: "1",
      timestamp: "2024-01-15 10:45:23",
      user: "john@saintsal.com",
      action: "USER_UPDATE",
      resource: "User: jane@saintsal.com",
      status: "success"
    },
    {
      id: "2",
      timestamp: "2024-01-15 10:30:15",
      user: "jane@saintsal.com",
      action: "SYSTEM_CONFIG",
      resource: "AI Model Update",
      status: "success"
    },
    {
      id: "3",
      timestamp: "2024-01-15 09:22:44",
      user: "mike@saintsal.com",
      action: "LOGIN_ATTEMPT",
      resource: "Admin Console",
      status: "failed"
    },
    {
      id: "4",
      timestamp: "2024-01-15 08:15:33",
      user: "system",
      action: "BACKUP_CREATED",
      resource: "Database Backup",
      status: "success"
    }
  ]

  const tabs = [
    { id: "users", label: "User Management", icon: "����" },
    { id: "settings", label: "System Settings", icon: "⚙️" },
    { id: "logs", label: "Audit Logs", icon: "📋" },
    { id: "deployment", label: "Deployment", icon: "🚀" },
    { id: "security", label: "Security", icon: "🔒" }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "error"
      case "admin":
        return "warning"
      default:
        return "info"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "suspended":
        return "error"
      default:
        return "secondary"
    }
  }

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400"
      case "failed":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} action for user ${userId}`)
    // Implement user management actions
  }

  const handleSettingUpdate = (settingId: string, newValue: string) => {
    console.log(`Update setting ${settingId} to ${newValue}`)
    // Implement setting updates
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <EmpireContainer size="full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-red-400 mb-4">
                🔱 EMPIRE <span className="text-yellow-400">ADMIN</span>
              </h1>
              <p className="text-xl text-gray-300">
                Super admin console • System management • Full control access
              </p>
            </div>
            <div className="text-center">
              <EmpireBadge variant="error" size="lg">
                ⚡ SUPER ADMIN
              </EmpireBadge>
              <p className="text-xs text-red-400 mt-2">
                UNLIMITED ACCESS GRANTED
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "users" && (
          <EmpireSection padding="lg" background="none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-white">
                User <span className="text-yellow-400">Management</span>
              </h2>
              <div className="flex items-center space-x-4">
                <EmpireInput
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <EmpireButton variant="primary">👤 Add User</EmpireButton>
              </div>
            </div>

            <EmpireCard variant="bordered" padding="lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-bold">
                        User
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-bold">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-bold">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-bold">
                        Last Login
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map(user => (
                      <tr key={user.id} className="border-b border-gray-800">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-bold text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <EmpireBadge
                            variant={getRoleColor(user.role) as any}
                            size="sm"
                          >
                            {user.role.replace("_", " ").toUpperCase()}
                          </EmpireBadge>
                        </td>
                        <td className="py-4 px-4">
                          <EmpireBadge
                            variant={getStatusColor(user.status) as any}
                            size="sm"
                          >
                            {user.status.toUpperCase()}
                          </EmpireBadge>
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {user.lastLogin}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <EmpireButton
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction(user.id, "edit")}
                            >
                              Edit
                            </EmpireButton>
                            <EmpireButton
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                handleUserAction(user.id, "suspend")
                              }
                            >
                              Suspend
                            </EmpireButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </EmpireCard>
          </EmpireSection>
        )}

        {activeTab === "settings" && (
          <EmpireSection padding="lg" background="none">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">
                System <span className="text-yellow-400">Settings</span>
              </h2>
              <p className="text-gray-400">
                Configure core system parameters and features
              </p>
            </div>

            <EmpireGrid columns={1} gap="lg">
              {systemSettings.map(setting => (
                <EmpireCard
                  key={setting.id}
                  variant="bordered"
                  padding="lg"
                  hoverable
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {setting.name}
                        </h3>
                        <EmpireBadge variant="info" size="sm">
                          {setting.category}
                        </EmpireBadge>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {setting.description}
                      </p>
                    </div>
                    <div className="w-64">
                      {setting.type === "boolean" ? (
                        <select
                          value={setting.value}
                          onChange={e =>
                            handleSettingUpdate(setting.id, e.target.value)
                          }
                          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2"
                        >
                          <option value="true">Enabled</option>
                          <option value="false">Disabled</option>
                        </select>
                      ) : setting.type === "select" ? (
                        <select
                          value={setting.value}
                          onChange={e =>
                            handleSettingUpdate(setting.id, e.target.value)
                          }
                          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2"
                        >
                          {setting.options?.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <EmpireInput
                          type={setting.type}
                          value={setting.value}
                          onChange={e =>
                            handleSettingUpdate(setting.id, e.target.value)
                          }
                          className="w-full"
                        />
                      )}
                    </div>
                  </div>
                </EmpireCard>
              ))}
            </EmpireGrid>
          </EmpireSection>
        )}

        {activeTab === "logs" && (
          <EmpireSection padding="lg" background="none">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">
                Audit <span className="text-yellow-400">Logs</span>
              </h2>
              <p className="text-gray-400">
                System activity tracking and security monitoring
              </p>
            </div>

            <EmpireCard variant="bordered" padding="lg">
              <div className="space-y-4">
                {auditLogs.map(log => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-bold text-white">
                          {log.action}
                        </span>
                        <span
                          className={`text-sm font-bold ${getLogStatusColor(log.status)}`}
                        >
                          {log.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {log.resource} • {log.user}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-300">
                        {log.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </EmpireCard>
          </EmpireSection>
        )}

        {activeTab === "deployment" && (
          <EmpireSection padding="lg" background="none">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">
                Deployment <span className="text-yellow-400">Control</span>
              </h2>
              <p className="text-gray-400">
                System deployment and infrastructure management
              </p>
            </div>

            <EmpireGrid columns={2} gap="lg">
              <EmpireCard variant="glow" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Deploy Update
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Deploy latest system updates and patches
                  </p>
                  <EmpireButton variant="primary" size="lg" fullWidth>
                    🚀 Deploy Now
                  </EmpireButton>
                </div>
              </EmpireCard>

              <EmpireCard variant="bordered" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔄</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    System Restart
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Restart core system services
                  </p>
                  <EmpireButton variant="secondary" size="lg" fullWidth>
                    🔄 Restart Services
                  </EmpireButton>
                </div>
              </EmpireCard>

              <EmpireCard variant="bordered" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">💾</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Create Backup
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Create full system backup
                  </p>
                  <EmpireButton variant="outline" size="lg" fullWidth>
                    💾 Backup System
                  </EmpireButton>
                </div>
              </EmpireCard>

              <EmpireCard variant="bordered" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Maintenance Mode
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Enable system maintenance mode
                  </p>
                  <EmpireButton variant="outline" size="lg" fullWidth>
                    🔧 Maintenance
                  </EmpireButton>
                </div>
              </EmpireCard>
            </EmpireGrid>
          </EmpireSection>
        )}

        {activeTab === "security" && (
          <EmpireSection padding="lg" background="none">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">
                Security <span className="text-yellow-400">Center</span>
              </h2>
              <p className="text-gray-400">
                Security monitoring and threat management
              </p>
            </div>

            <EmpireGrid columns={3} gap="lg">
              <EmpireCard variant="bordered" padding="lg">
                <div className="text-center">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h3 className="font-bold text-white mb-2">Security Score</h3>
                  <div className="text-2xl font-black text-green-400">
                    98.7%
                  </div>
                  <div className="text-sm text-gray-400">Excellent</div>
                </div>
              </EmpireCard>

              <EmpireCard variant="bordered" padding="lg">
                <div className="text-center">
                  <div className="text-3xl mb-3">🔒</div>
                  <h3 className="font-bold text-white mb-2">Active Sessions</h3>
                  <div className="text-2xl font-black text-yellow-400">247</div>
                  <div className="text-sm text-gray-400">Current users</div>
                </div>
              </EmpireCard>

              <EmpireCard variant="bordered" padding="lg">
                <div className="text-center">
                  <div className="text-3xl mb-3">⚠️</div>
                  <h3 className="font-bold text-white mb-2">Threats Blocked</h3>
                  <div className="text-2xl font-black text-red-400">12</div>
                  <div className="text-sm text-gray-400">Last 24h</div>
                </div>
              </EmpireCard>
            </EmpireGrid>
          </EmpireSection>
        )}
      </EmpireContainer>
    </div>
  )
}
