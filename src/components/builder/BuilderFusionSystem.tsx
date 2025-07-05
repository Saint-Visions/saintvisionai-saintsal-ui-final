import React, { useState, useEffect } from "react"
import { EmpireCard } from "../core/EmpireCard"
import { EmpireButton } from "../core/EmpireButton"
import { EmpireBadge } from "../core/EmpireBadge"
import { PageExecutionManager } from "./PageExecutionManager"
import { ExecutionControls } from "./ExecutionControls"
import { BuilderPageRenderer } from "./BuilderPageRenderer"
import {
  fusionEngine,
  PageExecutionResult
} from "../../lib/builder-fusion-engine"
import { initializeBuilder } from "../../lib/builder-config"

// Import to register all components
import "../../builder-registry"

interface BuilderFusionSystemProps {
  className?: string
}

export function BuilderFusionSystem({ className }: BuilderFusionSystemProps) {
  const [activeTab, setActiveTab] = useState<"control" | "execute" | "render">(
    "control"
  )
  const [selectedPageUrl, setSelectedPageUrl] = useState<string>("/")
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)
  const [systemStats, setSystemStats] = useState({
    totalPages: 0,
    successfulPages: 0,
    errorPages: 0,
    averageExecutionTime: 0
  })

  useEffect(() => {
    // Initialize Builder.io and fusion engine
    const init = async () => {
      try {
        const builderInitialized = initializeBuilder()

        if (!builderInitialized) {
          setInitError(
            "Builder.io API key not found. Please set VITE_BUILDER_API_KEY environment variable."
          )
          return
        }

        setIsInitialized(true)
        console.log("🚀 Builder Fusion System initialized successfully")

        // Subscribe to fusion engine updates
        const unsubscribe = fusionEngine.subscribe(results => {
          const stats = fusionEngine.getPerformanceStats()
          setSystemStats(stats)
        })

        return unsubscribe
      } catch (error) {
        console.error("Failed to initialize Builder Fusion System:", error)
        setInitError((error as Error).message)
      }
    }

    init()
  }, [])

  const handlePageSelect = (url: string) => {
    setSelectedPageUrl(url)
    setActiveTab("render")
  }

  const handleTestPage = async () => {
    try {
      const result = await fusionEngine.executePage(selectedPageUrl, {
        cacheBust: true
      })
      console.log("Test execution result:", result)
    } catch (error) {
      console.error("Test execution failed:", error)
    }
  }

  if (initError) {
    return (
      <div className={`min-h-screen bg-black text-white p-8 ${className}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Initialization Error
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Builder Fusion System failed to initialize
          </p>
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 mb-8">
            <p className="text-red-400">{initError}</p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-400">To fix this issue:</p>
            <ol className="text-left max-w-md mx-auto space-y-2 text-sm text-gray-300">
              <li>
                1. Get your Builder.io API key from{" "}
                <a
                  href="https://builder.io/account/space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  builder.io/account/space
                </a>
              </li>
              <li>
                2. Add it to your{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">.env</code>{" "}
                file:
              </li>
              <li className="font-mono text-xs bg-gray-900 p-2 rounded">
                VITE_BUILDER_API_KEY=your-api-key-here
              </li>
              <li>3. Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  if (!isInitialized) {
    return (
      <div className={`min-h-screen bg-black text-white p-8 ${className}`}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-300">
              Initializing Builder Fusion System...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-yellow-400 flex items-center">
                🛠️ Builder.io Fusion
                <EmpireBadge variant="success" size="sm" className="ml-3">
                  ACTIVE
                </EmpireBadge>
              </h1>
              <p className="text-gray-400 mt-1">
                Page-by-Page Execution System
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <div className="text-yellow-400 font-semibold">
                  {systemStats.totalPages} Pages Executed
                </div>
                <div className="text-gray-400">
                  {systemStats.successfulPages} Successful
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 px-6">
            {[
              {
                id: "control",
                label: "🎛️ Control Center",
                desc: "System controls and monitoring"
              },
              {
                id: "execute",
                label: "⚡ Execution Manager",
                desc: "Manage page executions"
              },
              {
                id: "render",
                label: "🖥️ Page Renderer",
                desc: "Live page rendering"
              }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-yellow-500 text-yellow-400"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-xs text-gray-500">{tab.desc}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "control" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* System Status */}
              <EmpireCard
                variant="bordered"
                padding="lg"
                className="lg:col-span-2"
              >
                <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                  📊 System Status
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {systemStats.totalPages}
                    </div>
                    <div className="text-sm text-gray-400">Total Pages</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {systemStats.successfulPages}
                    </div>
                    <div className="text-sm text-gray-400">Successful</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {systemStats.errorPages}
                    </div>
                    <div className="text-sm text-gray-400">Errors</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(systemStats.averageExecutionTime)}ms
                    </div>
                    <div className="text-sm text-gray-400">Avg Time</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <EmpireButton
                    variant="primary"
                    onClick={() => fusionEngine.discoverAndExecutePages()}
                  >
                    🔍 Auto-Discover Pages
                  </EmpireButton>

                  <EmpireButton
                    variant="outline"
                    onClick={() => setActiveTab("execute")}
                  >
                    ⚡ Manage Executions
                  </EmpireButton>
                </div>
              </EmpireCard>

              {/* Quick Actions */}
              <EmpireCard variant="bordered" padding="lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  🚀 Quick Actions
                </h3>

                <div className="space-y-3">
                  <EmpireButton
                    variant="secondary"
                    fullWidth
                    onClick={() => setActiveTab("execute")}
                  >
                    📋 View All Executions
                  </EmpireButton>

                  <EmpireButton
                    variant="outline"
                    fullWidth
                    onClick={() => setActiveTab("render")}
                  >
                    🖥️ Render Page
                  </EmpireButton>

                  <EmpireButton
                    variant="ghost"
                    fullWidth
                    onClick={() =>
                      window.open("https://builder.io/content", "_blank")
                    }
                  >
                    🌐 Open Builder.io
                  </EmpireButton>
                </div>
              </EmpireCard>
            </div>

            {/* Execution Controls */}
            <ExecutionControls onPageSelect={handlePageSelect} />
          </div>
        )}

        {activeTab === "execute" && <PageExecutionManager />}

        {activeTab === "render" && (
          <div className="space-y-6">
            {/* Page Selector */}
            <EmpireCard variant="bordered" padding="lg">
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">
                🖥️ Page Renderer
              </h2>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Page URL
                  </label>
                  <input
                    type="text"
                    value={selectedPageUrl}
                    onChange={e => setSelectedPageUrl(e.target.value)}
                    placeholder="/page-url"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-2 pt-7">
                  <EmpireButton onClick={handleTestPage} variant="outline">
                    🧪 Test
                  </EmpireButton>

                  <EmpireButton
                    onClick={() =>
                      window.open(
                        `/builder-dynamic${selectedPageUrl}`,
                        "_blank"
                      )
                    }
                    variant="secondary"
                  >
                    🔗 Open
                  </EmpireButton>
                </div>
              </div>
            </EmpireCard>

            {/* Page Renderer */}
            <BuilderPageRenderer url={selectedPageUrl} showControls={true} />
          </div>
        )}
      </div>
    </div>
  )
}
