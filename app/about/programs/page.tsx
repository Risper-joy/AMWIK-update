import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, DollarSign, Heart, Briefcase } from "lucide-react"

const programs = [
  {
    id: 1,
    title: "Gender and Governance",
    description: "Promoting gender equality and women's participation in governance and decision-making processes.",
    icon: Users,
    color: "bg-pink-100 text-[var(--amwik-red)]",
    details: [
      "Leadership training for women in media",
      "Advocacy for gender-sensitive policies",
      "Mentorship programs for emerging leaders",
      "Research on women's representation in media",
    ],
  },
  {
    id: 2,
    title: "Media Development and Membership",
    description: "Building capacity and skills for women journalists through comprehensive training programs.",
    icon: BookOpen,
    color: "bg-green-100 text-[var(--amwik-green)]",
    details: [
      "Professional journalism training workshops",
      "Digital media skills development",
      "Ethics and standards in journalism",
      "Networking and mentorship opportunities",
    ],
  },
  {
    id: 3,
    title: "Women's Economic Empowerment",
    description: "Supporting women's economic independence through entrepreneurship and financial literacy.",
    icon: DollarSign,
    color: "bg-gray-100 text-gray-600",
    details: [
      "Business development training",
      "Access to microfinance opportunities",
      "Financial literacy workshops",
      "Market linkage support",
    ],
  },
  {
    id: 4,
    title: "Sexual Health and Reproductive Rights",
    description: "Advocating for sexual health and reproductive rights through media awareness.",
    icon: Heart,
    color: "bg-blue-100 text-[var(--amwik-blue)]",
    details: [
      "Health awareness campaigns",
      "Reproductive rights advocacy",
      "Community education programs",
      "Policy advocacy and research",
    ],
  },
  {
    id: 5,
    title: "Career Development",
    description: "Comprehensive career support and professional development opportunities.",
    icon: Briefcase,
    color: "bg-orange-100 text-[var(--amwik-orange)]",
    details: [
      "Career counseling and guidance",
      "Job placement assistance",
      "Skills assessment and development",
      "Professional certification programs",
    ],
  },
]

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-white py-16">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-5xl font-bold mb-4 text-white">Our Programs</h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Comprehensive initiatives designed to empower women in media through training, advocacy, and professional
            development opportunities.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${program.color}`}>
                    <program.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <CardDescription className="text-lg">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Key Activities:</h4>
                  <ul className="space-y-2">
                    {program.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-[var(--amwik-purple)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Impact</h2>
            <p className="text-xl text-gray-600">Our programs have created lasting change in the media landscape</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--amwik-purple)] mb-2">10,000+</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">Women Trained</div>
              <p className="text-gray-600">Through our comprehensive training programs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--amwik-purple)] mb-2">500+</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">Active Members</div>
              <p className="text-gray-600">Professional women journalists in our network</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--amwik-purple)] mb-2">50+</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">Scholarships Awarded</div>
              <p className="text-gray-600">Supporting education and professional development</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
