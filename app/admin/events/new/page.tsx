"use client"

import { useState } from "react"
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

  const handleImageUpload = (file: File) => {
    setEventData((prev) => ({ ...prev, featuredImage: file }))
  }

  const handleSubmit = (status: string) => {
    const formData = {
      ...eventData,
      status,
      createdDate: new Date().toISOString(),
    }
    console.log("Submitting event:", formData)
    // Handle form submission
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
            <TabsContent value="details" className="space-y-6 mt-0">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential details about the event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={eventData.title}
                      onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                      placeholder="Enter event title..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={eventData.description}
                      onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                      placeholder="Brief description of the event..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={eventData.category}
                        onValueChange={(value) => setEventData({ ...eventData, category: value })}
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

                    <div>
                      <Label>Event Type *</Label>
                      <RadioGroup
                        value={eventData.type}
                        onValueChange={(value) => setEventData({ ...eventData, type: value })}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="physical" id="physical" />
                          <Label htmlFor="physical">Physical Event</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="virtual" id="virtual" />
                          <Label htmlFor="virtual">Virtual Event</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hybrid" id="hybrid" />
                          <Label htmlFor="hybrid">Hybrid Event</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="organizer">Organizer</Label>
                    <Input
                      id="organizer"
                      value={eventData.organizer}
                      onChange={(e) => setEventData({ ...eventData, organizer: e.target.value })}
                      placeholder="Event organizer or department..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={eventData.tags}
                      onChange={(e) => setEventData({ ...eventData, tags: e.target.value })}
                      placeholder="Enter tags separated by commas..."
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Full Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Full Description</CardTitle>
                  <CardDescription>Detailed event information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="fullDescription">Event Details</Label>
                    <Textarea
                      id="fullDescription"
                      value={eventData.fullDescription}
                      onChange={(e) => setEventData({ ...eventData, fullDescription: e.target.value })}
                      placeholder="Enter detailed event description, agenda, speakers, etc..."
                      className="mt-1 min-h-[200px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="datetime" className="space-y-6 mt-0">
              {/* Date and Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Date and Time</CardTitle>
                  <CardDescription>When the event will take place</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={eventData.startDate}
                        onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={eventData.endDate}
                        onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={eventData.startTime}
                        onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={eventData.endTime}
                        onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={eventData.timezone}
                      onValueChange={(value) => setEventData({ ...eventData, timezone: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Nairobi">East Africa Time (EAT)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-6 mt-0">
              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Location</CardTitle>
                  <CardDescription>Where the event will take place</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(eventData.type === "physical" || eventData.type === "hybrid") && (
                    <>
                      <div>
                        <Label htmlFor="venue">Venue Name</Label>
                        <Input
                          id="venue"
                          value={eventData.venue}
                          onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                          placeholder="Enter venue name..."
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={eventData.address}
                          onChange={(e) => setEventData({ ...eventData, address: e.target.value })}
                          placeholder="Enter full address..."
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={eventData.city}
                            onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
                            placeholder="Enter city..."
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={eventData.country}
                            onChange={(e) => setEventData({ ...eventData, country: e.target.value })}
                            placeholder="Enter country..."
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {(eventData.type === "virtual" || eventData.type === "hybrid") && (
                    <>
                      <div>
                        <Label htmlFor="virtualPlatform">Virtual Platform</Label>
                        <Select
                          value={eventData.virtualPlatform}
                          onValueChange={(value) => setEventData({ ...eventData, virtualPlatform: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {virtualPlatforms.map((platform) => (
                              <SelectItem key={platform} value={platform}>
                                {platform}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="virtualLink">Virtual Event Link</Label>
                        <Input
                          id="virtualLink"
                          value={eventData.virtualLink}
                          onChange={(e) => setEventData({ ...eventData, virtualLink: e.target.value })}
                          placeholder="Enter meeting/event link..."
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Contact details for event inquiries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={eventData.contactEmail}
                        onChange={(e) => setEventData({ ...eventData, contactEmail: e.target.value })}
                        placeholder="Enter contact email..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        value={eventData.contactPhone}
                        onChange={(e) => setEventData({ ...eventData, contactPhone: e.target.value })}
                        placeholder="Enter contact phone..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="registration" className="space-y-6 mt-0">
              {/* Registration Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Settings</CardTitle>
                  <CardDescription>Configure event registration and pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="registrationRequired"
                      checked={eventData.registrationRequired}
                      onCheckedChange={(checked) =>
                        setEventData({ ...eventData, registrationRequired: checked as boolean })
                      }
                    />
                    <Label htmlFor="registrationRequired">Registration required</Label>
                  </div>

                  {eventData.registrationRequired && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="capacity">Event Capacity</Label>
                          <Input
                            id="capacity"
                            type="number"
                            value={eventData.capacity}
                            onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })}
                            placeholder="Maximum attendees..."
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                          <Input
                            id="registrationDeadline"
                            type="date"
                            value={eventData.registrationDeadline}
                            onChange={(e) => setEventData({ ...eventData, registrationDeadline: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="price">Price</Label>
                          <div className="flex mt-1">
                            <Select
                              value={eventData.currency}
                              onValueChange={(value) => setEventData({ ...eventData, currency: value })}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="KES">KES</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              id="price"
                              type="number"
                              value={eventData.price}
                              onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                              placeholder="0"
                              className="flex-1 ml-2"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="earlyBirdPrice">Early Bird Price</Label>
                          <Input
                            id="earlyBirdPrice"
                            type="number"
                            value={eventData.earlyBirdPrice}
                            onChange={(e) => setEventData({ ...eventData, earlyBirdPrice: e.target.value })}
                            placeholder="0"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="earlyBirdDeadline">Early Bird Deadline</Label>
                          <Input
                            id="earlyBirdDeadline"
                            type="date"
                            value={eventData.earlyBirdDeadline}
                            onChange={(e) => setEventData({ ...eventData, earlyBirdDeadline: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowWaitlist"
                            checked={eventData.allowWaitlist}
                            onCheckedChange={(checked) =>
                              setEventData({ ...eventData, allowWaitlist: checked as boolean })
                            }
                          />
                          <Label htmlFor="allowWaitlist">Allow waitlist when full</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sendReminders"
                            checked={eventData.sendReminders}
                            onCheckedChange={(checked) =>
                              setEventData({ ...eventData, sendReminders: checked as boolean })
                            }
                          />
                          <Label htmlFor="sendReminders">Send event reminders</Label>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6 mt-0">
              {/* Featured Image */}
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
                          src={URL.createObjectURL(eventData.featuredImage) || "/placeholder.svg"}
                          alt="Event preview"
                          className="h-48 w-full mx-auto rounded-lg object-cover"
                        />
                        <p className="font-medium">{eventData.featuredImage.name}</p>
                        <Button
                          variant="outline"
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
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0])
                            }
                          }}
                          className="hidden"
                          id="image-upload"
                        />
                        <Label htmlFor="image-upload">
                          <Button variant="outline" className="cursor-pointer bg-transparent">
                            Browse Images
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6 mt-0">
              {/* SEO Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={eventData.metaTitle}
                      onChange={(e) => setEventData({ ...eventData, metaTitle: e.target.value })}
                      placeholder="SEO title for search engines..."
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">{eventData.metaTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={eventData.metaDescription}
                      onChange={(e) => setEventData({ ...eventData, metaDescription: e.target.value })}
                      placeholder="SEO description for search engines..."
                      className="mt-1"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500 mt-1">{eventData.metaDescription.length}/160 characters</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Sidebar */}
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
