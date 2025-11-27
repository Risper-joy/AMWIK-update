"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import StatsCards from "@/components/stats-cards"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, MapPin, Clock, Users, BookOpen, DollarSign, Heart, Briefcase, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const HeroSlideshow = dynamic(() => import("@/components/hero-slideshow"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center bg-gray-100">
      Loading Hero...
    </div>
  ), 
})

const programs = [
  {
    id: 1,
    title: "Gender and Governance",
    description: "Promoting gender equality and women's participation in governance and decision-making processes.",
    icon: Users,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 2,
    title: "Media Development",
    description: "Building capacity and skills for women journalists through comprehensive training programs.",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Economic Empowerment",
    description: "Supporting women's economic independence through entrepreneurship and financial literacy.",
    icon: DollarSign,
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: 4,
    title: "Sexual Health & Rights",
    description: "Advocating for sexual health and reproductive rights through media awareness.",
    icon: Heart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 5,
    title: "Career Development",
    description: "Comprehensive career support and professional development opportunities.",
    icon: Briefcase,
    color: "bg-orange-100 text-orange-600",
  },
]

export default function HomePage() {
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)

  useEffect(() => {
    const handleChunkError = (e: ErrorEvent) => {
      if (e.message && e.message.includes('ChunkLoadError')) {
        console.error('ChunkLoadError detected, forcing page reload...');
        window.location.reload(); 
      }
    };

    window.addEventListener('error', handleChunkError);

    return () => {
      window.removeEventListener('error', handleChunkError);
    };
  }, []); 

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs?limit=100")
        if (!res.ok) throw new Error('Failed to fetch blogs')
        
        const result = await res.json()
        console.log("📝 Blog API Response:", result)
        
        let posts = []
        if (result.success && result.data) {
          posts = Array.isArray(result.data) ? result.data : []
        } else if (Array.isArray(result)) {
          posts = result
        }

        // Filter for published posts only
        const publishedPosts = posts.filter((p: any) => p.status === "Published")
        
        const sorted = publishedPosts.sort(
          (a: any, b: any) =>
            new Date(b.publishDate || b.createdAt).getTime() - 
            new Date(a.publishDate || a.createdAt).getTime()
        )
        
        console.log("📊 Featured blogs:", sorted.slice(0, 3).length)
        setFeaturedBlogs(sorted.slice(0, 3))
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setFeaturedBlogs([])
      } finally {
        setBlogsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")
        if (!res.ok) throw new Error('Failed to fetch events')
        
        const result = await res.json()
        console.log("📅 Events API Response:", result)

        let data = []
        if (result.success && result.data) {
          data = Array.isArray(result.data) ? result.data : []
        } else if (Array.isArray(result)) {
          data = result
        }

        const sorted = data
          .filter((event: any) => event.startDate)
          .sort((a: any, b: any) => 
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          )
        
        console.log("📊 Upcoming events:", sorted.slice(0, 3).length)
        setUpcomingEvents(sorted.slice(0, 3))
      } catch (err) {
        console.error("Error fetching events:", err)
        setUpcomingEvents([])
      } finally {
        setEventsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <HeroSlideshow /> 
      
      <StatsCards />

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600">Empowering women through comprehensive initiatives and support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${program.color}`}>
                    <program.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">{program.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/about/programs">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
                Learn More About Our Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

      {/* Latest Blogs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600">Insights, stories, and perspectives from women in media</p>
          </div>

          {blogsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 text-[var(--amwik-purple)]" />
            </div>
          ) : featuredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available yet.</p>
            </div>
          ) : (
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
          )}

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

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 text-[var(--amwik-purple)]" />
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No upcoming events at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event._id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <Image
                      src={event.featuredImage || "/placeholder.svg"}
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

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>
                          {event.venue}, {event.city}, {event.country}
                        </span>
                      </div>

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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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