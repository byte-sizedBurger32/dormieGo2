"use client"

import { useEffect, useState } from "react"
import { AUTH_CHANGE_EVENT, isAuthenticated } from "@/lib/auth"

interface AuthState {
  authenticated: boolean
  ready: boolean
}

export function useAuthStatus(): AuthState {
  const [authenticated, setAuthenticatedState] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const updateState = () => {
      setAuthenticatedState(isAuthenticated())
      setReady(true)
    }

    updateState()

    const handleStorage = () => {
      setAuthenticatedState(isAuthenticated())
      setReady(true)
    }

    const handleAuthChange = (event: Event) => {
      const next = (event as CustomEvent<{ isAuthenticated?: boolean }>).detail?.isAuthenticated
      if (typeof next === "boolean") {
        setAuthenticatedState(next)
        setReady(true)
        return
      }
      updateState()
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange as EventListener)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange as EventListener)
    }
  }, [])

  return { authenticated, ready }
}
