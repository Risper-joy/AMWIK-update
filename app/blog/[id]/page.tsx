"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`)
        const result = await res.json()
        if (result.success) {
          setPost(result.data)
        } else {
          setError("Blog not found.")
        }
      } catch (err) {
        console.error("Error fetching blog:", err)
        setError("Failed to load blog post.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBlog()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-red-500">{error || "Blog post not found."}</p>
        <Link href="/blog">
          <Button variant="outline" className="mt-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Back button */}
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="flex items-center mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold">{post.title}</h1>

      {/* Author + Date */}
      <div className="text-sm text-gray-500">
        By <span className="font-medium">{post.author}</span> ·{" "}
        {post.publishDate
          ? new Date(post.publishDate).toLocaleDateString()
          : "Unpublished"}
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <Image
          src={post.featuredImage}
          alt={post.title}
          width={800}
          height={500}
          className="w-full rounded-lg object-cover mt-6"
        />
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none mt-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm bg-gray-200 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
