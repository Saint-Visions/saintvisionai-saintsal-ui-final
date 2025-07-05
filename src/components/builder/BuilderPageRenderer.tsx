import React, { useState, useEffect } from "react"
import { Content } from "@builder.io/sdk-react"
import { EmpireCard } from "../core/EmpireCard"
import { EmpireButton } from "../core/EmpireButton"
import { EmpireBadge } from "../core/EmpireBadge"
import {
  fusionEngine,
  PageExecutionResult,
  formatExecutionTime,
  getExecutionStatusColor,
  getExecutionStatusIcon
} from "../../lib/builder-fusion-engine"
import { isPreviewMode, isEditingMode } from "../../lib/builder-config"

interface BuilderPageRendererProps {
  url: string
  searchParams?: URLSearchParams | Record<string, string>
  showControls?: boolean
  className?: string
}

export function BuilderPageRenderer({
  url,
  searchParams,
  showControls = false,
  className
}: BuilderPageRendererProps) {
  const [result, setResult] = useState<PageExecutionResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDebugInfo, setShowDebugInfo] = useState(false)

  useEffect(() => {
    const executeAndMonitor = async () => {
      setIsLoading(true)

      try {
        const execResult = await fusionEngine.executePage(url, {
          preview: isPreviewMode(searchParams),
          cacheBust: import.meta.env.DEV
        })
        setResult(execResult)
      } catch (error) {
        console.error("Builder page execution failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    executeAndMonitor()
  }, [url, searchParams])

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const execResult = await fusionEngine.executePage(url, {
        preview: isPreviewMode(searchParams),
        cacheBust: true
      })
      setResult(execResult)
    } finally {
      setIsLoading(false)
    }
  }

  const handleValidate = async () => {
    const validation = await fusionEngine.validatePage(url)
    console.log("Page validation result:", validation)

    if (validation.issues.length > 0) {
      alert(`Page validation issues:\n${validation.issues.join("\n")}`)
    } else {
      alert("✅ Page validation passed!")
    }
  }

  // Check if we should show content (content exists OR we're in preview/editing mode)
  const params =
    searchParams instanceof URLSearchParams
      ? Object.fromEntries(searchParams.entries())
      : searchParams || {}

  const shouldShowContent =
    result?.content || isPreviewMode(params) || isEditingMode(params)

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white ${className}`}>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Executing Builder.io page...</p>
            <p className="text-xs text-gray-500 mt-2">URL: {url}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!shouldShowContent) {
    return (
      <div className={`min-h-screen bg-black text-white ${className}`}>
        {/* Control Panel */}
        {showControls && result && (
          <div className="border-b border-gray-800 p-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                    >
                      {result.status}
                    </EmpireBadge>
                  </div>
                  <span className="text-sm text-gray-400">
                    {formatExecutionTime(result.executionTime)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <EmpireButton
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDebugInfo(!showDebugInfo)}
                  >
                    🔍 Debug
                  </EmpireButton>
                  <EmpireButton
                    size="sm"
                    variant="ghost"
                    onClick={handleValidate}
                  >
                    ✅ Validate
                  </EmpireButton>
                  <EmpireButton
                    size="sm"
                    variant="outline"
                    onClick={handleRefresh}
                  >
                    🔄 Refresh
                  </EmpireButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        {showControls && showDebugInfo && result && (
          <div className="border-b border-gray-800 bg-gray-900/50 p-4">
            <div className="max-w-6xl mx-auto">
              <EmpireCard variant="bordered" padding="md">
                <h3 className="text-sm font-semibold text-yellow-400 mb-2">
                  Debug Information
                </h3>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>
                    <strong>URL:</strong> {result.url}
                  </div>
                  <div>
                    <strong>Status:</strong> {result.status}
                  </div>
                  <div>
                    <strong>Execution Time:</strong>{" "}
                    {formatExecutionTime(result.executionTime)}
                  </div>
                  <div>
                    <strong>Last Updated:</strong>{" "}
                    {result.lastUpdated.toISOString()}
                  </div>
                  {result.error && (
                    <div className="text-red-400">
                      <strong>Error:</strong> {result.error}
                    </div>
                  )}
                  <div>
                    <strong>Has Content:</strong>{" "}
                    {result.content ? "Yes" : "No"}
                  </div>
                  {result.content && (
                    <div>
                      <strong>Content ID:</strong> {result.content.id || "N/A"}
                    </div>
                  )}
                </div>
              </EmpireCard>
            </div>
          </div>
        )}

        {/* Content Not Found */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-yellow-500 text-6xl mb-4">📝</div>
            <h1 className="text-2xl font-bold mb-2 text-yellow-400">
              No Content Found
            </h1>
            <p className="text-gray-300 mb-4">
              No Builder.io content found for this page.
            </p>
            <p className="text-sm text-gray-400 mb-4">
              URL: <code className="bg-gray-800 px-2 py-1 rounded">{url}</code>
            </p>

            {result?.error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded">
                <p className="text-red-400 text-sm">{result.error}</p>
              </div>
            )}

            <div className="space-y-2">
              <a
                href="https://builder.io/content"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
              >
                Create Content in Builder.io
              </a>
              <p className="text-xs text-gray-500">
                Create a new page with URL: <strong>{url}</strong>
              </p>
              <EmpireButton
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="mt-2"
              >
                🔄 Retry Loading
              </EmpireButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-black ${className}`}>
      {/* Control Panel */}
      {showControls && result && (
        <div className="border-b border-gray-800 p-4 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
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
                  >
                    {result.status}
                  </EmpireBadge>
                </div>
                <span className="text-sm text-gray-400">
                  {formatExecutionTime(result.executionTime)}
                </span>
                <span className="text-xs text-gray-500">
                  {result.lastUpdated.toLocaleTimeString()}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <EmpireButton
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDebugInfo(!showDebugInfo)}
                >
                  🔍 {showDebugInfo ? "Hide" : "Debug"}
                </EmpireButton>
                <EmpireButton
                  size="sm"
                  variant="ghost"
                  onClick={handleValidate}
                >
                  ✅ Validate
                </EmpireButton>
                <EmpireButton
                  size="sm"
                  variant="outline"
                  onClick={handleRefresh}
                >
                  🔄 Refresh
                </EmpireButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info */}
      {showControls && showDebugInfo && result && (
        <div className="border-b border-gray-800 bg-gray-900/50 p-4">
          <div className="max-w-6xl mx-auto">
            <EmpireCard variant="bordered" padding="md">
              <h3 className="text-sm font-semibold text-yellow-400 mb-2">
                Debug Information
              </h3>
              <div className="text-xs text-gray-400 space-y-1">
                <div>
                  <strong>URL:</strong> {result.url}
                </div>
                <div>
                  <strong>Status:</strong> {result.status}
                </div>
                <div>
                  <strong>Execution Time:</strong>{" "}
                  {formatExecutionTime(result.executionTime)}
                </div>
                <div>
                  <strong>Last Updated:</strong>{" "}
                  {result.lastUpdated.toISOString()}
                </div>
                {result.error && (
                  <div className="text-red-400">
                    <strong>Error:</strong> {result.error}
                  </div>
                )}
                <div>
                  <strong>Has Content:</strong> {result.content ? "Yes" : "No"}
                </div>
                {result.content && (
                  <>
                    <div>
                      <strong>Content ID:</strong> {result.content.id || "N/A"}
                    </div>
                    <div>
                      <strong>Content Name:</strong>{" "}
                      {result.content.name || "N/A"}
                    </div>
                    <div>
                      <strong>Published:</strong>{" "}
                      {result.content.published || "N/A"}
                    </div>
                  </>
                )}
              </div>
            </EmpireCard>
          </div>
        </div>
      )}

      {/* Builder.io Content */}
      <Content
        model="page"
        content={result?.content}
        apiKey={import.meta.env.VITE_BUILDER_API_KEY}
        options={{
          includeRefs: true,
          noTrack: import.meta.env.DEV
        }}
      />
    </div>
  )
}
