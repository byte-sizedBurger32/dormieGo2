"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  Shield,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Wallet,
  Home,
  Users,
  FileText,
  Award,
  Info,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ScoreCategory {
  id: string
  name: string
  score: number
  maxScore: number
  icon: LucideIcon
  description: string
  factors: { label: string; status: "positive" | "neutral" | "negative" }[]
}

interface TenantReport {
  id: string
  tenantName: string
  overallScore: number
  scoreLabel: string
  lastUpdated: string
  verified: boolean
  categories: ScoreCategory[]
  history: { period: string; score: number }[]
  badges: { id: string; name: string; icon: LucideIcon }[]
}

const mockTenantReport: TenantReport = {
  id: "tenant-001",
  tenantName: "Juan Dela Cruz",
  overallScore: 85,
  scoreLabel: "Excellent",
  lastUpdated: "March 2026",
  verified: true,
  categories: [
    {
      id: "payment",
      name: "Payment History",
      score: 90,
      maxScore: 100,
      icon: Wallet,
      description: "Track record of timely rent and fee payments",
      factors: [
        { label: "On-time payments for 12 months", status: "positive" },
        { label: "No bounced checks", status: "positive" },
        { label: "One late payment (resolved)", status: "neutral" },
      ],
    },
    {
      id: "property",
      name: "Property Care",
      score: 88,
      maxScore: 100,
      icon: Home,
      description: "Maintenance of living space and common areas",
      factors: [
        { label: "Room kept in good condition", status: "positive" },
        { label: "Follows cleaning schedules", status: "positive" },
        { label: "Reported issues promptly", status: "positive" },
      ],
    },
    {
      id: "community",
      name: "Community Conduct",
      score: 82,
      maxScore: 100,
      icon: Users,
      description: "Behavior with roommates and neighbors",
      factors: [
        { label: "Respects quiet hours", status: "positive" },
        { label: "Good neighbor relations", status: "positive" },
        { label: "Minor noise complaint (resolved)", status: "neutral" },
      ],
    },
    {
      id: "lease",
      name: "Lease Compliance",
      score: 95,
      maxScore: 100,
      icon: FileText,
      description: "Adherence to rental agreement terms",
      factors: [
        { label: "No unauthorized occupants", status: "positive" },
        { label: "Followed all house rules", status: "positive" },
        { label: "Proper move-out notice given", status: "positive" },
      ],
    },
  ],
  history: [
    { period: "Mar 2026", score: 85 },
    { period: "Feb 2026", score: 83 },
    { period: "Jan 2026", score: 82 },
    { period: "Dec 2025", score: 80 },
    { period: "Nov 2025", score: 78 },
    { period: "Oct 2025", score: 75 },
  ],
  badges: [
    { id: "reliable", name: "Reliable Payer", icon: Wallet },
    { id: "clean", name: "Neat Tenant", icon: Home },
    { id: "community", name: "Good Neighbor", icon: Users },
  ],
}

const scoreRanges = [
  { min: 90, max: 100, label: "Excellent", color: "text-green-600", bg: "bg-green-500" },
  { min: 75, max: 89, label: "Good", color: "text-blue-600", bg: "bg-blue-500" },
  { min: 60, max: 74, label: "Fair", color: "text-amber-600", bg: "bg-amber-500" },
  { min: 0, max: 59, label: "Needs Improvement", color: "text-red-600", bg: "bg-red-500" },
]

const getScoreInfo = (score: number) => {
  return scoreRanges.find((range) => score >= range.min && score <= range.max) || scoreRanges[3]
}

export default function TenantScorePage() {
  const [report] = useState<TenantReport>(mockTenantReport)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [isLandlordView, setIsLandlordView] = useState(false)
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false)

  const scoreInfo = getScoreInfo(report.overallScore)

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Tenant Behavior Scale</h1>
              <p className="mt-2 text-white/80">
                Comprehensive tenant assessment for landlords and property managers
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="mt-6 flex items-center gap-3">
            <Button
              variant={!isLandlordView ? "secondary" : "outline"}
              onClick={() => setIsLandlordView(false)}
              className={!isLandlordView ? "" : "border-white/40 bg-white/20 text-white hover:bg-white/30"}
            >
              <Eye className="mr-2 h-4 w-4" />
              Tenant View
            </Button>
            <Button
              variant={isLandlordView ? "secondary" : "outline"}
              onClick={() => setIsLandlordView(true)}
              className={isLandlordView ? "" : "border-white/40 bg-white/20 text-white hover:bg-white/30"}
            >
              <Home className="mr-2 h-4 w-4" />
              Landlord View
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Score Overview */}
        <Card className="mb-8 overflow-hidden border border-border">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
            {/* Score Circle */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <svg className="absolute h-full w-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(report.overallScore / 100) * 352} 352`}
                    className={scoreInfo.color.replace("text-", "text-").replace("-600", "-500")}
                  />
                </svg>
                <div className="text-center">
                  <span className="text-4xl font-bold">{report.overallScore}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <span className={`mt-2 rounded-full px-3 py-1 text-sm font-semibold ${scoreInfo.bg} text-white`}>
                {scoreInfo.label}
              </span>
            </div>

            {/* Tenant Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{report.tenantName}</h2>
                {report.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Last updated: {report.lastUpdated}</p>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {report.badges.map((badge) => {
                  const Icon = badge.icon
                  return (
                    <span
                      key={badge.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-foreground"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {badge.name}
                    </span>
                  )
                })}
              </div>

              {/* Score Trend */}
              <div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Score improved by</span>
                <span className="font-semibold text-green-600">+10 points</span>
                <span className="text-muted-foreground">in the last 6 months</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Category Breakdown */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Score Breakdown</h2>
          <div className="space-y-3">
            {report.categories.map((category) => {
              const Icon = category.icon
              const isExpanded = expandedCategory === category.id
              const categoryScoreInfo = getScoreInfo(category.score)

              return (
                <Card key={category.id} className="overflow-hidden border border-border">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="flex w-full items-center justify-between p-4 text-left transition hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={`text-lg font-bold ${categoryScoreInfo.color}`}>{category.score}</span>
                        <span className="text-sm text-muted-foreground">/{category.maxScore}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border bg-muted/30 p-4">
                      <div className="mb-4">
                        <Progress value={category.score} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        {category.factors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {factor.status === "positive" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : factor.status === "negative" ? (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-amber-500" />
                            )}
                            <span className="text-muted-foreground">{factor.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </section>

        {/* Score History */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Score History</h2>
          <Card className="border border-border p-6">
            <div className="flex items-end justify-between gap-2">
              {report.history.map((entry, index) => {
                const height = (entry.score / 100) * 120
                return (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-medium">{entry.score}</span>
                    <div
                      className="w-full rounded-t-lg bg-primary/80 transition-all"
                      style={{ height: `${height}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{entry.period.split(" ")[0]}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </section>

        {/* Landlord Actions (Landlord View Only) */}
        {isLandlordView && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Landlord Actions</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="border border-border p-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Request Full Report</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Get a detailed PDF report with complete tenant history
                    </p>
                    <Button size="sm" className="mt-3">
                      Request Report
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border border-border p-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-accent/10 p-3 text-accent-foreground">
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Submit Review</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Add your landlord review to the tenant profile
                    </p>
                    <Button size="sm" variant="outline" className="mt-3">
                      Write Review
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border border-border p-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Award Badge</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Recognize excellent tenant behavior
                    </p>
                    <Button size="sm" variant="outline" className="mt-3">
                      Give Badge
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border border-border p-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Report Issue</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Document lease violations or concerns
                    </p>
                    <Button size="sm" variant="outline" className="mt-3">
                      File Report
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Privacy Notice */}
        <Card className="border border-border bg-muted/30">
          <button
            onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Privacy & Data Protection</span>
            </div>
            {showPrivacyInfo ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          {showPrivacyInfo && (
            <div className="border-t border-border px-4 pb-4">
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p>Your score is only visible to verified landlords when you apply for housing</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p>You can dispute any negative entries and request corrections</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p>All data is stored securely and compliant with data protection laws</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p>You can request deletion of your data at any time</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                <Info className="mr-2 h-4 w-4" />
                Learn More About Privacy
              </Button>
            </div>
          )}
        </Card>

        {/* Score Guide */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Understanding Your Score</h2>
          <Card className="border border-border p-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {scoreRanges.map((range) => (
                <div key={range.label} className="text-center">
                  <div className={`mx-auto mb-2 h-3 w-full rounded-full ${range.bg}`} />
                  <p className="font-semibold">{range.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {range.min}-{range.max}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Your tenant score is calculated based on your payment history, property care, community
              conduct, and lease compliance. A higher score improves your chances of securing better
              housing options and may qualify you for priority listings and lower deposits.
            </p>
          </Card>
        </section>
      </div>
    </div>
  )
}
