"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSlideshow from "@/components/hero-slideshow"
import StatsCards from "@/components/stats-cards"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { Users, BookOpen, Award, Heart, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs")
        const result = await res.json()
        if (Array.isArray(result)) {
          const sorted = result.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          setFeaturedBlogs(sorted.slice(0, 3))
        } else if (result.success && Array.isArray(result.data)) {
          // fallback if API wraps in { success, data }
          const sorted = result.data.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          setFeaturedBlogs(sorted.slice(0, 3))
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
      }
    }
    fetchBlogs()
  }, [])

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")
        const data = await res.json()

        if (Array.isArray(data)) {
          const sorted = data.sort(
            (a: any, b: any) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          )
          setUpcomingEvents(sorted.slice(0, 3))
        }
      } catch (err) {
        console.error("Error fetching events:", err)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSlideshow />
      <StatsCards />

      {/* Join Our Community Section */}
      <section className="py-16 bg-[var(--amwik-purple)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Be part of a network that's transforming media landscapes and empowering women across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership/new">
              <Button
                size="lg"
                className="bg-[#F0C83C] text-black hover:bg-white hover:text-black transition-colors"
              >
                Become a Member
              </Button>
            </Link>

            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-[var(--amwik-purple)] bg-transparent"
              >
                Upcoming Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      {/* (your Programs Preview section stays the same) */}

      {/* Latest Blogs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600">Insights, stories, and perspectives from women in media</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((post) => (
              <Card key={post._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {post.category && (
                    <Badge className="absolute top-4 left-4 bg-[var(--amwik-purple)]">
                      {post.category}
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg hover:text-[var(--amwik-purple)] transition-colors">
                    <Link href={`/blog/${post.slug || post._id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {post.publishDate
                          ? new Date(post.publishDate).toLocaleDateString()
                          : new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{post.readTime || "5 min read"}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
                Read More Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">
              Join us at our latest conferences, workshops, and networking events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={event.featuredImage || "/placeholder.svg"} // ✅ fixed
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {event.type && (
                    <Badge className="absolute top-4 left-4 bg-[var(--amwik-blue)]">
                      {event.type}
                    </Badge>
                  )}
                  {event.price === "Free" && (
                    <Badge className="absolute top-4 right-4 bg-green-500">Free</Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* Date and Time */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                      {event.startTime && (
                        <>
                          <Clock className="h-4 w-4 ml-4 mr-2" />
                          <span>{event.startTime}</span>
                        </>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>
                        {event.venue}, {event.city}, {event.country}
                      </span>
                    </div>

                    {/* Capacity and Price */}
                    {event.capacity && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {event.registered || 0}/{event.capacity} registered
                          </span>
                        </div>
                        <div className="font-semibold text-[var(--amwik-purple)]">
                          {event.price}
                        </div>
                      </div>
                    )}

                    {/* Progress Bar */}
                    {event.capacity && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[var(--amwik-purple)] h-2 rounded-full"
                          style={{
                            width: `${((event.registered || 0) / event.capacity) * 100}%`,
                          }}
                        ></div>
                      </div>
                    )}

                    {/* Register Button */}
                    <Button className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700">
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/events">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
