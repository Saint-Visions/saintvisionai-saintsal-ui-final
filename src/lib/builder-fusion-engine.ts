import { builder } from "@builder.io/sdk-react"
import {
  BUILDER_CONFIG,
  getBuilderContent,
  isPreviewMode,
  isEditingMode
} from "./builder-config"

export interface PageExecutionResult {
  id: string
  url: string
  status: "success" | "error" | "loading" | "not-found"
  content: any
  error?: string
  executionTime: number
  lastUpdated: Date
}

export interface ExecutionOptions {
  model?: string
  cacheBust?: boolean
  includeRefs?: boolean
  preview?: boolean
  userAttributes?: Record<string, any>
}

export class BuilderFusionEngine {
  private executionResults: Map<string, PageExecutionResult> = new Map()
  private executionQueue: Array<{ url: string; options: ExecutionOptions }> = []
  private isExecuting = false
  private subscribers: Array<(results: PageExecutionResult[]) => void> = []

  constructor() {
    this.initialize()
  }

  private async initialize() {
    if (!BUILDER_CONFIG.apiKey) {
      console.warn("Builder.io API key not found - Fusion engine cannot start")
      return
    }
    console.log("🚀 Builder Fusion Engine initialized")
  }

  // Execute a single page
  async executePage(
    url: string,
    options: ExecutionOptions = {}
  ): Promise<PageExecutionResult> {
    const startTime = Date.now()
    const id = this.generateExecutionId(url)

    // Update status to loading
    const loadingResult: PageExecutionResult = {
      id,
      url,
      status: "loading",
      content: null,
      executionTime: 0,
      lastUpdated: new Date()
    }

    this.executionResults.set(id, loadingResult)
    this.notifySubscribers()

    try {
      const { content, error } = await getBuilderContent(
        options.model || "page",
        {
          url,
          preview: options.preview ? "true" : undefined,
          cachebust: options.cacheBust,
          userAttributes: options.userAttributes
        }
      )

      const executionTime = Date.now() - startTime
      const result: PageExecutionResult = {
        id,
        url,
        status: error ? "error" : content ? "success" : "not-found",
        content,
        error: error?.message,
        executionTime,
        lastUpdated: new Date()
      }

      this.executionResults.set(id, result)
      this.notifySubscribers()

      console.log(`📄 Executed page: ${url} (${executionTime}ms)`)
      return result
    } catch (error) {
      const executionTime = Date.now() - startTime
      const errorResult: PageExecutionResult = {
        id,
        url,
        status: "error",
        content: null,
        error: (error as Error).message,
        executionTime,
        lastUpdated: new Date()
      }

      this.executionResults.set(id, errorResult)
      this.notifySubscribers()
      return errorResult
    }
  }

  // Execute multiple pages
  async executePages(
    urls: string[],
    options: ExecutionOptions = {}
  ): Promise<PageExecutionResult[]> {
    console.log(`🔄 Executing ${urls.length} pages...`)

    const promises = urls.map(url => this.executePage(url, options))
    const results = await Promise.all(promises)

    console.log(`✅ Completed execution of ${results.length} pages`)
    return results
  }

  // Queue pages for execution
  queueExecution(url: string, options: ExecutionOptions = {}) {
    this.executionQueue.push({ url, options })
    this.processQueue()
  }

  // Process execution queue
  private async processQueue() {
    if (this.isExecuting || this.executionQueue.length === 0) {
      return
    }

    this.isExecuting = true

    while (this.executionQueue.length > 0) {
      const { url, options } = this.executionQueue.shift()!
      await this.executePage(url, options)

      // Small delay between executions to prevent overwhelming Builder.io API
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    this.isExecuting = false
  }

  // Get execution results
  getExecutionResults(): PageExecutionResult[] {
    return Array.from(this.executionResults.values())
  }

  // Get result for specific URL
  getExecutionResult(url: string): PageExecutionResult | undefined {
    const id = this.generateExecutionId(url)
    return this.executionResults.get(id)
  }

  // Clear all results
  clearResults() {
    this.executionResults.clear()
    this.notifySubscribers()
  }

  // Subscribe to result updates
  subscribe(callback: (results: PageExecutionResult[]) => void) {
    this.subscribers.push(callback)

    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  // Auto-discover and execute all Builder.io pages
  async discoverAndExecutePages(): Promise<PageExecutionResult[]> {
    console.log("🔍 Discovering Builder.io pages...")

    try {
      // Get all entries from Builder.io
      const allPages = await builder.getAll("page", {
        apiKey: BUILDER_CONFIG.apiKey,
        options: {
          noTargeting: true
        },
        omit: "data.blocks" // Omit heavy content for discovery
      })

      const urls = allPages.map(page => page.data?.url || `/${page.id}`)
      console.log(`📋 Discovered ${urls.length} pages:`, urls)

      return await this.executePages(urls)
    } catch (error) {
      console.error("Failed to discover pages:", error)
      return []
    }
  }

  // Monitor page performance
  getPerformanceStats() {
    const results = this.getExecutionResults()
    const successfulResults = results.filter(r => r.status === "success")

    return {
      totalPages: results.length,
      successfulPages: successfulResults.length,
      errorPages: results.filter(r => r.status === "error").length,
      averageExecutionTime:
        successfulResults.length > 0
          ? successfulResults.reduce((sum, r) => sum + r.executionTime, 0) /
            successfulResults.length
          : 0,
      lastExecution:
        results.length > 0
          ? Math.max(...results.map(r => r.lastUpdated.getTime()))
          : null
    }
  }

  // Validate page content
  async validatePage(url: string): Promise<{
    isValid: boolean
    issues: string[]
    content: any
  }> {
    const result = await this.executePage(url)
    const issues: string[] = []

    if (result.status === "error") {
      issues.push(`Execution error: ${result.error}`)
    }

    if (result.status === "not-found") {
      issues.push("Page not found in Builder.io")
    }

    if (result.executionTime > 3000) {
      issues.push("Slow execution time (>3s)")
    }

    if (result.content && !result.content.data) {
      issues.push("Missing page data")
    }

    return {
      isValid: issues.length === 0,
      issues,
      content: result.content
    }
  }

  private generateExecutionId(url: string): string {
    return `exec_${url.replace(/\//g, "_").replace(/[^a-zA-Z0-9_]/g, "")}_${Date.now()}`
  }

  private notifySubscribers() {
    const results = this.getExecutionResults()
    this.subscribers.forEach(callback => callback(results))
  }
}

// Global fusion engine instance
export const fusionEngine = new BuilderFusionEngine()

// Helper functions
export function isBuilderPage(url: string): boolean {
  // Check if URL should be handled by Builder.io
  return (
    !url.startsWith("/api") && !url.includes(".") && !url.startsWith("/static")
  )
}

export function formatExecutionTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

export function getExecutionStatusColor(
  status: PageExecutionResult["status"]
): string {
  switch (status) {
    case "success":
      return "text-green-400"
    case "error":
      return "text-red-400"
    case "loading":
      return "text-yellow-400"
    case "not-found":
      return "text-gray-400"
    default:
      return "text-gray-400"
  }
}

export function getExecutionStatusIcon(
  status: PageExecutionResult["status"]
): string {
  switch (status) {
    case "success":
      return "✅"
    case "error":
      return "❌"
    case "loading":
      return "⏳"
    case "not-found":
      return "❓"
    default:
      return "❓"
  }
}
