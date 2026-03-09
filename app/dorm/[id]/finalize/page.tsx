"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Users,
  FileSignature,
  Upload,
  CreditCard,
  Check,
  Calendar,
  Shield,
  Sparkles,
  MapPin,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dorms } from "@/lib/dorms"
import type { DormInfo, DormRoomType } from "@/lib/dorms"

const steps = [
  {
    id: "profile",
    label: "Resident Info",
    description: "Tell us about who will stay",
    icon: Users,
  },
  {
    id: "contract",
    label: "Contract & IDs",
    description: "Sign agreement and upload valid ID",
    icon: FileSignature,
  },
  {
    id: "payment",
    label: "Payment",
    description: "Choose payment option",
    icon: CreditCard,
  },
  {
    id: "confirmation",
    label: "Confirmation",
    description: "Review and confirm booking",
    icon: Check,
  },
]

export default function FinalizeDormBookingPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const dormIdParam = params.id as string
  const roomIdParam = searchParams.get("room")
  const [activeStep, setActiveStep] = useState(0)

  const dorm: DormInfo = useMemo(() => {
    const numericId = Number.parseInt(dormIdParam, 10)
    return dorms.find((entry) => entry.slug === dormIdParam || entry.id === numericId) ?? dorms[0]
  }, [dormIdParam])

  const room: DormRoomType | undefined = useMemo(() => {
    if (!roomIdParam) return dorm.roomTypes[0]
    return dorm.roomTypes.find((item) => item.id === roomIdParam) ?? dorm.roomTypes[0]
  }, [dorm.roomTypes, roomIdParam])

  const progress = (activeStep / (steps.length - 1)) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href={`/dorm/${dorm.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Dorm
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contract workflow</span>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <Card className="border border-border p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Selected room</p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight">
                  {dorm.name}
                  <span className="block text-base font-normal text-muted-foreground">{room?.type}</span>
                </h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {dorm.location} • {dorm.distanceLabel}
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 px-4 py-3 text-right">
                <p className="text-xs uppercase text-primary">Monthly rate</p>
                <p className="text-3xl font-bold text-primary">₱{room?.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{room?.occupancy}</p>
              </div>
            </div>
            {room?.isShared && (
              <div className="mt-4 rounded-xl bg-accent/10 p-4 text-sm text-accent-foreground">
                <div className="flex items-center gap-2 font-medium">
                  <Users className="h-4 w-4" /> Shared room workflow
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Invite your roommates to complete their ID verification. Everyone must sign before payment is processed.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-primary/90 text-primary-foreground hover:bg-primary">
                    <Users className="mr-2 h-4 w-4" /> Copy invite link
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" /> Coordinate move-in
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <Card className="border border-border p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Progress</p>
                <h2 className="mt-1 text-xl font-semibold">Finalize your booking in four steps</h2>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                Step {activeStep + 1} of {steps.length}
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === activeStep
                const isComplete = index < activeStep
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : isComplete
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-border bg-background"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full ${
                        isComplete ? "bg-green-500 text-white" : isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <p className="text-sm font-semibold text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>

          <Card className="border border-border p-6 shadow-sm">
            {activeStep === 0 && <ResidentInformation />}
            {activeStep === 1 && <ContractAndIds room={room} dormName={dorm.name} />}
            {activeStep === 2 && <PaymentOptions dorm={dorm} />}
            {activeStep === 3 && <ConfirmationSummary dorm={dorm} room={room} />}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Fee breakdown</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span>Security deposit</span>
                <span className="font-semibold text-foreground">
                  ₱{dorm.fees.find((fee) => fee.label.toLowerCase().includes("deposit"))?.amount.toLocaleString() ?? "0"}
                </span>
              </li>
              {dorm.fees.map((fee) => (
                <li key={fee.label} className="flex items-center justify-between text-muted-foreground">
                  <span>{fee.label}</span>
                  <span>₱{fee.amount.toLocaleString()} ({fee.frequency})</span>
                </li>
              ))}
              <li className="flex items-center justify-between border-t border-dashed border-border pt-2 text-sm font-semibold">
                <span>First month due today</span>
                <span>₱{room?.price.toLocaleString()}</span>
              </li>
            </ul>
          </Card>

          <Card className="border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Next actions</h3>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <Shield className="mt-1 h-4 w-4 text-primary" />
                Contract will be counter-signed by dorm admin once all residents submit their IDs.
              </p>
              <p className="flex items-start gap-2">
                <Sparkles className="mt-1 h-4 w-4 text-primary" />
                Uploading a clear photo ID fast-tracks approval (average turnaround within 12 hours).
              </p>
              <p className="flex items-start gap-2">
                <CreditCard className="mt-1 h-4 w-4 text-primary" />
                Payment link activates after signatures are complete.
              </p>
            </div>
          </Card>

          <Card className="border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Need assistance?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Chat with DormieGO concierge to coordinate move-in schedules or ask about furnishing upgrades.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" className="bg-primary/90 text-primary-foreground hover:bg-primary">
                Message concierge
              </Button>
              <Button size="sm" variant="outline">
                Call admin office
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ResidentInformation() {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Step 1</p>
        <h3 className="mt-2 text-2xl font-semibold">Resident details</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          If you are booking for multiple roommates, add them below so they receive their own verification link.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Primary resident</label>
          <input
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Full name"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">University email</label>
          <input
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="name@school.edu"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contact number</label>
          <input
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="09XX XXXXXXX"
            type="tel"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preferred move-in</label>
          <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" type="date" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Invite roommates</span>
          <Button size="sm" variant="outline">
            <Users className="mr-2 h-4 w-4" /> Add roommate
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Roommates will receive an email invitation to enter their details and ID. You can add them later if you’re still finalizing who will stay.
        </p>
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save and continue</Button>
    </div>
  )
}

function ContractAndIds({ room, dormName }: { room?: DormRoomType; dormName: string }) {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Step 2</p>
        <h3 className="mt-2 text-2xl font-semibold">Contract & ID verification</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Review the lease summary, sign digitally, and upload a government-issued ID. Shared occupants will sign the same document.
        </p>
      </header>
      <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
        <p className="font-semibold text-primary">Lease summary</p>
        <p className="mt-1 text-muted-foreground">
          {dormName} • {room?.type} • Minimum stay: 6 months • Monthly dues: ₱{room?.price.toLocaleString()}
        </p>
        <Button size="sm" className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90">
          <FileSignature className="mr-2 h-4 w-4" /> Generate e-contract
        </Button>
      </div>
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Upload valid ID</label>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Drag & drop or browse JPG/PNG/PDF files up to 5MB.</p>
          <Button size="sm" variant="outline">
            Upload front & back
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-muted/30 p-4 text-xs text-muted-foreground">
        • Accepted IDs: Passport, Driver’s License, School ID with registration form
        <br />• Expect verification update via email within one business day
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Mark as completed</Button>
    </div>
  )
}

function PaymentOptions({ dorm }: { dorm: DormInfo }) {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Step 3</p>
        <h3 className="mt-2 text-2xl font-semibold">Payment options</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose how you want to settle the first month and recurring charges. Secure payment link will be sent once the contract is fully signed.
        </p>
      </header>
      <div className="space-y-3">
        {[
          {
            value: "gcash",
            label: "GCash",
            description: "Pay instantly with your GCash wallet and split payments with roommates.",
          },
          {
            value: "card",
            label: "Debit/Credit Card",
            description: "Visa, Mastercard, and JCB supported. Auto-charge every billing cycle.",
          },
          {
            value: "bank",
            label: "Bank Transfer",
            description: "Manual transfer to dorm admin account. Upload proof to confirm.",
          },
        ].map((option) => (
          <label
            key={option.value}
            className="group flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-background px-4 py-3 transition hover:border-primary/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{option.label}</span>
              <input className="h-4 w-4" name="payment-option" type="radio" value={option.value} />
            </div>
            <span className="text-xs text-muted-foreground">{option.description}</span>
          </label>
        ))}
      </div>
      <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        Monthly bills will be sent every 25th of the month. Partial payments are allowed for shared rooms; DormieGO tracks who has paid.
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save payment preference</Button>
      <p className="text-xs text-muted-foreground">
        Need installment plans? Contact DormieGO concierge for flexible payment options.
      </p>
    </div>
  )
}

function ConfirmationSummary({ dorm, room }: { dorm: DormInfo; room?: DormRoomType }) {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Step 4</p>
        <h3 className="mt-2 text-2xl font-semibold">Review & confirm</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Double check your details before submitting. You’ll receive a confirmation email with move-in instructions.
        </p>
      </header>
      <div className="space-y-3 text-sm">
        <div className="rounded-xl bg-muted/30 p-4">
          <p className="font-semibold text-foreground">Dorm & Room</p>
          <p className="text-muted-foreground">
            {dorm.name} • {room?.type} • ₱{room?.price.toLocaleString()} / month
          </p>
        </div>
        <div className="rounded-xl bg-muted/30 p-4">
          <p className="font-semibold text-foreground">Payment trigger</p>
          <p className="text-muted-foreground">
            First charge will occur after all signatories are verified. You’ll receive reminders 3 days before billing.
          </p>
        </div>
        <div className="rounded-xl bg-muted/30 p-4">
          <p className="font-semibold text-foreground">Shared suite status</p>
          <p className="text-muted-foreground">
            Monitor roommate completion inside DormieGO dashboard. We will notify you once everyone signs and pays.
          </p>
        </div>
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Submit booking for review</Button>
      <p className="text-xs text-muted-foreground">
        A dorm admin will approve within 12-24 hours. You may cancel anytime before approval without charges.
      </p>
    </div>
  )
}
