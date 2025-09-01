"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, MapPin, Clock, Users, ExternalLink, Filter } from "lucide-react"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "MEDIA CAPACITY WORKSHOP ON GENDER RESPONSIVE PROCUREMENT",
    description:
      "Join us for our flagship conference featuring keynote speakers, panel discussions, and networking opportunities for women in media.",
    date: "2024-03-15",
    time: "09:00 AM - 05:00 PM",
    location: "Nairobi Serena Hotel, Nairobi",
    type: "Conference",
    status: "upcoming",
    image: "https://amwik.org/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-15-at-9.34.46-AM.jpeg",
    tags: ["Networking", "Professional Development", "Keynote"],
  },
  {
    title: "ENHANCING NATURE CRIMES REPORTING AND COMMUNITY AWARENESS",
    description:
      "Learn the role of media in reporting nature crimes and enhancing community awareness.",
    date: "2024-02-28",
    time: "10:00 AM - 04:00 PM",
    location: "Kajiado",
    type: "Workshop",
    capacity: 50,
    registered: 38,
    price: "Free",
    image: "https://amwik.org/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-15-at-09.33.59_05600a43-955x530.jpg",
    tags: ["Digital Media", "Skills Training", "Hands-on"],
  },
  {
    id: 3,
    title: "Gender Policies Meeting",
    description:
      "Join us for a meeting to discuss and Gender Policies in Kenya.",
    date: "2024-02-20",
    time: "06:00 PM - 08:00 PM",
    location: "Kusyombunguo,Makueni",
    type: "in-Person",
    capacity: 200,
    registered: 156,
    price: "Free",
    image: "https://amwik.org/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-23.06.23_7ef5f271.jpg",
    tags: ["Leadership", "Virtual", "Panel"],
  },
  {
    id: 4,
    title: "Leaders Forum",
    description:
      "",
    date: "2024-02-10",
    time: "09:00 AM - 01:00 PM",
    location: "Virtual Event (X-space)",
    type: "Training",
    status: "past",
    image: "https://amwik.org/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-12.59.09-PM-1-955x530.jpeg",
    tags: ["Ethics", "Standards", "Training"],
  },
  {
    id: 5,
    title: "UN WOMEN 15 YEARS ANNIVERSARY",
    description: "Advanced masterclass on investigative reporting techniques, source protection, and data journalism.",
    date: "2024-01-25",
    time: "09:00 AM - 05:00 PM",
    location: "Alliance Francais, Nairobi",
    type: "Masterclass",
    status: "past",
    image: "https://amwik.org/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-12.59.08-PM.jpeg",
    tags: [ "Advanced", "Gender Advocacy"],
  },
  {
    id: 6,
    title: "AMWIK AGM 2025",
    description: "",
    date: "2024-01-15",
    time: "09:00 AM - 05:00 PM",
    location: "Best Western plus Meridian Hotel",
    type: "Training Program",
    status: "past",
    image: "https://amwik.org/wp-content/uploads/2025/06/AWIK-ELECTION.jpeg",
    tags: ["Community Radio", "Management", "Multi-day"],
  },
]

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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedStatus, setSelectedStatus] = useState("All Events")
  const [sortBy, setSortBy] = useState("date-desc")
  const [filteredEvents, setFilteredEvents] = useState(events)

  // Filter and search functionality
  const handleSearch = () => {
    let filtered = events

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by type
    if (selectedType !== "All Types") {
      filtered = filtered.filter((event) => event.type === selectedType)
    }

    // Filter by status
    if (selectedStatus !== "All Events") {
      filtered = filtered.filter((event) => event.status === selectedStatus.toLowerCase())
    }

    // Sort events
    if (sortBy === "date-desc") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === "date-asc") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "popularity") {
      filtered.sort((a, b) => b.registered - a.registered)
    }

    setFilteredEvents(filtered)
  }

  // Apply filters whenever search term, type, status, or sort changes
  useState(() => {
    handleSearch()
  }, [searchTerm, selectedType, selectedStatus, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
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

      {/* Hero Section */}
      <section className="relative text-white py-16">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join our community at conferences, workshops, and training sessions designed to advance women's careers in
            media and journalism.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events, locations, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
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
                <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
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
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <Clock className="h-4 w-4 ml-4 mr-2" />
                        <span>{event.time}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>

                      {/* Capacity and Price */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {event.registered}/{event.capacity} registered
                          </span>
                        </div>
                        <div className="font-semibold text-[var(--amwik-purple)]">{event.price}</div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[var(--amwik-purple)] h-2 rounded-full"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button */}
                      {event.status === "upcoming" ? (
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

      {/* Upcoming Events Summary */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't Miss Out</h2>
            <p className="text-xl text-gray-600">Stay updated with our latest events and training opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[var(--amwik-purple)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Regular Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monthly workshops and quarterly conferences to keep you updated with industry trends.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[var(--amwik-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with fellow journalists, media professionals, and industry leaders.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[var(--amwik-orange)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Skill Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Hands-on workshops and training sessions to enhance your professional skills.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">Subscribe to Event Updates</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
