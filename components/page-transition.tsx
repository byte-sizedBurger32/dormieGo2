"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { LoadingOverlay } from "@/components/loading-overlay"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [showOverlay, setShowOverlay] = useState(true)
  const hasSeenInitial = useRef(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowOverlay(false), 600)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!hasSeenInitial.current) {
      hasSeenInitial.current = true
      return
    }

    setShowOverlay(true)
    const timer = window.setTimeout(() => setShowOverlay(false), 0)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {showOverlay && <LoadingOverlay />}
      <div key={pathname} className="page-transition">
        {children}
      </div>
    </>
  )
}
