import { Content } from "@builder.io/sdk-react"
import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import {
  initializeBuilder,
  getBuilderContent,
  isPreviewMode,
  isEditingMode
} from "../lib/builder-config"
import "../builder-registry" // Import to register components

// Initialize Builder.io
initializeBuilder()

export default function BuilderDynamicPage() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const location = useLocation()

  useEffect(() => {
    async function fetchContent() {
      setLoading(true)
      setError(null)

      // Construct the URL path from params or current location
      let urlPath = location.pathname

      // Remove /builder prefix if present
      if (urlPath.startsWith("/builder")) {
        urlPath = urlPath.replace("/builder", "") || "/"
      }

      console.log("Builder.io: Fetching content for path:", urlPath)

      const searchParams = new URLSearchParams(location.search)
      const { content, error } = await getBuilderContent("page", {
        url: urlPath,
        preview: searchParams.get("builder.preview") || undefined
      })

      if (error) {
        console.error("Builder.io content fetch error:", error)
        setError(error.message)
      } else {
        console.log("Builder.io: Content fetched:", content)
        setContent(content)
      }

      setLoading(false)
    }

    fetchContent()
  }, [location.pathname, location.search, params])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading Builder content...</p>
          <p className="text-xs text-gray-500 mt-2">
            Path: {location.pathname}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2 text-yellow-400">
            Content Error
          </h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <p className="text-sm text-gray-400 mb-4">
            Path:{" "}
            <code className="bg-gray-800 px-2 py-1 rounded">
              {location.pathname}
            </code>
          </p>
          <a
            href="https://builder.io/content"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
          >
            Manage Content in Builder.io
          </a>
        </div>
      </div>
    )
  }

  // Check if we should show content (content exists OR we're in preview/editing mode)
  const searchParams = new URLSearchParams(location.search)
  const showContent =
    content || isPreviewMode(searchParams) || isEditingMode(searchParams)

  if (!showContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-yellow-500 text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold mb-2 text-yellow-400">
            No Content Found
          </h1>
          <p className="text-gray-300 mb-4">
            No Builder.io content found for this page.
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Path:{" "}
            <code className="bg-gray-800 px-2 py-1 rounded">
              {location.pathname}
            </code>
          </p>
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
              Create a new page with URL: <strong>{location.pathname}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Content
        model="page"
        content={content}
        apiKey={import.meta.env.VITE_BUILDER_API_KEY}
        options={{
          includeRefs: true,
          noTrack: import.meta.env.DEV
        }}
      />
    </div>
  )
}
