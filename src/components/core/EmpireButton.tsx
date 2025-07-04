import React from "react"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
export type ButtonSize = "sm" | "md" | "lg" | "xl"

interface EmpireButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  href?: string
  target?: string
  onClick?: () => void
  className?: string
}

export function EmpireButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  href,
  target,
  onClick,
  className = ""
}: EmpireButtonProps) {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-offset-black",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed"
  ]

  const variantClasses = {
    primary: [
      "bg-yellow-500",
      "text-black",
      "hover:bg-yellow-400",
      "focus:ring-yellow-500",
      "shadow-lg",
      "hover:shadow-xl",
      "hover:shadow-yellow-500/20"
    ],
    secondary: [
      "bg-gray-800",
      "text-white",
      "border",
      "border-gray-700",
      "hover:bg-gray-700",
      "focus:ring-gray-500"
    ],
    outline: [
      "bg-transparent",
      "text-yellow-500",
      "border-2",
      "border-yellow-500",
      "hover:bg-yellow-500",
      "hover:text-black",
      "focus:ring-yellow-500"
    ],
    ghost: [
      "bg-transparent",
      "text-gray-300",
      "hover:bg-gray-800",
      "hover:text-white",
      "focus:ring-gray-500"
    ],
    danger: [
      "bg-red-600",
      "text-white",
      "hover:bg-red-700",
      "focus:ring-red-500",
      "shadow-lg"
    ]
  }

  const sizeClasses = {
    sm: ["px-3", "py-1.5", "text-sm"],
    md: ["px-4", "py-2", "text-base"],
    lg: ["px-6", "py-3", "text-lg"],
    xl: ["px-8", "py-4", "text-xl"]
  }

  const widthClasses = fullWidth ? ["w-full"] : []

  const allClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    ...widthClasses,
    className
  ].join(" ")

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={allClasses}
        onClick={disabled ? undefined : onClick}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={allClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default EmpireButton
