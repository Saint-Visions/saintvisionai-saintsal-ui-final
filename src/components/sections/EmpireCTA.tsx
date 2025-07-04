import React from "react"
import { EmpireButton } from "../core/EmpireButton"

interface CTAAction {
  text: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
}

interface EmpireCTAProps {
  title: string
  description?: string
  primaryAction?: CTAAction
  secondaryAction?: CTAAction
  backgroundPattern?: boolean
  centered?: boolean
  size?: "sm" | "md" | "lg"
}

export function EmpireCTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  backgroundPattern = true,
  centered = true,
  size = "md"
}: EmpireCTAProps) {
  const sizeClasses = {
    sm: "py-12",
    md: "py-20",
    lg: "py-32"
  }

  return (
    <section className={`relative ${sizeClasses[size]} overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-500/5 to-yellow-600/10" />

      {/* Background Pattern */}
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(252,211,77,0.8) 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }}
          />
        </div>
      )}

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />

      <div className="relative empire-container">
        <div className={`max-w-4xl ${centered ? "mx-auto text-center" : ""}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
            </span>
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {title.split(" ").slice(-1)[0]}
            </span>
          </h2>

          {description && (
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
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
                  className="shadow-2xl shadow-yellow-500/25"
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

      {/* Border accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
    </section>
  )
}

export default EmpireCTA
