"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  MessageSquare,
  Users,
  ThumbsUp,
  Shield,
  Search,
  Plus,
  TrendingUp,
  Flame,
  Filter,
  MoreHorizontal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showNewThread, setShowNewThread] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCategorySheet, setShowCategorySheet] = useState(false)

  const categories = [
    { id: "all", name: "All Topics", count: 342 },
    { id: "safety", name: "Safety & Security", count: 87 },
    { id: "maintenance", name: "Maintenance Tips", count: 65 },
    { id: "community", name: "Community Events", count: 43 },
    { id: "study", name: "Study Groups", count: 78 },
    { id: "faq", name: "FAQ", count: 69 },
  ]

  const threads = [
    {
      id: 1,
      title: "Best tips for keeping your dorm room cool during summer?",
      category: "maintenance",
      author: "Maria Santos",
      verified: true,
      avatar: "/placeholder.svg?key=avatar1",
      replies: 24,
      views: 512,
      likes: 45,
      timestamp: "2 hours ago",
      preview: "I've been struggling with heat in my room. Any suggestions?",
    },
    {
      id: 2,
      title: "Community movie night this weekend!",
      category: "community",
      author: "Alex Johnson",
      verified: true,
      avatar: "/placeholder.svg?key=avatar2",
      replies: 18,
      views: 423,
      likes: 67,
      timestamp: "5 hours ago",
      preview: "Join us for a night of fun and free snacks! Rooftop at 7 PM.",
    },
    {
      id: 3,
      title: "Found a great coffee shop nearby - highly recommended!",
      category: "community",
      author: "Lisa Chen",
      verified: true,
      avatar: "/placeholder.svg?key=avatar3",
      replies: 12,
      views: 298,
      likes: 34,
      timestamp: "8 hours ago",
      preview: "Located just 5 minutes walk from Sampaloc. Great prices for students!",
    },
    {
      id: 4,
      title: "Study group for Programming 101 - Starting Monday",
      category: "study",
      author: "Pedro Fernandez",
      verified: true,
      avatar: "/placeholder.svg?key=avatar4",
      replies: 15,
      views: 367,
      likes: 28,
      timestamp: "1 day ago",
      preview: "Looking for students taking Programming 101. Let's study together!",
    },
    {
      id: 5,
      title: "WiFi issues in Building B - has anyone experienced this?",
      category: "maintenance",
      author: "John Cruz",
      verified: true,
      avatar: "/placeholder.svg?key=avatar5",
      replies: 21,
      views: 445,
      likes: 19,
      timestamp: "1 day ago",
      preview: "Connection keeps dropping, especially during peak hours.",
    },
    {
      id: 6,
      title: "How to handle noisy neighbors respectfully?",
      category: "safety",
      author: "Ana Reyes",
      verified: true,
      avatar: "/placeholder.svg?key=avatar6",
      replies: 31,
      views: 623,
      likes: 72,
      timestamp: "2 days ago",
      preview: "Looking for advice on addressing noise concerns with neighbors.",
    },
    {
      id: 7,
      title: "New security measures being implemented next month",
      category: "safety",
      author: "Admin",
      verified: true,
      avatar: "/placeholder.svg?key=admin",
      replies: 8,
      views: 289,
      likes: 43,
      timestamp: "3 days ago",
      preview: "Management announcement: Enhanced security protocols coming soon.",
    },
    {
      id: 8,
      title: "Best apps for managing roommate expenses",
      category: "faq",
      author: "Miguel Santos",
      verified: true,
      avatar: "/placeholder.svg?key=avatar7",
      replies: 19,
      views: 401,
      likes: 56,
      timestamp: "3 days ago",
      preview: "Sharing my favorite apps for splitting bills and tracking expenses.",
    },
  ]

  const filteredThreads = threads
    .filter((t) => activeCategory === "all" || t.category === activeCategory)
    .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      safety: "bg-destructive/10 text-destructive",
      maintenance: "bg-accent/10 text-accent-foreground",
      community: "bg-primary/10 text-primary",
      study: "bg-secondary/10 text-secondary-foreground",
      faq: "bg-muted text-muted-foreground",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background overflow-hidden">
      <header className="relative overflow-hidden bg-gradient-to-b from-accent to-accent/80 text-accent-foreground">
        <div className="absolute -right-12 top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-12 pb-28 md:pb-32">
          <div className="flex items-center justify-between text-sm">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 font-semibold">
              <ChevronLeft className="h-4 w-4" /> Dashboard
            </Link>
            <Button
              className="inline-flex items-center gap-2 rounded-full bg-white/20 text-accent-foreground backdrop-blur hover:bg-white/30"
              size="sm"
              onClick={() => setShowNewThread(true)}
            >
              <Plus className="h-4 w-4" /> New Thread
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Community</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">Find advice and community</h1>
            <p className="max-w-xl text-sm text-white/80 md:text-base">
              Connect with fellow residents, swap tips, and stay informed about what is happening in the dorms.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full bg-white/15 px-4 py-2.5 text-sm shadow-sm backdrop-blur">
              <Search className="h-5 w-5 text-white/70" />
              <input
                placeholder="Search topics or keywords"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="flex-1 bg-transparent text-base placeholder:text-white/60 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-white/70">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowCategorySheet(true)}
              className="inline-flex items-center gap-2 rounded-full border-white/40 bg-white/20 text-white hover:bg-white/30"
            >
              <Filter className="h-4 w-4" /> Categories
            </Button>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category.id ? "bg-white text-accent" : "bg-white/15 text-white"
                }`}
              >
                {category.id === "community" && <Flame className="h-4 w-4" />}
                {category.name}
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative -mt-20 flex-1 overflow-y-auto rounded-t-3xl bg-background pt-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-28 md:pb-12">
          <Card className="flex flex-col gap-4 rounded-3xl border border-border/60 p-5 md:flex-row">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Trending conversations</h2>
              <p className="text-sm text-muted-foreground">See what residents are talking about right now.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {["WiFi fixes", "Roommate tips", "Study groups", "Safety updates"].map((trend) => (
                <button key={trend} className="rounded-full bg-muted px-3 py-1 text-muted-foreground hover:text-foreground">
                  #{trend.replace(/\s+/g, "").toLowerCase()}
                </button>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            {filteredThreads.length === 0 ? (
              <Card className="rounded-3xl border border-dashed border-border/60 p-12 text-center">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No threads found. Try a different category or start one.</p>
                <Button className="mt-4" onClick={() => setShowNewThread(true)}>
                  Start a Thread
                </Button>
              </Card>
            ) : (
              filteredThreads.map((thread) => (
                <Card key={thread.id} className="rounded-3xl border border-border/60 p-5 shadow-sm transition hover:shadow-lg">
                  <Link href={`/forum/${thread.id}`} className="flex items-start gap-4">
                    <img
                      src={thread.avatar || "/placeholder.svg"}
                      alt={thread.author}
                      className="h-12 w-12 flex-shrink-0 rounded-full bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{thread.author}</span>
                            {thread.verified && <Shield className="h-3 w-3 text-primary" />}
                            <span>• {thread.timestamp}</span>
                          </div>
                          <h3 className="text-lg font-semibold leading-tight md:text-xl">{thread.title}</h3>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(thread.category)}`}
                        >
                          {categories.find((category) => category.id === thread.category)?.name}
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base">{thread.preview}</p>

                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground md:text-sm">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {thread.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {thread.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {thread.likes}
                        </span>
                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                          <MoreHorizontal className="h-4 w-4" />
                          Open
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {showCategorySheet && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 px-4 pb-6 md:items-center">
          <Card className="w-full max-w-md rounded-3xl p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Browse categories</h2>
              <button onClick={() => setShowCategorySheet(false)} className="rounded-full bg-muted p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setShowCategorySheet(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    activeCategory === category.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {showNewThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl rounded-3xl p-6">
            <h2 className="text-2xl font-semibold">Start a new thread</h2>
            <p className="mt-1 text-sm text-muted-foreground">Share tips, ask questions, or plan events.</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">Title</label>
                <input
                  type="text"
                  placeholder="What do you want to talk about?"
                  className="w-full rounded-2xl border border-border px-4 py-3"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Category</label>
                  <select className="w-full rounded-2xl border border-border px-4 py-3">
                    {categories
                      .filter((category) => category.id !== "all")
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Message</label>
                <textarea
                  rows={6}
                  placeholder="Share details, include tips, or ask a question."
                  className="w-full rounded-2xl border border-border px-4 py-3"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowNewThread(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowNewThread(false)}>
                Post thread
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
