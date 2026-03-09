"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserCircle, HelpCircle, CreditCard, Heart, ChevronRight, LogOut } from "lucide-react"
import { setAuthenticated } from "@/lib/auth"
import { useAuthStatus } from "@/hooks/use-auth"

const quickLinks = [
  {
    title: "Profile & Preferences",
    description: "Review your personal details and manage notification preferences.",
    href: "/profile",
    icon: UserCircle,
    requiresAuth: true,
  },
  {
    title: "Favorites",
    description: "Jump back into the dorms you have saved for later.",
    href: "/favorites",
    icon: Heart,
    requiresAuth: true,
  },
  {
    title: "Payment Methods",
    description: "Securely store and update cards used for booking and deposits.",
    href: "/payments",
    icon: CreditCard,
    requiresAuth: true,
  },
  {
    title: "Help & Support",
    description: "Browse FAQs, contact support, or review community safety tips.",
    href: "/help",
    icon: HelpCircle,
    requiresAuth: false,
  },
  {
    title: "About DormieGO",
    description: "Learn more about our mission and the team behind the platform.",
    href: "/about",
    icon: UserCircle,
    requiresAuth: false,
  },
]

export default function AccountPage() {
  const router = useRouter()
  const { authenticated: isAuthenticated, ready: authReady } = useAuthStatus()

  const handleLogout = () => {
    setAuthenticated(false)
    router.push("/login")
  }

  const handleAuthRedirect = (mode: "login" | "signup" = "signup") => {
    router.push(`/login?mode=${mode}`)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background overflow-hidden">
      <header className="border-b border-border/80 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pt-10 pb-16 md:pb-20">
          <div className="flex justify-center">
            <picture>
              <source srcSet="/project-logo.png" type="image/png" />
              <img src="/project-logo.svg" alt="DormieGO" className="h-10 w-auto" />
            </picture>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">Account Center</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                Manage your details, saved dorms, billing options, and support preferences in one place.
              </p>
            </div>
            <Link href="/dashboard" className="hidden md:inline-flex">
              <Button variant="outline" className="rounded-full border-border/60 bg-background text-foreground hover:bg-muted">
                Back to dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative -mt-6 flex-1 overflow-y-auto rounded-t-3xl bg-background pt-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-28 md:pb-16">
          <section>
            <div className="rounded-3xl border border-border/70 bg-card/80 shadow-sm">
              {!isAuthenticated && authReady && (
                <div className="border-b border-border/70 px-5 py-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Access more with DormieGO</p>
                      <p className="text-sm text-muted-foreground">Sign up or log in to manage your account details.</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button className="rounded-full" onClick={() => handleAuthRedirect("signup")}>Sign up</Button>
                      <Button
                        variant="outline"
                        className="rounded-full border-border/70"
                        onClick={() => handleAuthRedirect("login")}
                      >
                        Log in
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {quickLinks.map((item, index) => {
                const Icon = item.icon
                const isLocked = !isAuthenticated && authReady && item.requiresAuth
                const itemClasses = `flex items-center justify-between gap-4 px-5 py-5 transition-colors ${
                  index !== quickLinks.length - 1 ? "border-b border-border/70" : ""
                }`
                const content = (
                  <>
                    <div className="flex items-start gap-4">
                      <div className={`rounded-xl p-3 ${isLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className={`text-base font-semibold ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>
                          {item.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        {isLocked && <p className="mt-2 text-xs font-medium text-muted-foreground/80">Log in to manage this section.</p>}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </>
                )

                if (isLocked) {
                  return (
                    <div
                      key={item.title}
                      aria-disabled
                      className={`${itemClasses} cursor-not-allowed bg-muted/40 text-left text-muted-foreground`}
                    >
                      {content}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`${itemClasses} hover:bg-muted/60 active:bg-muted/70`}
                  >
                    {content}
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-border/70 bg-gradient-to-r from-primary/5 to-accent/10 p-6">
            <h2 className="text-lg font-semibold text-foreground">Need help?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Talk to support, manage your security settings, or review community guidelines.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/help" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Open Help Center
              </Link>
              {isAuthenticated && authReady && (
                <Link
                  href="/profile"
                  className="rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
                >
                  Update Profile
                </Link>
              )}
              {isAuthenticated && authReady && (
                <Link
                  href="/payments"
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
                >
                  Manage Payments
                </Link>
              )}
            </div>
          </section>

          {isAuthenticated && authReady && (
            <section>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-full border-border/70 bg-background text-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
