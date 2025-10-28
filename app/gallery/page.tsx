"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

const galleryImages = [
  { id: 1, image: "images/amwik-logo.png" },
  { id: 2, image: "/placeholder.svg?height=400&width=600" },
  { id: 3, image: "/placeholder.svg?height=400&width=600" },
  { id: 4, image: "/placeholder.svg?height=400&width=600" },
  { id: 5, image: "/placeholder.svg?height=400&width=600" },
  { id: 6, image: "/placeholder.svg?height=400&width=600" },
  { id: 7, image: "/placeholder.svg?height=400&width=600" },
  { id: 8, image: "/placeholder.svg?height=400&width=600" },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          title="Photo Gallery"
          description="Explore moments from our events, training sessions, and community activities"
          backgroundImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <Card
                key={image.id}
                className="group cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image.image || "/placeholder.svg"}
                      alt={`Gallery Image ${image.id}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                    alt="Selected"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
