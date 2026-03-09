"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Users, AlertTriangle, TrendingUp, Eye, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const stats = [
    { label: "Total Users", value: "2,340", change: "+12.5%" },
    { label: "Active Dorms", value: "28", change: "+3 this month" },
    { label: "Revenue", value: "₱1.2M", change: "+18.2%" },
    { label: "Support Tickets", value: "47", change: "12 pending" },
  ]

  const recentListings = [
    {
      id: 1,
      name: "Cozy Student Haven",
      status: "active",
      users: 245,
      revenue: "₱1.1M",
    },
    {
      id: 2,
      name: "Urban Dorm Plus",
      status: "active",
      users: 312,
      revenue: "₱1.6M",
    },
    {
      id: 3,
      name: "Premium Student Living",
      status: "active",
      users: 189,
      revenue: "₱1.2M",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      dorm: "New Student Plaza",
      location: "Diliman, QC",
      rating: 4.5,
      listings: 12,
      status: "pending",
    },
    {
      id: 2,
      dorm: "Budget Haven Dorm",
      location: "Sampaloc, Manila",
      rating: 4.2,
      listings: 8,
      status: "pending",
    },
  ]

  const flaggedContent = [
    {
      id: 1,
      type: "Review",
      content: "Inappropriate language in review",
      author: "Anonymous User",
      reports: 3,
      status: "under-review",
    },
    {
      id: 2,
      type: "Forum Post",
      content: "Spam advertisement",
      author: "User123",
      reports: 5,
      status: "under-review",
    },
  ]

  const mobileNavItems = [
    { key: "stats", label: "Stats", icon: BarChart3, type: "anchor", target: "admin-stats" },
    { key: "overview", label: "Overview", icon: TrendingUp, type: "tab", tab: "overview", target: "admin-overview" },
    { key: "users", label: "Users", icon: Users, type: "tab", tab: "users", target: "admin-users" },
    { key: "approvals", label: "Approvals", icon: AlertTriangle, type: "tab", tab: "approvals", target: "admin-approvals" },
    { key: "content", label: "Moderate", icon: Eye, type: "tab", tab: "content", target: "admin-content" },
    { key: "logout", label: "Log out", icon: LogOut, type: "logout", target: "logout" },
  ] as const

  const handleMobileNavClick = (item: (typeof mobileNavItems)[number]) => {
    if (item.type === "logout") {
      router.push("/login?mode=login")
      return
    }

    if (item.type === "anchor") {
      const section = document.getElementById(item.target)
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      return
    }

    if (item.type === "tab") {
      setActiveTab(item.tab)
      window.requestAnimationFrame(() => {
        const section = document.getElementById(item.target)
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Platform overview and management</p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Site</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-32 pt-8 md:pb-12">
        {/* Stats Grid */}
        <div id="admin-stats" className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-xs text-green-600 font-semibold">{stat.change}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div id="admin-tabs" className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "users", label: "Users", icon: Users },
            { id: "approvals", label: "Approvals", icon: AlertTriangle },
            { id: "content", label: "Moderation", icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-4 font-semibold transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div id="admin-overview" className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performing Dorms
                </h2>
                <div className="space-y-3">
                  {recentListings.map((dorm) => (
                    <div
                      key={dorm.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3 transition hover:bg-muted"
                    >
                      <div>
                        <p className="font-semibold">{dorm.name}</p>
                        <p className="text-xs text-muted-foreground">{dorm.users} active renters</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{dorm.revenue}</p>
                        <span className="rounded bg-green-50 px-2 py-1 text-xs text-green-700">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
                <div className="space-y-3 text-sm">
                  <p>23 new user registrations today</p>
                  <p>5 new dorm listings submitted</p>
                  <p>12 support tickets resolved</p>
                  <p>8 moderation actions taken</p>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Review Approvals (2)
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Moderation Queue (2)
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card id="admin-users" className="p-6">
            <h2 className="font-bold text-lg mb-4">User Management</h2>
            <div className="space-y-3">
              {[
                { name: "Maria Santos", email: "maria@email.com", status: "verified", joined: "Aug 2024" },
                { name: "John Cruz", email: "john@email.com", status: "verified", joined: "Sep 2024" },
                { name: "Ana Reyes", email: "ana@email.com", status: "pending", joined: "Nov 2025" },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${user.status === "verified" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
                    >
                      {user.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Joined {user.joined}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Approvals Tab */}
        {activeTab === "approvals" && (
          <Card id="admin-approvals" className="p-6">
            <h2 className="font-bold text-lg mb-4">Pending Dorm Approvals ({pendingApprovals.length})</h2>
            <div className="space-y-4">
              {pendingApprovals.map((dorm) => (
                <div key={dorm.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-lg">{dorm.dorm}</p>
                      <p className="text-sm text-muted-foreground">{dorm.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-semibold">
                      Pending Review
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span>Rating: {dorm.rating}/5</span>
                    <span>{dorm.listings} listings</span>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" size="sm">
                      Approve
                    </Button>
                    <Button className="flex-1 bg-transparent" variant="outline" size="sm">
                      Request Changes
                    </Button>
                    <Button className="flex-1 bg-destructive hover:bg-destructive/90" variant="outline" size="sm">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Moderation Tab */}
        {activeTab === "content" && (
          <Card id="admin-content" className="p-6">
            <h2 className="font-bold text-lg mb-4">Flagged Content ({flaggedContent.length})</h2>
            <div className="space-y-4">
              {flaggedContent.map((item) => (
                <div key={item.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{item.type}</span>
                        <span className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded">{item.reports} reports</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">By {item.author}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                      <Eye className="w-4 h-4" />
                      Review
                    </Button>
                    <Button size="sm" className="flex items-center gap-1">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg md:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-around">
          {mobileNavItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.type === "tab"
                ? activeTab === item.tab
                : false
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleMobileNavClick(item)}
                className={`flex flex-col items-center gap-1 text-xs font-semibold transition ${
                  item.type === "logout"
                    ? "text-destructive hover:text-destructive"
                    : isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    item.type === "logout" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
