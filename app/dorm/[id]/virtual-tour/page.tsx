"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  MapPin,
  Info,
  Eye,
  ChevronRight,
  Sparkles,
  Box,
  Lightbulb,
  Bed,
  Bath,
  Wifi,
  Wind,
  Play,
  Pause,
  Camera,
  Share2,
  Heart,
  X,
  Calendar,
  Clock,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { dorms } from "@/lib/dorms"

interface Hotspot {
  id: string
  x: number
  y: number
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface TourRoom {
  id: string
  name: string
  image: string
  description: string
  hotspots: Hotspot[]
}

export default function VirtualTourPage() {
  const params = useParams()
  const id = params.id as string
  const numericId = Number.parseInt(id, 10)

  const dorm = useMemo(() => {
    return dorms.find((entry) => entry.slug === id || entry.id === numericId) ?? dorms[0]
  }, [id, numericId])

  // Create tour rooms from dorm gallery
  const tourRooms: TourRoom[] = useMemo(() => {
    const roomNames = ["Main Living Area", "Bedroom View", "Common Area"]
    const descriptions = [
      "Spacious main area with modern furnishings and natural lighting",
      "Comfortable sleeping area with quality amenities",
      "Shared facilities and common spaces for residents",
    ]
    const hotspotSets: Hotspot[][] = [
      [
        { id: "h1", x: 25, y: 35, label: "Study Desk", description: "Ergonomic workspace with built-in USB charging", icon: Lightbulb },
        { id: "h2", x: 75, y: 45, label: "Air Conditioning", description: "Split-type inverter AC for energy efficiency", icon: Wind },
        { id: "h3", x: 50, y: 65, label: "WiFi Router", description: "High-speed fiber connection included", icon: Wifi },
      ],
      [
        { id: "h4", x: 40, y: 55, label: "Bed", description: "Quality mattress for restful sleep", icon: Bed },
        { id: "h5", x: 80, y: 30, label: "Storage", description: "Built-in wardrobe with organizers", icon: Box },
        { id: "h6", x: 20, y: 40, label: "Window", description: "Large windows with natural lighting", icon: Eye },
      ],
      [
        { id: "h7", x: 50, y: 50, label: "Facilities", description: "Access to shared amenities", icon: Bath },
        { id: "h8", x: 30, y: 60, label: "Lounge", description: "Common area for relaxation", icon: Sparkles },
      ],
    ]

    return dorm.gallery.map((image, index) => ({
      id: `room-${index}`,
      name: roomNames[index] || `View ${index + 1}`,
      image,
      description: descriptions[index] || "Explore this space",
      hotspots: hotspotSets[index] || [],
    }))
  }, [dorm.gallery])

  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [planStep, setPlanStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const currentRoom = tourRooms[currentRoomIndex]

  // Auto-rotate effect
  useEffect(() => {
    if (!isAutoRotating) return
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [isAutoRotating])

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const handleActivity = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setShowControls(false), 4000)
    }
    handleActivity()
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("touchstart", handleActivity)
    return () => {
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("touchstart", handleActivity)
      clearTimeout(timeout)
    }
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }, [])

  const handleReset = useCallback(() => {
    setZoom(1)
    setRotation(0)
    setActiveHotspot(null)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const nextRoom = useCallback(() => {
    setCurrentRoomIndex((prev) => (prev + 1) % tourRooms.length)
    handleReset()
  }, [tourRooms.length, handleReset])

  const prevRoom = useCallback(() => {
    setCurrentRoomIndex((prev) => (prev - 1 + tourRooms.length) % tourRooms.length)
    handleReset()
  }, [tourRooms.length, handleReset])

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const handlePlanSubmit = () => {
    setPlanStep(3)
    // Reset after showing confirmation
    setTimeout(() => {
      setShowPlanModal(false)
      setPlanStep(1)
      setSelectedDate("")
      setSelectedTime("")
    }, 3000)
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Header Overlay */}
      <div
        className={`absolute left-0 right-0 top-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href={`/dorm/${dorm.slug || dorm.id}`}
            className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to {dorm.name}
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavorited(!isFavorited)}
              className="border-white/30 bg-white/20 text-white backdrop-blur hover:bg-white/30"
            >
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-white/30 bg-white/20 text-white backdrop-blur hover:bg-white/30"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Tour Viewer */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* 360 Image Container */}
        <div
          className="absolute inset-0 cursor-grab transition-transform duration-100 active:cursor-grabbing"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <img
            src={currentRoom.image}
            alt={currentRoom.name}
            className="h-full w-full object-cover"
            draggable={false}
          />

          {/* Hotspots */}
          {currentRoom.hotspots.map((hotspot) => {
            const Icon = hotspot.icon
            return (
              <button
                key={hotspot.id}
                onClick={() => setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot)}
                className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all ${
                  activeHotspot?.id === hotspot.id
                    ? "scale-125 bg-primary text-primary-foreground"
                    : "animate-pulse bg-white/90 text-foreground hover:scale-110 hover:bg-white"
                }`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: `translate(-50%, -50%) rotate(-${rotation}deg) scale(${1 / zoom})`,
                }}
              >
                <Icon className="h-5 w-5" />
              </button>
            )
          })}
        </div>

        {/* Hotspot Info Popup */}
        {activeHotspot && (
          <div className="absolute bottom-32 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 px-4">
            <Card className="relative border border-white/20 bg-black/80 p-4 text-white backdrop-blur">
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute right-2 top-2 rounded-full p-1 text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary/20 p-2.5 text-primary">
                  <activeHotspot.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{activeHotspot.label}</h3>
                  <p className="mt-1 text-sm text-white/70">{activeHotspot.description}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Room Info */}
        <div
          className={`absolute bottom-24 left-0 right-0 z-30 px-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mx-auto max-w-4xl">
            <Card className="border border-white/20 bg-black/70 p-4 backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                      {currentRoomIndex + 1}/{tourRooms.length}
                    </span>
                    <h2 className="text-lg font-bold text-white">{currentRoom.name}</h2>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{currentRoom.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">
                    {currentRoom.hotspots.length} interactive points
                  </span>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Room Navigation Thumbnails */}
        <div
          className={`absolute bottom-4 left-0 right-0 z-30 px-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {tourRooms.map((room, index) => (
                <button
                  key={room.id}
                  onClick={() => {
                    setCurrentRoomIndex(index)
                    handleReset()
                  }}
                  className={`relative flex shrink-0 flex-col overflow-hidden rounded-xl border-2 transition ${
                    index === currentRoomIndex
                      ? "border-primary"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <div className="h-16 w-24 overflow-hidden">
                    <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="bg-black/80 px-2 py-1 text-xs text-white">{room.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div
          className={`absolute right-4 top-1/2 z-30 -translate-y-1/2 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Card className="flex flex-col gap-2 border border-white/20 bg-black/70 p-2 backdrop-blur">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="text-white hover:bg-white/20"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="text-white hover:bg-white/20"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="h-px bg-white/20" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`text-white hover:bg-white/20 ${isAutoRotating ? "bg-white/20" : ""}`}
              title={isAutoRotating ? "Stop Auto-Rotate" : "Auto-Rotate"}
            >
              {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="text-white hover:bg-white/20"
              title="Reset View"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <div className="h-px bg-white/20" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </Card>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevRoom}
          className={`absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur transition hover:bg-black/70 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextRoom}
          className={`absolute right-20 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur transition hover:bg-black/70 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* AR Mode Badge */}
        <div
          className={`absolute left-4 top-20 z-30 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Card className="flex items-center gap-2 border border-white/20 bg-black/70 px-3 py-2 backdrop-blur">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-white">360° AR Virtual Tour</span>
          </Card>
        </div>

        {/* Dorm Info Panel with Plan Visit */}
        <div
          className={`absolute left-4 top-32 z-30 max-w-xs transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Card className="border border-white/20 bg-black/70 p-4 backdrop-blur">
            <h3 className="font-bold text-white">{dorm.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-white/70">
              <MapPin className="h-3 w-3" />
              {dorm.location}
            </p>
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-xs text-white/50">Starting from</p>
                <p className="text-lg font-bold text-primary">₱{dorm.price.toLocaleString()}/mo</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dorm/${dorm.slug || dorm.id}/finalize?room=${dorm.roomTypes[0]?.id}`} className="flex-1">
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Book Now
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowPlanModal(true)}
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  <Calendar className="mr-1 h-3 w-3" />
                  Plan Visit
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Instructions Toast */}
      <div className="pointer-events-none absolute bottom-40 left-1/2 z-40 -translate-x-1/2">
        <Card className="flex items-center gap-2 border border-white/20 bg-black/70 px-4 py-2 backdrop-blur">
          <Info className="h-4 w-4 text-primary" />
          <span className="text-xs text-white">
            Click hotspots to explore features • Use controls to navigate
          </span>
        </Card>
      </div>

      {/* Plan Visit Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="w-full max-w-md border border-border bg-background p-6 shadow-xl">
            {planStep === 1 && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Plan Your Visit</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Schedule an in-person tour of {dorm.name}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm transition ${
                            selectedTime === time
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPlanModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setPlanStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}

            {planStep === 2 && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Your Details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We will confirm your visit within 24 hours
                  </p>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
                  />
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium">Visit Summary</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setPlanStep(1)}
                  >
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handlePlanSubmit}>
                    Confirm Visit
                  </Button>
                </div>
              </>
            )}

            {planStep === 3 && (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Visit Scheduled!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We will send a confirmation to your email shortly.
                </p>
                <p className="mt-4 text-sm">
                  <span className="font-medium">{dorm.name}</span>
                  <br />
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at {selectedTime}
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
