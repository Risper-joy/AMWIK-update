"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HeroSection from "@/components/hero-section"
import { ExternalLink, Handshake, Globe, Users, Award } from "lucide-react"



  
const partners = {
  international: [
    {
      name: "UN Women",
      logo: "data:image/png;base64,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",
      description: "Supporting gender equality and women's empowerment globally",
      website: "https://unwomen.org",
      partnership: "Strategic Partner",
    },
    {
      name: "UNESCO",
      logo: "data:image/png;base64,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",
      description: "Promoting media freedom and gender equality in journalism",
      website: "https://unesco.org",
      partnership: "Program Partner",
    },
    
  ],
  foundations: [
    {
      name: "Helwett Foundation",
      logo: "https://amwik.org/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-10-at-8.06.51-PM.jpeg",
      description: "Supporting social justice and human rights initiatives",
      website: "//https://hewlett.org/",
      partnership: "Funding Partner",
    },
    
  ],
  media: [
    {
      name: "Nation Media Group",
      logo: "/placeholder.svg?height=80&width=200",
      description: "Leading media house in East Africa",
      website: "https://nationmedia.com",
      partnership: "Media Partner",
    },
    {
      name: "Standard Group",
      logo: "/placeholder.svg?height=80&width=200",
      description: "Multimedia company with diverse media platforms",
      website: "https://standardmedia.co.ke",
      partnership: "Content Partner",
    },
    {
      name: "Kenya Broadcasting Corporation",
      logo: "/placeholder.svg?height=80&width=200",
      description: "National public broadcaster of Kenya",
      website: "https://kbc.co.ke",
      partnership: "Broadcasting Partner",
    },
    {
      name: "Radio Africa Group",
      logo: "/placeholder.svg?height=80&width=200",
      description: "Leading radio and digital media company",
      website: "https://radioafrica.co.ke",
      partnership: "Media Partner",
    },
  ],
  government: [
    {
      name: "Media Council of Kenya",
      logo: "https://amwik.org/wp-content/uploads/2025/03/Media-Council-of-Kenya.jpeg",
      description: "Government ministry overseeing ICT and media policy",
      website: "https://mediacouncil.or.ke/",
      partnership: "Policy Partner",
    },
    {
      name: "Communications Authority of Kenya",
      logo: "data:image/png;base64,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",
      description: "Regulating communications and media in Kenya",
      website: "https://ca.go.ke",
      partnership: "Regulatory Partner",
    },
   
  ],
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        title="Our Partners"
        description="Building strong partnerships to advance women's rights in media and journalism"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Partnership Overview */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaborative Partnerships for Change</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AMWIK works with diverse partners across the globe to strengthen women's participation in media, promote
            gender equality, and advance press freedom. Together, we create meaningful impact in the media landscape.
          </p>
        </div>

        {/* Animated Partners Logos */}
        <div className="mb-16 overflow-hidden bg-white rounded-lg shadow-sm border">
          <div className="py-8">
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">Trusted by Leading Organizations</h3>
            <div className="relative">
              <div className="flex animate-scroll space-x-8">
                {/* First set of logos */}
                {[...partners.international, ...partners.foundations, ...partners.media].map((partner, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-48 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {[...partners.international, ...partners.foundations, ...partners.media].map((partner, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-48 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* International Organizations */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Globe className="h-6 w-6 text-[var(--amwik-blue)] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">International Organizations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.international.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-16 flex items-center">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Badge variant="outline" className="text-[var(--amwik-blue)]">
                      {partner.partnership}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{partner.description}</CardDescription>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--amwik-blue)] hover:text-blue-700 text-sm font-medium"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Foundations */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-[var(--amwik-green)] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Foundations & Donors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.foundations.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-16 flex items-center">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Badge variant="outline" className="text-[var(--amwik-green)]">
                      {partner.partnership}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{partner.description}</CardDescription>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--amwik-green)] hover:text-green-700 text-sm font-medium"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Media Organizations */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-[var(--amwik-purple)] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Media Organizations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.media.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-16 flex items-center">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Badge variant="outline" className="text-[var(--amwik-purple)]">
                      {partner.partnership}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{partner.description}</CardDescription>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--amwik-purple)] hover:text-purple-700 text-sm font-medium"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Government Agencies */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Handshake className="h-6 w-6 text-[var(--amwik-orange)] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Government Agencies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.government.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-16 flex items-center">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Badge variant="outline" className="text-[var(--amwik-orange)]">
                      {partner.partnership}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{partner.description}</CardDescription>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--amwik-orange)] hover:text-orange-700 text-sm font-medium"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--amwik-purple)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[var(--amwik-purple)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Network Expansion</h3>
              <p className="text-gray-600">
                Access to a diverse network of media professionals, organizations, and stakeholders across the industry.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--amwik-green)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[var(--amwik-green)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Capacity Building</h3>
              <p className="text-gray-600">
                Joint training programs, workshops, and skill development initiatives to strengthen media capabilities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--amwik-blue)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-[var(--amwik-blue)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Impact</h3>
              <p className="text-gray-600">
                Collaborative efforts to address global challenges and promote women's rights in media worldwide.
              </p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
