"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardPage from "./dashboard/page"
import { useAuthStatus } from "@/hooks/use-auth"
import { ONBOARDING_STORAGE_KEY } from "@/lib/auth"

export default function RootPage() {
	const router = useRouter()
	const { authenticated, ready } = useAuthStatus()
	const [shouldRenderDashboard, setShouldRenderDashboard] = useState(false)

	useEffect(() => {
		if (!ready) {
			return
		}

			const isMobile = typeof window !== "undefined" && window.innerWidth < 768
		const hasCompletedOnboarding =
			typeof window !== "undefined" && window.localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true"

		if (!authenticated) {
				if (isMobile) {
					router.replace("/onboarding?revisit=true")
				} else if (!hasCompletedOnboarding) {
					router.replace("/onboarding")
			} else {
				router.replace("/listings")
			}
			setShouldRenderDashboard(false)
			return
		}

		setShouldRenderDashboard(true)
	}, [authenticated, ready, router])

	if (!ready || !shouldRenderDashboard) {
		return null
	}

	return <DashboardPage />
}
