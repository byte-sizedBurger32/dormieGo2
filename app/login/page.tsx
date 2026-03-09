"use client"

import type { FormEvent } from "react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, DoorOpen, MessageSquareText, ShieldCheck, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ONBOARDING_STORAGE_KEY, setAuthenticated } from "@/lib/auth"

export const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
    <path
      fill="#4285F4"
      d="M23.498 12.272c0-.638-.057-1.252-.163-1.84H12v3.481h6.438c-.277 1.5-1.122 2.773-2.394 3.628v3.012h3.868c2.262-2.083 3.586-5.145 3.586-8.281z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.957-1.073 7.943-2.924l-3.868-3.012c-1.077.72-2.464 1.148-4.075 1.148-3.135 0-5.793-2.118-6.748-4.958H1.268v3.118C3.243 21.443 7.304 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.252 14.254c-.24-.72-.377-1.492-.377-2.254s.136-1.534.377-2.254V6.628H1.268C.46 8.24 0 10.067 0 12c0 1.933.46 3.76 1.268 5.372l3.984-3.118z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.76 0 3.34.605 4.586 1.794l3.44-3.44C17.954 1.189 15.238 0 12 0 7.304 0 3.243 2.557 1.268 6.628l3.984 3.118C6.207 6.868 8.865 4.75 12 4.75z"
    />
  </svg>
)

export const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
    <path
      fill="#1877F2"
      d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078V12.07h3.047V9.412c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.49 0-1.953.926-1.953 1.874v2.266h3.328l-.532 3.493h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
    />
    <path
      fill="#fff"
      d="M16.671 15.566l.532-3.493h-3.328v-2.266c0-.948.463-1.874 1.953-1.874h1.514V4.98s-1.374-.235-2.686-.235c-2.74 0-4.533 1.662-4.533 4.669v2.658H7.078v3.493h3.047V24h3.782v-8.434h2.764z"
    />
  </svg>
)

export const AppleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
    <path
      fill="currentColor"
      d="M19.665 17.725c-.348.804-.53 1.163-1.01 1.875-.656.984-1.586 2.21-2.733 2.22-1.016.01-1.28-.65-2.673-.64-1.392.01-1.69.65-2.706.64-1.147-.01-2.027-1.12-2.684-2.104-1.836-2.78-2.024-6.04-.896-7.767.806-1.2 2.156-1.91 3.401-1.91 1.267 0 2.067.65 3.108.65 1.012 0 1.623-.65 3.108-.65 1.09 0 2.244.595 3.05 1.624-2.68 1.47-2.246 5.33-.965 6.76z"
    />
    <path
      fill="currentColor"
      d="M15.983 5.341c.546-.66.961-1.569.81-2.492-.785.031-1.728.522-2.284 1.181-.5.58-.94 1.512-.82 2.4.872.067 1.77-.467 2.294-1.089z"
    />
  </svg>
)

export const SmsIcon = () => <MessageSquareText className="h-5 w-5" aria-hidden />

const tabs = [
  { id: "signup", label: "Sign Up" },
  { id: "login", label: "Log In" },
]

const socialProviders = [
  { id: "google", label: "Continue with Google", icon: GoogleIcon },
  { id: "facebook", label: "Continue with Facebook", icon: FacebookIcon },
  { id: "apple", label: "Continue with Apple", icon: AppleIcon },
  { id: "sms", label: "Continue with SMS", icon: SmsIcon },
]

const portalLinks = [
  {
    id: "admin",
    label: "Admin Control Center",
    description: "Monitor analytics, approvals, and content moderation in real time.",
    href: "/admin",
    icon: ShieldCheck,
  },
  {
    id: "rentee",
    label: "Resident Dashboard",
    description: "View contracts, payments, roommate invites, and maintenance tickets.",
    href: "/rentee",
    icon: Users,
  },
  {
    id: "owner",
    label: "Dorm Owner Hub",
    description: "Track occupancy, leads, and revenue for every managed property.",
    href: "/owner",
    icon: Building2,
  },
]

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<"signup" | "login">("signup")
  const [isReady, setIsReady] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [signupPassword, setSignupPassword] = useState("")
  const [showPortalOptions, setShowPortalOptions] = useState(false)
  const showConfirmPassword = useMemo(() => signupPassword.length >= 8, [signupPassword])

  useEffect(() => {
    const hasSeen = window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768
    if (!hasSeen && isMobile) {
      router.replace("/onboarding")
      return
    }
    setIsReady(true)
  }, [router])

  useEffect(() => {
    if (!isReady) {
      return
    }
    const requestedMode = searchParams.get("mode")
    if (requestedMode === "login" || requestedMode === "signup") {
      setMode(requestedMode)
    }
  }, [isReady, searchParams])

  useEffect(() => {
    setShowSignupPassword(false)
    setShowLoginPassword(false)
  }, [mode])

  if (!isReady) {
    return null
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, "true")
    setAuthenticated(true)
    const requestedPath = searchParams.get("from")
    const safeRedirect = requestedPath && requestedPath.startsWith("/") ? requestedPath : "/dashboard"
    const destination = safeRedirect.startsWith("/login") ? "/dashboard" : safeRedirect
    router.push(destination)
  }

  const handleRevisit = () => {
    router.push("/onboarding?revisit=true")
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="pointer-events-none absolute -right-24 top-28 hidden h-56 w-56 rounded-[2rem] border border-primary/15 md:block" />
      <div className="pointer-events-none absolute -right-10 top-52 hidden h-56 w-56 rounded-[2rem] border border-primary/10 md:block" />

      <header className="flex w-full max-w-5xl flex-col items-center px-6 pt-12 pb-1">
        <picture>
          <source srcSet="/project-logo.png" type="image/png" />
          <img src="/project-logo.svg" alt="DormieGO" className="h-16 w-auto md:h-20" />
        </picture>
      </header>

      <main className="flex w-full flex-1 flex-col items-center px-6 pb-10">
        <div className="w-full max-w-md">
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">Get Started now</h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Create an account or log in to explore DormieGO.
            </p>
          </div>

          <div className="mt-8 flex rounded-full bg-muted/60 p-1 text-sm font-semibold">
            {tabs.map((tab) => {
              const isActive = tab.id === mode
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id as "signup" | "login")}
                  className={`flex-1 rounded-full px-5 py-2 transition ${
                    isActive ? "bg-background text-primary shadow" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <Card className="mt-5 rounded-3xl border border-border/70 bg-card/95 p-5 shadow-lg backdrop-blur">
            {mode === "signup" ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="signup-first-name">
                      First name
                    </label>
                    <input
                      id="signup-first-name"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Lois"
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="signup-last-name">
                      Last name
                    </label>
                    <input
                      id="signup-last-name"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Becket"
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-email">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    placeholder="loisbecket@gmail.com"
                    className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-birth-date">
                    Birth date
                  </label>
                  <input
                    id="signup-birth-date"
                    name="birthDate"
                    type="date"
                    required
                    className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-phone">
                    Phone number
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="signup-phone-country"
                      name="phoneCountry"
                      className="w-28 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                      defaultValue="PH +63"
                    >
                      <option value="PH +63">PH +63</option>
                      <option value="US +1">US +1</option>
                      <option value="SG +65">SG +65</option>
                    </select>
                    <input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="967 260 7109"
                      className="flex-1 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="signup-password">
                    Set password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      name="password"
                      type={showSignupPassword ? "text" : "password"}
                      required
                      placeholder="Create a strong password"
                      value={signupPassword}
                      onChange={(event) => setSignupPassword(event.target.value)}
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 pr-16 text-sm outline-none transition focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((state) => !state)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {showSignupPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {showConfirmPassword && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="signup-confirm-password">
                      Confirm password
                    </label>
                    <input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type={showSignupPassword ? "text" : "password"}
                      required
                      placeholder="Re-enter your password"
                      minLength={8}
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 py-4 text-base font-semibold text-primary-foreground transition hover:from-primary/90 hover:to-primary/80"
                >
                  Register
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By continuing you agree to the DormieGO terms and privacy policy.
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    placeholder="loisbecket@gmail.com"
                    className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="login-password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 pr-16 text-sm outline-none transition focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((state) => !state)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="h-4 w-4 rounded border-border/70" />
                    Remember me
                  </label>
                  <Link href="/help" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 py-4 text-base font-semibold text-primary-foreground transition hover:from-primary/90 hover:to-primary/80"
                >
                  Log In
                </Button>

                <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Or log in with
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {socialProviders.map((provider) => {
                    const Icon = provider.icon
                    return (
                      <button
                        key={provider.id}
                        type="button"
                        aria-label={provider.label}
                        className="flex h-12 items-center justify-center rounded-2xl border border-border/70 bg-background text-sm font-semibold text-muted-foreground transition hover:bg-muted"
                      >
                        <Icon />
                        <span className="sr-only">{provider.label}</span>
                      </button>
                    )
                  })}
                </div>
              </form>
            )}
          </Card>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPortalOptions((state) => !state)}
              className="flex w-full items-center justify-center gap-2 rounded-full border-dashed border-primary/40 bg-primary/5 text-sm font-semibold text-primary hover:bg-primary/10"
            >
              <DoorOpen className="h-4 w-4" />
              Access admin & partner portals
            </Button>
          </div>

          {showPortalOptions && (
            <Card className="mt-4 space-y-4 overflow-hidden rounded-3xl border border-primary/30 bg-primary/5 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Instant access</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Jump straight into each experience without entering credentials.
                </p>
              </div>
              <div className="space-y-3">
                {portalLinks.map(({ id, label, description, href, icon: Icon }) => (
                  <Link
                    key={id}
                    href={href}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-background px-4 py-3 shadow-sm transition hover:bg-primary/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-foreground">{label}</span>
                        <span className="block text-xs text-muted-foreground">{description}</span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>

      <footer className="flex w-full justify-center px-6 pb-6">
        <Button
          variant="ghost"
          onClick={handleRevisit}
          className="text-sm font-medium text-muted-foreground hover:text-foreground md:hidden"
        >
          Revisit onboarding
        </Button>
      </footer>
    </div>
  )
}
