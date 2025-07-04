import React from "react"

export type AIModelPreference = "gpt-4" | "azure" | "gpt-3.5"

interface PreferenceDropdownProps {
  value: AIModelPreference
  onChange: (model: AIModelPreference) => void
  disabled?: boolean
  className?: string
}

export function PreferenceDropdown({
  value,
  onChange,
  disabled = false,
  className = ""
}: PreferenceDropdownProps) {
  const models = [
    { id: "gpt-4", label: "GPT-4", description: "Most capable model" },
    { id: "azure", label: "Azure OpenAI", description: "Enterprise-grade" },
    { id: "gpt-3.5", label: "GPT-3.5 Turbo", description: "Fast and efficient" }
  ]

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={e => onChange(e.target.value as AIModelPreference)}
        disabled={disabled}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {models.map(model => (
          <option key={model.id} value={model.id}>
            {model.label} - {model.description}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PreferenceDropdown
