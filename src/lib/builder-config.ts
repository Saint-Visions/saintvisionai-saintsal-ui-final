import { builder } from '@builder.io/sdk' // 🔧 Correct import

// Builder.io Configuration
export const BUILDER_CONFIG = {
  apiKey: import.meta.env.VITE_BUILDER_API_KEY,
  models: {
    page: 'page',
    section: 'section',
    data: 'data'
  },
  preview: {
    enabled: import.meta.env.DEV,
    host: import.meta.env.VITE_APP_URL || 'http://localhost:5173'
  }
} as const

// Initialize Builder.io
export function initializeBuilder() {
  if (!BUILDER_CONFIG.apiKey) {
    console.warn(
      'Builder.io API key not found. Please set VITE_BUILDER_API_KEY in your environment variables.'
    )
    return false
  }

  builder.init(BUILDER_CONFIG.apiKey)

  // Configure Builder.io settings
  builder.canTrack = !import.meta.env.DEV // Disable tracking in development

  return true
}

// Helper function to get content with error handling
export async function getBuilderContent(
  model: string,
  options: {
    url?: string
    preview?: string
    cachebust?: boolean
    userAttributes?: Record<string, any>
  } = {}
) {
  try {
    const content = await builder
      .get(model, {
        url: options.url || '/',
        preview: options.preview || (import.meta.env.DEV ? 'true' : undefined),
        cachebust: options.cachebust ?? import.meta.env.DEV,
        ...options.userAttributes
      })
      .toPromise()

    return { content, error: null }
  } catch (error) {
    console.error(`Builder.io: Failed to fetch ${model} content:`, error)
    return { content: null, error: error as Error }
  }
}

// Check if we're in Builder.io's preview mode
export function isPreviewMode(
  searchParams?: URLSearchParams | Record<string, string>
) {
  if (!searchParams) {
    searchParams = new URLSearchParams(window.location.search)
  }

  const params =
    searchParams instanceof URLSearchParams
      ? Object.fromEntries(searchParams.entries())
      : searchParams

  return (
    params['builder.preview'] === 'true' ||
    params['builder.frameEditing'] === 'true'
  )
}

// Check if we're in Builder.io's editing mode
export function isEditingMode(
  searchParams?: URLSearchParams | Record<string, string>
) {
  if (!searchParams) {
    searchParams = new URLSearchParams(window.location.search)
  }

  const params =
    searchParams instanceof URLSearchParams
      ? Object.fromEntries(searchParams.entries())
      : searchParams

  return (
    params['builder.editing'] === 'true' ||
    params['builder.frameEditing'] === 'true'
  )
}

export default BUILDER_CONFIG
