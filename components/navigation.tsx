"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [membershipOpen, setMembershipOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/amwik-logo.png"
                alt="AMWIK Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
              Home
            </Link>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)] flex items-center">
                About
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {aboutOpen && (
                <div className="absolute left-0 top-full mt-1 w-[300px] bg-white shadow-lg rounded-md border z-50">
                  <div className="grid gap-1 p-2">
                    <Link
                      href="/about/programs"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      Our Programs
                    </Link>
                    <Link
                      href="/about/partners"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      Our Partners
                    </Link>
                    <Link
                      href="/about/team"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      Our Team
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/events" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
              Events
            </Link>

            {/* Membership Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMembershipOpen(true)}
              onMouseLeave={() => setMembershipOpen(false)}
            >
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)] flex items-center">
                Membership
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${membershipOpen ? 'rotate-180' : ''}`} />
              </button>
              {membershipOpen && (
                <div className="absolute left-0 top-full mt-1 w-[300px] bg-white shadow-lg rounded-md border z-50">
                  <div className="grid gap-1 p-2">
                    <Link
                      href="/membership/new"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      New Membership
                    </Link>
                    <Link
                      href="/membership/renew"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      Renew Membership
                    </Link>
                    <Link
                      href="/membership/career-center"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      Career Center
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
              Blog
            </Link>

            <Link href="/gallery" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
              Gallery
            </Link>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)] flex items-center">
                Resources
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute left-0 top-full mt-1 w-[300px] bg-white shadow-lg rounded-md border z-50">
                  <div className="grid gap-1 p-2">
                    <Link
                      href="/resources"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      All Resources
                    </Link>
                    <Link
                      href="/resources/guidance"
                      className="block p-2 hover:bg-purple-100 rounded text-gray-700"
                    >
                      Guidance for Female Journalists
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
              Contact
            </Link>

            {/* Donate Now Button */}
            <Link href="/donate">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700 text-white font-semibold px-6">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Home
              </Link>
              <Link
                href="/about/programs"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Our Programs
              </Link>
              <Link
                href="/about/partners"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Our Partners
              </Link>
              <Link
                href="/about/team"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Our Team
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Events
              </Link>
              <Link
                href="/membership/new"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                New Membership
              </Link>
              <Link
                href="/membership/renew"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Renew Membership
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Blog
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Gallery
              </Link>

              {/* Resources Mobile Links */}
              <Link
                href="/resources"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                All Resources
              </Link>
              <Link
                href="/resources/guidance"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Guidance for Female Journalists
              </Link>

              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                <Link href="/donate">
                  <Button className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700 text-white font-semibold">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}