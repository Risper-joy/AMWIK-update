"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Eye, Save, Send, Loader2, X, Image as ImageIcon, Bold, Italic, Underline, List, ListOrdered, Quote, Link2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

// Simple Rich Text Editor Component
const SimpleRichTextEditor = ({ value, onChange, placeholder }: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'blog-content')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        execCommand('insertImage', result.data.url)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const insertImage = () => {
    fileInputRef.current?.click()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => execCommand('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => execCommand('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => execCommand('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => execCommand('insertUnorderedList')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => execCommand('insertOrderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => execCommand('formatBlock', 'blockquote')}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Select onValueChange={(value) => execCommand('formatBlock', value)}>
          <SelectTrigger className="w-32 h-8">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p">Paragraph</SelectItem>
            <SelectItem value="h1">Heading 1</SelectItem>
            <SelectItem value="h2">Heading 2</SelectItem>
            <SelectItem value="h3">Heading 3</SelectItem>
            <SelectItem value="h4">Heading 4</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={insertLink}
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={insertImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 outline-none prose prose-sm max-w-none"
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        style={{ 
          minHeight: '300px',
          lineHeight: '1.6'
        }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageUpload(file)
        }}
        className="hidden"
      />
    </div>
  )
}

export default function NewBlogPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<UploadedImage | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    author: "",
    featuredImage: "",
    status: "Draft",
    publishDate: "",
    seoTitle: "",
    seoDescription: "",
    allowComments: true,
    featured: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    handleInputChange("title", title)
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      handleInputChange("slug", generateSlug(title))
    }
    if (!formData.seoTitle || formData.seoTitle === formData.title) {
      handleInputChange("seoTitle", title)
    }
  }

  const handleExcerptChange = (excerpt: string) => {
    handleInputChange("excerpt", excerpt)
    if (!formData.seoDescription || formData.seoDescription === formData.excerpt) {
      handleInputChange("seoDescription", excerpt)
    }
  }

  const handleFeaturedImageUpload = async (file: File) => {
    try {
      setIsUploading(true)
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('folder', 'blog-featured')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const result = await response.json()

      if (result.success) {
        setFeaturedImage(result.data)
        handleInputChange("featuredImage", result.data.url)
        toast({
          title: "Success",
          description: "Featured image uploaded successfully!",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error('Error uploading featured image:', error)
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload featured image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeFeaturedImage = async () => {
    if (featuredImage) {
      try {
        await fetch(`/api/upload?publicId=${featuredImage.publicId}`, {
          method: 'DELETE',
        })
        setFeaturedImage(null)
        handleInputChange("featuredImage", "")
        toast({
          title: "Success",
          description: "Featured image removed successfully!",
        })
      } catch (error) {
        console.error('Error removing image:', error)
      }
    }
  }

  const validateForm = () => {
    const errors = []
    
    if (!formData.title.trim()) {
      errors.push("Title is required")
    }
    
    if (!formData.slug.trim()) {
      errors.push("Slug is required")
    }
    
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      errors.push("Content is required")
    }
    
    if (!formData.author) {
      errors.push("Author is required")
    }

    if (!formData.category) {
      errors.push("Category is required")
    }
    
    if (formData.status === "Scheduled" && !formData.publishDate) {
      errors.push("Publish date is required for scheduled posts")
    }
    
    if (formData.seoTitle && formData.seoTitle.length > 200) {
      errors.push("SEO title must be 200 characters or less")
    }
    
    if (formData.seoDescription && formData.seoDescription.length > 500) {
      errors.push("SEO description must be 500 characters or less")
    }
    
    return errors
  }

  const saveBlogPost = async (status: string = formData.status) => {
    const errors = validateForm()
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Parse tags from comma-separated string
      const tagsArray = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const dataToSubmit = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: tagsArray,
        author: formData.author,
        featuredImage: formData.featuredImage,
        status,
        publishDate: status === "Scheduled" ? formData.publishDate : 
                     status === "Published" ? new Date().toISOString() : 
                     formData.publishDate,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        allowComments: formData.allowComments,
        featured: formData.featured,
      }

      console.log("📝 Submitting blog post:", dataToSubmit)

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: `Blog post ${status === 'Published' ? 'published' : 'saved'} successfully!`,
        })
        router.push('/admin/blogs')
      } else {
        throw new Error(result.error || result.message || 'Failed to save blog post')
      }
    } catch (error: any) {
      console.error('Error saving blog post:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = () => saveBlogPost('Draft')
  const handlePublish = () => saveBlogPost('Published')

  return (
    <>
      <style jsx global>{`
        .prose h1 { font-size: 2em; font-weight: 600; margin: 16px 0 8px 0; }
        .prose h2 { font-size: 1.5em; font-weight: 600; margin: 16px 0 8px 0; }
        .prose h3 { font-size: 1.17em; font-weight: 600; margin: 16px 0 8px 0; }
        .prose h4 { font-size: 1em; font-weight: 600; margin: 16px 0 8px 0; }
        .prose p { margin: 8px 0; line-height: 1.6; }
        .prose ul, .prose ol { margin: 8px 0; padding-left: 24px; }
        .prose blockquote { 
          border-left: 4px solid #e5e7eb; 
          padding-left: 16px; 
          margin: 16px 0; 
          font-style: italic; 
          color: #6b7280; 
        }
        .prose img { max-width: 100%; height: auto; margin: 16px 0; border-radius: 8px; }
        .prose a { color: #3b82f6; text-decoration: underline; }
        
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
      
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/blogs">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-gray-600 mt-1">Write and publish a new blog post</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled={isLoading} size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isLoading || isUploading}
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Draft
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handlePublish}
              disabled={isLoading || isUploading}
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Basic Information</CardTitle>
                <CardDescription>Enter the main details of your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog post title"
                    className="mt-1"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
                </div>

                <div>
                  <Label htmlFor="slug" className="text-sm font-medium">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="url-friendly-slug"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the URL: /blog/{formData.slug || "your-slug-here"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-sm font-medium">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleExcerptChange(e.target.value)}
                    placeholder="Brief description of the blog post"
                    rows={3}
                    className="mt-1"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.excerpt.length}/500 characters - This will appear in blog listings
                  </p>
                </div>

               <div>
  <Label htmlFor="author" className="text-sm font-medium">Author *</Label>
  <div className="relative mt-1">
    <Input
      id="author"
      value={formData.author}
      onChange={(e) => handleInputChange("author", e.target.value)}
      placeholder="Type author name or select from suggestions"
      className="mt-1"
      list="authors-list"
    />
    <datalist id="authors-list">
      <option value="AMWIK" />
      <option value="AMWIK Team" />
      <option value="AMWIK AUTHOR1" />
      <option value="AMWIK AUTHOR2" />
      <option value="AMWIK AUTHOR3" />
    </datalist>
  </div>
  <p className="text-xs text-gray-500 mt-1">Type a custom name or select from suggestions</p>
</div>
              </CardContent>
            </Card>

            {/* Rich Text Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Content</CardTitle>
                <CardDescription>Write your blog post content with rich text formatting</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="content" className="text-sm font-medium mb-2 block">Blog Content *</Label>
                  <SimpleRichTextEditor
                    value={formData.content}
                    onChange={(content) => handleInputChange("content", content)}
                    placeholder="Start writing your blog post here... Use the toolbar above for formatting options."
                  />
                  <div className="mt-4 space-y-1">
                    <p className="text-xs text-gray-500">
                      Use the toolbar for formatting. Click the image icon to add images to your content.
                    </p>
                    {isUploading && (
                      <div className="flex items-center text-sm text-blue-600">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading image...
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">SEO Settings</CardTitle>
                <CardDescription>Optimize your post for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle" className="text-sm font-medium">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                    placeholder="SEO optimized title"
                    className="mt-1"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length}/200 characters</p>
                </div>

                <div>
                  <Label htmlFor="seoDescription" className="text-sm font-medium">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                    placeholder="SEO meta description"
                    rows={3}
                    className="mt-1"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length}/500 characters</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.status === "Scheduled" && (
                  <div>
                    <Label htmlFor="publishDate" className="text-sm font-medium">Publish Date *</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange("publishDate", e.target.value)}
                      className="mt-1"
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                  <Label htmlFor="featured" className="text-sm">
                    Featured post
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowComments"
                    checked={formData.allowComments}
                    onCheckedChange={(checked) => handleInputChange("allowComments", checked)}
                  />
                  <Label htmlFor="allowComments" className="text-sm">
                    Allow comments
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Categories and Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Categories & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-media">Digital Media</SelectItem>
                      <SelectItem value="investigative-journalism">Investigative Journalism</SelectItem>
                      <SelectItem value="media-ethics">Media Ethics</SelectItem>
                      <SelectItem value="community-media">Community Media</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="advocacy">Advocacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="women, media, journalism, kenya"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredImage ? (
                    <div className="relative">
                      <Image
                        src={featuredImage.url}
                        alt="Featured image"
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeFeaturedImage}
                      >
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
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFeaturedImageUpload(file)
                        }}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 mr-2" />
                        )}
                        {isUploading ? 'Uploading...' : 'Choose Image'}
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Recommended size: 1200x630px for optimal social media sharing
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}