"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    text: "Being a member of AMWIK has opened doors to incredible opportunities. The networking events and conferences provide a platform to connect with seasoned journalists, share experiences, and collaborate on projects.",
    author: "Maria Powerson",
    position: "Freelance Journalist",
  },
  {
    id: 2,
    text: "Before joining AMWIK, I felt isolated as a young female journalist in a male-dominated newsroom. AMWIK provided me with invaluable mentorship, training in investigative reporting, and a supportive network of women who understood my challenges.",
    author: "Aisha Mohamed",
    position: "Investigative Journalist",
  },
  {
    id: 3,
    text: "AMWIK's workshops on ethical reporting and gender-sensitive language have transformed our news organization. ",
    author: "Tracy Obinge",
    position: "AMWIK Member",
  },
]

export default function Footer() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 10000) // 10 seconds
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <footer className="bg-[var(--amwik-purple)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/images/amwik-logo.png" alt="AMWIK Logo" width={40} height={40} className="h-10 w-auto" />
              <span className="text-xl font-bold">AMWIK</span>
            </div>
            <p className="text-gray-300 mb-4">
              Association of Media Women in Kenya - Empowering women journalists and media professionals to excel in
              their careers while advocating for gender equality in media.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 hover:text-pink-400 cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about/programs" className="text-gray-300 hover:text-white transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/membership/new" className="text-gray-300 hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-1 text-[var(--amwik-orange)]" />
                <span className="text-gray-300 text-sm">
                  Mbaruk Rd, Off Muchai Drive Opp. Awash Ethiopian Restaurant
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[var(--amwik-orange)]" />
                <span className="text-gray-300 text-sm">0722-201958 | 0737-201958</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[var(--amwik-orange)]" />
                <span className="text-gray-300 text-sm">info@amwik.org</span>
              </div>
            </div>
          </div>

          {/* Upcoming Event */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Upcoming Event</h3>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Image
                src="https://amwik.org/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-12.59.08-PM.jpeg"
                alt="Upcoming Event"
                width={200}
                height={120}
                className="w-full h-24 object-cover rounded mb-3"
              />
              <h4 className="font-semibold text-sm mb-2">Annual Media Conference 2024</h4>
              <p className="text-xs text-gray-300 mb-2">March 15, 2024 • Nairobi Serena Hotel</p>
              <Link
                href="/events"
                className="text-[var(--amwik-orange)] hover:text-orange-300 text-xs font-medium transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-12 pt-8 border-t border-purple-700">
          <h3 className="text-xl font-semibold mb-6 text-center">What Our Members Say</h3>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-center">
                <blockquote className="text-lg italic text-gray-200 mb-4 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <cite className="text-[var(--amwik-orange)] font-semibold">
                  - {testimonials[currentTestimonial].author}
                </cite>
                <p className="text-gray-300 text-sm mt-1">{testimonials[currentTestimonial].position}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-[var(--amwik-orange)]" : "bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Association of Media Women in Kenya (AMWIK). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
