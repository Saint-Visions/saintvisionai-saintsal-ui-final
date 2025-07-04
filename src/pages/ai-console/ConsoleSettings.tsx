import React, { useState } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireInput,
  EmpireBadge,
  EmpireGrid,
  EmpireSection,
  EmpireContainer,
  ConsoleLayout,
  IntegrationStatusNotes,
  PreferenceDropdown,
  StatusPanel
} from "../../components/index"

interface SettingsSection {
  id: string
  title: string
  description: string
  icon: string
}

export default function ConsoleSettings() {
  const [activeSection, setActiveSection] = useState("ai-config")
  const [settings, setSettings] = useState({
    aiConfig: {
      saintVisionModel: "advanced-v2.4",
      empireModel: "efficiency-v1.8",
      responseTimeout: 30,
      maxConcurrentRequests: 100,
      enableLogging: true,
      autoOptimize: true
    },
    security: {
      apiKeyRotation: 30,
      encryptionLevel: "military-grade",
      accessControl: "multi-factor",
      auditLogs: true,
      firewallEnabled: true,
      intrusionDetection: true
    },
    performance: {
      cacheSize: 1024,
      compressionLevel: 9,
      loadBalancing: "round-robin",
      autoScaling: true,
      resourceLimits: 80,
      monitoringInterval: 5
    },
    notifications: {
      emailAlerts: true,
      slackIntegration: true,
      emergencyNotifications: true,
      performanceAlerts: true,
      deploymentUpdates: true,
      systemMaintenance: true
    }
  })

  const settingsSections: SettingsSection[] = [
    {
      id: "ai-config",
      title: "AI Configuration",
      description: "Configure AI models and behavior settings",
      icon: "🤖"
    },
    {
      id: "security",
      title: "Security & Access",
      description: "Manage security protocols and access controls",
      icon: "🔒"
    },
    {
      id: "performance",
      title: "Performance",
      description: "Optimize system performance and resource usage",
      icon: "⚡"
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure alerts and notification preferences",
      icon: "🔔"
    },
    {
      id: "integrations",
      title: "Integrations",
      description: "Manage external service connections and status",
      icon: "🔗"
    }
  ]

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings)
    // Add actual save logic here
  }

  const renderAIConfig = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          SaintVision AI Model
        </label>
        <select
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
          value={settings.aiConfig.saintVisionModel}
          onChange={e =>
            handleSettingChange("aiConfig", "saintVisionModel", e.target.value)
          }
        >
          <option value="standard-v2.0">Standard v2.0</option>
          <option value="advanced-v2.4">Advanced v2.4</option>
          <option value="enterprise-v3.0">Enterprise v3.0</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Empire AI Model
        </label>
        <select
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
          value={settings.aiConfig.empireModel}
          onChange={e =>
            handleSettingChange("aiConfig", "empireModel", e.target.value)
          }
        >
          <option value="efficiency-v1.6">Efficiency v1.6</option>
          <option value="efficiency-v1.8">Efficiency v1.8</option>
          <option value="performance-v2.0">Performance v2.0</option>
        </select>
      </div>

      <EmpireGrid columns={2} gap="md">
        <EmpireInput
          label="Response Timeout (seconds)"
          type="number"
          value={settings.aiConfig.responseTimeout.toString()}
          onChange={e =>
            handleSettingChange(
              "aiConfig",
              "responseTimeout",
              parseInt(e.target.value)
            )
          }
        />
        <EmpireInput
          label="Max Concurrent Requests"
          type="number"
          value={settings.aiConfig.maxConcurrentRequests.toString()}
          onChange={e =>
            handleSettingChange(
              "aiConfig",
              "maxConcurrentRequests",
              parseInt(e.target.value)
            )
          }
        />
      </EmpireGrid>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
          <div>
            <div className="font-medium text-white">
              Enable Detailed Logging
            </div>
            <div className="text-sm text-gray-400">
              Track all AI interactions and responses
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.aiConfig.enableLogging}
            onChange={e =>
              handleSettingChange("aiConfig", "enableLogging", e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
          <div>
            <div className="font-medium text-white">Auto-Optimization</div>
            <div className="text-sm text-gray-400">
              Automatically optimize AI performance
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.aiConfig.autoOptimize}
            onChange={e =>
              handleSettingChange("aiConfig", "autoOptimize", e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          API Key Rotation (days)
        </label>
        <EmpireInput
          type="number"
          value={settings.security.apiKeyRotation.toString()}
          onChange={e =>
            handleSettingChange(
              "security",
              "apiKeyRotation",
              parseInt(e.target.value)
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Encryption Level
        </label>
        <select
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
          value={settings.security.encryptionLevel}
          onChange={e =>
            handleSettingChange("security", "encryptionLevel", e.target.value)
          }
        >
          <option value="standard">Standard AES-256</option>
          <option value="enterprise">Enterprise Grade</option>
          <option value="military-grade">Military Grade</option>
        </select>
      </div>

      <div className="space-y-4">
        {[
          {
            key: "auditLogs",
            label: "Audit Logs",
            desc: "Maintain detailed security audit trails"
          },
          {
            key: "firewallEnabled",
            label: "Firewall Protection",
            desc: "Advanced firewall and DDoS protection"
          },
          {
            key: "intrusionDetection",
            label: "Intrusion Detection",
            desc: "Real-time threat monitoring"
          }
        ].map(item => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
          >
            <div>
              <div className="font-medium text-white">{item.label}</div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </div>
            <input
              type="checkbox"
              checked={
                settings.security[
                  item.key as keyof typeof settings.security
                ] as boolean
              }
              onChange={e =>
                handleSettingChange("security", item.key, e.target.checked)
              }
              className="w-5 h-5"
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      <EmpireGrid columns={2} gap="md">
        <EmpireInput
          label="Cache Size (MB)"
          type="number"
          value={settings.performance.cacheSize.toString()}
          onChange={e =>
            handleSettingChange(
              "performance",
              "cacheSize",
              parseInt(e.target.value)
            )
          }
        />
        <EmpireInput
          label="Resource Limit (%)"
          type="number"
          value={settings.performance.resourceLimits.toString()}
          onChange={e =>
            handleSettingChange(
              "performance",
              "resourceLimits",
              parseInt(e.target.value)
            )
          }
        />
      </EmpireGrid>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Load Balancing Strategy
        </label>
        <select
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
          value={settings.performance.loadBalancing}
          onChange={e =>
            handleSettingChange("performance", "loadBalancing", e.target.value)
          }
        >
          <option value="round-robin">Round Robin</option>
          <option value="least-connections">Least Connections</option>
          <option value="weighted">Weighted Distribution</option>
          <option value="ip-hash">IP Hash</option>
        </select>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
        <div>
          <div className="font-medium text-white">Auto-Scaling</div>
          <div className="text-sm text-gray-400">
            Automatically scale resources based on demand
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.performance.autoScaling}
          onChange={e =>
            handleSettingChange("performance", "autoScaling", e.target.checked)
          }
          className="w-5 h-5"
        />
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-4">
      {[
        {
          key: "emailAlerts",
          label: "Email Alerts",
          desc: "Receive alerts via email"
        },
        {
          key: "slackIntegration",
          label: "Slack Integration",
          desc: "Send notifications to Slack channels"
        },
        {
          key: "emergencyNotifications",
          label: "Emergency Notifications",
          desc: "Critical system alerts"
        },
        {
          key: "performanceAlerts",
          label: "Performance Alerts",
          desc: "Performance threshold notifications"
        },
        {
          key: "deploymentUpdates",
          label: "Deployment Updates",
          desc: "Deployment status notifications"
        },
        {
          key: "systemMaintenance",
          label: "Maintenance Alerts",
          desc: "Scheduled maintenance notifications"
        }
      ].map(item => (
        <div
          key={item.key}
          className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
        >
          <div>
            <div className="font-medium text-white">{item.label}</div>
            <div className="text-sm text-gray-400">{item.desc}</div>
          </div>
          <input
            type="checkbox"
            checked={
              settings.notifications[
                item.key as keyof typeof settings.notifications
              ] as boolean
            }
            onChange={e =>
              handleSettingChange("notifications", item.key, e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "ai-config":
        return renderAIConfig()
      case "security":
        return renderSecurity()
      case "performance":
        return renderPerformance()
      case "notifications":
        return renderNotifications()
      case "integrations":
        return <IntegrationStatusNotes />
      default:
        return renderAIConfig()
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          CONSOLE <span className="text-yellow-400">SETTINGS</span>
        </h1>
        <p className="text-xl text-gray-300">
          System configuration • AI parameters • Security settings
        </p>
      </div>

      <EmpireGrid columns={4} gap="lg">
        {/* Settings Navigation */}
        <div className="col-span-1">
          <EmpireCard variant="bordered" padding="md">
            <h3 className="font-bold text-white mb-4">Settings Categories</h3>
            <div className="space-y-2">
              {settingsSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    activeSection === section.id
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs opacity-80">
                        {section.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </EmpireCard>
        </div>

        {/* Settings Content */}
        <div className="col-span-3">
          <EmpireCard variant="glow" padding="lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {settingsSections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-gray-400">
                {
                  settingsSections.find(s => s.id === activeSection)
                    ?.description
                }
              </p>
            </div>

            {renderContent()}

            <div className="mt-8 flex gap-4">
              <EmpireButton
                variant="primary"
                size="lg"
                onClick={handleSaveSettings}
              >
                💾 Save Settings
              </EmpireButton>
              <EmpireButton variant="outline" size="lg">
                🔄 Reset to Default
              </EmpireButton>
              <EmpireButton variant="secondary" size="lg">
                📤 Export Config
              </EmpireButton>
            </div>
          </EmpireCard>
        </div>
      </EmpireGrid>

      {/* Status Indicators */}
      <EmpireSection padding="lg" background="secondary">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            System <span className="text-yellow-400">Status</span>
          </h2>
        </div>

        <EmpireGrid columns={4} gap="lg">
          <EmpireCard variant="bordered" padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-lg font-bold text-white mb-1">
                AI Systems
              </div>
              <EmpireBadge variant="success">Operational</EmpireBadge>
            </div>
          </EmpireCard>

          <EmpireCard variant="bordered" padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-lg font-bold text-white mb-1">Security</div>
              <EmpireBadge variant="success">Protected</EmpireBadge>
            </div>
          </EmpireCard>

          <EmpireCard variant="bordered" padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-lg font-bold text-white mb-1">
                Performance
              </div>
              <EmpireBadge variant="warning">Optimizing</EmpireBadge>
            </div>
          </EmpireCard>

          <EmpireCard variant="bordered" padding="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">🔔</div>
              <div className="text-lg font-bold text-white mb-1">
                Notifications
              </div>
              <EmpireBadge variant="success">Active</EmpireBadge>
            </div>
          </EmpireCard>
        </EmpireGrid>
      </EmpireSection>
    </div>
  )
}
