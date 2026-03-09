"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  MapPin,
  Star,
  Shield,
  ChevronLeft,
  Heart,
  Share2,
  Calendar,
  Users,
  Phone,
  Mail,
  Quote,
  Sparkles,
  FileSignature,
  Wallet,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { dorms } from "@/lib/dorms"
import type { DormInfo, DormRoomType } from "@/lib/dorms"
import { useComparison } from "@/app/comparison-provider"

export default function DormDetailsPage() {
  const params = useParams()
  const id = params.id as string

  return <DormDetailsContent id={id} />
}

function DormDetailsContent({ id }: { id: string }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showViewingForm, setShowViewingForm] = useState(false)
  const [mainImage, setMainImage] = useState(0)
  const { selectedDorms, toggleDorm } = useComparison()

  const dorm: DormInfo = useMemo(() => {
    const numericId = Number.parseInt(id, 10)
    return dorms.find((entry) => entry.slug === id || entry.id === numericId) ?? dorms[0]
  }, [id])

  const heroImages = useMemo(() => {
    const images = [dorm.coverImage, ...dorm.gallery]
    return images.filter((image, index) => image && images.indexOf(image) === index)
  }, [dorm])

  const activeImage = heroImages[mainImage] ?? heroImages[0] ?? "/placeholder.svg"
  const isInComparison = selectedDorms.includes(dorm.id)
  const sharedRooms = dorm.roomTypes.filter((room) => room.isShared)
  const privateRooms = dorm.roomTypes.filter((room) => !room.isShared)
  const startingRoom = dorm.roomTypes[0]
  const inviteHref = `/dorm/${dorm.id}/finalize?room=${sharedRooms[0]?.id ?? dorm.roomTypes[0]?.id}`

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/listings" className="flex items-center gap-2 text-primary transition-all hover:gap-3">
            <ChevronLeft className="h-4 w-4" />
            Back to Listings
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsFavorited((prev) => !prev)}>
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-destructive" : ""}`} />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <div className="relative h-[420px] bg-muted">
                <img src={activeImage} alt={dorm.name} className="h-full w-full object-cover" />
                {dorm.verified && (
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                    <Shield className="h-3.5 w-3.5" /> Verified listing
                  </div>
                )}
                <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  {mainImage + 1} of {heroImages.length}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-border bg-background/80 p-3">
                {heroImages.map((image, index) => (
                  <button
                    key={image + index}
                    onClick={() => setMainImage(index)}
                    className={`group relative h-24 overflow-hidden rounded-xl border transition ${
                      mainImage === index ? "border-primary" : "border-border hover:border-primary/60"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${dorm.name} view ${index + 1}`}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-4xl font-bold leading-tight tracking-tight">{dorm.name}</h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="h-3 w-3" /> {dorm.highlights?.[0] ?? "Community favorite"}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 text-foreground">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{dorm.rating.toFixed(1)}</span>
                    <span>({dorm.reviewsCount} reviews)</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {dorm.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" /> {dorm.schools.slice(0, 2).join(" • ")}
                    {dorm.schools.length > 2 && <span className="text-muted-foreground">+{dorm.schools.length - 2} more</span>}
                  </span>
                  <span>{dorm.distanceLabel} from campus</span>
                </div>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground">{dorm.description}</p>

              {dorm.highlights && dorm.highlights.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Why students stay here</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dorm.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground"
                      >
                        <Sparkles className="h-3 w-3" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Card className="border border-border p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                {dorm.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Room Types</h2>
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Flexible stays</span>
              </div>
              <div className="mt-4 space-y-4">
                {dorm.roomTypes.map((room: DormRoomType) => {
                  const href = `/dorm/${dorm.id}/finalize?room=${room.id}`
                  return (
                    <Link
                      key={room.id}
                      href={href}
                      className="group flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 transition hover:border-primary/60 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-foreground">{room.type}</p>
                            {room.isShared && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                                <Users className="h-3 w-3" /> Shared
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{room.size}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">₱{room.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">per month</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{room.description}</p>
                      {room.highlights && room.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {room.highlights.map((item) => (
                            <span key={item} className="rounded-full bg-muted px-2.5 py-1">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        <FileSignature className="h-4 w-4" /> Start contract & payment
                      </span>
                    </Link>
                  )
                })}
              </div>
            </Card>

            {dorm.fees.length > 0 && (
              <Card className="border border-border p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Additional Fees</h2>
                <div className="mt-4 space-y-4">
                  {dorm.fees.map((fee) => (
                    <div key={fee.label} className="flex flex-col gap-1 rounded-xl bg-muted/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-foreground">{fee.label}</p>
                        <p className="text-xs uppercase text-muted-foreground">{fee.frequency}</p>
                        {fee.description && <p className="text-xs text-muted-foreground/80">{fee.description}</p>}
                      </div>
                      <p className="text-lg font-semibold text-primary">₱{fee.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className="border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Community Stories</h2>
                <span className="text-xs text-muted-foreground">Real feedback from residents</span>
              </div>
              <div className="mt-4 space-y-4">
                {dorm.reviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-border px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Quote className="h-4 w-4 text-primary" />
                        {review.author}
                        <span className="text-xs uppercase text-muted-foreground">{review.type}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border border-border p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Nearby Schools & Hubs</h2>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {dorm.schools.map((school) => (
                  <span key={school} className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                    <GraduationCap className="h-3 w-3" /> {school}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="border border-border bg-card p-6 shadow-md">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-4xl font-bold text-primary">₱{dorm.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>

                <div className="space-y-3">
                  {startingRoom && (
                    <Link href={`/dorm/${dorm.id}/finalize?room=${startingRoom.id}`} className="block">
                      <Button className="h-12 w-full bg-primary text-base hover:bg-primary/90">
                        <FileSignature className="mr-2 h-4 w-4" /> Start contract
                      </Button>
                    </Link>
                  )}
                  <Button
                    className="h-12 w-full bg-secondary text-base text-secondary-foreground hover:bg-secondary/90"
                    onClick={() => setShowViewingForm(true)}
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Schedule viewing
                  </Button>
                  <Button
                    variant={isInComparison ? "default" : "outline"}
                    className="h-12 w-full"
                    onClick={() => toggleDorm(dorm.id)}
                  >
                    <Users className="mr-2 h-4 w-4" /> {isInComparison ? "In comparison" : "Add to comparison"}
                  </Button>
                </div>

                {sharedRooms.length > 0 && (
                  <div className="mt-6 rounded-xl bg-accent/10 p-4 text-sm text-accent-foreground">
                    <div className="flex items-center gap-2 font-semibold">
                      <Users className="h-4 w-4" /> Shared living slots
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Invite roommates and reserve shared suites together. Slots update in real time.
                    </p>
                    <Link href={inviteHref} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                      <Wallet className="h-3.5 w-3.5" /> Manage shared booking
                    </Link>
                  </div>
                )}

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{dorm.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{dorm.contact.email}</span>
                  </div>
                </div>
              </Card>

              <Card className="border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-4 font-semibold">Key information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Verified listing</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                      <Shield className="h-3.5 w-3.5" /> {dorm.verified ? "Yes" : "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Resident rating</span>
                    <span className="font-semibold">{dorm.rating.toFixed(1)} / 5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Community reviews</span>
                    <span className="font-semibold">{dorm.reviewsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Available room types</span>
                    <span className="font-semibold">{dorm.roomTypes.length}</span>
                  </div>
                </div>
              </Card>

              {privateRooms.length > 0 && (
                <Card className="border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold">Private suites snapshot</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {privateRooms.map((room) => (
                      <li key={room.id} className="flex items-center justify-between">
                        <span>{room.type}</span>
                        <span className="font-semibold text-foreground">₱{room.price.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {showViewingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div>
              <h2 className="text-2xl font-semibold">Schedule a viewing</h2>
              <p className="text-sm text-muted-foreground">Our housing specialist will confirm your preferred slot within 24 hours.</p>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
              />
              <input
                type="date"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowViewingForm(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">Submit request</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
