"use client"

import Link from "next/link"
import { X, ChevronLeft, Star, MapPin, DollarSign, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useComparison } from "@/app/comparison-provider"

export default function ComparisonPage() {
  const { selectedDorms, removeDorm, toggleDorm } = useComparison()

  const allDorms = [
    {
      id: 1,
      name: "Cozy Student Haven",
      price: 4500,
      rating: 4.8,
      location: "Sampaloc, Manila",
      WiFi: true,
      AC: true,
      Gym: false,
      Laundry: true,
      Kitchen: true,
      StudyArea: true,
      Rooftop: false,
    },
    {
      id: 2,
      name: "Urban Dorm Plus",
      price: 5200,
      rating: 4.9,
      location: "Sampaloc, Manila",
      WiFi: true,
      AC: true,
      Gym: true,
      Laundry: true,
      Kitchen: true,
      StudyArea: true,
      Rooftop: true,
    },
    {
      id: 3,
      name: "Budget Student Rooms",
      price: 3800,
      rating: 4.5,
      location: "U-Belt, Manila",
      WiFi: true,
      AC: false,
      Gym: false,
      Laundry: false,
      Kitchen: true,
      StudyArea: false,
      Rooftop: false,
    },
    {
      id: 4,
      name: "Premium Student Living",
      price: 6500,
      rating: 4.9,
      location: "U-Belt, Manila",
      WiFi: true,
      AC: true,
      Gym: true,
      Laundry: true,
      Kitchen: true,
      StudyArea: true,
      Rooftop: true,
    },
    {
      id: 5,
      name: "Bright Student Rooms",
      price: 4200,
      rating: 4.7,
      location: "Sampaloc, Manila",
      WiFi: true,
      AC: true,
      Gym: false,
      Laundry: true,
      Kitchen: true,
      StudyArea: true,
      Rooftop: false,
    },
    {
      id: 6,
      name: "Eco Dorm Housing",
      price: 4800,
      rating: 4.6,
      location: "U-Belt, Manila",
      WiFi: true,
      AC: true,
      Gym: true,
      Laundry: false,
      Kitchen: true,
      StudyArea: false,
      Rooftop: false,
    },
    {
      id: 7,
      name: "Downtown Student Hub",
      price: 5500,
      rating: 4.8,
      location: "Sampaloc, Manila",
      WiFi: true,
      AC: true,
      Gym: true,
      Laundry: true,
      Kitchen: true,
      StudyArea: true,
      Rooftop: true,
    },
    {
      id: 8,
      name: "Comfort Zone Dorm",
      price: 3900,
      rating: 4.4,
      location: "U-Belt, Manila",
      WiFi: true,
      AC: false,
      Gym: false,
      Laundry: false,
      Kitchen: true,
      StudyArea: false,
      Rooftop: false,
    },
  ]

  const features = ["WiFi", "AC", "Gym", "Laundry", "Kitchen", "StudyArea", "Rooftop"]
  const comparisonDorms = allDorms.filter((d) => selectedDorms.includes(d.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/listings" className="flex items-center gap-2 text-primary hover:gap-3 transition-all mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to Listings
          </Link>
          <h1 className="text-3xl font-bold">Compare Dorms</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Add Dorms Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="font-bold text-lg mb-4">Add to Compare</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allDorms.map((dorm) => (
                  <button
                    key={dorm.id}
                    onClick={() => {
                      const isSelected = selectedDorms.includes(dorm.id)
                      if (isSelected) {
                        removeDorm(dorm.id)
                      } else if (selectedDorms.length < 4) {
                        // Allow up to 4 dorms to compare
                        toggleDorm(dorm.id)
                      }
                    }}
                    disabled={selectedDorms.includes(dorm.id)}
                    className={`w-full p-3 text-left border rounded-lg transition ${
                      selectedDorms.includes(dorm.id)
                        ? "border-primary bg-primary/10 opacity-50 cursor-not-allowed"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <p className="font-semibold text-sm">{dorm.name}</p>
                    <p className="text-xs text-muted-foreground">₱{dorm.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-3 overflow-x-auto">
            {comparisonDorms.length === 0 ? (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Select dorms from the listings page to compare</p>
                <Link href="/listings">
                  <Button className="bg-primary hover:bg-primary/90">Browse Dorms</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Header Row with Dorm Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {comparisonDorms.map((dorm) => (
                    <Card key={dorm.id} className="p-4 relative">
                      <button
                        onClick={() => removeDorm(dorm.id)}
                        className="absolute top-2 right-2 p-1 hover:bg-destructive/10 rounded"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>

                      <h3 className="font-bold mb-3 pr-6">{dorm.name}</h3>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="font-bold text-primary">₱{dorm.price.toLocaleString()}/month</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="font-semibold">{dorm.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{dorm.location}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Features Comparison Table */}
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted">
                          <th className="text-left p-4 font-bold">Feature</th>
                          {comparisonDorms.map((dorm) => (
                            <th key={dorm.id} className="text-center p-4 font-bold text-sm">
                              {dorm.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {features.map((feature, idx) => (
                          <tr key={feature} className={idx % 2 === 0 ? "bg-background" : "bg-card"}>
                            <td className="p-4 font-medium text-sm">{feature}</td>
                            {comparisonDorms.map((dorm) => (
                              <td key={`${dorm.id}-${feature}`} className="text-center p-4">
                                {dorm[feature as keyof typeof dorm] === true ? (
                                  <Check className="w-5 h-5 text-primary mx-auto" />
                                ) : (
                                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Price Comparison Chart */}
                <Card className="p-6">
                  <h2 className="font-bold text-lg mb-4">Price Comparison</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {comparisonDorms.map((dorm) => {
                      const maxPrice = Math.max(...comparisonDorms.map((d) => d.price))
                      const percentage = (dorm.price / maxPrice) * 100
                      return (
                        <div key={dorm.id}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-semibold">{dorm.name}</span>
                            <span className="text-sm font-bold text-primary">₱{dorm.price.toLocaleString()}</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  {comparisonDorms.map((dorm) => (
                    <Link key={dorm.id} href={`/dorm/${dorm.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90">View {dorm.name}</Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
