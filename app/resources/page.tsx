"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Calendar, FileText, BookOpen, Newspaper, BarChart3, Users } from "lucide-react"

const resourceTypes = ["All Types", "Research Paper", "Publication", "Article"]
const categories = [
  "All Categories",
  "Gender Studies",
  "Training Materials",
  "Leadership",
  "Ethics",
  "Entrepreneurship",
  "Community Media",
  "Environmental",
  "Press Freedom",
]

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredResources, setFilteredResources] = useState<any[]>([])

  // Fetch resources from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources")
        const data = await res.json()
        setResources(data)
        setFilteredResources(data)
      } catch (err) {
        console.error("Failed to fetch resources", err)
      }
    }
    fetchResources()
  }, [])

  // Filter and search functionality
  const handleSearch = () => {
    let filtered = [...resources]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (Array.isArray(resource.tags)
            ? resource.tags.some((tag: string) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : typeof resource.tags === "string"
            ? resource.tags
                .split(",")
                .some((tag: string) =>
                  tag.trim().toLowerCase().includes(searchTerm.toLowerCase())
                )
            : false)
      )
    }

    // Filter by type
    if (selectedType !== "All Types") {
      filtered = filtered.filter((resource) => resource.type === selectedType)
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((resource) => resource.category === selectedCategory)
    }

    // Sort resources
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredResources(filtered)
  }

  // Re-run search/filter when dependencies change
  useEffect(() => {
    handleSearch()
  }, [searchTerm, selectedType, selectedCategory, sortBy, resources])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Research Paper":
        return <BarChart3 className="h-5 w-5" />
      case "Publication":
        return <BookOpen className="h-5 w-5" />
      case "Article":
        return <Newspaper className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Research Paper":
        return "bg-[var(--amwik-blue)]"
      case "Publication":
        return "bg-[var(--amwik-green)]"
      case "Article":
        return "bg-[var(--amwik-orange)]"
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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Access our collection of research papers, publications, and articles on women in
            media, journalism ethics, and professional development.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search resources, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Downloaded</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredResources.length} of {resources.length} resources
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => {
                // Normalize tags
                let tags: string[] = []
                if (Array.isArray(resource.tags)) {
                  tags = resource.tags
                } else if (typeof resource.tags === "string") {
                  tags = resource.tags.split(",").map((t: string) => t.trim())
                }

                return (
                  <Card key={resource._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className={`p-2 rounded-lg ${getTypeColor(resource.type)} text-white`}>
                          {getTypeIcon(resource.type)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {resource.author || "Unknown"}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(resource.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{resource.format || "PDF"} • {resource.fileSize || "N/A"}</span>
                          <span className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            {(resource.downloadCount || 0).toLocaleString()} downloads
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {tags.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{tags.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <Button
                          className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700"
                          onClick={() => window.open(resource.fileUrl || resource.downloadUrl, "_blank")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Resource
                        </Button>
                      </div>
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
