"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
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
  Volume2,
  VolumeX,
  Camera,
  Share2,
  Heart,
  X,
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

const tourData: Record<number, TourRoom[]> = {
  1: [
    {
      id: "living-area",
      name: "Living Area",
      image: "/modern-student-dorm-room.jpg",
      description: "Spacious living area with modern furnishings and natural lighting",
      hotspots: [
        { id: "h1", x: 30, y: 40, label: "Study Desk", description: "Ergonomic desk with built-in USB charging", icon: Lightbulb },
        { id: "h2", x: 70, y: 50, label: "Air Conditioning", description: "Split-type inverter AC for energy efficiency", icon: Wind },
        { id: "h3", x: 50, y: 70, label: "WiFi Router", description: "Fiber connection up to 100 Mbps", icon: Wifi },
      ],
    },
    {
      id: "bedroom",
      name: "Bedroom",
      image: "/bright-spacious-dorm-room.jpg",
      description: "Comfortable bedroom with premium mattress and ample storage",
      hotspots: [
        { id: "h4", x: 40, y: 60, label: "Bed", description: "Queen-size bed with orthopedic mattress", icon: Bed },
        { id: "h5", x: 80, y: 30, label: "Closet", description: "Built-in wardrobe with organizers", icon: Box },
        { id: "h6", x: 20, y: 40, label: "Window", description: "Large windows with blackout curtains", icon: Eye },
      ],
    },
    {
      id: "bathroom",
      name: "Bathroom",
      image: "/affordable-dorm-room.jpg",
      description: "Modern bathroom with hot and cold shower",
      hotspots: [
        { id: "h7", x: 50, y: 50, label: "Shower", description: "Rain shower with water heater", icon: Bath },
      ],
    },
  ],
}

// Default tour for all dorms
const defaultTour: TourRoom[] = [
  {
    id: "main-room",
    name: "Main Room",
    image: "/modern-student-dorm-room.jpg",
    description: "Comfortable living space with all essential amenities",
    hotspots: [
      { id: "h1", x: 30, y: 40, label: "Study Area", description: "Dedicated space for studying and work", icon: Lightbulb },
      { id: "h2", x: 70, y: 50, label: "Climate Control", description: "Air conditioning for your comfort", icon: Wind },
      { id: "h3", x: 50, y: 70, label: "High-Speed Internet", description: "WiFi included in your stay", icon: Wifi },
    ],
  },
  {
    id: "sleeping-area",
    name: "Sleeping Area",
    image: "/bright-spacious-dorm-room.jpg",
    description: "Restful sleeping area with quality bedding",
    hotspots: [
      { id: "h4", x: 40, y: 60, label: "Comfortable Bed", description: "Quality mattress for restful sleep", icon: Bed },
      { id: "h5", x: 80, y: 30, label: "Storage", description: "Personal storage space", icon: Box },
    ],
  },
  {
    id: "facilities",
    name: "Common Facilities",
    image: "/luxury-student-accommodation.jpg",
    description: "Shared amenities and common areas",
    hotspots: [
      { id: "h6", x: 50, y: 50, label: "Amenities", description: "Access to shared facilities", icon: Sparkles },
    ],
  },
]

export default function VirtualTourPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const numericId = Number.parseInt(id, 10)

  const dorm = useMemo(() => {
    return dorms.find((entry) => entry.slug === id || entry.id === numericId) ?? dorms[0]
  }, [id, numericId])

  const tourRooms = tourData[dorm.id] || defaultTour

  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showControls, setShowControls] = useState(true)

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
      timeout = setTimeout(() => setShowControls(false), 3000)
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
            href={`/dorm/${dorm.id}`}
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
                    : "bg-white/90 text-foreground hover:scale-110 hover:bg-white"
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

        {/* Room Navigation */}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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
            <span className="text-xs font-semibold text-white">360° Virtual Tour</span>
          </Card>
        </div>

        {/* Dorm Info Panel */}
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
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50">Starting from</p>
                <p className="text-lg font-bold text-primary">₱{dorm.price.toLocaleString()}/mo</p>
              </div>
              <Link href={`/dorm/${dorm.id}/finalize?room=${dorm.roomTypes[0]?.id}`}>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Book Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Instructions Toast */}
      <div className="absolute bottom-40 left-1/2 z-40 -translate-x-1/2">
        <Card className="flex items-center gap-2 border border-white/20 bg-black/70 px-4 py-2 backdrop-blur">
          <Info className="h-4 w-4 text-primary" />
          <span className="text-xs text-white">
            Click hotspots to explore features • Use controls to navigate
          </span>
        </Card>
      </div>
    </div>
  )
}
