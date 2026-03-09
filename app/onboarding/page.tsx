"use client"

import { useEffect, useState, type TouchEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, LayoutDashboard, ShieldCheck } from "lucide-react"
import { ONBOARDING_STORAGE_KEY, isAuthenticated } from "@/lib/auth"

const slides = [
  {
    title: "Find the perfect dorm",
    description: "Search curated listings tailored to your budget, preferred location, and lifestyle amenities.",
    icon: Home,
  },
  {
    title: "Stay in control",
    description: "Track rent, maintenance updates, and community announcements from a single dashboard.",
    icon: LayoutDashboard,
  },
  {
    title: "Live with peace of mind",
    description: "Chat with support, manage security preferences, and keep everything organized in DormieGO.",
    icon: ShieldCheck,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [shouldRender, setShouldRender] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const isRevisit = searchParams.get("revisit") === "true"

  useEffect(() => {
    const hasSeen = window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (hasSeen && !isRevisit) {
      router.replace(isAuthenticated() ? "/" : "/listings")
      return
    }
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      router.replace(isAuthenticated() ? "/" : "/listings")
      return
    }
    setShouldRender(true)
  }, [router, isRevisit])

  useEffect(() => {
    if (!shouldRender) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [shouldRender])

  if (!shouldRender) {
    return null
  }

  const handleComplete = () => {
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, "true")
    router.push("/listings")
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(slides.length - 1, index)))
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1)
      return
    }
    handleComplete()
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null)
    setTouchEndX(null)
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.touches[0]?.clientX ?? null)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) {
      setTouchStartX(null)
      setTouchEndX(null)
      return
    }

    const distance = touchStartX - touchEndX
    const swipeThreshold = 40

    if (distance > swipeThreshold) {
      handleNext()
    } else if (distance < -swipeThreshold) {
      handlePrevious()
    }

    setTouchStartX(null)
    setTouchEndX(null)
  }

  const ActiveIcon = slides[currentSlide].icon
  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="flex flex-1 flex-col justify-between px-6 pb-12 pt-12">
        <div
          className="flex flex-1 flex-col items-center justify-center overflow-hidden text-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div key={currentSlide} className="flex h-16 items-center justify-center text-primary onboarding-icon">
            <ActiveIcon className="h-16 w-16" />
          </div>
          <div key={`${currentSlide}-content`} className="onboarding-content">
            <h1 className="mt-6 text-3xl font-bold text-foreground">{slides[currentSlide].title}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{slides[currentSlide].description}</p>
          </div>
        </div>

        <div key={`${currentSlide}-controls`} className="onboarding-controls flex flex-col gap-4 pb-4">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, index) => {
              const isActive = index === currentSlide
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`onboarding-dot h-2 rounded-full ${
                    isActive ? "w-10 bg-primary" : "w-6 bg-muted"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            })}
          </div>
          <Button onClick={handleNext} className="rounded-full py-4 text-base font-semibold">
            {isLastSlide ? "Get Started" : "Next"}
          </Button>
          {!isLastSlide && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleComplete}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
