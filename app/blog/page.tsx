"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, Facebook, Twitter, Linkedin, Link2, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  "All Categories",
  "digital-media",
  "investigative-journalism",
  "media-ethics",
  "community-media",
  "entrepreneurship",
  "leadership",
  "training",
  "advocacy",
]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")
  const [loading, setLoading] = useState(true)

  // Fetch blog posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs?limit=100")
        if (!res.ok) throw new Error('Failed to fetch blogs')
        
        const result = await res.json()
        console.log("📝 Fetched blog posts:", result)
        
        // ✅ Handle consistent response structure
        let posts = []
        if (result.success && result.data) {
          posts = Array.isArray(result.data) ? result.data : []
        } else if (Array.isArray(result)) {
          posts = result
        }

        // Filter for published posts only
        const publishedPosts = posts.filter((post: any) => post.status === "Published")
        
        console.log("📊 Published posts found:", publishedPosts.length)
        setBlogPosts(publishedPosts)
        setFilteredPosts(publishedPosts)
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setBlogPosts([])
        setFilteredPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...blogPosts]

    // Search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          (post.title && post.title.toLowerCase().includes(lowerSearchTerm)) ||
          (post.content && post.content.toLowerCase().includes(lowerSearchTerm)) ||
          (post.author && post.author.toLowerCase().includes(lowerSearchTerm)) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(lowerSearchTerm)) ||
          (post.tags && Array.isArray(post.tags) && 
            post.tags.some((tag: string) => tag.toLowerCase().includes(lowerSearchTerm)))
      )
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.publishDate || a.createdAt).getTime()
        const dateB = new Date(b.publishDate || b.createdAt).getTime()
        return dateB - dateA
      })
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.publishDate || a.createdAt).getTime()
        const dateB = new Date(b.publishDate || b.createdAt).getTime()
        return dateA - dateB
      })
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    }

    console.log(`📊 Filtered posts: ${filtered.length} (category: ${selectedCategory}, search: "${searchTerm}", sort: ${sortBy})`)
    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, sortBy, blogPosts])

  const sharePost = (post: any, platform: string) => {
    const url = `${window.location.origin}/blog/${post.slug || post._id}`
    const text = `Check out this article: ${post.title}`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        break
    }
  }

  // Format category for display
  const formatCategoryDisplay = (category: string) => {
    if (category === "All Categories") return category
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
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
              "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 text-white">
          <h1 className="text-5xl font-bold mb-4 text-white">Blog</h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Insights, stories, and perspectives from women in media. Stay updated
            with the latest trends, challenges, and opportunities in journalism and
            media.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {formatCategoryDisplay(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPosts.length} of {blogPosts.length} articles
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post._id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {post.category && (
                      <Badge className="absolute top-4 left-4 bg-[var(--amwik-purple)]">
                        {formatCategoryDisplay(post.category)}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg hover:text-[var(--amwik-purple)] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug || post._id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="truncate">{post.author}</span>
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

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{post.readTime || "5 min read"}</span>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => sharePost(post, "facebook")} className="p-1 h-8 w-8 hover:bg-gray-100">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => sharePost(post, "twitter")} className="p-1 h-8 w-8 hover:bg-gray-100">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => sharePost(post, "linkedin")} className="p-1 h-8 w-8 hover:bg-gray-100">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => sharePost(post, "copy")} className="p-1 h-8 w-8 hover:bg-gray-100">
                          <Link2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter and never miss the latest insights from women in media.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email address" className="flex-1" />
            <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}