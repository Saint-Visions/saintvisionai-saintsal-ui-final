import React from "react"

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
export type InputSize = "sm" | "md" | "lg"

interface EmpireInputProps {
  type?: InputType
  placeholder?: string
  value?: string
  defaultValue?: string
  size?: InputSize
  disabled?: boolean
  required?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  helperText?: string
  icon?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string
}

export function EmpireInput({
  type = "text",
  placeholder,
  value,
  defaultValue,
  size = "md",
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  label,
  helperText,
  icon,
  onChange,
  onFocus,
  onBlur,
  className = ""
}: EmpireInputProps) {
  const inputId = React.useId()

  const baseClasses = [
    "w-full",
    "bg-gray-900",
    "border",
    "rounded-lg",
    "text-white",
    "placeholder-gray-400",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-offset-black",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed"
  ]

  const sizeClasses = {
    sm: ["px-3", "py-2", "text-sm"],
    md: ["px-4", "py-3", "text-base"],
    lg: ["px-5", "py-4", "text-lg"]
  }

  const stateClasses = error
    ? ["border-red-500", "focus:ring-red-500", "focus:border-red-500"]
    : ["border-gray-700", "focus:ring-yellow-500", "focus:border-yellow-500"]

  const iconClasses = icon ? ["pl-10"] : []

  const allClasses = [
    ...baseClasses,
    ...sizeClasses[size],
    ...stateClasses,
    ...iconClasses,
    className
  ].join(" ")

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={allClasses}
        />
      </div>

      {(helperText || errorMessage) && (
        <p
          className={`mt-2 text-sm ${error ? "text-red-400" : "text-gray-400"}`}
        >
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  )
}

export default EmpireInput
