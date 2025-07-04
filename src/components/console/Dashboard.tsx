import React from "react"
import { EmpireCard, EmpireGrid, EmpireStats } from "../index"

interface DashboardProps {
  stats?: Array<{
    value: string
    label: string
    description?: string
  }>
  widgets?: React.ReactNode[]
}

export function Dashboard({ stats, widgets }: DashboardProps) {
  const defaultStats = [
    { value: "99.9%", label: "System Uptime", description: "Last 30 days" },
    { value: "28.4K", label: "AI Requests", description: "Today" },
    { value: "156ms", label: "Avg Response", description: "Global average" },
    { value: "97.2%", label: "Accuracy", description: "Combined AI score" }
  ]

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <EmpireStats stats={stats || defaultStats} columns={4} centered={false} />

      {/* Widgets Grid */}
      {widgets && widgets.length > 0 && (
        <EmpireGrid columns={3} gap="lg">
          {widgets.map((widget, index) => (
            <EmpireCard key={index} variant="bordered" padding="lg">
              {widget}
            </EmpireCard>
          ))}
        </EmpireGrid>
      )}
    </div>
  )
}

export default Dashboard
