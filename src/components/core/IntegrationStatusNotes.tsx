import React, { useState } from "react"
import { EmpireCard, EmpireButton, EmpireBadge, EmpireInput } from "../index"

export type IntegrationStatus =
  | "connected"
  | "disconnected"
  | "error"
  | "pending"

interface Integration {
  id: string
  name: string
  status: IntegrationStatus
  lastSync?: Date
  notes: string
  endpoint?: string
}

interface IntegrationStatusNotesProps {
  integrations?: Integration[]
  onUpdateNotes?: (id: string, notes: string) => void
  onStatusChange?: (id: string, status: IntegrationStatus) => void
  className?: string
}

export function IntegrationStatusNotes({
  integrations = [],
  onUpdateNotes,
  onStatusChange,
  className = ""
}: IntegrationStatusNotesProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempNotes, setTempNotes] = useState("")

  const defaultIntegrations: Integration[] = [
    {
      id: "ghl",
      name: "GoHighLevel",
      status: "connected",
      lastSync: new Date(),
      notes: "CRM and automation platform integration active",
      endpoint: "https://app.gohighlevel.com"
    },
    {
      id: "stripe",
      name: "Stripe Payments",
      status: "connected",
      lastSync: new Date(),
      notes: "Payment processing and webhook handling operational",
      endpoint: "https://api.stripe.com"
    },
    {
      id: "supabase",
      name: "Supabase Database",
      status: "connected",
      lastSync: new Date(),
      notes: "Database and authentication services running",
      endpoint: "supabase.co"
    },
    {
      id: "openai",
      name: "OpenAI API",
      status: "connected",
      lastSync: new Date(),
      notes: "AI streaming and chat functionality operational",
      endpoint: "https://api.openai.com"
    }
  ]

  const allIntegrations =
    integrations.length > 0 ? integrations : defaultIntegrations

  const getStatusColor = (status: IntegrationStatus) => {
    switch (status) {
      case "connected":
        return "success"
      case "disconnected":
        return "secondary"
      case "error":
        return "error"
      case "pending":
        return "warning"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case "connected":
        return "🟢"
      case "disconnected":
        return "⚪"
      case "error":
        return "🔴"
      case "pending":
        return "🟡"
      default:
        return "⚪"
    }
  }

  const handleEditNotes = (integration: Integration) => {
    setEditingId(integration.id)
    setTempNotes(integration.notes)
  }

  const handleSaveNotes = (id: string) => {
    onUpdateNotes?.(id, tempNotes)
    setEditingId(null)
    setTempNotes("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTempNotes("")
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {allIntegrations.map(integration => (
          <EmpireCard key={integration.id} variant="bordered" padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {getStatusIcon(integration.status)}
                </div>
                <div>
                  <h3 className="font-bold text-white">{integration.name}</h3>
                  <p className="text-sm text-gray-400">
                    {integration.endpoint}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <EmpireBadge
                  variant={getStatusColor(integration.status) as any}
                >
                  {integration.status.toUpperCase()}
                </EmpireBadge>
                {integration.lastSync && (
                  <span className="text-xs text-gray-500">
                    {integration.lastSync.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              {editingId === integration.id ? (
                <div className="space-y-3">
                  <EmpireInput
                    value={tempNotes}
                    onChange={e => setTempNotes(e.target.value)}
                    placeholder="Add integration notes..."
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <EmpireButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleSaveNotes(integration.id)}
                    >
                      Save
                    </EmpireButton>
                    <EmpireButton
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </EmpireButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {integration.notes || "No notes available"}
                  </p>
                  <EmpireButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditNotes(integration)}
                  >
                    ✏️ Edit Notes
                  </EmpireButton>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <EmpireButton
                variant="outline"
                size="sm"
                onClick={() =>
                  onStatusChange?.(
                    integration.id,
                    integration.status === "connected"
                      ? "disconnected"
                      : "connected"
                  )
                }
              >
                {integration.status === "connected" ? "Disconnect" : "Connect"}
              </EmpireButton>
              <EmpireButton variant="ghost" size="sm">
                🔄 Test
              </EmpireButton>
              <EmpireButton variant="ghost" size="sm">
                📊 Logs
              </EmpireButton>
            </div>
          </EmpireCard>
        ))}
      </div>
    </div>
  )
}

export default IntegrationStatusNotes
