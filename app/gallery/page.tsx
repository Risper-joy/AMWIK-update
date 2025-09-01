"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import HeroSection from "@/components/hero-section"
import { Search, Grid, List, Calendar, User, Download, X } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    title: "Annual Media Conference 2024 - Opening Ceremony",
    description:
      "Opening ceremony of the Annual Media Conference with keynote speakers and industry leaders discussing the future of media in Kenya.",
    category: "Events",
    date: "2024-01-15",
    photographer: "John Doe Photography",
    tags: ["conference", "2024", "opening", "keynote"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Digital Storytelling Workshop",
    description: "Participants learning digital storytelling techniques and modern media production methods.",
    category: "Training",
    date: "2024-01-12",
    photographer: "AMWIK Staff",
    tags: ["workshop", "digital", "storytelling", "training"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Women in Leadership Panel Discussion",
    description: "Panel discussion featuring successful women leaders in the media industry sharing their experiences.",
    category: "Events",
    date: "2024-01-10",
    photographer: "Media Focus Kenya",
    tags: ["panel", "leadership", "women", "discussion"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Media Ethics Training Session",
    description: "Comprehensive training session on media ethics and professional standards in journalism.",
    category: "Training",
    date: "2024-01-08",
    photographer: "AMWIK Staff",
    tags: ["ethics", "training", "standards", "professional"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "AMWIK Awards Ceremony 2023",
    description: "Annual awards ceremony recognizing outstanding women in media and their contributions to journalism.",
    category: "Awards",
    date: "2023-12-20",
    photographer: "Event Photography Pro",
    tags: ["awards", "ceremony", "2023", "recognition"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Investigative Journalism Masterclass",
    description: "Intensive masterclass on investigative journalism techniques and research methodologies.",
    category: "Training",
    date: "2024-01-05",
    photographer: "AMWIK Staff",
    tags: ["investigative", "journalism", "masterclass", "techniques"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 7,
    title: "Community Radio Workshop",
    description: "Workshop on community radio broadcasting, management, and community engagement strategies.",
    category: "Training",
    date: "2024-01-03",
    photographer: "Radio Kenya",
    tags: ["community", "radio", "workshop", "broadcasting"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 8,
    title: "AMWIK Team Building Event",
    description: "Annual team building event for AMWIK staff and volunteers to strengthen collaboration.",
    category: "Team",
    date: "2023-12-15",
    photographer: "AMWIK Staff",
    tags: ["team", "building", "staff", "volunteers"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 9,
    title: "Youth Media Training Program",
    description: "Training program designed to equip young women with essential media and communication skills.",
    category: "Training",
    date: "2023-12-10",
    photographer: "AMWIK Staff",
    tags: ["youth", "training", "media", "skills"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 10,
    title: "International Women's Day Celebration",
    description: "AMWIK's celebration of International Women's Day with special focus on media representation.",
    category: "Events",
    date: "2023-03-08",
    photographer: "Celebration Photos",
    tags: ["international", "womens day", "celebration", "media"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 11,
    title: "Media Literacy Workshop for Schools",
    description: "Educational workshop teaching media literacy to high school students across Kenya.",
    category: "Education",
    date: "2023-11-20",
    photographer: "Education Team",
    tags: ["media literacy", "schools", "education", "students"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 12,
    title: "AMWIK Annual General Meeting",
    description: "Annual General Meeting with members discussing organizational goals and achievements.",
    category: "Meetings",
    date: "2023-11-15",
    photographer: "AMWIK Staff",
    tags: ["AGM", "meeting", "members", "annual"],
    image: "/placeholder.svg?height=400&width=600",
  },
]

const categories = ["All", "Events", "Training", "Awards", "Team", "Education", "Meetings"]

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        title="Photo Gallery"
        description="Explore moments from our events, training sessions, and community activities"
        backgroundImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredImages.length} of {galleryImages.length} photos
          </div>
        </div>

        {/* Gallery Grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div
                    className="relative aspect-[4/3] bg-gray-200 rounded-t-lg overflow-hidden"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.image || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200" />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">{image.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(image.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {image.photographer}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredImages.map((image) => (
              <Card key={image.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 p-4">
                    <div
                      className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.image || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-2">{image.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <Badge variant="outline" className="text-xs">
                              {image.category}
                            </Badge>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(image.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {image.photographer}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setSelectedImage(image)}>
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No photos found</div>
            <div className="text-gray-400 text-sm">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-[16/10] bg-gray-900">
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">Category</div>
                    <Badge variant="outline" className="mt-1">
                      {selectedImage.category}
                    </Badge>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Date</div>
                    <div className="text-gray-600 mt-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(selectedImage.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Photographer</div>
                    <div className="text-gray-600 mt-1 flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {selectedImage.photographer}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Tags</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedImage.tags.slice(0, 3).map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
