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
import { ArrowLeft, Save, Eye, Upload, FileText, ImageIcon, Video } from "lucide-react"

export default function NewResourcePage() {
  const [resourceData, setResourceData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    type: "document",
    tags: "",
    author: "",
    language: "English",
    difficulty: "Beginner",
    estimatedReadTime: "",
    downloadUrl: "",
    externalUrl: "",
    coverImage: null as File | string | null,
    resourceFile: null as File | string | null,
    status: "Draft",
    featured: false,
    allowDownload: true,
    requiresLogin: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  })

  const handleFileUpload = (file: File, type: "cover" | "resource") => {
    if (type === "cover") {
      setResourceData((prev) => ({ ...prev, coverImage: file }))
    } else {
      setResourceData((prev) => ({ ...prev, resourceFile: file }))
    }
  }

  const handleSubmit = async (status: string) => {
    const formData = new FormData()

    // Append only text fields (skip files)
    Object.entries({ ...resourceData, status }).forEach(([key, value]) => {
      if (key !== "coverImage" && key !== "resourceFile" && value) {
        formData.append(key, value as string)
      }
    })

    // Append files separately
    if (resourceData.coverImage && typeof resourceData.coverImage !== "string") {
      formData.append("coverImage", resourceData.coverImage)
    }
    if (resourceData.resourceFile && typeof resourceData.resourceFile !== "string") {
      formData.append("resourceFile", resourceData.resourceFile)
    }

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to save resource")
      const data = await res.json()
      console.log("Saved:", data)
      alert("Resource saved successfully!")

      // update state with saved URLs from backend
      setResourceData((prev) => ({
        ...prev,
        coverImage: data.coverUrl || prev.coverImage,
        resourceFile: data.fileUrl || prev.resourceFile,
      }))
    } catch (err) {
      console.error(err)
      alert("Error saving resource")
    }
  }

  const categories = [
    "Training Materials",
    "Research Reports",
    "Policy Documents",
    "Best Practices",
    "Templates",
    "Guides & Tutorials",
    "Industry News",
    "Case Studies",
    "Webinar Recordings",
    "Presentations",
  ]

  const resourceTypes = [
    { value: "document", label: "Document (PDF, DOC)", icon: FileText },
    { value: "video", label: "Video", icon: Video },
    { value: "link", label: "External Link", icon: ImageIcon },
    { value: "image", label: "Image/Infographic", icon: ImageIcon },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/resources">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Resource</h1>
            <p className="text-gray-600">Create a new resource for members and visitors</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSubmit("Draft")}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit("Published")}>
            <Eye className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media & Files</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential details about the resource</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Resource Title *</Label>
                    <Input
                      id="title"
                      value={resourceData.title}
                      onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
                      placeholder="Enter resource title..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={resourceData.description}
                      onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
                      placeholder="Brief description of the resource..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={resourceData.category}
                        onValueChange={(value) => setResourceData({ ...resourceData, category: value })}
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
                      <Label htmlFor="type">Resource Type *</Label>
                      <Select
                        value={resourceData.type}
                        onValueChange={(value) => setResourceData({ ...resourceData, type: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {resourceTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <type.icon className="h-4 w-4 mr-2" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={resourceData.author}
                      onChange={(e) => setResourceData({ ...resourceData, author: e.target.value })}
                      placeholder="Resource author or creator..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={resourceData.tags}
                      onChange={(e) => setResourceData({ ...resourceData, tags: e.target.value })}
                      placeholder="Enter tags separated by commas..."
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>Detailed content or description</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="content">Full Content</Label>
                    <Textarea
                      id="content"
                      value={resourceData.content}
                      onChange={(e) => setResourceData({ ...resourceData, content: e.target.value })}
                      placeholder="Enter the full content or detailed description..."
                      className="mt-1 min-h-[200px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Cover Image</CardTitle>
                  <CardDescription>Upload a cover image for the resource</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {resourceData.coverImage ? (
                      <div className="space-y-2">
                        <img
                          src={
                            typeof resourceData.coverImage === "string"
                              ? resourceData.coverImage
                              : URL.createObjectURL(resourceData.coverImage)
                          }
                          alt="Cover preview"
                          className="h-48 w-full mx-auto rounded-lg object-cover"
                        />
                        <p className="font-medium">
                          {typeof resourceData.coverImage === "string"
                            ? resourceData.coverImage.split("/").pop()
                            : resourceData.coverImage.name}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setResourceData({ ...resourceData, coverImage: null })}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="font-medium">Upload cover image</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id="cover-upload"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], "cover")
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          className="cursor-pointer bg-transparent"
                          onClick={() => document.getElementById("cover-upload")?.click()}
                        >
                          Browse Images
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resource File */}
              {resourceData.type !== "link" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resource File</CardTitle>
                    <CardDescription>Upload the main resource file</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {resourceData.resourceFile ? (
                        <div className="space-y-2">
                          <FileText className="h-12 w-12 mx-auto text-blue-500" />
                          <p className="font-medium">
                            {typeof resourceData.resourceFile === "string"
                              ? resourceData.resourceFile.split("/").pop()
                              : resourceData.resourceFile.name}
                          </p>
                          {typeof resourceData.resourceFile !== "string" && (
                            <p className="text-sm text-gray-500">
                              {(resourceData.resourceFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setResourceData({ ...resourceData, resourceFile: null })}
                          >
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 mx-auto text-gray-400" />
                          <div>
                            <p className="font-medium">Upload resource file</p>
                            <p className="text-sm text-gray-500">PDF, DOC, DOCX, PPT, MP4, etc. up to 50MB</p>
                          </div>
                          <input
                            type="file"
                            id="resource-upload"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0], "resource")
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            className="cursor-pointer bg-transparent"
                            onClick={() => document.getElementById("resource-upload")?.click()}
                          >
                            Browse Files
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={resourceData.status}
                    onValueChange={(value) => setResourceData({ ...resourceData, status: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={resourceData.featured}
                    onCheckedChange={(checked) => setResourceData({ ...resourceData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Featured resource</Label>
                </div>
              </CardContent>
            </Card>

            {/* Preview with Download & Share */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceData.coverImage && (
                    <img
                      src={
                        typeof resourceData.coverImage === "string"
                          ? resourceData.coverImage
                          : URL.createObjectURL(resourceData.coverImage)
                      }
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{resourceData.title || "Resource Title"}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {resourceData.description || "Resource description will appear here..."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resourceData.category && <Badge variant="outline">{resourceData.category}</Badge>}
                    {resourceData.type && (
                      <Badge variant="outline">{resourceTypes.find((t) => t.value === resourceData.type)?.label}</Badge>
                    )}
                    <Badge
                      className={
                        resourceData.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {resourceData.status}
                    </Badge>
                    {resourceData.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                  </div>

                  {/* Download + Share Buttons */}
                  {resourceData.resourceFile && (
                    <div className="flex gap-2 mt-4">
                      <a
                        href={
                          typeof resourceData.resourceFile === "string"
                            ? resourceData.resourceFile
                            : URL.createObjectURL(resourceData.resourceFile)
                        }
                        download={
                          typeof resourceData.resourceFile === "string"
                            ? resourceData.resourceFile.split("/").pop() || "file"
                            : resourceData.resourceFile.name
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Download
                      </a>
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigator.share
                            ? navigator.share({
                                title: resourceData.title,
                                text: resourceData.description,
                                url:
                                  typeof resourceData.resourceFile === "string"
                                    ? window.location.origin + resourceData.resourceFile
                                    : window.location.href,
                              })
                            : alert("Sharing not supported in this browser")
                        }
                      >
                        Share
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
