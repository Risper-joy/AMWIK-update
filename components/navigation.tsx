"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/amwik-logo.png" alt="AMWIK Logo" width={40} height={40} className="h-10 w-auto" />
              
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

             <NavigationMenuItem>
  <NavigationMenuTrigger>About</NavigationMenuTrigger>
  <NavigationMenuContent className="bg-white shadow-lg rounded-md">
    <div className="grid gap-3 p-4 w-[400px]">
      <Link href="/about/programs" className="block p-2 hover:bg-purple-100 rounded">
        Our Programs
      </Link>
      <Link href="/about/partners" className="block p-2 hover:bg-purple-100 rounded">
        Our Partners
      </Link>
      <Link href="/about/team" className="block p-2 hover:bg-gray-100 rounded">
        Our Team
      </Link>
    </div>
  </NavigationMenuContent>
</NavigationMenuItem>
 
                <NavigationMenuItem>
                  <Link href="/events" legacyBehavior passHref>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
                      Events
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Membership</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px]">
                      <Link href="/membership/new" className="block p-2 hover:bg-purple-100 rounded">
                        New Membership
                      </Link>
                      <Link href="/membership/renew" className="block p-2 hover:bg-purple-100 rounded">
                        Renew Membership
                      </Link>
                      <Link href="/membership/career-center" className="block p-2 hover:bg-purple-100 rounded">
                        Career Center
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/gallery" legacyBehavior passHref>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
                      Gallery
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/resources" legacyBehavior passHref>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
                      Resources
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[var(--amwik-purple)]">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Donate Now Button */}
            <Link href="/donate">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700 text-white font-semibold px-6">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
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
              <Link
                href="/resources"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[var(--amwik-purple)]"
              >
                Resources
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
