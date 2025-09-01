"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Save, Eye, User, Quote, Star, Camera, Trash2, AlertTriangle } from "lucide-react"

// Mock data - in real app, this would come from API
const mockTestimonial = {
  id: 1,
  author: "Maria Powerson",
  position: "Freelance Journalist",
  organization: "Independent Media",
  email: "maria@example.com",
  phone: "+254712345678",
  testimonialText:
    "Being a member of AMWIK has opened doors to incredible opportunities. The networking events and conferences provide a platform to connect with seasoned journalists, share experiences, and collaborate on projects.",
  rating: "5",
  category: "Networking Events",
  source: "direct",
  dateReceived: "2024-01-15",
  authorPhoto: null,
  status: "Published",
  featured: true,
  allowPublicDisplay: true,
  showAuthorContact: false,
  tags: "networking, journalism, opportunities",
  createdDate: "2024-01-15T10:30:00Z",
  updatedDate: "2024-01-15T10:30:00Z",
}

export default function EditTestimonialPage() {
  const params = useParams()
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [testimonialData, setTestimonialData] = useState({
    author: "",
    position: "",
    organization: "",
    email: "",
    phone: "",
    testimonialText: "",
    rating: "5",
    category: "",
    source: "direct",
    dateReceived: new Date().toISOString().split("T")[0],
    authorPhoto: null as File | null,
    status: "Draft",
    featured: false,
    allowPublicDisplay: true,
    showAuthorContact: false,
    tags: "",
  })

  // Load testimonial data on component mount
  useEffect(() => {
    // In real app, fetch testimonial by ID from API
    const loadTestimonial = () => {
      setTestimonialData({
        author: mockTestimonial.author,
        position: mockTestimonial.position,
        organization: mockTestimonial.organization,
        email: mockTestimonial.email,
        phone: mockTestimonial.phone,
        testimonialText: mockTestimonial.testimonialText,
        rating: mockTestimonial.rating,
        category: mockTestimonial.category,
        source: mockTestimonial.source,
        dateReceived: mockTestimonial.dateReceived,
        authorPhoto: null, // File object can't be pre-loaded
        status: mockTestimonial.status,
        featured: mockTestimonial.featured,
        allowPublicDisplay: mockTestimonial.allowPublicDisplay,
        showAuthorContact: mockTestimonial.showAuthorContact,
        tags: mockTestimonial.tags,
      })
    }

    loadTestimonial()
  }, [params.id])

  const handleImageUpload = (file: File) => {
    setTestimonialData((prev) => ({
      ...prev,
      authorPhoto: file,
    }))
  }

  const handleSubmit = (status: string) => {
    const formData = {
      ...testimonialData,
      status,
      updatedDate: new Date().toISOString(),
    }
    console.log("Updating testimonial:", formData)
    // Handle form submission
    router.push("/admin/testimonials")
  }

  const handleDelete = () => {
    console.log("Deleting testimonial:", params.id)
    // Handle deletion
    setIsDeleteDialogOpen(false)
    router.push("/admin/testimonials")
  }

  const categories = [
    "Training Programs",
    "Networking Events",
    "Mentorship",
    "Career Development",
    "Leadership Programs",
    "Media Skills",
    "Professional Growth",
    "Community Impact",
    "Advocacy Work",
    "General Experience",
  ]

  const sources = [
    { value: "direct", label: "Direct Submission" },
    { value: "interview", label: "Interview" },
    { value: "survey", label: "Survey Response" },
    { value: "social", label: "Social Media" },
    { value: "event", label: "Event Feedback" },
    { value: "email", label: "Email" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/testimonials">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Testimonials
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
            <p className="text-gray-600">Update testimonial from {testimonialData.author}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Delete Testimonial
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this testimonial from {testimonialData.author}? This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Testimonial
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => handleSubmit("Draft")}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit("Published")}>
            <Eye className="h-4 w-4 mr-2" />
            Update & Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Author Information */}
          <Card>
            <CardHeader>
              <CardTitle>Author Information</CardTitle>
              <CardDescription>Details about the person giving the testimonial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Full Name *</Label>
                  <Input
                    id="author"
                    value={testimonialData.author}
                    onChange={(e) => setTestimonialData({ ...testimonialData, author: e.target.value })}
                    placeholder="Enter author's full name..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position/Title *</Label>
                  <Input
                    id="position"
                    value={testimonialData.position}
                    onChange={(e) => setTestimonialData({ ...testimonialData, position: e.target.value })}
                    placeholder="Enter job title or position..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={testimonialData.organization}
                  onChange={(e) => setTestimonialData({ ...testimonialData, organization: e.target.value })}
                  placeholder="Enter organization or company name..."
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={testimonialData.email}
                    onChange={(e) => setTestimonialData({ ...testimonialData, email: e.target.value })}
                    placeholder="Enter email address..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={testimonialData.phone}
                    onChange={(e) => setTestimonialData({ ...testimonialData, phone: e.target.value })}
                    placeholder="Enter phone number..."
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Content */}
          <Card>
            <CardHeader>
              <CardTitle>Testimonial Content</CardTitle>
              <CardDescription>The main testimonial text and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="testimonialText">Testimonial Text *</Label>
                <Textarea
                  id="testimonialText"
                  value={testimonialData.testimonialText}
                  onChange={(e) => setTestimonialData({ ...testimonialData, testimonialText: e.target.value })}
                  placeholder="Enter the testimonial text..."
                  className="mt-1 min-h-[150px]"
                />
                <p className="text-sm text-gray-500 mt-1">{testimonialData.testimonialText.length} characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={testimonialData.rating}
                    onValueChange={(value) => setTestimonialData({ ...testimonialData, rating: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars - Excellent</SelectItem>
                      <SelectItem value="4">4 Stars - Very Good</SelectItem>
                      <SelectItem value="3">3 Stars - Good</SelectItem>
                      <SelectItem value="2">2 Stars - Fair</SelectItem>
                      <SelectItem value="1">1 Star - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={testimonialData.category}
                    onValueChange={(value) => setTestimonialData({ ...testimonialData, category: value })}
                  >
                    <SelectTrigger className="mt-1">
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
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={testimonialData.tags}
                  onChange={(e) => setTestimonialData({ ...testimonialData, tags: e.target.value })}
                  placeholder="Enter tags separated by commas..."
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate tags with commas (e.g., networking, training, leadership)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Source & Date */}
          <Card>
            <CardHeader>
              <CardTitle>Source Information</CardTitle>
              <CardDescription>How and when the testimonial was received</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Source</Label>
                <RadioGroup
                  value={testimonialData.source}
                  onValueChange={(value) => setTestimonialData({ ...testimonialData, source: value })}
                  className="mt-2"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {sources.map((source) => (
                      <div key={source.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={source.value} id={source.value} />
                        <Label htmlFor={source.value} className="text-sm">
                          {source.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="dateReceived">Date Received</Label>
                <Input
                  id="dateReceived"
                  type="date"
                  value={testimonialData.dateReceived}
                  onChange={(e) => setTestimonialData({ ...testimonialData, dateReceived: e.target.value })}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Author Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Author Photo (Optional)</CardTitle>
              <CardDescription>Upload a photo of the testimonial author</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {testimonialData.authorPhoto ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(testimonialData.authorPhoto) || "/placeholder.svg"}
                      alt="Author preview"
                      className="h-32 w-32 mx-auto rounded-full object-cover"
                    />
                    <p className="font-medium">{testimonialData.authorPhoto.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTestimonialData({ ...testimonialData, authorPhoto: null })}
                    >
                      Remove Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="font-medium">Upload author photo</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0])
                        }
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent">
                        Browse Photos
                      </Button>
                    </Label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={testimonialData.status}
                  onValueChange={(value) => setTestimonialData({ ...testimonialData, status: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Pending">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={testimonialData.featured}
                    onCheckedChange={(checked) =>
                      setTestimonialData({ ...testimonialData, featured: checked as boolean })
                    }
                  />
                  <Label htmlFor="featured">Featured testimonial</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowPublicDisplay"
                    checked={testimonialData.allowPublicDisplay}
                    onCheckedChange={(checked) =>
                      setTestimonialData({ ...testimonialData, allowPublicDisplay: checked as boolean })
                    }
                  />
                  <Label htmlFor="allowPublicDisplay">Allow public display</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showAuthorContact"
                    checked={testimonialData.showAuthorContact}
                    onCheckedChange={(checked) =>
                      setTestimonialData({ ...testimonialData, showAuthorContact: checked as boolean })
                    }
                  />
                  <Label htmlFor="showAuthorContact">Show author contact info</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial History */}
          <Card>
            <CardHeader>
              <CardTitle>Testimonial History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <p className="text-gray-600">Created:</p>
                <p className="font-medium">{new Date(mockTestimonial.createdDate).toLocaleString()}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">Last Updated:</p>
                <p className="font-medium">{new Date(mockTestimonial.updatedDate).toLocaleString()}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">ID:</p>
                <p className="font-mono text-xs">{params.id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  {testimonialData.authorPhoto ? (
                    <img
                      src={URL.createObjectURL(testimonialData.authorPhoto) || "/placeholder.svg"}
                      alt="Author"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {[...Array(Number.parseInt(testimonialData.rating))].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="font-medium text-sm mt-1">{testimonialData.author || "Author Name"}</p>
                    <p className="text-sm text-gray-600">
                      {testimonialData.position || "Position"}
                      {testimonialData.organization && `, ${testimonialData.organization}`}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <Quote className="h-4 w-4 text-gray-400 mb-2" />
                  <p className="text-sm italic">
                    {testimonialData.testimonialText || "Testimonial text will appear here..."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {testimonialData.category && <Badge variant="outline">{testimonialData.category}</Badge>}
                  <Badge
                    className={
                      testimonialData.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {testimonialData.status}
                  </Badge>
                  {testimonialData.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
