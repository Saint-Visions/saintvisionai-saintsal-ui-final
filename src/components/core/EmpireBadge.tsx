import React from "react"

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
export type BadgeSize = "sm" | "md" | "lg"

interface EmpireBadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  removable?: boolean
  onRemove?: () => void
  className?: string
}

export function EmpireBadge({
  children,
  variant = "primary",
  size = "md",
  removable = false,
  onRemove,
  className = ""
}: EmpireBadgeProps) {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "font-medium",
    "rounded-full",
    "transition-all",
    "duration-200"
  ]

  const variantClasses = {
    primary: [
      "bg-yellow-500/20",
      "text-yellow-300",
      "border",
      "border-yellow-500/30"
    ],
    secondary: ["bg-gray-800", "text-gray-300", "border", "border-gray-700"],
    success: [
      "bg-emerald-500/20",
      "text-emerald-300",
      "border",
      "border-emerald-500/30"
    ],
    warning: [
      "bg-amber-500/20",
      "text-amber-300",
      "border",
      "border-amber-500/30"
    ],
    error: ["bg-red-500/20", "text-red-300", "border", "border-red-500/30"],
    info: ["bg-blue-500/20", "text-blue-300", "border", "border-blue-500/30"]
  }

  const sizeClasses = {
    sm: ["px-2", "py-1", "text-xs"],
    md: ["px-3", "py-1", "text-sm"],
    lg: ["px-4", "py-2", "text-base"]
  }

  const allClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    className
  ].join(" ")

  return (
    <span className={allClasses}>
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-2 hover:text-white focus:outline-none focus:text-white transition-colors duration-150"
          aria-label="Remove badge"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

export default EmpireBadge
