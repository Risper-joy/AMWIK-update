
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
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAACUCAMAAAAgTdyMAAAAkFBMVEX///8Akt4An+L3/P4AmuAztuoAmOCGzvEAneEAlt86pOMAj93b8PpBuevV7PkAlN+Dxu13w+zq9vzC5Pbj8vvK4/XI6fhQsucgpOO63/Vpv+uYzu+Ox+7x+P11vuppuumm3fQ7q+WL0/Ga1fIAhdsAity35Pakz+8Ar+hTwexqyO6x1/J6zvBYuOlRq+Wm1vIzc7lVAAAEFUlEQVR4nO3YXXOqOBwG8JgECBKDBgpBpYC01ne+/7fbf6Cne7q7F56LHe3M87sAjODkmbwiYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8JOJwkwXeZH7j7oQ9XjF7HjKtabCXNfMGqNroU3xuMr+GV0UVb/bZxnl2LxvBYUpE20SldGXH+8rOvaHA8sOwWHHPkKpKjNP1o+u9Z2K476v2mIRtSfNNrMp3UybVHWa0s18OpafWBEEQc82oeSZXv+UphO7U9H2UX9aZqf293Qxj5vPdMJ3z7yPVi07l69bCm3Pj673fexl1/ZldO12/WX3re06l24+265f9/5eIZio/TMft+axtb5Xfmr7YH3qun6/u/yeLmk2XFXVmE4cD8yso75gRfTaZGYuxaPrfZ/80i7kLgoCU+y+td2ssSvZreNx3ImAZcHiQONOcp69dPmjq32v/riP+rUMonZRsCFtqOsZF+c+HSulkpSuLmomKN1iTKcyK9jyhzSePl3aoo2q9hTVzIR80HobdvWYzs7HdOJ0yem+axCxTewazexSPrra9zLH065voyMlYGKVyq6L5cBo3FnGKhX6dNHhSIufqQr2MmSCVaWcP7rWd9Nta4p2b/213XRSXSvBDF/7gsFFPl0QLFbDNNh033DFf06670Rdj2NqOo4nSrdYUMBgYOf5nNPE8nTprPVLldBTE+VU6dpkpp6+mvLYnAk7EWK83X/+TEeCac7kT5iufPcrcPXm91davRsx8CRJ3EA747fET4G2TBL28p7OqPjNZG/c7zM3b6/f0g3cOfeE6bLZjXJdpd8cV+lVLFPebJtQRqKecZ9kkFyyl9i9ksZmseqo2TbpckoXrIos00xXVXVVz5eOhbzyh5DW69XsvA9db4UdQlVQOtmx3Kkx3dXSyKtZFnN5pXSzX+n6rx9aySdMt443rIqd62rhuGnUuFWsm3RZz5yLh7XsXEjpSm1t7tM5Tg98pVss1kdazc/z2+0ZeyYzs9Je+W6VGFrL8puaGuMclza59k7KpvfpQh6nKY3DbPYacVmc/0638G9AH+o5ZxVWO76fO3tOl8v4g93UciwdfLrSbhWvsjGdK8vyNtAwbcQy7Fbxv3vm8hl7ptjGnbqygiY9l7FGlePLTJlu6qTUwq1YNfXMaZ2jdFaUNNF8zSqmoNc8XWXPOauwTPJ0z0QjJSWgHeWrsWYtnfbpWGZ/pTOajOlow6Lk8vt6x8cF4QnT5aVK6USvbb5TDonsbl0oz8z6dKRyMaXjHVFmTMeqMPxHOjkOPPV86dh2/LPHzOPxH7Cii0NqKeqdyW0sqDilS5UkyUs27qJpzlz9iL3KfxD20TUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/0V8MVVH+4avDqAAAAABJRU5ErkJggg==", 
      description: "Supporting gender equality and women's empowerment globally",
      website: "https://unwomen.org",
      partnership: "Strategic Partner",
    },
    {
      name: "UNESCO",
      logo: "https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/public/2021-10/UNESCO_logo_hor_blue_transparent.png.jpg?itok=PKu1h01E", 
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
      logo: "data:image/jpeg;base64,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",
      description: "Regulating communications and media in Kenya",
      website: "https://ca.go.ke",
      partnership: "Regulatory Partner",
    },
  ],
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow">
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
                  {[...partners.international, ...partners.foundations, ...partners.government].map((partner, index) => (
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
                  {[...partners.international, ...partners.foundations, ...partners.government].map((partner, index) => (
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

          {/* Sections for each partner category */}
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

          {/* Foundations, Media, Government sections remain unchanged... */}
<section className="mb-12">
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 text-[var(--amwik-blue)] mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Foundations</h2>
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

          {/* Government */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 text-[var(--amwik-blue)] mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Government</h2>
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
      </main>

      {/* Footer */}
      <Footer />

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
