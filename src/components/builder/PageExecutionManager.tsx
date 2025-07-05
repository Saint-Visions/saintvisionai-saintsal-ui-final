import React, { useState, useEffect } from "react"
import { EmpireCard } from "../core/EmpireCard"
import { EmpireButton } from "../core/EmpireButton"
import { EmpireInput } from "../core/EmpireInput"
import { EmpireBadge } from "../core/EmpireBadge"
import {
  fusionEngine,
  PageExecutionResult,
  formatExecutionTime,
  getExecutionStatusColor,
  getExecutionStatusIcon
} from "../../lib/builder-fusion-engine"

interface PageExecutionManagerProps {
  className?: string
}

export function PageExecutionManager({ className }: PageExecutionManagerProps) {
  const [results, setResults] = useState<PageExecutionResult[]>([])
  const [newPageUrl, setNewPageUrl] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [isDiscovering, setIsDiscovering] = useState(false)
  const [selectedResults, setSelectedResults] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Subscribe to execution results
    const unsubscribe = fusionEngine.subscribe(setResults)

    // Load initial results
    setResults(fusionEngine.getExecutionResults())

    return unsubscribe
  }, [])

  const handleExecutePage = async () => {
    if (!newPageUrl.trim()) return

    setIsExecuting(true)
    try {
      await fusionEngine.executePage(newPageUrl.trim())
      setNewPageUrl("")
    } catch (error) {
      console.error("Failed to execute page:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleDiscoverPages = async () => {
    setIsDiscovering(true)
    try {
      await fusionEngine.discoverAndExecutePages()
    } catch (error) {
      console.error("Failed to discover pages:", error)
    } finally {
      setIsDiscovering(false)
    }
  }

  const handleClearResults = () => {
    fusionEngine.clearResults()
    setSelectedResults(new Set())
  }

  const handleSelectResult = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedResults)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedResults(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedResults.size === results.length) {
      setSelectedResults(new Set())
    } else {
      setSelectedResults(new Set(results.map(r => r.id)))
    }
  }

  const handleReExecuteSelected = async () => {
    const selectedUrls = results
      .filter(r => selectedResults.has(r.id))
      .map(r => r.url)

    if (selectedUrls.length === 0) return

    setIsExecuting(true)
    try {
      await fusionEngine.executePages(selectedUrls, { cacheBust: true })
    } catch (error) {
      console.error("Failed to re-execute pages:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const stats = fusionEngine.getPerformanceStats()

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">
            🚀 Page Execution Manager
          </h2>
          <p className="text-gray-400 mt-1">
            Execute and monitor Builder.io pages
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            {stats.totalPages} pages executed
          </div>
          <EmpireButton
            variant="outline"
            size="sm"
            onClick={handleClearResults}
            disabled={results.length === 0}
          >
            Clear All
          </EmpireButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {stats.totalPages}
            </div>
            <div className="text-sm text-gray-400">Total Pages</div>
          </div>
        </EmpireCard>

        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {stats.successfulPages}
            </div>
            <div className="text-sm text-gray-400">Successful</div>
          </div>
        </EmpireCard>

        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {stats.errorPages}
            </div>
            <div className="text-sm text-gray-400">Errors</div>
          </div>
        </EmpireCard>

        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {formatExecutionTime(stats.averageExecutionTime)}
            </div>
            <div className="text-sm text-gray-400">Avg Time</div>
          </div>
        </EmpireCard>
      </div>

      {/* Execution Controls */}
      <EmpireCard variant="bordered" padding="lg">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-400">
            ⚡ Execute Pages
          </h3>

          <div className="flex space-x-4">
            <div className="flex-1">
              <EmpireInput
                type="text"
                placeholder="/page-url or /path/to/page"
                value={newPageUrl}
                onChange={e => setNewPageUrl(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleExecutePage()}
              />
            </div>

            <EmpireButton
              onClick={handleExecutePage}
              disabled={!newPageUrl.trim() || isExecuting}
              variant="primary"
            >
              {isExecuting ? "Executing..." : "Execute Page"}
            </EmpireButton>
          </div>

          <div className="flex space-x-4">
            <EmpireButton
              onClick={handleDiscoverPages}
              disabled={isDiscovering}
              variant="secondary"
            >
              {isDiscovering ? "Discovering..." : "🔍 Auto-Discover Pages"}
            </EmpireButton>

            {selectedResults.size > 0 && (
              <EmpireButton
                onClick={handleReExecuteSelected}
                disabled={isExecuting}
                variant="outline"
              >
                Re-Execute Selected ({selectedResults.size})
              </EmpireButton>
            )}
          </div>
        </div>
      </EmpireCard>

      {/* Results Table */}
      {results.length > 0 && (
        <EmpireCard variant="bordered" padding="lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-yellow-400">
                📊 Execution Results
              </h3>

              <EmpireButton onClick={handleSelectAll} variant="ghost" size="sm">
                {selectedResults.size === results.length
                  ? "Deselect All"
                  : "Select All"}
              </EmpireButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-4">
                      <input
                        type="checkbox"
                        checked={
                          selectedResults.size === results.length &&
                          results.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-600 bg-gray-800 text-yellow-500"
                      />
                    </th>
                    <th className="text-left py-2 px-4 text-gray-300">
                      Status
                    </th>
                    <th className="text-left py-2 px-4 text-gray-300">URL</th>
                    <th className="text-left py-2 px-4 text-gray-300">Time</th>
                    <th className="text-left py-2 px-4 text-gray-300">
                      Last Updated
                    </th>
                    <th className="text-left py-2 px-4 text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(result => (
                    <tr
                      key={result.id}
                      className="border-b border-gray-800 hover:bg-gray-900/50"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedResults.has(result.id)}
                          onChange={e =>
                            handleSelectResult(result.id, e.target.checked)
                          }
                          className="rounded border-gray-600 bg-gray-800 text-yellow-500"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span>{getExecutionStatusIcon(result.status)}</span>
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
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-yellow-400 bg-gray-800 px-2 py-1 rounded text-xs">
                          {result.url}
                        </code>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {formatExecutionTime(result.executionTime)}
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs">
                        {result.lastUpdated.toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <EmpireButton
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              fusionEngine.executePage(result.url, {
                                cacheBust: true
                              })
                            }
                          >
                            🔄
                          </EmpireButton>

                          {result.content && (
                            <EmpireButton
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                window.open(
                                  `/builder-dynamic${result.url}`,
                                  "_blank"
                                )
                              }
                            >
                              👁️
                            </EmpireButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </EmpireCard>
      )}

      {/* Empty State */}
      {results.length === 0 && (
        <EmpireCard variant="bordered" padding="xl">
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">No Pages Executed</h3>
            <p className="mb-6">
              Start by executing a page URL or discovering all Builder.io pages
            </p>
            <EmpireButton
              onClick={handleDiscoverPages}
              variant="primary"
              disabled={isDiscovering}
            >
              {isDiscovering ? "Discovering..." : "🔍 Discover All Pages"}
            </EmpireButton>
          </div>
        </EmpireCard>
      )}
    </div>
  )
}
