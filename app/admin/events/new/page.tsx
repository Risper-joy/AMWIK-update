"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  Upload,
  ImageIcon,
  X,
} from "lucide-react"

export default function NewEventPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<{ url: string; publicId: string; width?: number; height?: number } | null>(null)

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
    featuredImage: "",
    status: "Draft",
    featured: false,
    allowWaitlist: true,
    sendReminders: true,
    metaTitle: "",
    metaDescription: "",
  })

  // Upload to Cloudinary via API
  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "events")

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.error)

      setFeaturedImage({
        url: data.data.url,
        publicId: data.data.publicId,
        width: data.data.width,
        height: data.data.height,
      })
      setEventData((prev) => ({ ...prev, featuredImage: data.data.url }))
    } catch (err) {
      console.error("Upload error:", err)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const removeFeaturedImage = () => {
    setFeaturedImage(null)
    setEventData((prev) => ({ ...prev, featuredImage: "" }))
  }

  const handleSubmit = async (status: string) => {
    try {
      setIsSaving(true)

      const payload = {
        ...eventData,
        status,
        createdDate: new Date().toISOString(),
      }

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to save event")

      await res.json()
      alert(`Event ${status} successfully!`)
      router.push("/admin/events")
    } catch (error) {
      console.error("Save failed:", error)
      alert("Error: Failed to save event")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Link href="/admin/events">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            disabled={isSaving}
            onClick={() => handleSubmit("Draft")}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Draft
          </Button>
          <Button
            disabled={isSaving}
            onClick={() => handleSubmit("Published")}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            Publish
          </Button>
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="datetime">Date & Time</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* DETAILS */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Basic info about your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Title"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              />
              <Textarea
                placeholder="Short description"
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              />
              <Textarea
                placeholder="Full description"
                value={eventData.fullDescription}
                onChange={(e) => setEventData({ ...eventData, fullDescription: e.target.value })}
              />
              <Input
                placeholder="Category"
                value={eventData.category}
                onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
              />
              <RadioGroup
                value={eventData.type}
                onValueChange={(value) => setEventData({ ...eventData, type: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="physical" id="physical" />
                  <Label htmlFor="physical">Physical</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="virtual" id="virtual" />
                  <Label htmlFor="virtual">Virtual</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DATE & TIME */}
        <TabsContent value="datetime">
          <Card>
            <CardHeader>
              <CardTitle>Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="date" value={eventData.startDate} onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })} />
              <Input type="date" value={eventData.endDate} onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })} />
              <Input type="time" value={eventData.startTime} onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })} />
              <Input type="time" value={eventData.endTime} onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })} />
              <Input placeholder="Timezone" value={eventData.timezone} onChange={(e) => setEventData({ ...eventData, timezone: e.target.value })} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOCATION */}
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Venue" value={eventData.venue} onChange={(e) => setEventData({ ...eventData, venue: e.target.value })} />
              <Input placeholder="Address" value={eventData.address} onChange={(e) => setEventData({ ...eventData, address: e.target.value })} />
              <Input placeholder="City" value={eventData.city} onChange={(e) => setEventData({ ...eventData, city: e.target.value })} />
              <Input placeholder="Country" value={eventData.country} onChange={(e) => setEventData({ ...eventData, country: e.target.value })} />
              {eventData.type === "virtual" && (
                <>
                  <Input placeholder="Virtual Link" value={eventData.virtualLink} onChange={(e) => setEventData({ ...eventData, virtualLink: e.target.value })} />
                  <Input placeholder="Platform" value={eventData.virtualPlatform} onChange={(e) => setEventData({ ...eventData, virtualPlatform: e.target.value })} />
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* REGISTRATION */}
        <TabsContent value="registration">
          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Capacity" value={eventData.capacity} onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })} />
              <div className="flex items-center space-x-2">
                <Checkbox id="registrationRequired" checked={eventData.registrationRequired} onCheckedChange={(checked) => setEventData({ ...eventData, registrationRequired: checked as boolean })} />
                <Label htmlFor="registrationRequired">Registration Required</Label>
              </div>
              <Input type="date" placeholder="Registration Deadline" value={eventData.registrationDeadline} onChange={(e) => setEventData({ ...eventData, registrationDeadline: e.target.value })} />
              <Input placeholder="Price" value={eventData.price} onChange={(e) => setEventData({ ...eventData, price: e.target.value })} />
              <Input placeholder="Currency" value={eventData.currency} onChange={(e) => setEventData({ ...eventData, currency: e.target.value })} />
              <Input placeholder="Early Bird Price" value={eventData.earlyBirdPrice} onChange={(e) => setEventData({ ...eventData, earlyBirdPrice: e.target.value })} />
              <Input type="date" placeholder="Early Bird Deadline" value={eventData.earlyBirdDeadline} onChange={(e) => setEventData({ ...eventData, earlyBirdDeadline: e.target.value })} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* MEDIA */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredImage ? (
                  <div className="relative">
                    <img src={featuredImage.url} alt="Featured image" className="w-full h-48 object-cover rounded-lg" />
                    <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={removeFeaturedImage}>
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="mt-2 text-xs text-gray-500">
                      {featuredImage.width} x {featuredImage.height}px
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drop your image here, or click to browse</p>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file) }} className="hidden" />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                      {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                      {isUploading ? "Uploading..." : "Choose Image"}
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500">Recommended size: 1200x630px for social media sharing</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize discoverability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Meta title" value={eventData.metaTitle} onChange={(e) => setEventData({ ...eventData, metaTitle: e.target.value })} />
              <Textarea placeholder="Meta description" value={eventData.metaDescription} onChange={(e) => setEventData({ ...eventData, metaDescription: e.target.value })} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
