import React from "react"

interface Stat {
  value: string
  label: string
  description?: string
}

interface EmpireStatsProps {
  title?: string
  subtitle?: string
  stats: Stat[]
  columns?: 2 | 3 | 4
  centered?: boolean
}

export function EmpireStats({
  title,
  subtitle,
  stats,
  columns = 4,
  centered = true
}: EmpireStatsProps) {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <section className="empire-section bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="empire-container">
        {(title || subtitle) && (
          <div className={`mb-16 ${centered ? "text-center" : ""}`}>
            {subtitle && (
              <p className="text-yellow-400 font-semibold text-lg mb-4 tracking-wide uppercase">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className={`grid ${gridClasses[columns]} gap-8`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-yellow-500/30 transition-colors duration-300"
            >
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-gray-400">{stat.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmpireStats
