"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("Draft")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Fetch existing blog post
  useEffect(() => {
    if (!id) return
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`)
        const result = await res.json()
        if (result.success) {
          const post = result.data
          setTitle(post.title)
          setExcerpt(post.excerpt || "")
          setContent(post.content || "")
          setAuthor(post.author || "")
          setCategory(post.category || "")
          setStatus(post.status || "Draft")
          setImage(post.image || "")
        }
      } catch (err) {
        console.error("Error fetching blog:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  // Handle Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, author, category, status, image }),
      })
      const result = await res.json()
      if (result.success) {
        alert("Blog updated successfully!")
        router.push("/admin/blogs")
      } else {
        alert("Failed to update blog")
      }
    } catch (err) {
      console.error("Error updating blog:", err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--amwik-purple)]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Input placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
              <Textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
              <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
              <Input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
              </select>

              <Button
                type="submit"
                className="bg-[var(--amwik-purple)] hover:bg-purple-700 w-full"
                disabled={saving}
              >
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
