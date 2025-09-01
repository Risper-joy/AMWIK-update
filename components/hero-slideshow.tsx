"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

// AMWIK hero images
const images = [
  "https://amwik.org/wp-content/uploads/2025/04/IMG_0502-scaled.jpg",
  "https://amwik.org/wp-content/uploads/2025/04/440885175_838009534990365_1289554653312737190_n.jpg",
  "https://amwik.org/wp-content/uploads/2025/04/IMG_0513-scaled.jpg",
]

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative flex items-end justify-start overflow-hidden h-[80vh] bg-cover bg-center pl-12 pb-12"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="z-10 text-white text-left max-w-[600px] animate-[slideInLeft_1s_ease-out_forwards] opacity-0">
        <div className="bg-[rgba(110,40,120,0.4)] p-8 rounded-xl backdrop-blur-sm inline-block">
          <h1 className="font-black text-[#fdf9ff] text-shadow-lg text-[45px] mb-4">Empowering Women in Media</h1>
          <Button className="mt-4 bg-[#33004d] text-white border-none rounded-full cursor-pointer transition-colors hover:bg-[#c6a8d4]">
            Learn More
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .text-shadow-lg {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}
