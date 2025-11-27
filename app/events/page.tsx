"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, MapPin, Users, Clock, DollarSign, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Event {
  _id: string
  title: string
  description: string
  startDate: string
  endDate?: string
  startTime?: string
  endTime?: string
  venue?: string
  city?: string
  country?: string
  type?: string
  category?: string
  price?: number | string
  capacity?: number
  registered?: number
  virtualPlatform?: string
  status?: string
  featured?: boolean
  featuredImage?: string
  createdAt?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("upcoming")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const eventTypes = ["All Types", "physical", "virtual", "hybrid"]
  const categories = [
    "All Categories",
    "Conference",
    "Workshop",
    "Training",
    "Networking",
    "Seminar",
  ]

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log("🔄 Fetching events...")
        const res = await fetch("/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
        }

        const result = await res.json()
        console.log("📅 Events API Response:", result)

        let eventsList: Event[] = []

        // Handle different response structures
        if (result.success && result.data) {
          eventsList = Array.isArray(result.data) ? result.data : []
        } else if (Array.isArray(result)) {
          eventsList = result
        } else if (result.data && Array.isArray(result.data)) {
          eventsList = result.data
        }

        console.log(`✅ Raw events received: ${eventsList.length}`)

        // Validate and filter events
        const validEvents = eventsList.filter((event: any) => {
          if (!event._id || !event.title) {
            console.warn("⚠️ Skipping invalid event (missing _id or title):", event.title)
            return false
          }
          // Don't filter by date - show all published events regardless of date
          return true
        })

        console.log(`✅ Valid events after validation: ${validEvents.length}`)

        // Filter for published events only
        const publishedEvents = validEvents.filter((event: any) => {
          const isPublished = event.status === "Published"
          if (!isPublished) {
            console.log(`⏭️ Skipping non-published event: ${event.title} (status: ${event.status})`)
          }
          return isPublished
        })

        console.log(`✅ Published events: ${publishedEvents.length}`)

        // Sort by start date (upcoming first)
        const sorted = publishedEvents.sort((a: Event, b: Event) => {
          const dateA = a.startDate ? new Date(a.startDate).getTime() : 0
          const dateB = b.startDate ? new Date(b.startDate).getTime() : 0
          return dateA - dateB
        })

        console.log(`✅ Final sorted events: ${sorted.length}`)
        sorted.forEach((e, i) => {
          console.log(`  ${i + 1}. ${e.title} - ${e.startDate}`)
        })

        setEvents(sorted)
        setFilteredEvents(sorted)
      } catch (err: any) {
        console.error("❌ Error fetching events:", err)
        setError(err.message || "Failed to load events")
        setEvents([])
        setFilteredEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...events]

    // Search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          (event.title && event.title.toLowerCase().includes(lowerSearchTerm)) ||
          (event.description && event.description.toLowerCase().includes(lowerSearchTerm)) ||
          (event.venue && event.venue.toLowerCase().includes(lowerSearchTerm)) ||
          (event.city && event.city.toLowerCase().includes(lowerSearchTerm))
      )
    }

    // Type filter
    if (selectedType !== "All Types") {
      filtered = filtered.filter((event) => event.type === selectedType)
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    // Sorting
    if (sortBy === "upcoming") {
      filtered.sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0
        return dateA - dateB
      })
    } else if (sortBy === "latest") {
      filtered.sort((a, b) => {
        const dateA = new Date(b.createdAt || b.startDate).getTime()
        const dateB = new Date(a.createdAt || a.startDate).getTime()
        return dateA - dateB
      })
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.registered || 0) - (a.registered || 0))
    }

    console.log(`📊 Filtered events after search/filters: ${filtered.length}`)
    setFilteredEvents(filtered)
  }, [searchTerm, selectedType, selectedCategory, sortBy, events])

  const formatEventType = (type: string) => {
    if (!type) return "Event"
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "physical":
        return "bg-blue-100 text-blue-800"
      case "virtual":
        return "bg-purple-100 text-purple-800"
      case "hybrid":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 text-white">
          <h1 className="text-5xl font-bold mb-4 text-white">Events</h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Join our upcoming conferences, workshops, and networking events. Connect with
            women in media and advance your professional journey.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events, venues, or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "All Types" ? type : formatEventType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming First</SelectItem>
                  <SelectItem value="latest">Latest Added</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Error Loading Events</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-[var(--amwik-purple)] hover:bg-purple-700"
              >
                Try Again
              </Button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No events found</h3>
              <p className="text-gray-600">
                {events.length > 0 
                  ? "Try adjusting your search terms or filters." 
                  : "No events available at the moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => {
                const startDate = event.startDate ? new Date(event.startDate) : null
                const endDate = event.endDate ? new Date(event.endDate) : null
                const registrationPercentage = event.capacity
                  ? Math.min(100, Math.round(((event.registered || 0) / event.capacity) * 100))
                  : 0

                return (
                  <Card key={event._id} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                    <div className="relative">
                      <Image
                        src={event.featuredImage || "/placeholder.svg"}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {event.type && (
                        <Badge className={`absolute top-4 left-4 ${getEventColor(event.type)}`}>
                          {formatEventType(event.type)}
                        </Badge>
                      )}
                      {event.featured && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="flex-grow">
                      <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Date and Time */}
                      {startDate && (
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>
                              {startDate.toLocaleDateString()}
                              {endDate && startDate.toDateString() !== endDate.toDateString()
                                ? ` - ${endDate.toLocaleDateString()}`
                                : ""}
                            </span>
                          </div>
                          {event.startTime && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span>
                                {event.startTime}
                                {event.endTime ? ` - ${event.endTime}` : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Location */}
                      <div className="flex items-start space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>
                          {event.type === "virtual" ? (
                            <span>Virtual Event {event.virtualPlatform ? `(${event.virtualPlatform})` : ""}</span>
                          ) : (
                            `${event.venue || "TBA"}, ${event.city || "TBA"}, ${event.country || "Kenya"}`
                          )}
                        </span>
                      </div>

                      {/* Registration Info */}
                      {event.capacity && (
                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              <span>
                                {event.registered || 0}/{event.capacity} registered
                              </span>
                            </div>
                            {event.price && (
                              <div className="flex items-center font-semibold text-[var(--amwik-purple)]">
                                <DollarSign className="h-4 w-4" />
                                {event.price}
                              </div>
                            )}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[var(--amwik-purple)] h-2 rounded-full transition-all"
                              style={{ width: `${registrationPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}