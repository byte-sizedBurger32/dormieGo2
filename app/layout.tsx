import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ComparisonProvider } from "./comparison-provider"
import Header from "@/components/header"
import { PageTransition } from "@/components/page-transition"
import Footer from "@/components/footer"

const _geistSans = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DormieGO - Find Your Perfect Student Dorm",
  description:
    "Discover verified student accommodations in Manila with transparent pricing, real reviews, and safe housing options",
  generator: "v0.app",
  openGraph: {
    title: "DormieGO - Find Your Perfect Student Dorm",
    description:
      "Discover verified student accommodations in Manila with transparent pricing, real reviews, and safe housing options",
    url: "https://dormiego.app/",
    siteName: "DormieGO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DormieGO platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  icons: {
    // Prefer the provided PNG icon; also include a generated favicon and explicit 32x32 entry.
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased pb-16 md:pb-0`}>
        <ComparisonProvider>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </ComparisonProvider>
        <Analytics />
      </body>
    </html>
  )
}
