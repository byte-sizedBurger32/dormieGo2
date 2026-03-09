"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Star, ThumbsUp, MessageSquare, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const reviews = [
    {
      id: 1,
      author: "Maria Santos",
      rating: 5,
      dorm: "Urban Dorm Plus",
      title: "Best dorm I've lived in!",
      content:
        "Amazing facilities and very friendly management. The location is perfect for studying. I especially love the rooftop lounge!",
      verified: true,
      helpful: 45,
      date: "2 weeks ago",
      avatar: "/placeholder.svg?key=avatar1",
    },
    {
      id: 2,
      author: "John Cruz",
      rating: 4,
      dorm: "Cozy Student Haven",
      title: "Great value for money",
      content:
        "Good dorm with clean rooms and helpful staff. The only downside is limited space, but the price is unbeatable.",
      verified: true,
      helpful: 32,
      date: "3 weeks ago",
      avatar: "/placeholder.svg?key=avatar2",
    },
    {
      id: 3,
      author: "Ana Reyes",
      rating: 5,
      dorm: "Premium Student Living",
      title: "Luxury meets affordability",
      content:
        "This place is incredible! Modern facilities, great study areas, and the gym is top-notch. Highly recommended!",
      verified: true,
      helpful: 67,
      date: "1 month ago",
      avatar: "/placeholder.svg?key=avatar3",
    },
    {
      id: 4,
      author: "Pedro Fernandez",
      rating: 3,
      dorm: "Budget Student Rooms",
      title: "Decent, but needs improvement",
      content: "Affordable and acceptable for budget students. Bathrooms could use renovation and AC would be nice.",
      verified: true,
      helpful: 28,
      date: "1 month ago",
      avatar: "/placeholder.svg?key=avatar4",
    },
    {
      id: 5,
      author: "Lisa Chen",
      rating: 5,
      dorm: "Eco Dorm Housing",
      title: "Sustainable and comfortable",
      content: "Love the eco-friendly approach! The community here is amazing and the gym facilities are excellent.",
      verified: true,
      helpful: 54,
      date: "2 weeks ago",
      avatar: "/placeholder.svg?key=avatar5",
    },
    {
      id: 6,
      author: "Miguel Santos",
      rating: 4,
      dorm: "Downtown Student Hub",
      title: "Excellent location and service",
      content: "The location is unbeatable - close to all universities. Staff is very helpful and responsive.",
      verified: true,
      helpful: 41,
      date: "3 weeks ago",
      avatar: "/placeholder.svg?key=avatar6",
    },
  ]

  const filteredReviews = reviews
    .filter((r) => filterRating === 0 || r.rating === filterRating)
    .filter(
      (r) =>
        r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.dorm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  const ratingCounts = [
    { stars: 5, count: reviews.filter((r) => r.rating === 5).length },
    { stars: 4, count: reviews.filter((r) => r.rating === 4).length },
    { stars: 3, count: reviews.filter((r) => r.rating === 3).length },
    { stars: 2, count: reviews.filter((r) => r.rating === 2).length },
    { stars: 1, count: reviews.filter((r) => r.rating === 1).length },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:gap-3 transition-all mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Verified Tenant Reviews</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Stats & Filters */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <h2 className="font-bold text-2xl mb-2">{avgRating}</h2>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(Number.parseFloat(avgRating)) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6">Based on {reviews.length} reviews</p>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingCounts.map((rc) => (
                  <div key={rc.stars} className="flex items-center gap-2">
                    <span className="text-xs w-8">{rc.stars}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(rc.count / reviews.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{rc.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Filter */}
            <Card className="p-6">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4" />
                Filter by Rating
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterRating(0)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    filterRating === 0 ? "bg-primary/10 border border-primary" : "hover:bg-muted border border-border"
                  }`}
                >
                  <span className="text-sm font-semibold">All Reviews</span>
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      filterRating === rating
                        ? "bg-primary/10 border border-primary"
                        : "hover:bg-muted border border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{rating}★</span>
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6">
              <div className="flex items-center gap-2 border border-border rounded-lg px-4 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-none outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No reviews match your filter</p>
                </Card>
              ) : (
                filteredReviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.author}
                        className="w-12 h-12 rounded-full bg-muted"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-bold">{review.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {review.verified && "✓ Verified Resident"} • {review.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Reviewed: {review.dorm}</p>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{review.title}</h3>
                    <p className="text-muted-foreground mb-4">{review.content}</p>

                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                        <MessageSquare className="w-4 h-4" />
                        Reply
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
