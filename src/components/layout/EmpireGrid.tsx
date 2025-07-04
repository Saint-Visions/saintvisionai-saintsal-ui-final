import React from "react"

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12
export type GridGap = "none" | "sm" | "md" | "lg" | "xl"

interface EmpireGridProps {
  children: React.ReactNode
  columns?: GridColumns
  gap?: GridGap
  responsive?: boolean
  className?: string
}

export function EmpireGrid({
  children,
  columns = 3,
  gap = "md",
  responsive = true,
  className = ""
}: EmpireGridProps) {
  const baseClasses = ["grid"]

  const gapClasses = {
    none: "gap-0",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12"
  }

  const getColumnClasses = () => {
    if (!responsive) {
      return [`grid-cols-${columns}`]
    }

    // Responsive column classes
    switch (columns) {
      case 1:
        return ["grid-cols-1"]
      case 2:
        return ["grid-cols-1", "md:grid-cols-2"]
      case 3:
        return ["grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3"]
      case 4:
        return ["grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4"]
      case 5:
        return [
          "grid-cols-1",
          "md:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-5"
        ]
      case 6:
        return [
          "grid-cols-1",
          "md:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-6"
        ]
      case 12:
        return ["grid-cols-1", "md:grid-cols-6", "lg:grid-cols-12"]
      default:
        return [`grid-cols-${columns}`]
    }
  }

  const allClasses = [
    ...baseClasses,
    ...getColumnClasses(),
    gapClasses[gap],
    className
  ].join(" ")

  return <div className={allClasses}>{children}</div>
}

export default EmpireGrid
