"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Coins,
  MessageCircle,
  PieChart,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { dorms } from "@/lib/dorms"

interface PortfolioProperty {
  dormId: number
  occupancyRate: number
  monthlyRevenue: number
  leads: number
  trend: "up" | "down" | "steady"
}

interface LeasingLead {
  id: string
  dormId: number
  roomType: string
  status: "new" | "toured" | "offered" | "signed"
  submitted: string
}

interface MaintenanceItem {
  id: string
  dormId: number
  issue: string
  priority: "low" | "medium" | "high"
  sla: string
}

const portfolioSummary: PortfolioProperty[] = [
  { dormId: 2, occupancyRate: 96, monthlyRevenue: 420000, leads: 28, trend: "up" },
  { dormId: 4, occupancyRate: 88, monthlyRevenue: 365000, leads: 19, trend: "steady" },
  { dormId: 1, occupancyRate: 93, monthlyRevenue: 310000, leads: 22, trend: "up" },
]

const leasingPipeline: LeasingLead[] = [
  { id: "LP-3209", dormId: 4, roomType: "Luxury Duo Suite", status: "offered", submitted: "Mar 12, 2026" },
  { id: "LP-3194", dormId: 2, roomType: "Executive Loft (Shared)", status: "toured", submitted: "Mar 10, 2026" },
  { id: "LP-3188", dormId: 1, roomType: "Shared 2-Bed Suite", status: "new", submitted: "Mar 09, 2026" },
]

const maintenanceQueue: MaintenanceItem[] = [
  { id: "MN-841", dormId: 4, issue: "Elevator service calibration", priority: "high", sla: "Due in 2 days" },
  { id: "MN-838", dormId: 2, issue: "Gym equipment preventive check", priority: "medium", sla: "Scheduled Mar 18" },
  { id: "MN-836", dormId: 1, issue: "Laundry machine firmware update", priority: "low", sla: "Queued" },
]

const performanceInsights = [
  {
    title: "Stabilized occupancy",
    detail: "Average occupancy across properties stayed above 90% for the third consecutive month.",
    icon: Users,
  },
  {
    title: "Revenue uplift",
    detail: "Urban Dorm Plus recorded ₱120k incremental revenue after introducing the 6-month bundle.",
    icon: Coins,
  },
  {
    title: "High-intent leads",
    detail: "Leads converting within 7 days increased by 18%. Consider extending concierge hours.",
    icon: Sparkles,
  },
]

const mobileNavItems = [
  { id: "owner-portfolio", label: "Portfolio", icon: BarChart3, type: "anchor" },
  { id: "owner-leasing", label: "Leads", icon: ClipboardCheck, type: "anchor" },
  { id: "owner-operations", label: "Operations", icon: Wrench, type: "anchor" },
  { id: "owner-insights", label: "Insights", icon: PieChart, type: "anchor" },
  { id: "logout", label: "Log out", icon: LogOut, type: "logout" },
] as const

function getDormName(dormId: number) {
  return dorms.find((dorm) => dorm.id === dormId)?.name ?? "Dorm"
}

function getDormLocation(dormId: number) {
  return dorms.find((dorm) => dorm.id === dormId)?.location ?? ""
}

export default function OwnerHubPage() {
  const [focusDormId, setFocusDormId] = useState(portfolioSummary[0].dormId)
  const router = useRouter()

  const focusDorm = useMemo(() => dorms.find((dorm) => dorm.id === focusDormId), [focusDormId])

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleMobileNavAction = (item: (typeof mobileNavItems)[number]) => {
    if (item.type === "anchor") {
      handleScrollToSection(item.id)
      return
    }

    if (item.type === "logout") {
      router.push("/login?mode=login")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dorm Owner Hub</h1>
            <p className="text-sm text-muted-foreground">
              Track portfolio performance, leasing momentum, and facilities operations in real time.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/listings">
                <Building2 className="mr-2 h-4 w-4" /> Preview storefront
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full">
              <MessageCircle className="mr-2 h-4 w-4" /> Contact account manager
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-32 pt-8 md:pb-12 lg:flex-row">
        <section className="flex-1 space-y-6">
          <Card id="owner-portfolio" className="border border-border/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Portfolio snapshot</p>
                <h2 className="text-2xl font-semibold">Portfolio at a glance</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Toggle between properties to drill into occupancy, revenue pace, and lead activity.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioSummary.map((property) => {
                  const isActive = property.dormId === focusDormId
                  return (
                    <Button
                      key={property.dormId}
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      className={`rounded-full ${isActive ? "bg-primary" : "bg-transparent"}`}
                      onClick={() => setFocusDormId(property.dormId)}
                    >
                      {getDormName(property.dormId)}
                    </Button>
                  )
                })}
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {portfolioSummary.map((property) => (
                <Card key={property.dormId} className="border border-border/60 bg-background p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{getDormName(property.dormId)}</p>
                      <p className="text-xs text-muted-foreground">{getDormLocation(property.dormId)}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${property.trend === "up" ? "bg-green-50 text-green-700" : property.trend === "down" ? "bg-red-50 text-red-700" : "bg-muted text-muted-foreground"}`}>
                      {property.trend === "up" ? "+5%" : property.trend === "down" ? "-2%" : "steady"}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-semibold">{property.occupancyRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Monthly revenue</span>
                      <span className="font-semibold">₱{property.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active leads</span>
                      <span className="font-semibold">{property.leads}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card id="owner-leasing" className="border border-border/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Leasing pipeline</p>
                <h2 className="text-2xl font-semibold">Upcoming move-ins</h2>
              </div>
              <Button variant="outline" className="rounded-full">
                <ClipboardCheck className="mr-2 h-4 w-4" /> Export pipeline
              </Button>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              {leasingPipeline.map((lead) => (
                <Card key={lead.id} className="border border-border/60 bg-background px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{getDormName(lead.dormId)} • {lead.roomType}</p>
                      <p className="text-xs text-muted-foreground">Submitted {lead.submitted}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${lead.status === "signed" ? "bg-green-50 text-green-700" : lead.status === "offered" ? "bg-blue-50 text-blue-700" : lead.status === "toured" ? "bg-purple-50 text-purple-700" : "bg-yellow-50 text-yellow-700"}`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card id="owner-operations" className="border border-border/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Maintenance & ops</p>
                <h2 className="text-2xl font-semibold">Facilities queue</h2>
              </div>
              <Button variant="outline" className="rounded-full">
                <Wrench className="mr-2 h-4 w-4" /> Create work order
              </Button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {maintenanceQueue.map((item) => (
                <Card key={item.id} className="border border-border/60 bg-background px-4 py-4 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-foreground">{item.issue}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${item.priority === "high" ? "bg-red-50 text-red-700" : item.priority === "medium" ? "bg-yellow-50 text-yellow-700" : "bg-muted text-muted-foreground"}`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{getDormName(item.dormId)}</p>
                  <p className="text-xs text-muted-foreground">{item.sla}</p>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        <aside className="w-full space-y-6 lg:w-[320px]">
          <Card id="owner-insights" className="border border-border/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Focus property</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3 rounded-xl border border-border px-3 py-3">
                <BarChart3 className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="font-semibold">{focusDorm?.name}</p>
                  <p className="text-xs text-muted-foreground">{focusDorm?.location}</p>
                  <p className="mt-2 text-xs text-muted-foreground/80">
                    Top amenities: {focusDorm?.amenities.slice(0, 3).join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border px-3 py-3">
                <PieChart className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="font-semibold">Room mix insight</p>
                  <p className="text-xs text-muted-foreground">
                    {focusDorm?.roomTypes.filter((room) => room.isShared).length ?? 0} shared • {
                      focusDorm?.roomTypes.filter((room) => !room.isShared).length ?? 0
                    } private suites.
                  </p>
                </div>
              </div>
              <Button asChild size="sm" variant="ghost" className="w-full justify-start px-0 text-primary">
                <Link href={`/dorm/${focusDorm?.id}`}>
                  <ArrowRight className="mr-2 h-4 w-4" /> View public listing
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="border border-border/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Performance insights</h3>
            <div className="mt-4 space-y-4 text-sm">
              {performanceInsights.map((insight) => {
                const Icon = insight.icon
                return (
                  <div key={insight.title} className="flex items-start gap-3 rounded-xl border border-border px-3 py-3">
                    <Icon className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{insight.title}</p>
                      <p className="text-xs text-muted-foreground">{insight.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card className="border border-border/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Next steps</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <Button variant="ghost" className="w-full justify-between rounded-xl border border-border px-4 py-3">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Run pricing experiment
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between rounded-xl border border-border px-4 py-3">
                <span className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4" /> Schedule open house
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between rounded-xl border border-border px-4 py-3">
                <span className="flex items-center gap-2">
                  <Coins className="h-4 w-4" /> Review revenue forecast
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </aside>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg md:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-around">
          {mobileNavItems.map((item) => {
            const Icon = item.icon
            const isLogout = item.type === "logout"

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMobileNavAction(item)}
                className={`flex flex-col items-center gap-1 text-xs font-semibold transition ${
                  isLogout ? "text-destructive hover:text-destructive" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    isLogout ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
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
