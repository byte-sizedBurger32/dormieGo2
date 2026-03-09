import Link from "next/link"
import { ChevronLeft, MapPin, Star, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const favoriteDorms = [
  {
    id: 1,
    name: "Urban Dorm Plus",
    location: "Sampaloc, Manila",
    price: 5200,
    rating: 4.9,
    image: "/bright-spacious-dorm-room.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Cozy Student Haven",
    location: "Sampaloc, Manila",
    price: 4500,
    rating: 4.8,
    image: "/modern-student-dorm-room.jpg",
    verified: true,
  },
]

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="max-w-5xl mx-auto px-4 pb-6 pt-10">
          <Link href="/account" className="inline-flex">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-2 rounded-full border-border/70 bg-background text-foreground hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Account
            </Button>
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Saved Dorms</h1>
          <p className="text-sm text-muted-foreground">
            Your bookmarked dorms stay here so you can compare and decide anytime.
          </p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        {favoriteDorms.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">You have no favorites yet. Browse dorms and tap the heart icon to save them.</p>
            <Link href="/listings" className="inline-block mt-4">
              <Button className="bg-primary hover:bg-primary/90">Browse Dorms</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {favoriteDorms.map((dorm) => (
              <Card key={dorm.id} className="flex flex-col sm:flex-row gap-4 overflow-hidden hover:shadow-lg transition">
                <div className="sm:w-48 h-40 bg-muted">
                  <img src={dorm.image} alt={dorm.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{dorm.name}</h2>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" /> {dorm.location}
                      </p>
                    </div>
                    {dorm.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        <Shield className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-semibold text-primary">₱{dorm.price.toLocaleString()} / month</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4 fill-primary text-primary" /> {dorm.rating}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link href={`/dorm/${dorm.id}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
