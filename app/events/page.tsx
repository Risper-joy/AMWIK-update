"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, MapPin, Clock, Users, ExternalLink, Filter } from "lucide-react"
import Image from "next/image"

interface Event {
  _id: string
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  venue: string
  city: string
  country: string
  type: string
  status: string
  price: string
  capacity?: number
  tags?: string[]
  featuredImage?: string
  registered?: number
}

const eventTypes = [
  "All Types",
  "Conference",
  "Workshop",
  "Panel Discussion",
  "Training",
  "Masterclass",
  "Training Program",
]
const eventStatus = ["All Events", "Upcoming", "Past"]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedStatus, setSelectedStatus] = useState("All Events")
  const [sortBy, setSortBy] = useState("date-desc")

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")
        const data = await res.json()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    }
    fetchEvents()
  }, [])

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...events]

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedType !== "All Types") {
      filtered = filtered.filter((event) => event.type === selectedType)
    }

    if (selectedStatus !== "All Events") {
      filtered = filtered.filter((event) => event.status === selectedStatus)
    }

    if (sortBy === "date-desc") {
      filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    } else if (sortBy === "date-asc") {
      filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "popularity") {
      filtered.sort((a, b) => (b.registered || 0) - (a.registered || 0))
    }

    setFilteredEvents(filtered)
  }, [searchTerm, selectedType, selectedStatus, sortBy, events])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "upcoming":
        return "bg-green-100 text-green-800"
      case "past":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Conference":
        return "bg-[var(--amwik-purple)]"
      case "Workshop":
        return "bg-[var(--amwik-blue)]"
      case "Panel Discussion":
        return "bg-[var(--amwik-green)]"
      case "Training":
        return "bg-[var(--amwik-orange)]"
      case "Masterclass":
        return "bg-[var(--amwik-red)]"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative text-white py-16">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-5xl font-bold mb-4 text-white">Events</h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Join our community at conferences, workshops, and training sessions designed to advance women's careers in
            media and journalism.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events, locations, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {eventStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Latest First</SelectItem>
                  <SelectItem value="date-asc">Earliest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No events found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Card key={event._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <Image
                      src={event.featuredImage || "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                    </div>
                    {event.price === "Free" && <Badge className="absolute top-4 right-4 bg-green-500">Free</Badge>}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {/* Date and Time */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.startDate).toLocaleDateString()}</span>
                        <Clock className="h-4 w-4 ml-4 mr-2" />
                        <span>{event.startTime}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>
                          {event.venue}, {event.city}, {event.country}
                        </span>
                      </div>

                      {/* Capacity + Price */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {event.registered || 0}/{event.capacity || 0} registered
                          </span>
                        </div>
                        <div className="font-semibold text-[var(--amwik-purple)]">
                          {event.price || "Free"}
                        </div>
                      </div>

                      {/* Progress */}
                      {event.capacity && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[var(--amwik-purple)] h-2 rounded-full"
                            style={{ width: `${((event.registered || 0) / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {event.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* CTA */}
                      {event.status?.toLowerCase() === "upcoming" ? (
                        <Button className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Register Now
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full bg-transparent" disabled>
                          Event Completed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
