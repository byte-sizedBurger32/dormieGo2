export interface DormReview {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  type: "student" | "alumni" | "parent" | "mentor"
}

export interface DormFee {
  label: string
  amount: number
  frequency: "monthly" | "one-time"
  description?: string
}

export interface DormRoomType {
  id: string
  type: string
  price: number
  size: string
  occupancy: string
  isShared: boolean
  slotsAvailable?: number
  totalSlots?: number
  description: string
  highlights?: string[]
}

export interface DormInfo {
  id: number
  slug: string
  name: string
  location: string
  price: number
  rating: number
  reviewsCount: number
  distanceLabel: string
  verified: boolean
  coverImage: string
  gallery: string[]
  amenities: string[]
  description: string
  schools: string[]
  reviews: DormReview[]
  roomTypes: DormRoomType[]
  fees: DormFee[]
  contact: {
    phone: string
    email: string
  }
  highlights?: string[]
}

export const dorms: DormInfo[] = [
  {
    id: 1,
    slug: "cozy-student-haven",
    name: "Cozy Student Haven",
    location: "Sampaloc, Manila",
    price: 4500,
    rating: 4.8,
    reviewsCount: 124,
    distanceLabel: "0.5 km",
    verified: true,
    coverImage: "/modern-student-dorm-room.jpg",
    gallery: [
      "/modern-student-dorm-room.jpg",
      "/bright-spacious-dorm-room.jpg",
      "/affordable-dorm-room.jpg",
    ],
    amenities: [
      "Fiber WiFi",
      "Air Conditioning",
      "Shared Kitchen",
      "Laundry Service",
      "Study Pods",
      "24/7 Security",
    ],
    description:
      "Comfortable and affordable student dorm located in the heart of Sampaloc. Perfect proximity to UST, FEU, and UE with curated community events every weekend.",
    schools: ["UST", "FEU Main", "CEU", "Review Centers"],
    reviews: [
      {
        id: "csh-r1",
        author: "Jamie L.",
        rating: 5,
        date: "October 2025",
        comment: "The study pods and quiet hours helped me stay focused during board exam week.",
        type: "student",
      },
      {
        id: "csh-r2",
        author: "Miguel R.",
        rating: 4,
        date: "September 2025",
        comment: "Shared room is spacious and the staff is quick to respond to maintenance requests.",
        type: "student",
      },
    ],
    roomTypes: [
      {
        id: "studio",
        type: "Private Studio",
        price: 4500,
        size: "15 sqm",
        occupancy: "1 person",
        isShared: false,
        description: "Compact studio with dedicated kitchenette and smart storage.",
        highlights: ["Work desk", "Kitchenette", "Private restroom"],
      },
      {
        id: "shared-2",
        type: "Shared 2-Bed Suite",
        price: 3500,
        size: "20 sqm",
        occupancy: "2 persons",
        isShared: true,
        slotsAvailable: 1,
        totalSlots: 2,
        description: "Best for roommates who want a balance of privacy and community living.",
        highlights: ["Dual closets", "Individual study nooks", "Weekly housekeeping"],
      },
    ],
    fees: [
      {
        label: "Association Fee",
        amount: 350,
        frequency: "monthly",
        description: "Covers common area upkeep and internet subscription.",
      },
      {
        label: "Security Deposit",
        amount: 5000,
        frequency: "one-time",
        description: "Refundable upon checkout after inspection.",
      },
    ],
    contact: {
      phone: "+63 2 8123 4567",
      email: "info@cozyhaven.com",
    },
    highlights: ["Community mentorship", "Free laundry weekend", "Biometric entry"],
  },
  {
    id: 2,
    slug: "urban-dorm-plus",
    name: "Urban Dorm Plus",
    location: "Sampaloc, Manila",
    price: 5200,
    rating: 4.9,
    reviewsCount: 98,
    distanceLabel: "0.8 km",
    verified: true,
    coverImage: "/bright-spacious-dorm-room.jpg",
    gallery: [
      "/bright-spacious-dorm-room.jpg",
      "/luxury-student-accommodation.jpg",
      "/modern-student-dorm-room.jpg",
    ],
    amenities: [
      "Infinity WiFi",
      "Air Conditioning",
      "Fitness Studio",
      "Laundry Lounge",
      "Rooftop Study Terrace",
      "24/7 Concierge",
    ],
    description:
      "Modern urban dormitory with premium facilities, perfect for students who want hotel-style living near U-Belt universities.",
    schools: ["FEU Tech", "NU Manila", "UST", "UE"],
    reviews: [
      {
        id: "udp-r1",
        author: "Alyssa P.",
        rating: 5,
        date: "November 2025",
        comment: "The rooftop study terrace is my go-to spot. Super quiet and inspiring views!",
        type: "student",
      },
      {
        id: "udp-r2",
        author: "Coach Ben",
        rating: 5,
        date: "October 2025",
        comment: "Our varsity players stay here because the fitness studio is open 24/7.",
        type: "mentor",
      },
    ],
    roomTypes: [
      {
        id: "deluxe-suite",
        type: "Deluxe Single Suite",
        price: 5200,
        size: "18 sqm",
        occupancy: "1 person",
        isShared: false,
        description: "Premium single suite with hotel-grade bed and executive desk.",
        highlights: ["Memory foam mattress", "Smart TV", "Pantry corner"],
      },
      {
        id: "shared-loft",
        type: "Executive Loft (Shared)",
        price: 4200,
        size: "22 sqm",
        occupancy: "2 persons",
        isShared: true,
        slotsAvailable: 2,
        totalSlots: 2,
        description: "Loft layout with individual loft beds and private lockers.",
        highlights: ["Private lockers", "Soundproof walls", "Daily housekeeping"],
      },
    ],
    fees: [
      {
        label: "Association Fee",
        amount: 500,
        frequency: "monthly",
        description: "Covers concierge, gym maintenance, and roof deck upkeep.",
      },
      {
        label: "One-time Registration",
        amount: 2500,
        frequency: "one-time",
      },
    ],
    contact: {
      phone: "+63 2 8234 5678",
      email: "hello@urbandormplus.com",
    },
    highlights: ["Smart access", "Co-working lounge", "Daily housekeeping"],
  },
  {
    id: 3,
    slug: "budget-student-rooms",
    name: "Budget Student Rooms",
    location: "U-Belt, Manila",
    price: 3800,
    rating: 4.5,
    reviewsCount: 156,
    distanceLabel: "1.2 km",
    verified: true,
    coverImage: "/affordable-dorm-room.jpg",
    gallery: [
      "/affordable-dorm-room.jpg",
      "/modern-student-dorm-room.jpg",
      "/bright-spacious-dorm-room.jpg",
    ],
    amenities: ["WiFi", "Shared Kitchen", "Laundry Area", "Reading Lounge", "Secure Lobby"],
    description:
      "Best-value dorm for working students. Flexible lease terms and secured entrances with RFID access.",
    schools: ["Arellano University", "Review Centers", "CEU"],
    reviews: [
      {
        id: "bsr-r1",
        author: "Trina V.",
        rating: 4,
        date: "August 2025",
        comment: "I love that they allow flexible check-in times for working students like me.",
        type: "student",
      },
      {
        id: "bsr-r2",
        author: "Lia G.",
        rating: 5,
        date: "June 2025",
        comment: "Laundry area is clean and affordable, and the manager is very approachable.",
        type: "student",
      },
    ],
    roomTypes: [
      {
        id: "shared-quad",
        type: "Shared Quad Pod",
        price: 2800,
        size: "26 sqm",
        occupancy: "4 persons",
        isShared: true,
        slotsAvailable: 3,
        totalSlots: 4,
        description: "Bunk pod layout with personal privacy curtains and charging docks.",
        highlights: ["Privacy curtains", "USB outlets", "Large locker"],
      },
      {
        id: "double-suite",
        type: "Budget Double Suite",
        price: 3800,
        size: "20 sqm",
        occupancy: "2 persons",
        isShared: true,
        slotsAvailable: 1,
        totalSlots: 2,
        description: "Ideal for best friends who want an affordable space near university.",
        highlights: ["Mini fridge", "Shared study table", "Weekly cleaning"],
      },
    ],
    fees: [
      {
        label: "Utilities Fee",
        amount: 600,
        frequency: "monthly",
        description: "Covers electricity, water, and WiFi.",
      },
    ],
    contact: {
      phone: "+63 2 8899 2345",
      email: "leasing@budgetrooms.ph",
    },
  },
  {
    id: 4,
    slug: "premium-student-living",
    name: "Premium Student Living",
    location: "U-Belt, Manila",
    price: 6500,
    rating: 4.9,
    reviewsCount: 87,
    distanceLabel: "1.5 km",
    verified: true,
    coverImage: "/luxury-student-accommodation.jpg",
    gallery: [
      "/luxury-student-accommodation.jpg",
      "/bright-spacious-dorm-room.jpg",
      "/modern-student-dorm-room.jpg",
    ],
    amenities: [
      "Infinity WiFi",
      "Air Conditioning",
      "Gym & Yoga Studio",
      "Sky Lounge",
      "Cafe Pantry",
      "On-call Nurse",
    ],
    description:
      "Boutique student residences with wellness-focused amenities and curated events every month.",
    schools: ["UST", "FEU Main", "NU Manila", "Review Centers"],
    reviews: [
      {
        id: "psl-r1",
        author: "Gia F.",
        rating: 5,
        date: "July 2025",
        comment: "Feels like a hotel! The on-call nurse helped me when I fell ill during finals week.",
        type: "student",
      },
    ],
    roomTypes: [
      {
        id: "executive-single",
        type: "Executive Single",
        price: 6500,
        size: "19 sqm",
        occupancy: "1 person",
        isShared: false,
        description: "Hotel-inspired space with full-wall window and built-in vanity.",
        highlights: ["Floor-to-ceiling window", "Mini bar", "Weekly linen change"],
      },
      {
        id: "duo-suite",
        type: "Luxury Duo Suite",
        price: 5600,
        size: "24 sqm",
        occupancy: "2 persons",
        isShared: true,
        slotsAvailable: 2,
        totalSlots: 2,
        description: "Includes lounge area and personal study corners for each resident.",
        highlights: ["Personal lounge", "Designer lighting", "Soundproofing"],
      },
    ],
    fees: [
      {
        label: "Wellness Membership",
        amount: 800,
        frequency: "monthly",
        description: "Includes gym, yoga studio, and sky lounge access.",
      },
      {
        label: "Security Deposit",
        amount: 8000,
        frequency: "one-time",
      },
    ],
    contact: {
      phone: "+63 917 234 9876",
      email: "hello@premiumliving.ph",
    },
  },
  {
    id: 5,
    slug: "bright-student-rooms",
    name: "Bright Student Rooms",
    location: "Sampaloc, Manila",
    price: 4200,
    rating: 4.7,
    reviewsCount: 92,
    distanceLabel: "0.3 km",
    verified: true,
    coverImage: "/modern-student-dorm-room.jpg",
    gallery: [
      "/modern-student-dorm-room.jpg",
      "/bright-spacious-dorm-room.jpg",
      "/affordable-dorm-room.jpg",
    ],
    amenities: ["WiFi", "Air Conditioning", "Laundry", "Common Lounge", "Outdoor Courtyard"],
    description:
      "Sun-filled rooms with high ceilings and an outdoor courtyard perfect for study breaks.",
    schools: ["FEU Main", "CEU", "UE", "Arellano University"],
    reviews: [
      {
        id: "bsr2-r1",
        author: "Elise D.",
        rating: 4,
        date: "May 2025",
        comment: "Love the courtyard! It is my favorite place to review with friends.",
        type: "student",
      },
    ],
    roomTypes: [
      {
        id: "standard-single",
        type: "Standard Single",
        price: 4200,
        size: "16 sqm",
        occupancy: "1 person",
        isShared: false,
        description: "Bright studio with big windows and dedicated wardrobe.",
      },
      {
        id: "bunk-share",
        type: "Bunk Share",
        price: 3200,
        size: "18 sqm",
        occupancy: "2 persons",
        isShared: true,
        slotsAvailable: 1,
        totalSlots: 2,
        description: "Custom bunk beds with integrated shelves and USB ports.",
      },
    ],
    fees: [
      {
        label: "Facilities Fee",
        amount: 400,
        frequency: "monthly",
      },
    ],
    contact: {
      phone: "+63 995 456 7788",
      email: "stay@brightrooms.ph",
    },
  },
  {
    id: 6,
    slug: "eco-dorm-housing",
    name: "Eco Dorm Housing",
    location: "U-Belt, Manila",
    price: 4800,
    rating: 4.6,
    reviewsCount: 67,
    distanceLabel: "1.8 km",
    verified: true,
    coverImage: "/bright-spacious-dorm-room.jpg",
    gallery: [
      "/bright-spacious-dorm-room.jpg",
      "/modern-student-dorm-room.jpg",
      "/luxury-student-accommodation.jpg",
    ],
    amenities: ["WiFi", "Air Conditioning", "Shared Kitchen", "Green Rooftop", "Bike Parking"],
    description:
      "Eco-conscious residences with solar-powered utilities and a rooftop herb garden maintained by residents.",
    schools: ["NU Manila", "FEU Tech", "Review Centers", "UST"],
    reviews: [
      {
        id: "eco-r1",
        author: "Marco T.",
        rating: 4,
        date: "April 2025",
        comment: "Utility bills went down thanks to their solar setup. Love the communal kitchen too!",
        type: "student",
      },
    ],
    roomTypes: [
      {
        id: "eco-single",
        type: "Eco Single",
        price: 4800,
        size: "17 sqm",
        occupancy: "1 person",
        isShared: false,
        description: "Sustainable materials with lots of natural light.",
      },
      {
        id: "eco-shared",
        type: "Eco Shared Loft",
        price: 3600,
        size: "21 sqm",
        occupancy: "2 persons",
        isShared: true,
        slotsAvailable: 2,
        totalSlots: 2,
        description: "Lofted beds with personal charging stations and planters.",
      },
    ],
    fees: [
      {
        label: "Green Initiative Fee",
        amount: 450,
        frequency: "monthly",
        description: "Supports rooftop garden and recycling program.",
      },
    ],
    contact: {
      phone: "+63 945 223 9900",
      email: "hello@ecodorm.ph",
    },
  },
  {
    id: 7,
    slug: "downtown-student-hub",
    name: "Downtown Student Hub",
    location: "Sampaloc, Manila",
    price: 5500,
    rating: 4.8,
    reviewsCount: 145,
    distanceLabel: "0.7 km",
    verified: true,
    coverImage: "/luxury-student-accommodation.jpg",
    gallery: [
      "/luxury-student-accommodation.jpg",
      "/bright-spacious-dorm-room.jpg",
      "/modern-student-dorm-room.jpg",
    ],
    amenities: ["WiFi", "Air Conditioning", "Gym", "Laundry", "Study Area", "Cinema Room"],
    description:
      "Community-driven hub with student-run cinema nights and collaborative project spaces.",
    schools: ["UST", "FEU Main", "NU Manila", "UE"],
    reviews: [
      {
        id: "dsh-r1",
        author: "Patrick V.",
        rating: 5,
        date: "March 2025",
        comment: "Our project group meets in the cinema room after classes. Super inspiring space!",
        type: "student",
      },
    ],
    roomTypes: [
      {
        id: "hub-single",
        type: "Creative Single",
        price: 5500,
        size: "17 sqm",
        occupancy: "1 person",
        isShared: false,
        description: "Includes pegboard wall for planning and custom shelving.",
      },
      {
        id: "hub-shared",
        type: "Collab Suite",
        price: 4300,
        size: "23 sqm",
        occupancy: "3 persons",
        isShared: true,
        slotsAvailable: 2,
        totalSlots: 3,
        description: "Triple-sharing suite with modular desks and mood lighting.",
      },
    ],
    fees: [
      {
        label: "Community Fund",
        amount: 500,
        frequency: "monthly",
        description: "Finances events, movie nights, and workshop facilitators.",
      },
    ],
    contact: {
      phone: "+63 917 778 1122",
      email: "team@dshub.ph",
    },
  },
  {
    id: 8,
    slug: "comfort-zone-dorm",
    name: "Comfort Zone Dorm",
    location: "U-Belt, Manila",
    price: 3900,
    rating: 4.4,
    reviewsCount: 78,
    distanceLabel: "2.0 km",
    verified: true,
    coverImage: "/affordable-dorm-room.jpg",
    gallery: [
      "/affordable-dorm-room.jpg",
      "/modern-student-dorm-room.jpg",
      "/bright-spacious-dorm-room.jpg",
    ],
    amenities: ["WiFi", "Shared Kitchen", "Laundry", "Community Pantry", "Study Cubicles"],
    description:
      "Cozy choice for review takers with quiet zones and a self-service pantry stocked weekly.",
    schools: ["Review Centers", "FEU Tech", "CEU", "Arellano University"],
    reviews: [
      {
        id: "czd-r1",
        author: "Rica S.",
        rating: 4,
        date: "February 2025",
        comment: "Perfect for review season. The pantry snacks are a lifesaver during all-nighters.",
        type: "student",
      },
    ],
    roomTypes: [
      {
        id: "comfort-single",
        type: "Comfort Single",
        price: 3900,
        size: "15 sqm",
        occupancy: "1 person",
        isShared: false,
        description: "Simple, quiet, and budget-friendly with ample storage.",
      },
      {
        id: "comfort-double",
        type: "Comfort Double",
        price: 3100,
        size: "18 sqm",
        occupancy: "2 persons",
        isShared: true,
        slotsAvailable: 1,
        totalSlots: 2,
        description: "Twin beds with personal lamps and under-bed storage.",
      },
    ],
    fees: [
      {
        label: "Community Care Fee",
        amount: 300,
        frequency: "monthly",
        description: "Supports pantry restock and housekeeping.",
      },
    ],
    contact: {
      phone: "+63 923 445 6677",
      email: "hello@comfortzone.ph",
    },
  },
]

export const schoolFilters = [
  "FEU Main",
  "FEU Tech",
  "NU Manila",
  "CEU",
  "UE",
  "UST",
  "Arellano University",
  "Review Centers",
]

export const getDormById = (id: string | number) => dorms.find((dorm) => dorm.id === Number(id))

export const getRoomById = (id: string | number, roomId: string) => {
  const dorm = getDormById(id)
  if (!dorm) return undefined
  return dorm.roomTypes.find((room) => room.id === roomId)
}
