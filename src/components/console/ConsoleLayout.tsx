import React from "react"
import { EmpireContainer } from "../layout/EmpireContainer"

interface ConsoleLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function ConsoleLayout({
  children,
  title,
  subtitle,
  actions
}: ConsoleLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <EmpireContainer size="full" padding>
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                {title}
              </h1>
              {subtitle && <p className="text-xl text-gray-300">{subtitle}</p>}
            </div>
            {actions && <div className="flex gap-4">{actions}</div>}
          </div>
          {children}
        </div>
      </EmpireContainer>
    </div>
  )
}

export default ConsoleLayout
