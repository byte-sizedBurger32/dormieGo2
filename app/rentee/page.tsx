"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Copy,
  FileSignature,
  FileText,
  History,
  Home,
  Mail,
  MessageCircle,
  MoveRight,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Telescope,
  Users,
  Wallet,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { dorms } from "@/lib/dorms"
import type { DormInfo } from "@/lib/dorms"

interface ContractSummary {
  dormId: number
  roomId: string
  status: "awaiting-signatures" | "active"
  nextAction: string
  dueDate: string
  progress: number
}

interface MaintenanceTicket {
  id: string
  dormId: number
  issue: string
  status: "new" | "in-progress" | "resolved"
  created: string
  updated: string
}

interface RoommateInvite {
  name: string
  email: string
  status: "invited" | "signature-pending" | "id-verifying" | "complete"
  invitedOn: string
}

interface UpcomingEvent {
  title: string
  date: string
  location: string
  summary: string
}

interface PaymentRecord {
  id: string
  dormId: number
  amount: number
  dueDate: string
  paidDate: string
  method: string
}

interface SupportThread {
  id: string
  subject: string
  status: "responded" | "awaiting-user" | "opened"
  lastMessage: string
}

const contractSummaries: ContractSummary[] = [
  {
    dormId: 2,
    roomId: "shared-loft",
    status: "awaiting-signatures",
    nextAction: "Collect remaining roommate signatures",
    dueDate: "Mar 20, 2026",
    progress: 62,
  },
  {
    dormId: 1,
    roomId: "studio",
    status: "active",
    nextAction: "Next payment auto-charge",
    dueDate: "Apr 05, 2026",
    progress: 100,
  },
]

const roommateInvites: RoommateInvite[] = [
  {
    name: "Karla De Leon",
    email: "karla.deleon@email.com",
    status: "signature-pending",
    invitedOn: "Mar 08, 2026",
  },
  {
    name: "Miguel Ramos",
    email: "miguel.ramos@email.com",
    status: "id-verifying",
    invitedOn: "Mar 09, 2026",
  },
]

const maintenanceTickets: MaintenanceTicket[] = [
  {
    id: "MT-2315",
    dormId: 2,
    issue: "Air-conditioning thermostat stuck",
    status: "in-progress",
    created: "Mar 03, 2026",
    updated: "Mar 10, 2026",
  },
  {
    id: "MT-2298",
    dormId: 1,
    issue: "WiFi intermittent on level 3",
    status: "resolved",
    created: "Feb 28, 2026",
    updated: "Mar 02, 2026",
  },
]

const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Move-in orientation",
    date: "Mar 18, 2026",
    location: "Roof deck lounge",
    summary: "Meet the community managers, get your access badges, and tour the amenities.",
  },
  {
    title: "Study pod reservations open",
    date: "Mar 22, 2026",
    location: "Level 3 Co-work",
    summary: "Secure private study pods for finals week. Slots refresh weekly.",
  },
]

const paymentHistory: PaymentRecord[] = [
  {
    id: "INV-1014",
    dormId: 2,
    amount: 4200,
    dueDate: "Mar 05, 2026",
    paidDate: "Mar 04, 2026",
    method: "Debit Card",
  },
  {
    id: "INV-1007",
    dormId: 1,
    amount: 4500,
    dueDate: "Feb 05, 2026",
    paidDate: "Feb 05, 2026",
    method: "GCash",
  },
]

const supportThreads: SupportThread[] = [
  {
    id: "SUP-239",
    subject: "Request for early move-in",
    status: "responded",
    lastMessage: "Mar 12, 2026",
  },
  {
    id: "SUP-244",
    subject: "Roommate replacement options",
    status: "awaiting-user",
    lastMessage: "Mar 11, 2026",
  },
]

function getDormById(id: number): DormInfo | undefined {
  return dorms.find((dorm) => dorm.id === id)
}

function formatCurrency(amount: number) {
  return `₱${amount.toLocaleString()}`
}

function getBadgeClasses(status: string) {
  if (status === "active" || status === "responded" || status === "resolved" || status === "complete") {
    return "bg-green-50 text-green-700"
  }
  if (status === "awaiting-signatures" || status === "signature-pending" || status === "awaiting-user") {
    return "bg-yellow-50 text-yellow-700"
  }
  if (status === "in-progress" || status === "id-verifying") {
    return "bg-blue-50 text-blue-700"
  }
  return "bg-muted text-muted-foreground"
}

export default function RenteeDashboardPage() {
  const [selectedContract, setSelectedContract] = useState(contractSummaries[0])

  const selectedDorm = useMemo(() => getDormById(selectedContract.dormId), [selectedContract.dormId])
  const selectedRoom = useMemo(
    () => selectedDorm?.roomTypes.find((room) => room.id === selectedContract.roomId),
    [selectedDorm, selectedContract.roomId],
  )
  const sharedRoom = selectedRoom && selectedRoom.isShared ? selectedRoom : undefined

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Resident Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage contracts, payments, roommates, maintenance, and support from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/listings">
                <Telescope className="mr-2 h-4 w-4" /> Explore dorms
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full">
              <MessageCircle className="mr-2 h-4 w-4" /> Chat concierge
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <section className="flex-1 space-y-6">
          <Card className="border border-border/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Active contracts</p>
                <h2 className="text-2xl font-semibold">Shared suite progress</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Monitor digital signatures, ID checks, and payment readiness before move-in.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {contractSummaries.map((summary) => {
                  const dorm = getDormById(summary.dormId)
                  const label = dorm ? dorm.name : "Dorm"
                  const isActive = summary.roomId === selectedContract.roomId
                  return (
                    <Button
                      key={`${summary.dormId}-${summary.roomId}`}
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      className={`rounded-full ${isActive ? "bg-primary" : "bg-transparent"}`}
                      onClick={() => setSelectedContract(summary)}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/30 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedRoom?.type ?? "Selected room"}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDorm?.name}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses(selectedContract.status)}`}>
                    {selectedContract.status === "active" ? "Fully active" : "Awaiting signatures"}
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Next action</p>
                  <p className="text-sm font-semibold text-foreground">{selectedContract.nextAction}</p>
                  <p className="text-xs text-muted-foreground">Due by {selectedContract.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Progress</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${selectedContract.progress}%` }}
                    />
                  </div>
                </div>
                {sharedRoom && (
                  <div className="space-y-3 rounded-xl bg-primary/5 p-4 text-sm text-muted-foreground">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-primary">
                        <Users className="h-4 w-4" /> Roommate slots
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        Slots remaining: {sharedRoom.slotsAvailable ?? 0}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="bg-background">
                        Copy invite link
                        <Copy className="ml-2 h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                        <Mail className="mr-2 h-3.5 w-3.5" /> Send reminders
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Card className="border border-border/60 bg-background p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Roommates</h3>
                <div className="mt-4 space-y-3 text-sm">
                  {roommateInvites.map((invite) => (
                    <div key={invite.email} className="flex items-start justify-between rounded-lg border border-border px-3 py-2">
                      <div>
                        <p className="font-semibold text-foreground">{invite.name}</p>
                        <p className="text-xs text-muted-foreground">{invite.email}</p>
                        <p className="text-xs text-muted-foreground">Invited {invite.invitedOn}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getBadgeClasses(invite.status)}`}>
                        {invite.status.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Card>

          <Card className="border border-border/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Payments</p>
                <h2 className="text-2xl font-semibold">Billing & history</h2>
              </div>
              <Button variant="outline" className="rounded-full">
                <Wallet className="mr-2 h-4 w-4" /> Manage payment method
              </Button>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/30 p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <CalendarCheck className="h-4 w-4 text-primary" /> Upcoming payment
                </h3>
                <p className="text-sm text-muted-foreground">{selectedDorm?.name} • {selectedRoom?.type}</p>
                <div className="rounded-xl bg-background p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Amount due</span>
                    <span className="text-xl font-semibold text-primary">{formatCurrency(selectedRoom?.price ?? 0)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Due on {selectedContract.dueDate}</span>
                    <span>Auto-charge via card</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-background px-3 py-1">Auto-pay scheduled</span>
                  <span className="rounded-full bg-background px-3 py-1">Split with roommates</span>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/60 bg-background p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <History className="h-4 w-4 text-primary" /> Payment history
                </h3>
                <div className="space-y-3 text-sm">
                  {paymentHistory.map((payment) => {
                    const dorm = getDormById(payment.dormId)
                    return (
                      <div key={payment.id} className="rounded-xl border border-border px-3 py-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{dorm?.name ?? "Dorm"}</span>
                          <span className="text-primary">{formatCurrency(payment.amount)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Due {payment.dueDate} • Paid {payment.paidDate} • {payment.method}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-border/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Support & maintenance</p>
                <h2 className="text-2xl font-semibold">Stay on top of requests</h2>
              </div>
              <Button variant="outline" className="rounded-full">
                <Wrench className="mr-2 h-4 w-4" /> Submit maintenance ticket
              </Button>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/30 p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Maintenance tickets
                </h3>
                <div className="space-y-3 text-sm">
                  {maintenanceTickets.map((ticket) => {
                    const dorm = getDormById(ticket.dormId)
                    return (
                      <div key={ticket.id} className="rounded-xl border border-border px-3 py-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{ticket.issue}</span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getBadgeClasses(ticket.status)}`}>
                            {ticket.status.replace("-", " ")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {dorm?.name ?? "Dorm"} • Created {ticket.created} • Updated {ticket.updated}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/60 bg-background p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <Mail className="h-4 w-4 text-primary" /> Support threads
                </h3>
                <div className="space-y-3 text-sm">
                  {supportThreads.map((thread) => (
                    <div key={thread.id} className="rounded-xl border border-border px-3 py-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{thread.subject}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getBadgeClasses(thread.status)}`}>
                          {thread.status.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Last message {thread.lastMessage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <aside className="w-full space-y-6 lg:w-[320px]">
          <Card className="border border-border/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Resident journey</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3 rounded-xl border border-border px-3 py-3">
                <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="font-semibold">Complete onboarding tasks</p>
                  <p className="text-xs text-muted-foreground">
                    Verify your ID, confirm payment method, and finalize roommate invitations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border px-3 py-3">
                <Home className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="font-semibold">Check-in checklist</p>
                  <p className="text-xs text-muted-foreground">
                    Download your digital pass, review house rules, and confirm room inventory.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border px-3 py-3">
                <Sparkles className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="font-semibold">Personalize your stay</p>
                  <p className="text-xs text-muted-foreground">
                    Book add-ons like laundry bundles, study pod hours, and guest passes anytime.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-border/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Upcoming events</h3>
            <div className="mt-4 space-y-4 text-sm">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="rounded-xl border border-border px-3 py-3">
                  <p className="font-semibold text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date} • {event.location}</p>
                  <p className="mt-2 text-xs text-muted-foreground/80">{event.summary}</p>
                  <Button size="sm" variant="ghost" className="mt-2 px-0 text-xs text-primary">
                    <MoveRight className="mr-1 h-3 w-3" /> View details
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-border/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Documents</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <Button variant="ghost" className="w-full justify-between rounded-xl border border-border px-4 py-3">
                <span className="flex items-center gap-2">
                  <FileSignature className="h-4 w-4" /> Lease agreement (PDF)
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between rounded-xl border border-border px-4 py-3">
                <span className="flex items-center gap-2">
                  <ScanFace className="h-4 w-4" /> ID verification receipt
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between rounded-xl border border-border px-4 py-3">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Move-in checklist
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </aside>
      </main>
    </div>
  )
}
