"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  Users,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Moon,
  Sun,
  Music,
  BookOpen,
  Dumbbell,
  Coffee,
  Gamepad2,
  Utensils,
  Sparkles,
  Check,
  X,
  GraduationCap,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface RoommateProfile {
  id: string
  name: string
  age: number
  school: string
  course: string
  yearLevel: string
  avatar: string
  bio: string
  budget: { min: number; max: number }
  moveInDate: string
  location: string
  lifestyle: {
    sleepSchedule: "early" | "late" | "flexible"
    noiseLevel: "quiet" | "moderate" | "lively"
    cleanlinessLevel: number
    guestsFrequency: "rarely" | "sometimes" | "often"
    studyHabits: "home" | "library" | "both"
  }
  interests: string[]
  compatibility: number
  verified: boolean
}

const interestIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Music: Music,
  Reading: BookOpen,
  "Fitness": Dumbbell,
  "Coffee": Coffee,
  Gaming: Gamepad2,
  Cooking: Utensils,
}

const mockRoommates: RoommateProfile[] = [
  {
    id: "1",
    name: "Maria Santos",
    age: 20,
    school: "UST",
    course: "BS Nursing",
    yearLevel: "3rd Year",
    avatar: "/avatars/avatar-1.jpg",
    bio: "Nursing student looking for a quiet and responsible roommate. I love cooking and occasionally watching K-dramas on weekends!",
    budget: { min: 3000, max: 4500 },
    moveInDate: "April 2026",
    location: "Sampaloc, Manila",
    lifestyle: {
      sleepSchedule: "early",
      noiseLevel: "quiet",
      cleanlinessLevel: 5,
      guestsFrequency: "rarely",
      studyHabits: "home",
    },
    interests: ["Cooking", "Reading", "Coffee"],
    compatibility: 95,
    verified: true,
  },
  {
    id: "2",
    name: "John Reyes",
    age: 21,
    school: "FEU Main",
    course: "BS Accountancy",
    yearLevel: "4th Year",
    avatar: "/avatars/avatar-2.jpg",
    bio: "Board exam reviewer who needs a focused environment. I'm organized and prefer a tidy living space. Weekend hangouts are welcome!",
    budget: { min: 3500, max: 5000 },
    moveInDate: "April 2026",
    location: "U-Belt, Manila",
    lifestyle: {
      sleepSchedule: "late",
      noiseLevel: "quiet",
      cleanlinessLevel: 4,
      guestsFrequency: "sometimes",
      studyHabits: "both",
    },
    interests: ["Fitness", "Gaming", "Coffee"],
    compatibility: 88,
    verified: true,
  },
  {
    id: "3",
    name: "Angela Cruz",
    age: 19,
    school: "NU Manila",
    course: "BS IT",
    yearLevel: "2nd Year",
    avatar: "/avatars/avatar-3.jpg",
    bio: "IT student and part-time freelancer. Night owl but I use headphones! Looking for someone chill who respects personal space.",
    budget: { min: 2800, max: 4000 },
    moveInDate: "May 2026",
    location: "Sampaloc, Manila",
    lifestyle: {
      sleepSchedule: "late",
      noiseLevel: "moderate",
      cleanlinessLevel: 3,
      guestsFrequency: "rarely",
      studyHabits: "home",
    },
    interests: ["Gaming", "Music", "Coffee"],
    compatibility: 82,
    verified: false,
  },
  {
    id: "4",
    name: "Miguel Torres",
    age: 22,
    school: "CEU",
    course: "BS Pharmacy",
    yearLevel: "4th Year",
    avatar: "/avatars/avatar-4.jpg",
    bio: "Future pharmacist preparing for boards. Early riser, gym enthusiast, and a neat freak. Looking for a like-minded roommate!",
    budget: { min: 4000, max: 5500 },
    moveInDate: "March 2026",
    location: "U-Belt, Manila",
    lifestyle: {
      sleepSchedule: "early",
      noiseLevel: "quiet",
      cleanlinessLevel: 5,
      guestsFrequency: "rarely",
      studyHabits: "library",
    },
    interests: ["Fitness", "Reading", "Cooking"],
    compatibility: 91,
    verified: true,
  },
  {
    id: "5",
    name: "Sofia Garcia",
    age: 20,
    school: "UST",
    course: "AB Communication",
    yearLevel: "3rd Year",
    avatar: "/avatars/avatar-5.jpg",
    bio: "CommArts student who loves creative projects. Moderate noise is okay - I play guitar sometimes! Looking for an easygoing roommate.",
    budget: { min: 3500, max: 4800 },
    moveInDate: "April 2026",
    location: "Sampaloc, Manila",
    lifestyle: {
      sleepSchedule: "flexible",
      noiseLevel: "moderate",
      cleanlinessLevel: 4,
      guestsFrequency: "sometimes",
      studyHabits: "both",
    },
    interests: ["Music", "Coffee", "Reading"],
    compatibility: 79,
    verified: true,
  },
  {
    id: "6",
    name: "Kevin Lim",
    age: 21,
    school: "FEU Tech",
    course: "BS Computer Science",
    yearLevel: "3rd Year",
    avatar: "/avatars/avatar-6.jpg",
    bio: "CS student and aspiring game dev. I code late at night but I'm quiet about it. Looking for a tech-friendly roommate!",
    budget: { min: 3000, max: 4200 },
    moveInDate: "April 2026",
    location: "U-Belt, Manila",
    lifestyle: {
      sleepSchedule: "late",
      noiseLevel: "quiet",
      cleanlinessLevel: 3,
      guestsFrequency: "rarely",
      studyHabits: "home",
    },
    interests: ["Gaming", "Coffee", "Music"],
    compatibility: 85,
    verified: false,
  },
]

const schoolOptions = ["All Schools", "UST", "FEU Main", "FEU Tech", "NU Manila", "CEU", "UE"]
const lifestyleFilters = [
  { id: "early-bird", label: "Early Bird", icon: Sun },
  { id: "night-owl", label: "Night Owl", icon: Moon },
  { id: "quiet", label: "Quiet", icon: VolumeX },
  { id: "social", label: "Social", icon: Volume2 },
]

export default function RoommateFinderPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSchool, setSelectedSchool] = useState("All Schools")
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState(6000)
  const [showFilters, setShowFilters] = useState(false)
  const [likedProfiles, setLikedProfiles] = useState<string[]>([])
  const [selectedProfile, setSelectedProfile] = useState<RoommateProfile | null>(null)

  const filteredRoommates = useMemo(() => {
    return mockRoommates
      .filter((roommate) => {
        if (searchTerm) {
          const term = searchTerm.toLowerCase()
          return (
            roommate.name.toLowerCase().includes(term) ||
            roommate.school.toLowerCase().includes(term) ||
            roommate.course.toLowerCase().includes(term)
          )
        }
        return true
      })
      .filter((roommate) => {
        if (selectedSchool === "All Schools") return true
        return roommate.school === selectedSchool
      })
      .filter((roommate) => roommate.budget.max <= budgetRange)
      .filter((roommate) => {
        if (selectedLifestyle.length === 0) return true
        if (selectedLifestyle.includes("early-bird") && roommate.lifestyle.sleepSchedule !== "early") return false
        if (selectedLifestyle.includes("night-owl") && roommate.lifestyle.sleepSchedule !== "late") return false
        if (selectedLifestyle.includes("quiet") && roommate.lifestyle.noiseLevel !== "quiet") return false
        if (selectedLifestyle.includes("social") && roommate.lifestyle.guestsFrequency === "rarely") return false
        return true
      })
      .sort((a, b) => b.compatibility - a.compatibility)
  }, [searchTerm, selectedSchool, budgetRange, selectedLifestyle])

  const toggleLike = (id: string) => {
    setLikedProfiles((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const toggleLifestyleFilter = (id: string) => {
    setSelectedLifestyle((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <Link
            href="/listings"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Listings
          </Link>

          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Roommate Finder</h1>
              <p className="mt-2 text-white/80">
                Find compatible roommates based on lifestyle, budget, and interests
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-full bg-white/15 px-4 py-2.5 backdrop-blur">
              <Search className="h-5 w-5 text-white/70" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, school, or course..."
                className="flex-1 bg-transparent text-base placeholder:text-white/60 focus:outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")}>
                  <X className="h-4 w-4 text-white/70" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full border-white/40 bg-white/20 text-white hover:bg-white/30"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Quick Lifestyle Filters */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {lifestyleFilters.map((filter) => {
              const Icon = filter.icon
              const isActive = selectedLifestyle.includes(filter.id)
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleLifestyleFilter(filter.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? "bg-white text-primary" : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{filteredRoommates.length} potential roommates</h2>
            <p className="text-sm text-muted-foreground">Sorted by compatibility score</p>
          </div>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm"
          >
            {schoolOptions.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>

        {/* Roommate Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRoommates.map((roommate) => (
            <Card
              key={roommate.id}
              className="group cursor-pointer overflow-hidden border border-border transition hover:shadow-lg"
              onClick={() => setSelectedProfile(roommate)}
            >
              {/* Compatibility Badge */}
              <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 p-4">
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                  <Sparkles className="h-3 w-3" />
                  {roommate.compatibility}% match
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
                      <div className="flex h-full w-full items-center justify-center bg-primary/20 text-2xl font-bold text-primary">
                        {roommate.name.charAt(0)}
                      </div>
                    </div>
                    {roommate.verified && (
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1 text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{roommate.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GraduationCap className="h-3 w-3" />
                      {roommate.school} • {roommate.yearLevel}
                    </p>
                    <p className="text-xs text-muted-foreground">{roommate.course}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="line-clamp-2 text-sm text-muted-foreground">{roommate.bio}</p>

                {/* Lifestyle Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs">
                    {roommate.lifestyle.sleepSchedule === "early" ? (
                      <Sun className="h-3 w-3" />
                    ) : roommate.lifestyle.sleepSchedule === "late" ? (
                      <Moon className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    {roommate.lifestyle.sleepSchedule === "early"
                      ? "Early Bird"
                      : roommate.lifestyle.sleepSchedule === "late"
                        ? "Night Owl"
                        : "Flexible"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs">
                    {roommate.lifestyle.noiseLevel === "quiet" ? (
                      <VolumeX className="h-3 w-3" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                    {roommate.lifestyle.noiseLevel.charAt(0).toUpperCase() + roommate.lifestyle.noiseLevel.slice(1)}
                  </span>
                </div>

                {/* Interests */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {roommate.interests.slice(0, 3).map((interest) => {
                    const Icon = interestIcons[interest]
                    return (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {interest}
                      </span>
                    )
                  })}
                </div>

                {/* Budget & Location */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold text-primary">
                      ₱{roommate.budget.min.toLocaleString()} - ₱{roommate.budget.max.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(roommate.id)
                      }}
                      className={`rounded-full p-2 transition ${
                        likedProfiles.includes(roommate.id)
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${likedProfiles.includes(roommate.id) ? "fill-current" : ""}`} />
                    </button>
                    <button className="rounded-full bg-primary p-2 text-primary-foreground transition hover:bg-primary/90">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRoommates.length === 0 && (
          <Card className="py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">No roommates found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedSchool("All Schools")
                setSelectedLifestyle([])
                setBudgetRange(6000)
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </Card>
        )}
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 md:items-center">
          <Card className="w-full max-w-md rounded-3xl p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filter Roommates</h2>
              <button onClick={() => setShowFilters(false)} className="rounded-full bg-muted p-2">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-semibold">Max Budget</label>
                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="500"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>₱2,000</span>
                  <span className="font-semibold text-primary">₱{budgetRange.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold">School</label>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
                >
                  {schoolOptions.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold">Lifestyle Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {lifestyleFilters.map((filter) => {
                    const Icon = filter.icon
                    const isActive = selectedLifestyle.includes(filter.id)
                    return (
                      <button
                        key={filter.id}
                        onClick={() => toggleLifestyleFilter(filter.id)}
                        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {filter.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedSchool("All Schools")
                  setSelectedLifestyle([])
                  setBudgetRange(6000)
                }}
              >
                Reset
              </Button>
              <Button className="flex-1" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl shadow-xl">
            <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 p-6">
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute right-4 top-4 rounded-full bg-background/80 p-2"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
                    <div className="flex h-full w-full items-center justify-center bg-primary/20 text-3xl font-bold text-primary">
                      {selectedProfile.name.charAt(0)}
                    </div>
                  </div>
                  {selectedProfile.verified && (
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{selectedProfile.name}</h2>
                    <span className="text-sm text-muted-foreground">{selectedProfile.age} y/o</span>
                  </div>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    {selectedProfile.school} • {selectedProfile.yearLevel}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedProfile.course}</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                {selectedProfile.compatibility}% compatibility
              </div>
            </div>

            <div className="p-6">
              <p className="text-muted-foreground">{selectedProfile.bio}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Budget Range</p>
                  <p className="font-semibold text-primary">
                    ₱{selectedProfile.budget.min.toLocaleString()} - ₱{selectedProfile.budget.max.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Move-in Date</p>
                  <p className="font-semibold">{selectedProfile.moveInDate}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-muted/50 p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  Preferred Location
                </p>
                <p className="font-semibold">{selectedProfile.location}</p>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 font-semibold">Lifestyle</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-xs text-muted-foreground">Sleep Schedule</p>
                    <p className="flex items-center gap-1 font-medium">
                      {selectedProfile.lifestyle.sleepSchedule === "early" ? (
                        <Sun className="h-4 w-4 text-amber-500" />
                      ) : selectedProfile.lifestyle.sleepSchedule === "late" ? (
                        <Moon className="h-4 w-4 text-indigo-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                      {selectedProfile.lifestyle.sleepSchedule.charAt(0).toUpperCase() +
                        selectedProfile.lifestyle.sleepSchedule.slice(1)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-xs text-muted-foreground">Noise Level</p>
                    <p className="flex items-center gap-1 font-medium">
                      {selectedProfile.lifestyle.noiseLevel === "quiet" ? (
                        <VolumeX className="h-4 w-4 text-green-500" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-orange-500" />
                      )}
                      {selectedProfile.lifestyle.noiseLevel.charAt(0).toUpperCase() +
                        selectedProfile.lifestyle.noiseLevel.slice(1)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-xs text-muted-foreground">Study Habits</p>
                    <p className="flex items-center gap-1 font-medium">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {selectedProfile.lifestyle.studyHabits === "home"
                        ? "Studies at home"
                        : selectedProfile.lifestyle.studyHabits === "library"
                          ? "Library person"
                          : "Both"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="flex items-center gap-1 font-medium">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {selectedProfile.lifestyle.guestsFrequency.charAt(0).toUpperCase() +
                        selectedProfile.lifestyle.guestsFrequency.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.interests.map((interest) => {
                    const Icon = interestIcons[interest]
                    return (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {interest}
                      </span>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toggleLike(selectedProfile.id)}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${likedProfiles.includes(selectedProfile.id) ? "fill-destructive text-destructive" : ""}`}
                  />
                  {likedProfiles.includes(selectedProfile.id) ? "Liked" : "Like"}
                </Button>
                <Button className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
