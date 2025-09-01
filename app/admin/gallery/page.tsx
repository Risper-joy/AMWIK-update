"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Upload, Edit, Trash2, Eye, Grid, List, Calendar, Tag } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    title: "Annual Media Conference 2024 - Opening Ceremony",
    description: "Opening ceremony of the Annual Media Conference with keynote speakers",
    category: "Events",
    tags: ["conference", "2024", "opening", "keynote"],
    uploadDate: "2024-01-15",
    photographer: "John Doe Photography",
    featured: true,
    views: 1250,
    downloads: 45,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Digital Storytelling Workshop",
    description: "Participants learning digital storytelling techniques",
    category: "Training",
    tags: ["workshop", "digital", "storytelling", "training"],
    uploadDate: "2024-01-12",
    photographer: "AMWIK Staff",
    featured: false,
    views: 890,
    downloads: 23,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Women in Leadership Panel",
    description: "Panel discussion on women's leadership in media industry",
    category: "Events",
    tags: ["panel", "leadership", "women", "discussion"],
    uploadDate: "2024-01-10",
    photographer: "Media Focus Kenya",
    featured: true,
    views: 1100,
    downloads: 67,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Media Ethics Training Session",
    description: "Training session on media ethics and professional standards",
    category: "Training",
    tags: ["ethics", "training", "standards", "professional"],
    uploadDate: "2024-01-08",
    photographer: "AMWIK Staff",
    featured: false,
    views: 567,
    downloads: 12,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "AMWIK Awards Ceremony 2023",
    description: "Annual awards ceremony recognizing outstanding women in media",
    category: "Awards",
    tags: ["awards", "ceremony", "2023", "recognition"],
    uploadDate: "2023-12-20",
    photographer: "Event Photography Pro",
    featured: true,
    views: 2100,
    downloads: 89,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: "Investigative Journalism Masterclass",
    description: "Intensive masterclass on investigative journalism techniques",
    category: "Training",
    tags: ["investigative", "journalism", "masterclass", "techniques"],
    uploadDate: "2024-01-05",
    photographer: "AMWIK Staff",
    featured: false,
    views: 780,
    downloads: 34,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 7,
    title: "Community Radio Workshop",
    description: "Workshop on community radio broadcasting and management",
    category: "Training",
    tags: ["community", "radio", "workshop", "broadcasting"],
    uploadDate: "2024-01-03",
    photographer: "Radio Kenya",
    featured: false,
    views: 456,
    downloads: 18,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 8,
    title: "AMWIK Team Building Event",
    description: "Annual team building event for AMWIK staff and volunteers",
    category: "Team",
    tags: ["team", "building", "staff", "volunteers"],
    uploadDate: "2023-12-15",
    photographer: "AMWIK Staff",
    featured: false,
    views: 345,
    downloads: 8,
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function AdminGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [viewMode, setViewMode] = useState("grid")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<number[]>([])

  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "All" || image.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const toggleImageSelection = (imageId: number) => {
    setSelectedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const selectAllImages = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((img) => img.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-2">Manage photos and media content</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Images</DialogTitle>
              <DialogDescription>Add new photos to the gallery</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop your images here, or click to browse</p>
                <p className="text-sm text-gray-600 mb-4">Support for JPG, PNG, GIF up to 10MB each</p>
                <Button variant="outline">Choose Images</Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imageTitle">Title</Label>
                  <Input id="imageTitle" placeholder="Enter image title" />
                </div>
                <div>
                  <Label htmlFor="imageCategory">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Awards">Awards</SelectItem>
                      <SelectItem value="Team">Team</SelectItem>
                      <SelectItem value="Facilities">Facilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="imageDescription">Description</Label>
                <Textarea id="imageDescription" placeholder="Enter image description" rows={3} />
              </div>

              <div>
                <Label htmlFor="imageTags">Tags</Label>
                <Input id="imageTags" placeholder="e.g., conference, workshop, training" />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
              </div>

              <div>
                <Label htmlFor="photographer">Photographer/Credit</Label>
                <Input id="photographer" placeholder="Enter photographer name or credit" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured" className="text-sm">
                  Mark as featured image
                </Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">Upload Images</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryImages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Images</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryImages.filter((img) => img.featured).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {galleryImages.reduce((sum, img) => sum + img.views, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryImages.reduce((sum, img) => sum + img.downloads, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search images, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Awards">Awards</SelectItem>
                  <SelectItem value="Team">Team</SelectItem>
                  <SelectItem value="Facilities">Facilities</SelectItem>
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

          {selectedImages.length > 0 && (
            <div className="flex items-center justify-between mt-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedImages.length} image{selectedImages.length !== 1 ? "s" : ""} selected
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Images Grid/List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gallery Images ({filteredImages.length})</CardTitle>
              <CardDescription>Manage your gallery images and media</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={selectAllImages}>
              {selectedImages.length === filteredImages.length ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image.image || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200" />

                    {/* Selection checkbox */}
                    <div className="absolute top-2 left-2">
                      <Checkbox
                        checked={selectedImages.includes(image.id)}
                        onCheckedChange={() => toggleImageSelection(image.id)}
                        className="bg-white"
                      />
                    </div>

                    {/* Featured badge */}
                    {image.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-white">Featured</Badge>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2">{image.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        {image.category}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <span>{image.views} views</span>
                        <span>•</span>
                        <span>{image.downloads} downloads</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(image.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={selectedImages.includes(image.id)}
                    onCheckedChange={() => toggleImageSelection(image.id)}
                  />
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={image.image || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium truncate">{image.title}</h3>
                      {image.featured && <Badge className="bg-yellow-500 text-white text-xs">Featured</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{image.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {image.category}
                      </Badge>
                      <span>{image.views} views</span>
                      <span>{image.downloads} downloads</span>
                      <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
