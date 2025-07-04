import React, { useState } from "react"
import { EmpireCard, EmpireButton, EmpireBadge } from "../index"

interface GHLEmbedProps {
  src: string
  title?: string
  width?: string | number
  height?: string | number
  allowFullscreen?: boolean
  sandbox?: string
  className?: string
  loading?: "lazy" | "eager"
  showControls?: boolean
}

export function GHLEmbed({
  src,
  title = "GoHighLevel Integration",
  width = "100%",
  height = 600,
  allowFullscreen = true,
  sandbox = "allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation",
  className = "",
  loading = "lazy",
  showControls = true
}: GHLEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const reloadFrame = () => {
    setIsLoading(true)
    setHasError(false)
    // Force reload by updating src
    const iframe = document.querySelector(
      `iframe[title="${title}"]`
    ) as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  return (
    <EmpireCard variant="bordered" padding="none" className={className}>
      {showControls && (
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="text-xl">🔗</div>
            <div>
              <h3 className="font-bold text-white">{title}</h3>
              <p className="text-sm text-gray-400">GoHighLevel Integration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <EmpireBadge variant="warning" size="sm">
                Loading...
              </EmpireBadge>
            )}
            {hasError && (
              <EmpireBadge variant="error" size="sm">
                Error
              </EmpireBadge>
            )}
            {!isLoading && !hasError && (
              <EmpireBadge variant="success" size="sm">
                Connected
              </EmpireBadge>
            )}
            <EmpireButton variant="outline" size="sm" onClick={reloadFrame}>
              🔄 Reload
            </EmpireButton>
          </div>
        </div>
      )}

      <div className="relative" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-white">Loading GoHighLevel...</p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-white mb-4">Failed to load GoHighLevel</p>
              <EmpireButton variant="primary" onClick={reloadFrame}>
                Try Again
              </EmpireButton>
            </div>
          </div>
        )}

        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          loading={loading}
          allowFullScreen={allowFullscreen}
          sandbox={sandbox}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full border-0 rounded-b-lg"
          style={{
            background: "transparent",
            colorScheme: "normal"
          }}
        />
      </div>
    </EmpireCard>
  )
}

export default GHLEmbed
