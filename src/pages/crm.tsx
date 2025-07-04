import React, { useState, useEffect } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireInput,
  EmpireBadge,
  EmpireGrid,
  EmpireStats,
  EmpireContainer,
  EmpireSection,
  StatusPanel,
  Dashboard,
  IntegrationStatusNotes
} from "../components/index"
import { crmService, CRMStats, CustomerActivity } from "../lib/crm-service"
import { Customer, ChatSession } from "../lib/supabase"
import { stripeService } from "../lib/stripe-service"

export default function CRM() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [stats, setStats] = useState<CRMStats>({
    totalCustomers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    chatSessions: 0,
    conversionRate: 0
  })
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const [customerActivity, setCustomerActivity] = useState<CustomerActivity[]>(
    []
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<
    "overview" | "customers" | "sessions"
  >("overview")

  useEffect(() => {
    loadCRMData()
  }, [])

  const loadCRMData = async () => {
    try {
      setLoading(true)
      const [crmStats, customerList] = await Promise.all([
        crmService.getCRMStats(),
        crmService.getCustomers(50, 0)
      ])

      setStats(crmStats)
      setCustomers(customerList)
    } catch (error) {
      console.error("Failed to load CRM data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadCRMData()
      return
    }

    try {
      const results = await crmService.searchCustomers(searchQuery)
      setCustomers(results)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handleCustomerSelect = async (customer: Customer) => {
    setSelectedCustomer(customer)
    try {
      const activity = await crmService.getCustomerActivity(customer.id)
      setCustomerActivity(activity)
    } catch (error) {
      console.error("Failed to load customer activity:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "trialing":
        return "warning"
      case "past_due":
        return "error"
      case "canceled":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "success"
      case "pro":
        return "warning"
      case "free":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount)
  }

  const statsData = [
    {
      value: stats.totalCustomers.toString(),
      label: "Total Customers",
      description: "Registered users"
    },
    {
      value: stats.activeSubscriptions.toString(),
      label: "Active Subscriptions",
      description: "Paying customers"
    },
    {
      value: formatCurrency(stats.totalRevenue),
      label: "Total Revenue",
      description: "All-time earnings"
    },
    {
      value: `${stats.conversionRate}%`,
      label: "Conversion Rate",
      description: "Free to paid conversion"
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading CRM data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-4">
          CRM <span className="text-yellow-400">TOOLS</span>
        </h1>
        <p className="text-xl text-gray-300">
          Customer relationship management • Analytics • Growth insights
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 flex gap-4">
        <EmpireButton
          variant={activeTab === "overview" ? "primary" : "outline"}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </EmpireButton>
        <EmpireButton
          variant={activeTab === "customers" ? "primary" : "outline"}
          onClick={() => setActiveTab("customers")}
        >
          👥 Customers
        </EmpireButton>
        <EmpireButton
          variant={activeTab === "sessions" ? "primary" : "outline"}
          onClick={() => setActiveTab("sessions")}
        >
          💬 Chat Sessions
        </EmpireButton>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stats Overview */}
          <EmpireStats stats={statsData} columns={4} centered={false} />

          {/* Quick Actions */}
          <EmpireGrid columns={3} gap="lg">
            <EmpireCard variant="bordered" padding="lg" hoverable>
              <div className="text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Add Customer
                </h3>
                <p className="text-gray-400 mb-4">Manually add new customer</p>
                <EmpireButton variant="primary" fullWidth>
                  Add Customer
                </EmpireButton>
              </div>
            </EmpireCard>

            <EmpireCard variant="bordered" padding="lg" hoverable>
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Export Data
                </h3>
                <p className="text-gray-400 mb-4">Download customer reports</p>
                <EmpireButton variant="outline" fullWidth>
                  Export CSV
                </EmpireButton>
              </div>
            </EmpireCard>

            <EmpireCard variant="bordered" padding="lg" hoverable>
              <div className="text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Email Campaign
                </h3>
                <p className="text-gray-400 mb-4">Send marketing emails</p>
                <EmpireButton variant="secondary" fullWidth>
                  Create Campaign
                </EmpireButton>
              </div>
            </EmpireCard>
          </EmpireGrid>
        </div>
      )}

      {activeTab === "customers" && (
        <div className="space-y-6">
          {/* Search */}
          <div className="flex gap-4">
            <EmpireInput
              placeholder="Search customers by name, email, or company..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <EmpireButton variant="primary" onClick={handleSearch}>
              Search
            </EmpireButton>
          </div>

          <EmpireGrid columns={selectedCustomer ? 2 : 1} gap="lg">
            {/* Customer List */}
            <EmpireCard variant="bordered" padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Customers ({customers.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {customers.map(customer => (
                  <div
                    key={customer.id}
                    onClick={() => handleCustomerSelect(customer)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedCustomer?.id === customer.id
                        ? "border-yellow-400 bg-yellow-900/20"
                        : "border-gray-700 hover:border-gray-600 bg-gray-800/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-white">
                        {customer.name || "No Name"}
                      </div>
                      <div className="flex gap-2">
                        <EmpireBadge
                          variant={
                            getStatusColor(
                              customer.subscription_status || "free"
                            ) as any
                          }
                          size="sm"
                        >
                          {customer.subscription_status || "free"}
                        </EmpireBadge>
                        <EmpireBadge
                          variant={
                            getPlanColor(
                              customer.subscription_plan || "free"
                            ) as any
                          }
                          size="sm"
                        >
                          {customer.subscription_plan || "free"}
                        </EmpireBadge>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {customer.email}
                    </div>
                    {customer.company && (
                      <div className="text-sm text-gray-500">
                        {customer.company}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      Joined{" "}
                      {new Date(customer.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </EmpireCard>

            {/* Customer Detail */}
            {selectedCustomer && (
              <EmpireCard variant="glow" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Customer Details
                  </h3>
                  <EmpireButton
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCustomer(null)}
                  >
                    ✕
                  </EmpireButton>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <div className="text-white">
                      {selectedCustomer.name || "No Name"}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <div className="text-white">{selectedCustomer.email}</div>
                  </div>
                  {selectedCustomer.company && (
                    <div>
                      <label className="text-sm text-gray-400">Company</label>
                      <div className="text-white">
                        {selectedCustomer.company}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div>
                      <EmpireBadge
                        variant={
                          getStatusColor(
                            selectedCustomer.subscription_status || "free"
                          ) as any
                        }
                      >
                        {selectedCustomer.subscription_status || "free"}
                      </EmpireBadge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Plan</label>
                    <div>
                      <EmpireBadge
                        variant={
                          getPlanColor(
                            selectedCustomer.subscription_plan || "free"
                          ) as any
                        }
                      >
                        {selectedCustomer.subscription_plan || "free"}
                      </EmpireBadge>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-bold text-white mb-3">
                    Recent Activity
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {customerActivity.map(activity => (
                      <div
                        key={activity.id}
                        className="p-3 bg-gray-800/30 rounded-lg"
                      >
                        <div className="text-sm text-white">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-400">
                          {activity.timestamp.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <EmpireButton variant="primary" size="sm">
                    Edit Customer
                  </EmpireButton>
                  <EmpireButton variant="outline" size="sm">
                    Send Email
                  </EmpireButton>
                  <EmpireButton variant="secondary" size="sm">
                    View Billing
                  </EmpireButton>
                </div>
              </EmpireCard>
            )}
          </EmpireGrid>
        </div>
      )}

      {activeTab === "sessions" && (
        <EmpireCard variant="bordered" padding="lg">
          <h3 className="text-xl font-bold text-white mb-4">Chat Sessions</h3>
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">💬</div>
            <p>Chat sessions will be displayed here</p>
            <p className="text-sm">
              Connect with customers through AI-powered conversations
            </p>
          </div>
        </EmpireCard>
      )}
    </div>
  )
}
