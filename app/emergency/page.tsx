"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Phone,
  Shield,
  AlertTriangle,
  MapPin,
  Clock,
  ChevronLeft,
  Flame,
  Stethoscope,
  Car,
  Building2,
  Users,
  MessageCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const emergencyContacts = [
  {
    id: "police",
    name: "Philippine National Police",
    number: "911",
    alternateNumber: "117",
    icon: Shield,
    color: "bg-blue-500",
    description: "For crime-related emergencies and safety concerns",
  },
  {
    id: "fire",
    name: "Bureau of Fire Protection",
    number: "911",
    alternateNumber: "(02) 8426-0219",
    icon: Flame,
    color: "bg-orange-500",
    description: "For fire emergencies and rescue operations",
  },
  {
    id: "medical",
    name: "Emergency Medical Services",
    number: "911",
    alternateNumber: "(02) 8527-0000",
    icon: Stethoscope,
    color: "bg-red-500",
    description: "For medical emergencies and ambulance services",
  },
  {
    id: "disaster",
    name: "National Disaster (NDRRMC)",
    number: "911",
    alternateNumber: "(02) 8911-1406",
    icon: AlertTriangle,
    color: "bg-amber-500",
    description: "For natural disasters and calamity response",
  },
]

const dormSupport = [
  {
    id: "security",
    name: "24/7 Dorm Security",
    number: "+63 917 123 4567",
    icon: Building2,
    available: "24/7",
    description: "On-site security personnel for immediate assistance",
  },
  {
    id: "maintenance",
    name: "Emergency Maintenance",
    number: "+63 918 234 5678",
    icon: Car,
    available: "6 AM - 10 PM",
    description: "For urgent facility issues (water, electricity, locks)",
  },
  {
    id: "resident",
    name: "Resident Assistant",
    number: "+63 919 345 6789",
    icon: Users,
    available: "24/7",
    description: "Student support and conflict resolution",
  },
]

const quickActions = [
  {
    id: "call-911",
    label: "Call 911",
    description: "National Emergency Hotline",
    icon: Phone,
    action: "tel:911",
    urgent: true,
  },
  {
    id: "dorm-security",
    label: "Dorm Security",
    description: "24/7 On-site Help",
    icon: Shield,
    action: "tel:+639171234567",
    urgent: false,
  },
  {
    id: "location",
    label: "Share Location",
    description: "Send to emergency contacts",
    icon: MapPin,
    action: "location",
    urgent: false,
  },
]

const safetyTips = [
  "Keep emergency numbers saved in your phone",
  "Know your dorm's evacuation routes",
  "Keep a small first aid kit in your room",
  "Register with your dorm's emergency notification system",
  "Share your location with trusted contacts when going out late",
  "Keep identification and important documents accessible",
]

export default function EmergencyPage() {
  const [locationShared, setLocationShared] = useState(false)
  const [showSOSConfirm, setShowSOSConfirm] = useState(false)

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationShared(true)
          setTimeout(() => setLocationShared(false), 3000)
        },
        () => {
          alert("Unable to get location. Please enable location services.")
        }
      )
    }
  }

  const handleSOSAlert = () => {
    setShowSOSConfirm(true)
  }

  const confirmSOS = () => {
    window.location.href = "tel:911"
    setShowSOSConfirm(false)
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-destructive to-destructive/80 text-destructive-foreground">
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
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Emergency Support</h1>
              <p className="mt-2 text-white/80">
                24/7 emergency services and support for DormieGO tenants
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* SOS Button */}
        <Card className="mb-8 border-destructive/30 bg-destructive/5 p-6">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <button
              onClick={handleSOSAlert}
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-2xl font-bold">SOS</span>
            </button>
            <div>
              <h2 className="text-xl font-bold text-destructive">Emergency SOS</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap the SOS button to immediately call the national emergency hotline (911). Use
                only in genuine emergencies.
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              const isLocation = action.action === "location"

              return (
                <button
                  key={action.id}
                  onClick={() => {
                    if (isLocation) {
                      handleShareLocation()
                    } else {
                      window.location.href = action.action
                    }
                  }}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition hover:shadow-md ${
                    action.urgent
                      ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/10"
                      : "border-border bg-card hover:bg-accent/10"
                  }`}
                >
                  <div
                    className={`rounded-xl p-2.5 ${
                      action.urgent ? "bg-destructive text-destructive-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {isLocation && locationShared ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{isLocation && locationShared ? "Location Shared!" : action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Government Emergency Services */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Government Emergency Services</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon

              return (
                <Card key={contact.id} className="overflow-hidden border border-border">
                  <div className="flex items-start gap-4 p-4">
                    <div className={`rounded-xl ${contact.color} p-3 text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{contact.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={`tel:${contact.number}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {contact.number}
                        </a>
                        <a
                          href={`tel:${contact.alternateNumber.replace(/[^0-9+]/g, "")}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted/80"
                        >
                          {contact.alternateNumber}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Dorm Support Services */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">DormieGO Support Services</h2>
          <div className="space-y-3">
            {dormSupport.map((service) => {
              const Icon = service.icon

              return (
                <Card key={service.id} className="flex items-center justify-between gap-4 border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {service.available}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`tel:${service.number.replace(/\s/g, "")}`}
                    className="shrink-0 rounded-full bg-primary/10 p-3 text-primary transition hover:bg-primary/20"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Live Chat Support */}
        <section className="mb-8">
          <Card className="border border-border bg-gradient-to-r from-primary/5 to-accent/5 p-6">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
              <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                <MessageCircle className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Live Chat Support</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Need non-urgent assistance? Chat with our support team 24/7 for help with dorm
                  issues, questions, or concerns.
                </p>
              </div>
              <Button className="shrink-0">Start Chat</Button>
            </div>
          </Card>
        </section>

        {/* Safety Tips */}
        <section>
          <Card className="border border-border p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600">
                <Info className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">Safety Tips for Students</h2>
            </div>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>

      {/* SOS Confirmation Modal */}
      {showSOSConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="w-full max-w-sm rounded-3xl border border-border p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-destructive">Confirm Emergency Call</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You are about to call 911 (National Emergency Hotline). Only use this for genuine
              emergencies.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={confirmSOS} className="w-full bg-destructive hover:bg-destructive/90">
                <Phone className="mr-2 h-4 w-4" />
                Call 911 Now
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowSOSConfirm(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
