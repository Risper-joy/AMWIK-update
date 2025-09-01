"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Save, Eye, Calendar, MapPin, Users, DollarSign, ImageIcon } from "lucide-react"

export default function NewEventPage() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "",
    type: "physical",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timezone: "Africa/Nairobi",
    venue: "",
    address: "",
    city: "",
    country: "Kenya",
    virtualLink: "",
    virtualPlatform: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    capacity: "",
    registrationRequired: true,
    registrationDeadline: "",
    price: "",
    currency: "KES",
    earlyBirdPrice: "",
    earlyBirdDeadline: "",
    tags: "",
    featuredImage: null as File | null,
    status: "Draft",
    featured: false,
    allowWaitlist: true,
    sendReminders: true,
    metaTitle: "",
    metaDescription: "",
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (file: File) => {
    setEventData((prev) => ({ ...prev, featuredImage: file }))
  }

  const handleSubmit = async (status: string) => {
    const formData = new FormData()
    Object.entries(eventData).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as any)
    })
    formData.append("status", status)

    if (eventData.featuredImage) {
      formData.append("featuredImage", eventData.featuredImage)
    }

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to save event")

      const data = await res.json()
      console.log("Event saved:", data)
      alert("Event saved successfully!")
    } catch (err) {
      console.error(err)
      alert("Error saving event.")
    }
  }

  const categories = [
    "Conference",
    "Workshop",
    "Seminar",
    "Training",
    "Networking",
    "Awards Ceremony",
    "Panel Discussion",
    "Webinar",
    "Social Event",
    "Community Outreach",
  ]

  const virtualPlatforms = ["Zoom", "Microsoft Teams", "Google Meet", "WebEx", "GoToMeeting", "Custom Platform"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/events">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-600">Create a new event for members and the community</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSubmit("Draft")}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit("Published")}>
            <Eye className="h-4 w-4 mr-2" />
            Publish Event
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="datetime">Date & Time</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* ... (keep details, datetime, location, registration, SEO sections unchanged) ... */}

            <TabsContent value="media" className="space-y-6 mt-0">
  <Card>
    <CardHeader>
      <CardTitle>Featured Image</CardTitle>
      <CardDescription>Upload a featured image for the event</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {eventData.featuredImage ? (
          <div className="space-y-2">
            <img
              src={URL.createObjectURL(eventData.featuredImage)}
              alt="Event preview"
              className="h-48 w-full mx-auto rounded-lg object-cover"
            />
            <p className="font-medium">{eventData.featuredImage.name}</p>
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => setEventData({ ...eventData, featuredImage: null })}
            >
              Remove Image
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
            <div>
              <p className="font-medium">Upload event image</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
            </div>

            {/* Hidden input + ref */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0])
                }
              }}
            />

            {/* Trigger button */}
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Images
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
</TabsContent>

          </div>

          {/* Sidebar (Publishing + Summary stays unchanged) */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={eventData.status}
                    onValueChange={(value) => setEventData({ ...eventData, status: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={eventData.featured}
                    onCheckedChange={(checked) => setEventData({ ...eventData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Featured event</Label>
                </div>
              </CardContent>
            </Card>

            {/* Event Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Event Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventData.featuredImage && (
                    <img
                      src={URL.createObjectURL(eventData.featuredImage) || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{eventData.title || "Event Title"}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {eventData.description || "Event description will appear here..."}
                    </p>
                  </div>

                  {eventData.startDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(eventData.startDate).toLocaleDateString()}
                      {eventData.startTime && ` at ${eventData.startTime}`}
                    </div>
                  )}

                  {(eventData.venue || eventData.virtualPlatform) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {eventData.type === "virtual" ? eventData.virtualPlatform : eventData.venue || "TBD"}
                    </div>
                  )}

                  {eventData.capacity && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Max {eventData.capacity} attendees
                    </div>
                  )}

                  {eventData.price && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {eventData.currency} {eventData.price}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {eventData.category && <Badge variant="outline">{eventData.category}</Badge>}
                    {eventData.type && <Badge variant="outline">{eventData.type}</Badge>}
                    <Badge
                      className={
                        eventData.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {eventData.status}
                    </Badge>
                    {eventData.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
