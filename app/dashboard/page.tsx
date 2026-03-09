"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DollarSign,
  Wrench,
  Bell,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Phone,
  Users,
  Shield,
  Camera,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("payments")

  const user = {
    name: "Maria Santos",
    dorm: "Urban Dorm Plus",
    roomNumber: "204B",
    rentDue: 5200,
    rentStatus: "due",
  }

  const payments = [
    {
      id: 1,
      date: "Nov 1, 2025",
      amount: 5200,
      status: "paid",
      method: "Bank Transfer",
      receipt: "#RCP-2025-001",
    },
    {
      id: 2,
      date: "Oct 1, 2025",
      amount: 5200,
      status: "paid",
      method: "GCash",
      receipt: "#RCP-2025-002",
    },
    {
      id: 3,
      date: "Sep 1, 2025",
      amount: 5200,
      status: "paid",
      method: "Bank Transfer",
      receipt: "#RCP-2025-003",
    },
  ]

  const upcomingPayments = [
    {
      id: 1,
      date: "Dec 1, 2025",
      amount: 5200,
      status: "upcoming",
      daysUntil: 25,
    },
  ]

  const maintenanceRequests = [
    {
      id: 1,
      title: "AC not cooling properly",
      category: "Air Conditioning",
      status: "in-progress",
      reported: "Nov 4, 2025",
      priority: "high",
      description: "Reported that the AC unit is making noise and not cooling the room.",
    },
    {
      id: 2,
      title: "Broken light bulb in bathroom",
      category: "Lighting",
      status: "resolved",
      reported: "Nov 2, 2025",
      priority: "low",
      description: "Light bulb replaced on the same day.",
    },
    {
      id: 3,
      title: "Leaking water from ceiling",
      category: "Plumbing",
      status: "pending",
      reported: "Nov 5, 2025",
      priority: "critical",
      description: "Water dripping from ceiling near the window.",
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "Scheduled Maintenance - Building A",
      date: "Nov 10-12, 2025",
      priority: "medium",
      content: "Water system maintenance in Building A. Expect reduced water pressure.",
    },
    {
      id: 2,
      title: "WiFi Upgrade Complete",
      date: "Nov 8, 2025",
      priority: "low",
      content: "WiFi speeds have been upgraded to 100 Mbps. No action needed.",
    },
    {
      id: 3,
      title: "New Security Protocol",
      date: "Nov 1, 2025",
      priority: "high",
      content: "New visitor verification required. Please visit the office for details.",
    },
  ]

  const tabs = [
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "announcements", label: "Announcements", icon: Bell },
  ]

  const activeMaintenanceCount = maintenanceRequests.filter((request) => request.status !== "resolved").length
  const nextPayment = upcomingPayments[0]
  const importantAnnouncements = announcements.filter((announcement) => announcement.priority !== "low").length
  const totalAlerts = activeMaintenanceCount + importantAnnouncements

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: "bg-green-50 text-green-700 border-green-200",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      upcoming: "bg-blue-50 text-blue-700 border-blue-200",
      "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
      resolved: "bg-green-50 text-green-700 border-green-200",
      overdue: "bg-red-50 text-red-700 border-red-200",
      critical: "bg-destructive/10 text-destructive",
      high: "bg-orange-50 text-orange-700",
      medium: "bg-yellow-50 text-yellow-700",
      low: "bg-blue-50 text-blue-700",
    }
    return colors[status] || "bg-muted text-muted-foreground"
  }

  const getStatusIcon = (status: string) => {
    if (status === "paid" || status === "resolved") return <CheckCircle className="w-4 h-4" />
    if (status === "in-progress" || status === "upcoming") return <Clock className="w-4 h-4" />
    if (status === "critical" || status === "overdue") return <AlertCircle className="w-4 h-4" />
    return <Clock className="w-4 h-4" />
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background overflow-hidden">
      <header className="relative overflow-hidden bg-gradient-to-b from-primary to-primary/80 text-primary-foreground">
        <div className="absolute -left-16 top-8 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-12 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-12 pb-28 md:pb-36">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">Dashboard</p>
              <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">Hi, {user.name}</h1>
              <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base">
                Stay on top of payments, maintenance, and community updates for {user.dorm}.
              </p>
            </div>
            <div className="hidden gap-2 md:flex">
              <Link href="/account">
                <Button className="rounded-full bg-white text-primary hover:bg-white/90">Account Center</Button>
              </Link>
              <Link href="/listings">
                <Button
                  variant="outline"
                  className="rounded-full border-white/40 bg-white/20 text-white hover:bg-white/30"
                >
                  Browse Dorms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative -mt-24 flex-1 overflow-y-auto rounded-t-3xl bg-background pt-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-28 md:pb-12">
          <Card className="fade-in-delayed rounded-3xl border border-border/60 bg-gradient-to-r from-primary/5 to-accent/10 p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                <div>
                  <p className="text-sm text-muted-foreground">Current Dorm</p>
                  <p className="text-lg font-semibold text-foreground">{user.dorm}</p>
                  <p className="text-sm text-muted-foreground">Room {user.roomNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Rent</p>
                  <p className="text-2xl font-bold text-primary">₱{user.rentDue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold capitalize text-foreground">{user.rentStatus}</p>
                  {user.rentStatus === "due" && <p className="text-xs text-destructive">Payment due by Dec 1</p>}
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-2xl bg-primary/10 px-4 py-3 text-primary">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="text-sm font-semibold">{totalAlerts > 0 ? `${totalAlerts} active alert${totalAlerts > 1 ? "s" : ""}` : "All clear"}</p>
                  <p className="text-xs text-primary/80">
                    {totalAlerts > 0
                      ? `${activeMaintenanceCount} maintenance • ${importantAnnouncements} announcements`
                      : "You are up to date with your dorm"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Access Features */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Link href="/emergency">
              <Card className="group flex h-full cursor-pointer flex-col items-center gap-3 border border-destructive/20 bg-destructive/5 p-4 text-center transition hover:border-destructive/40 hover:shadow-md">
                <div className="rounded-xl bg-destructive/10 p-3 text-destructive transition group-hover:bg-destructive group-hover:text-destructive-foreground">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Emergency</p>
                  <p className="text-xs text-muted-foreground">24/7 Support</p>
                </div>
              </Card>
            </Link>
            <Link href="/roommate-finder">
              <Card className="group flex h-full cursor-pointer flex-col items-center gap-3 border border-primary/20 bg-primary/5 p-4 text-center transition hover:border-primary/40 hover:shadow-md">
                <div className="rounded-xl bg-primary/10 p-3 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Roommate</p>
                  <p className="text-xs text-muted-foreground">Find Match</p>
                </div>
              </Card>
            </Link>
            <Link href="/tenant-score">
              <Card className="group flex h-full cursor-pointer flex-col items-center gap-3 border border-accent/20 bg-accent/5 p-4 text-center transition hover:border-accent/40 hover:shadow-md">
                <div className="rounded-xl bg-accent/10 p-3 text-accent-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Tenant Score</p>
                  <p className="text-xs text-muted-foreground">View Profile</p>
                </div>
              </Card>
            </Link>
            <Link href="/listings">
              <Card className="group flex h-full cursor-pointer flex-col items-center gap-3 border border-border p-4 text-center transition hover:border-primary/40 hover:shadow-md">
                <div className="rounded-xl bg-muted p-3 text-muted-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Virtual Tours</p>
                  <p className="text-xs text-muted-foreground">Explore Dorms</p>
                </div>
              </Card>
            </Link>
          </div>

          <div className="flex justify-center md:justify-start">
            <div className="flex w-full max-w-full items-center overflow-hidden rounded-full bg-muted/60 p-1 text-sm md:max-w-md">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-0 rounded-full px-4 py-2 font-semibold transition ${
                      isActive ? "bg-background text-primary shadow" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2 truncate">
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Alert */}
              <Card className="fade-in-stagger p-4 border-l-4 border-l-primary bg-primary/5" style={{ animationDelay: "0.05s" }}>
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">Payment Due Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      Your December rent (₱5,200) is due on December 1, 2025.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Payment History */}
              <div>
                <h2 className="text-xl font-bold mb-4">Payment History</h2>
                <div className="space-y-3">
                  {payments.map((payment, index) => (
                    <Card
                      key={payment.id}
                      style={{ animationDelay: `${0.08 + index * 0.04}s` }}
                      className="fade-in-stagger p-4 transition hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold">{payment.date}</p>
                          <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₱{payment.amount.toLocaleString()}</p>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(payment.status)}`}
                          >
                            {getStatusIcon(payment.status)}
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{payment.receipt}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Sidebar */}
            <div className="space-y-6">
              {/* Make Payment Card */}
              <Card className="fade-in-stagger p-6 border-0 bg-gradient-to-br from-primary to-accent" style={{ animationDelay: "0.12s" }}>
                <h3 className="font-bold text-white mb-2">Make a Payment</h3>
                <p className="text-sm text-white/80 mb-4">Secure payment methods available</p>
                <Button className="w-full bg-white text-primary hover:bg-white/90 mb-3">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
                <div className="space-y-2 text-xs text-white/70">
                  <p>Bank Transfer</p>
                  <p>GCash / PayMaya</p>
                  <p>Over-the-counter</p>
                </div>
              </Card>

              {/* Upcoming Payments */}
              <Card className="fade-in-stagger p-6" style={{ animationDelay: "0.16s" }}>
                <h3 className="font-bold mb-4">Upcoming Payments</h3>
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">{payment.date}</p>
                    <p className="text-2xl font-bold text-primary">₱{payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">In {payment.daysUntil} days</p>
                  </div>
                ))}
              </Card>

              {/* Download Invoice */}
              <Card className="fade-in-stagger p-4" style={{ animationDelay: "0.2s" }}>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoices
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === "maintenance" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Maintenance Requests</h2>
                <Link href="/maintenance/new">
                  <Button className="bg-primary hover:bg-primary/90">Report Issue</Button>
                </Link>
              </div>

              {maintenanceRequests.map((request, index) => (
                <Card
                  key={request.id}
                  style={{ animationDelay: `${0.05 + index * 0.05}s` }}
                  className="fade-in-stagger p-6 transition hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{request.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{request.category}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getStatusColor(request.status)}`}
                      >
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace("-", " ")}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getStatusColor(request.priority)}`}
                      >
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                  <p className="text-xs text-muted-foreground">Reported: {request.reported}</p>
                </Card>
              ))}
            </div>

            {/* Maintenance Sidebar */}
            <div className="space-y-6">
              <Card className="fade-in-stagger p-6 border-accent/20 bg-accent/5" style={{ animationDelay: "0.08s" }}>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Report New Issue
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need maintenance? Report it now and we'll get it fixed.
                </p>
                <Link href="/maintenance/new">
                  <Button className="w-full bg-accent hover:bg-accent/90">Report Issue</Button>
                </Link>
              </Card>

              <Card className="fade-in-stagger p-6" style={{ animationDelay: "0.14s" }}>
                <h3 className="font-bold mb-3">Response Times</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Critical</span>
                    <span className="font-semibold">4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">High</span>
                    <span className="font-semibold">1 day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Medium</span>
                    <span className="font-semibold">3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Low</span>
                    <span className="font-semibold">7 days</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Building Announcements</h2>
            {announcements.map((announcement, index) => (
              <Card
                key={announcement.id}
                style={{ animationDelay: `${0.05 + index * 0.05}s` }}
                className="fade-in-stagger p-6 transition hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(announcement.priority)}`}
                  >
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{announcement.date}</p>
                <p className="text-muted-foreground">{announcement.content}</p>
              </Card>
            ))}
          </div>
        )}
        </div>
      </main>
    </div>
  )
}
