import React from "react"

export type CardVariant = "default" | "bordered" | "elevated" | "glow"

interface EmpireCardProps {
  children: React.ReactNode
  variant?: CardVariant
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export function EmpireCard({
  children,
  variant = "default",
  padding = "md",
  className = "",
  onClick,
  hoverable = false
}: EmpireCardProps) {
  const baseClasses = ["rounded-xl", "transition-all", "duration-200"]

  const variantClasses = {
    default: ["bg-gray-900", "border", "border-gray-800"],
    bordered: ["bg-gray-900", "border-2", "border-yellow-500"],
    elevated: ["bg-gray-900", "border", "border-gray-800", "shadow-xl"],
    glow: [
      "bg-gray-900",
      "border",
      "border-yellow-500",
      "shadow-xl",
      "shadow-yellow-500/20"
    ]
  }

  const paddingClasses = {
    none: [],
    sm: ["p-3"],
    md: ["p-6"],
    lg: ["p-8"],
    xl: ["p-12"]
  }

  const hoverClasses =
    hoverable || onClick
      ? [
          "hover:border-yellow-400",
          "hover:shadow-lg",
          "hover:shadow-yellow-500/10",
          "cursor-pointer"
        ]
      : []

  const allClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    ...paddingClasses[padding],
    ...hoverClasses,
    className
  ].join(" ")

  return (
    <div className={allClasses} onClick={onClick}>
      {children}
    </div>
  )
}

export default EmpireCard
