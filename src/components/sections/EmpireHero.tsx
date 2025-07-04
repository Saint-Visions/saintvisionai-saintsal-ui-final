import React from "react"
import { EmpireButton } from "../core/EmpireButton"

interface HeroAction {
  text: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
}

interface EmpireHeroProps {
  title: string
  subtitle?: string
  description?: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  backgroundImage?: string
  overlay?: boolean
  centered?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

export function EmpireHero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  overlay = true,
  centered = true,
  size = "lg"
}: EmpireHeroProps) {
  const sizeClasses = {
    sm: "py-16",
    md: "py-24",
    lg: "py-32",
    xl: "py-40"
  }

  const titleSizes = {
    sm: "text-4xl md:text-5xl",
    md: "text-5xl md:text-6xl",
    lg: "text-6xl md:text-7xl",
    xl: "text-7xl md:text-8xl"
  }

  return (
    <section
      className={`relative ${sizeClasses[size]} overflow-hidden`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/60" />
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(252,211,77,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px"
          }}
        />
      </div>

      <div className="relative empire-container">
        <div className={`max-w-4xl ${centered ? "mx-auto text-center" : ""}`}>
          {subtitle && (
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                {subtitle}
              </span>
            </div>
          )}

          <h1 className={`${titleSizes[size]} font-black leading-tight mb-6`}>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
            </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {title.split(" ").slice(-1)[0]}
            </span>
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {description}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div
              className={`flex flex-col sm:flex-row gap-4 ${centered ? "justify-center" : ""}`}
            >
              {primaryAction && (
                <EmpireButton
                  size="lg"
                  variant={primaryAction.variant || "primary"}
                  href={primaryAction.href}
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.text}
                </EmpireButton>
              )}

              {secondaryAction && (
                <EmpireButton
                  size="lg"
                  variant={secondaryAction.variant || "outline"}
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.text}
                </EmpireButton>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
    </section>
  )
}

export default EmpireHero
