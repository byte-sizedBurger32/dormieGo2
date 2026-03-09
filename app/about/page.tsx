"use client"

import Link from "next/link"
import { ChevronLeft, Target, Users, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
  <div className="bg-background">
        <div className="max-w-6xl mx-auto px-4 pb-6 pt-10">
          <Link href="/" className="inline-flex">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-2 rounded-full border-border/70 bg-background text-foreground hover:bg-muted"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">About <img src="/project-logo.png" alt="DormieGO" className="inline-block h-8 md:h-10 align-middle" /></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Making dorm hunting safe, transparent, and easy for every student in Manila.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To revolutionize the dorm-hunting experience by providing a centralized, verified platform that connects
              students with safe, affordable, and quality housing options around Manila's universities.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10">
            <Globe className="w-12 h-12 text-accent-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To build sustainable student communities where dormers can access transparent information, connect with
              peers, and manage their housing experience seamlessly while supporting SDG 11: Sustainable Cities and
              Communities.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Trust & Safety",
                description: "Every listing is verified and every resident is protected",
              },
              {
                icon: Zap,
                title: "Transparency",
                description: "No hidden fees, real prices, and honest reviews from verified tenants",
              },
              {
                icon: Globe,
                title: "Community",
                description: "Fostering connections between students and supporting sustainable living",
              },
            ].map((value, idx) => {
              const Icon = value.icon
              return (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <Card className="p-12 bg-card border-primary/20 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose <img src="/project-logo.png" alt="DormieGO" className="inline-block h-6 md:h-8 align-middle" />?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Verified listings with safety checks",
              "Real reviews from verified tenants",
              "Transparent pricing without hidden fees",
              "Comprehensive dorm comparison tools",
              "Active community forum for dormers",
              "Integrated payment and maintenance system",
              "AI-powered smart dorm finder",
              "Dedicated customer support",
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  ✓
                </div>
                <span className="text-lg">{point}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your perfect dorm?</h2>
          <Link href="/listings">
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
              Browse Dorms Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
