import React from "react"

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full"

interface EmpireContainerProps {
  children: React.ReactNode
  size?: ContainerSize
  padding?: boolean
  className?: string
}

export function EmpireContainer({
  children,
  size = "lg",
  padding = true,
  className = ""
}: EmpireContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full"
  }

  const paddingClasses = padding ? ["px-4", "sm:px-6", "lg:px-8"] : []

  const allClasses = [
    "mx-auto",
    ...sizeClasses[size],
    ...paddingClasses,
    className
  ].join(" ")

  return <div className={allClasses}>{children}</div>
}

export default EmpireContainer
