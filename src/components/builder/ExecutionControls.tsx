import React, { useState, useEffect } from "react"
import { EmpireCard } from "../core/EmpireCard"
import { EmpireButton } from "../core/EmpireButton"
import { EmpireInput } from "../core/EmpireInput"
import { EmpireBadge } from "../core/EmpireBadge"
import { PreferenceDropdown } from "../core/PreferenceDropdown"
import {
  fusionEngine,
  PageExecutionResult,
  formatExecutionTime
} from "../../lib/builder-fusion-engine"

interface ExecutionControlsProps {
  onPageSelect?: (url: string) => void
  className?: string
}

export function ExecutionControls({
  onPageSelect,
  className
}: ExecutionControlsProps) {
  const [results, setResults] = useState<PageExecutionResult[]>([])
  const [batchUrls, setBatchUrls] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionMode, setExecutionMode] = useState<
    "single" | "batch" | "auto"
  >("single")
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number | null>(
    null
  )

  useEffect(() => {
    // Subscribe to execution results
    const unsubscribe = fusionEngine.subscribe(setResults)

    // Load initial results
    setResults(fusionEngine.getExecutionResults())

    return unsubscribe
  }, [])

  useEffect(() => {
    // Auto-refresh functionality
    if (autoRefreshInterval) {
      const interval = setInterval(() => {
        handleRefreshAll()
      }, autoRefreshInterval * 1000)

      return () => clearInterval(interval)
    }
  }, [autoRefreshInterval, results])

  const handleBatchExecution = async () => {
    if (!batchUrls.trim()) return

    const urls = batchUrls
      .split("\n")
      .map(url => url.trim())
      .filter(url => url.length > 0)

    if (urls.length === 0) return

    setIsExecuting(true)
    try {
      await fusionEngine.executePages(urls)
      setBatchUrls("")
    } catch (error) {
      console.error("Batch execution failed:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleRefreshAll = async () => {
    if (results.length === 0) return

    setIsExecuting(true)
    try {
      const urls = results.map(r => r.url)
      await fusionEngine.executePages(urls, { cacheBust: true })
    } catch (error) {
      console.error("Refresh all failed:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleStartAutoRefresh = (interval: number) => {
    setAutoRefreshInterval(interval)
  }

  const handleStopAutoRefresh = () => {
    setAutoRefreshInterval(null)
  }

  const getSuccessRate = () => {
    if (results.length === 0) return 0
    const successCount = results.filter(r => r.status === "success").length
    return Math.round((successCount / results.length) * 100)
  }

  const stats = fusionEngine.getPerformanceStats()

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">
              {results.length}
            </div>
            <div className="text-xs text-gray-400">Total Pages</div>
          </div>
        </EmpireCard>

        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">
              {getSuccessRate()}%
            </div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
        </EmpireCard>

        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">
              {formatExecutionTime(stats.averageExecutionTime)}
            </div>
            <div className="text-xs text-gray-400">Avg Time</div>
          </div>
        </EmpireCard>

        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div
              className={`text-xl font-bold ${autoRefreshInterval ? "text-green-400" : "text-gray-400"}`}
            >
              {autoRefreshInterval ? `${autoRefreshInterval}s` : "OFF"}
            </div>
            <div className="text-xs text-gray-400">Auto Refresh</div>
          </div>
        </EmpireCard>
      </div>

      {/* Execution Mode Selector */}
      <EmpireCard variant="bordered" padding="lg">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">
          ⚡ Execution Mode
        </h3>

        <div className="flex space-x-4 mb-4">
          {(["single", "batch", "auto"] as const).map(mode => (
            <EmpireButton
              key={mode}
              variant={executionMode === mode ? "primary" : "outline"}
              size="sm"
              onClick={() => setExecutionMode(mode)}
            >
              {mode === "single" && "🎯 Single"}
              {mode === "batch" && "📦 Batch"}
              {mode === "auto" && "🔄 Auto"}
            </EmpireButton>
          ))}
        </div>

        {/* Single Mode Controls */}
        {executionMode === "single" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Execute individual pages from the Page Execution Manager
            </p>
          </div>
        )}

        {/* Batch Mode Controls */}
        {executionMode === "batch" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Page URLs (one per line)
              </label>
              <textarea
                value={batchUrls}
                onChange={e => setBatchUrls(e.target.value)}
                placeholder={"/page-1\n/page-2\n/blog/post-1\n/products/item-1"}
                className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <EmpireButton
              onClick={handleBatchExecution}
              disabled={!batchUrls.trim() || isExecuting}
              variant="primary"
            >
              {isExecuting
                ? "Executing..."
                : `Execute ${batchUrls.split("\n").filter(url => url.trim()).length} Pages`}
            </EmpireButton>
          </div>
        )}

        {/* Auto Mode Controls */}
        {executionMode === "auto" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Auto-refresh interval:
              </span>

              {[30, 60, 120, 300].map(seconds => (
                <EmpireButton
                  key={seconds}
                  variant={
                    autoRefreshInterval === seconds ? "primary" : "outline"
                  }
                  size="sm"
                  onClick={() => handleStartAutoRefresh(seconds)}
                >
                  {seconds}s
                </EmpireButton>
              ))}

              <EmpireButton
                variant="outline"
                size="sm"
                onClick={handleStopAutoRefresh}
                disabled={!autoRefreshInterval}
              >
                Stop
              </EmpireButton>
            </div>

            {autoRefreshInterval && (
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Auto-refreshing every {autoRefreshInterval} seconds</span>
              </div>
            )}
          </div>
        )}
      </EmpireCard>

      {/* Global Actions */}
      <EmpireCard variant="bordered" padding="lg">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">
          🌍 Global Actions
        </h3>

        <div className="flex flex-wrap gap-4">
          <EmpireButton
            onClick={() => fusionEngine.discoverAndExecutePages()}
            disabled={isExecuting}
            variant="secondary"
          >
            🔍 Discover All Pages
          </EmpireButton>

          <EmpireButton
            onClick={handleRefreshAll}
            disabled={results.length === 0 || isExecuting}
            variant="outline"
          >
            🔄 Refresh All ({results.length})
          </EmpireButton>

          <EmpireButton
            onClick={() => fusionEngine.clearResults()}
            disabled={results.length === 0}
            variant="ghost"
          >
            🗑️ Clear Results
          </EmpireButton>
        </div>
      </EmpireCard>

      {/* Recent Executions */}
      {results.length > 0 && (
        <EmpireCard variant="bordered" padding="lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            📋 Recent Executions
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {results
              .slice(-10)
              .reverse()
              .map(result => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-gray-900/50 rounded border border-gray-800 hover:border-gray-700 cursor-pointer"
                  onClick={() => onPageSelect?.(result.url)}
                >
                  <div className="flex items-center space-x-3">
                    <EmpireBadge
                      variant={
                        result.status === "success"
                          ? "success"
                          : result.status === "error"
                            ? "error"
                            : result.status === "loading"
                              ? "warning"
                              : "secondary"
                      }
                      size="sm"
                    >
                      {result.status}
                    </EmpireBadge>

                    <code className="text-sm text-yellow-400">
                      {result.url}
                    </code>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>{formatExecutionTime(result.executionTime)}</span>
                    <span>{result.lastUpdated.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
          </div>
        </EmpireCard>
      )}
    </div>
  )
}
