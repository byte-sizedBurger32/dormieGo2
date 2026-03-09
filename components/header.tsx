"use client"

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, MapPin, Users, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStatus } from "@/hooks/use-auth"

const PUBLIC_PATH_PREFIXES = [
  "/onboarding",
  "/login",
  "/listings",
  "/account",
  "/help",
  "/about",
  "/admin",
  "/owner",
]

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/listings", label: "Dorms", icon: MapPin },
  { href: "/forum", label: "Community", icon: Users },
  { href: "/account", label: "Account", icon: User },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { authenticated: isAuthenticated, ready: authReady } = useAuthStatus()
  const [showPrompt, setShowPrompt] = useState(false)
  const [pendingRoute, setPendingRoute] = useState<{ href: string; label: string } | null>(null)
  const logoHref = !authReady ? "/listings" : isAuthenticated ? "/" : "/listings"

  const isSpecialPage = pathname.startsWith("/admin") || pathname.startsWith("/owner")
  const shouldHideNav = pathname.startsWith("/onboarding") || pathname.startsWith("/login")

  const requiresAuth = useCallback((href: string) => {
    if (href === "/") {
      return false
    }
    return !PUBLIC_PATH_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`))
  }, [])

  const resolveLabel = useCallback((href: string) => {
    if (href === "/" || href.startsWith("/dashboard")) {
      return "Home"
    }
    const match = mobileNavItems.find((item) => {
      if (item.href === "/") {
        return href === item.href
      }
      return href === item.href || href.startsWith(`${item.href}/`)
    })
    if (match) {
      return match.label
    }
    if (href.startsWith("/comparison")) {
      return "Compare Dorms"
    }
    if (href.startsWith("/dorm")) {
      return "Dorm details"
    }
    return "this section"
  }, [])

  useEffect(() => {
    if (!authReady) {
      return
    }
    if (shouldHideNav) {
      return
    }
    if (!isAuthenticated && requiresAuth(pathname) && pathname !== "/listings") {
      setPendingRoute({ href: pathname, label: resolveLabel(pathname) })
      router.replace("/listings")
      setShowPrompt(true)
    }
  }, [authReady, isAuthenticated, pathname, requiresAuth, resolveLabel, router, shouldHideNav])

  useEffect(() => {
    if (isAuthenticated || shouldHideNav) {
      setShowPrompt(false)
      setPendingRoute(null)
    }
  }, [isAuthenticated, shouldHideNav])

  const handleNavigation = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
      if (!authReady) {
        return
      }
      if (!isAuthenticated && requiresAuth(href)) {
        event.preventDefault()
        setPendingRoute({ href, label })
        setShowPrompt(true)
      }
    },
    [authReady, isAuthenticated, requiresAuth]
  )

  const closePrompt = () => {
    setShowPrompt(false)
    setPendingRoute(null)
  }

  const handleLogin = (mode: "login" | "signup") => {
    const redirect = pendingRoute?.href ? `&from=${encodeURIComponent(pendingRoute.href)}` : ""
    router.push(`/login?mode=${mode}${redirect}`)
    closePrompt()
  }

  const promptMessage = useMemo(() => {
    if (!pendingRoute) {
      return ""
    }
    return `You need an account to access ${pendingRoute.label.toLowerCase()}.`
  }, [pendingRoute])

  if (shouldHideNav) {
    return null
  }

  return (
    <>
      <nav className="sticky top-0 z-50 hidden border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={logoHref} className="flex items-center gap-2 text-sm font-semibold">
            <picture>
              <source srcSet="/project-logo.png" type="image/png" />
              <img src="/project-logo.svg" alt="DormieGO" className="h-7 w-auto" />
            </picture>
          </Link>
          <div className="flex items-center gap-2">
            {mobileNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavigation(event, item.href, item.label)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {!isSpecialPage && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 md:hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
              {mobileNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavigation(event, item.href, item.label)}
                    className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      )}

      {showPrompt && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-sm rounded-3xl border border-border/70 bg-background p-6 text-center shadow-2xl">
            <h2 className="text-lg font-semibold text-foreground">Log in to continue</h2>
            <p className="mt-2 text-sm text-muted-foreground">{promptMessage || "You need an account to continue."}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Button className="w-full rounded-full" onClick={() => handleLogin("login")}>
                Log in
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full border-border/70"
                onClick={() => handleLogin("signup")}
              >
                Sign up
              </Button>
              <Button
                variant="ghost"
                className="w-full rounded-full text-muted-foreground hover:text-foreground"
                onClick={closePrompt}
              >
                Keep exploring dorms
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
