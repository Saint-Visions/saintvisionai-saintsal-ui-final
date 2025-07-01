"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Search,
  Building2,
  Users,
  MapPin,
  Calendar,
  Globe,
  Linkedin,
  Star
} from "lucide-react"
import { toast } from "sonner"

interface CompanyData {
  name: string
  domain: string
  description?: string
  industry?: string
  employees?: string
  founded?: string
  headquarters?: string
  logo?: string
  linkedin?: string
  website?: string
  phone?: string
  email?: string
  score?: number
  timestamp?: string
  source?: string
  status?: string
}

interface LeadDiscoveryProps {
  onLeadFound?: (lead: CompanyData) => void
}

export function LeadDiscovery({ onLeadFound }: LeadDiscoveryProps) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CompanyData | null>(null)

  const discoverLead = async () => {
    if (!query.trim()) {
      toast.error("Please enter a company name or domain")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/leads/discover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: query.trim() })
      })

      const data = await response.json()

      if (data.success && data.data) {
        setResult(data.data)
        onLeadFound?.(data.data)
        toast.success(data.message || "🔥 Lead discovered!")
      } else {
        toast.error(data.error || "Failed to discover lead")
      }
    } catch (error) {
      console.error("Discovery error:", error)
      toast.error("Discovery failed - check your connection")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      discoverLead()
    }
  }

  const getScoreColor = (score?: number) => {
    if (!score) return "bg-gray-500"
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreLabel = (score?: number) => {
    if (!score) return "Unknown"
    if (score >= 80) return "Hot Lead"
    if (score >= 60) return "Warm Lead"
    return "Cold Lead"
  }

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="border-2 border-yellow-500/20 bg-gradient-to-br from-gray-900 to-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Search className="size-5" />
            🔥 SaintSal™ Lead Discovery Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter company name or domain (e.g., 'microsoft.com' or 'Tesla')"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-yellow-500/50 bg-black text-white placeholder:text-gray-400"
            />
            <Button
              onClick={discoverLead}
              disabled={loading}
              className="min-w-[140px] bg-gradient-to-r from-yellow-400 to-yellow-600 font-semibold text-black hover:from-yellow-500 hover:to-yellow-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Discovering...
                </>
              ) : (
                <>
                  <Search className="mr-2 size-4" />
                  Discover Lead
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      {result && (
        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-gray-900 to-black">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Building2 className="size-5" />
                {result.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={`${getScoreColor(result.score)} text-white`}>
                  <Star className="mr-1 size-3" />
                  {result.score}% - {getScoreLabel(result.score)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Company Info */}
              <div className="space-y-3">
                {result.description && (
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-yellow-400">
                      Description
                    </h4>
                    <p className="text-sm text-gray-300">
                      {result.description}
                    </p>
                  </div>
                )}

                {result.industry && (
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-yellow-400" />
                    <span className="text-gray-300">{result.industry}</span>
                  </div>
                )}

                {result.employees && (
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-yellow-400" />
                    <span className="text-gray-300">
                      {result.employees} employees
                    </span>
                  </div>
                )}

                {result.headquarters && (
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-yellow-400" />
                    <span className="text-gray-300">{result.headquarters}</span>
                  </div>
                )}

                {result.founded && (
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-yellow-400" />
                    <span className="text-gray-300">
                      Founded {result.founded}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact & Links */}
              <div className="space-y-3">
                {result.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 text-yellow-400" />
                    <a
                      href={`https://${result.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      {result.website}
                    </a>
                  </div>
                )}

                {result.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="size-4 text-yellow-400" />
                    <a
                      href={`https://linkedin.com/company/${result.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-2">
                  <div className="text-xs text-gray-500">
                    <div>Source: {result.source}</div>
                    {result.timestamp && (
                      <div>
                        Discovered:{" "}
                        {new Date(result.timestamp).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
