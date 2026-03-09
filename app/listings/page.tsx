"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  MapPin,
  Star,
  Shield,
  Filter,
  Search,
  X,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ChevronLeft,
  Bot,
  Users,
  GraduationCap,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useComparison } from "@/app/comparison-provider"
import { dorms } from "@/lib/dorms"
import type { DormInfo } from "@/lib/dorms"

type SortOption = "rating" | "price-low" | "price-high" | "reviews"

const quickFilters = [
    { id: "all", label: "All" },
    { id: "budget", label: "Budget" },
    { id: "premium", label: "Premium" },
    { id: "nearby", label: "Within 1 km" },
    { id: "amenities", label: "Top Amenities" },
  ]

const schoolOptions = Array.from(new Set(dorms.flatMap((dorm) => dorm.schools))).sort()

const amenitiesOptions = Array.from(new Set(dorms.flatMap((dorm) => dorm.amenities))).sort()

const aiPrompts = [
  { id: "quiet", label: "Quiet dorm near UST under ₱5k", query: "Show quiet dorms near UST under ₱5,000" },
  { id: "amenities", label: "With gym + study area", query: "Find dorms with gym and study area" },
  { id: "premium", label: "Premium options in Sampaloc", query: "Premium dorms in Sampaloc" },
  { id: "roommates", label: "Best for roommates", query: "Dorms with shared rooms and great reviews" },
]

export default function ListingsPage() {
  const [priceRange, setPriceRange] = useState(10000)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedSchools, setSelectedSchools] = useState<string[]>([])
  const [activeQuickFilter, setActiveQuickFilter] = useState("all")
  const [sortBy, setSortBy] = useState<SortOption>("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const { selectedDorms, toggleDorm } = useComparison()

  const distanceToNumber = (distance: string) => {
    const parsed = Number.parseFloat(distance.replace("km", "").trim())
    return Number.isNaN(parsed) ? Infinity : parsed
  }

  const filteredDorms = useMemo(() => {
    return dorms
      .filter((dorm) => dorm.price <= priceRange)
      .filter((dorm) => {
        if (!searchTerm) return true
        const term = searchTerm.toLowerCase()
        return dorm.name.toLowerCase().includes(term) || dorm.location.toLowerCase().includes(term)
      })
      .filter((dorm) => {
        if (selectedAmenities.length === 0) return true
        return selectedAmenities.some((amenity) => dorm.amenities.includes(amenity))
      })
      .filter((dorm) => {
        if (selectedSchools.length === 0) return true
        return selectedSchools.some((school) => dorm.schools.includes(school))
      })
      .filter((dorm) => {
        if (activeQuickFilter === "all") return true
        if (activeQuickFilter === "budget") return dorm.price <= 4500
        if (activeQuickFilter === "premium") return dorm.price >= 5500
        if (activeQuickFilter === "nearby") return distanceToNumber(dorm.distanceLabel) <= 1
        if (activeQuickFilter === "amenities") return dorm.amenities.length >= 5
        return true
      })
  }, [priceRange, searchTerm, selectedAmenities, selectedSchools, activeQuickFilter])

  const sortedDorms = useMemo(() => {
    return [...filteredDorms].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount
      return 0
    })
  }, [filteredDorms, sortBy])

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background overflow-hidden">
      <header className="relative overflow-hidden bg-gradient-to-b from-primary to-primary/70 text-primary-foreground">
        <div className="absolute -left-16 top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-12 pb-32 md:pb-36">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold"
            >
              <ChevronLeft className="h-4 w-4" />
              Dashboard
            </Link>
            {selectedDorms.length > 0 && (
              <Link href="/comparison">
                <Button size="sm" className="bg-white/20 text-primary-foreground backdrop-blur">
                  Compare ({selectedDorms.length})
                </Button>
              </Link>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Discover</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">Find a dorm that feels like home</h1>
            <p className="mt-3 max-w-xl text-base text-white/80">
              Explore trusted, verified accommodations near your university with real reviews from fellow dormers.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full bg-white/15 px-4 py-2.5 text-sm shadow-sm backdrop-blur">
              <Search className="h-5 w-5 text-white/70" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by dorm or area"
                className="flex-1 bg-transparent text-base placeholder:text-white/60 focus:outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="text-white/70">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-full border-white/40 bg-white/20 text-white hover:bg-white/30"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          <div className="rounded-3xl border border-white/25 bg-white/10 p-5 text-white shadow-sm backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">AI powered search</p>
                <h2 className="text-2xl font-semibold md:text-3xl">DormieGO AI Finder</h2>
                <p className="mt-1 max-w-xl text-sm text-white/75">
                  Describe your ideal dorm and we will craft the perfect shortlist for you.
                </p>
              </div>
              <Button className="self-start rounded-full bg-white text-primary shadow-sm hover:bg-white/90 md:self-auto">
                <Bot className="mr-2 h-4 w-4" /> Ask DormieGO AI
              </Button>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {aiPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => setSearchTerm(prompt.query)}
                  className="whitespace-nowrap rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveQuickFilter(filter.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeQuickFilter === filter.id ? "bg-white text-primary" : "bg-white/15 text-white"
                }`}
              >
                {filter.id === "premium" && <Sparkles className="h-4 w-4" />}
                {filter.id === "amenities" && <Layers className="h-4 w-4" />}
                {filter.id === "budget" && <Filter className="h-4 w-4" />}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative -mt-24 flex-1 overflow-y-auto rounded-t-3xl bg-background pt-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-28 md:pb-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{sortedDorms.length} dorms match your search</h2>
              <p className="text-sm text-muted-foreground">Fine tune filters to get the best recommendations.</p>
            </div>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="w-full rounded-full border border-border bg-transparent px-4 py-2 text-sm md:w-52"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sortedDorms.map((dorm: DormInfo, index) => {
              const firstReview = dorm.reviews[0]
              const sharedRoom = dorm.roomTypes.find((room) => room.isShared)
              let sharedSlotsLabel: string | null = null

              if (sharedRoom) {
                if (sharedRoom.slotsAvailable && sharedRoom.slotsAvailable > 0) {
                  sharedSlotsLabel = `${sharedRoom.slotsAvailable} slot${sharedRoom.slotsAvailable > 1 ? "s" : ""} open`
                } else if (sharedRoom.totalSlots) {
                  sharedSlotsLabel = `${sharedRoom.totalSlots} total slots`
                }
              }

              return (
                <Link key={dorm.id} href={`/dorm/${dorm.id}`}>
                <Card
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="fade-in-stagger flex h-full flex-col overflow-hidden border border-border/60 shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden md:h-52">
                    <img
                      src={dorm.coverImage || "/placeholder.svg"}
                      alt={dorm.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-white">
                      <div>
                        <h3 className="text-lg font-semibold">{dorm.name}</h3>
                        <p className="flex items-center gap-1 text-xs text-white/80">
                          <MapPin className="h-4 w-4" /> {dorm.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs">
                        <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                        {dorm.rating}
                      </div>
                    </div>
                    {dorm.verified && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                        <Shield className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{dorm.distanceLabel} from campus</span>
                      <span>{dorm.reviewsCount} reviews</span>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Amenities</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {dorm.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground"
                          >
                            {amenity}
                          </span>
                        ))}
                        {dorm.amenities.length > 4 && (
                          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                            +{dorm.amenities.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {dorm.schools.slice(0, 2).map((school) => (
                        <span key={school} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                          <GraduationCap className="h-3 w-3" /> {school}
                        </span>
                      ))}
                      {dorm.schools.length > 2 && (
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                          +{dorm.schools.length - 2} more
                        </span>
                      )}
                    </div>

                    {firstReview && (
                      <div className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
                        <div className="mb-1 flex items-center gap-1 font-medium text-foreground">
                          <Quote className="h-3 w-3 shrink-0" /> {firstReview.author}
                        </div>
                        <p className="line-clamp-2">“{firstReview.comment}”</p>
                      </div>
                    )}

                    {sharedRoom && (
                      <div className="flex items-center justify-between rounded-xl bg-accent/10 p-3 text-xs text-accent-foreground">
                        <div className="flex items-center gap-2 font-medium">
                          <Users className="h-4 w-4" /> Shared slots available
                        </div>
                        {sharedSlotsLabel && <span>{sharedSlotsLabel}</span>}
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Starts at</p>
                        <p className="text-2xl font-bold text-primary">₱{dorm.price.toLocaleString()}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={(event) => {
                          event.preventDefault()
                          toggleDorm(dorm.id)
                        }}
                        variant={selectedDorms.includes(dorm.id) ? "default" : "outline"}
                        className={selectedDorms.includes(dorm.id) ? "bg-accent hover:bg-accent/90" : "bg-transparent"}
                      >
                        {selectedDorms.includes(dorm.id) ? "In comparison" : "Compare"}
                      </Button>
                    </div>
                  </div>
                </Card>
                </Link>
              )
            })}
          </div>

          {sortedDorms.length === 0 && (
            <Card className="py-16 text-center">
              <p className="text-muted-foreground">No dorms found. Try adjusting your filters.</p>
              <Button
                onClick={() => {
                  setPriceRange(10000)
                  setSelectedAmenities([])
                  setSelectedSchools([])
                  setSearchTerm("")
                  setActiveQuickFilter("all")
                }}
                className="mt-4"
              >
                Reset filters
              </Button>
            </Card>
          )}
        </div>
      </main>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-6 md:items-center">
          <Card className="w-full max-w-lg rounded-3xl p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="rounded-full bg-muted p-2">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-semibold">Max Price</label>
                <input
                  type="range"
                  min="3000"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(event) => setPriceRange(Number.parseInt(event.target.value))}
                  className="w-full"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>₱3,000</span>
                  <span className="font-semibold text-primary">₱{priceRange.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesOptions.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`rounded-full px-3 py-1 text-sm transition ${
                        selectedAmenities.includes(amenity)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold">Nearby Schools</label>
                <div className="flex flex-wrap gap-2">
                  {schoolOptions.map((school) => (
                    <button
                      key={school}
                      onClick={() =>
                        setSelectedSchools((prev) =>
                          prev.includes(school) ? prev.filter((item) => item !== school) : [...prev, school],
                        )
                      }
                      className={`rounded-full px-3 py-1 text-sm transition ${
                        selectedSchools.includes(school)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {school}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setPriceRange(10000)
                  setSelectedAmenities([])
                  setSelectedSchools([])
                  setActiveQuickFilter("all")
                }}
              >
                Reset
              </Button>
              <Button className="flex-1 bg-primary" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
