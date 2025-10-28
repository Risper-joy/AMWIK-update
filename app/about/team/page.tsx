"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroSection from "@/components/hero-section"
import { Mail, Phone, Linkedin, Twitter } from "lucide-react"

const secretariatTeam = [
  {
    id: 1,
    name: "Queenter Mbori",
    position: "Executive Director",
    image: "/images/queenter.png",
    bio: "Queenter is a seasoned journalist and media advocate with over 12 years of experience in the industry. She has led AMWIK since 2024, driving initiatives",
    email: "info@amwik.org",
    phone: "+254 712 345 678",
    linkedin: "linkedin.com/in/Queentermbori",
    twitter: "@queentermbori",
    expertise: ["Leadership", "Media Advocacy", "Strategic Planning", "Policy Development"],
  },
  {
    id: 2,
    name: "Lilian Museka",
    position: "Programs Manager",
    image: "https://amwik.org/wp-content/uploads/2025/03/Cyklia-Kathambi-2.png",
    bio: "Lilian Museka is a seasoned professional with over 16 years of experience in media and advocacy...",
    email: "lilian@amwik.org",
    phone: "+254 723 456 789",
    linkedin: "linkedin.com/in/lilianmuseka",
    twitter: "@lilianmuseka",
    expertise: ["Program Management", "Training", "Community Outreach", "Project Coordination"],
  },
  {
    id: 3,
    name: "Gladys Muveva",
    position: "Finance Manager",
    image: "https://amwik.org/wp-content/uploads/2024/01/Gladys-Muveva.png",
    bio: "Gladys is an experienced Finance & Administration Manager with over a decade of expertise...",
    email: "info@amwik.org",
    phone: "+254 745 678 901",
    linkedin: "linkedin.com/in/gladysmuveva",
    twitter: "@gladysmuveva",
    expertise: ["Financial Management", "Budgeting", "Compliance", "Audit"],
  },
  {
    id: 4,
    name: "Denis Mbau",
    position: "Communications Officer",
    image: "https://amwik.org/wp-content/uploads/2024/01/Dennis-Mbau.png",
    bio: "Denis is a communications and media professional with over 8 years of cross-sector experience...",
    email: "denis@amwik.org",
    phone: "+254 734 567 890",
    linkedin: "linkedin.com/in/denismbau",
    twitter: "@denismbau",
    expertise: ["Digital Marketing", "Content Creation", "Social Media", "Brand Management"],
  },
  {
    id: 5,
    name: "Peter Mwangi",
    position: "Programs Assistant",
    image: "https://amwik.org/wp-content/uploads/2025/03/Peter-Mwangi-1.png",
    bio: "Peter Mwangi is a dedicated professional with a strong background in communication and media studies.",
    email: "peter@amwik.org",
    phone: "+254 756 789 012",
    linkedin: "linkedin.com/in/petermwangi",
    twitter: "@petermwangi",
    expertise: ["Program Management", "Training", "Community Outreach", "Project Coordination"],
  },
  {
    id: 6,
    name: "Mercy Mwikali",
    position: "Admin Assistant & Membership Coordinator",
    image: "https://amwik.org/wp-content/uploads/2024/01/mercy-mwikali-adm-assistant.jpeg",
    bio: "Mercy holds a Certificate in Secretarial Studies and provides general office support to the AMWIK Secretariat and Board.",
    email: "mercy@amwik.org",
    phone: "+254 767 890 123",
    linkedin: "linkedin.com/in/mercymwikali",
    twitter: "@mercymwikali",
    expertise: ["Member Relations", "Event Coordination", "Database Management", "Customer Service"],
  },
]

const boardMembers = [
  {
    id: 7,
    name: "Robi Koki Ochieng'",
    position: "Chairperson",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121001582.jpg",
    bio: "With over 30 years of experience in media and communications, Robi brings a wealth of expertise and an unwavering commitment to gender equity, ethical journalism, and digital safety",
    email: "@board.amwik.org",
    phone: "+254 712 345 678",
    linkedin: "linkedin.com/in/",
    twitter: "@drobiokochieng",
    expertise: ["Journalism", "Media Education", "Governance", "Academic Leadership"],
  },
  {
    id: 8,
    name: "Elizabth Limagur",
    position: "Vice Chairperson",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121044149.jpg",
    bio: "Elizabeth is a dynamic media and communications expert with more than fifteen years of experience in journalism, peacebuilding, and public leadership.",
    email: "@board.amwik.org",
    phone: "+254 789 012 345",
    linkedin: "linkedin.com/in",
    twitter: "@",
    expertise: ["Entrepreneurship", "Advocacy", "Business Development", "Mentorship"],
  },
  {
    id: 9,
    name: "Joyce Mbataru",
    position: "Treasurer",
    image: "https://amwik.org/wp-content/uploads/2025/08/Joyce-Mbataru-Treasurer.jpg",
    bio: "Joyce is a Communication for Development specialist with 15+ years of experience in community-led conservation, gender, youth, and media development",
    email: "@board.amwik.org",
    phone: "+254 701 234 567",
    linkedin: "linkedin.com/in/",
    twitter: "@",
    expertise: ["Financial Oversight", "Audit", "Risk Management", "Strategic Planning"],
  },
  {
    id: 10,
    name: "Mary Mwendwa",
    position: "Board Member",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121001499.jpg",
    bio: "Mary is an award-winning investigative journalist, editor, and media trainer whose focus is to empower women in media, defend press freedom, and amplify underreported stories.",
    email: "@board.amwik.org",
    phone: "+254 733 555 999",
    linkedin: "linkedin.com/in/",
    twitter: "@",
    expertise: ["Investigative Journalism", "Leadership"],
  },
  {
    id: 11,
    name: "Lynn Nzambi",
    position: "Board Member",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121044061.jpg",
    bio: "Lynn is a committed civil servant currently serving in the County Government of Kitui and a former court reporter at KBC. Her speciality is corporate communication",
    email: "@board.amwik.org",
    phone: "+254 722 111 222",
    linkedin: "linkedin.com/in/",
    twitter: "@",
    expertise: ["Media Relations", "Corporate Communication", "Public Relations"],
  },
  {
    id: 12,
    name: "Clara Micheni",
    position: "Board Member",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121043969.jpg",
    bio: "Clara is a seasoned communications and public relations professional with over a decade of experience spanning print media, corporate communications, and community engagement.",
    email: "@board.amwik.org",
    phone: "+254 733 888 444",
    linkedin: "linkedin.com/in/",
    twitter: "@",
    expertise: ["Strategic Communications", "Public Relations", "Media Relations"],
  },
  {
    id: 13,
    name: "Nancy Agutu",
    position: "Board Member",
    image: "https://amwik.org/wp-content/uploads/2025/08/Nancy-Agutu-scaled.jpg",
    bio: "Nancy is a dynamic media practitioner and communication consultant with 5 years of experience in project management, digital media, and content creation.",
    email: "@board.amwik.org",
    phone: "+254 700 555 666",
    linkedin: "linkedin.com/in/",
    twitter: "@",
    expertise: ["Journalism", "Mentorship", "Gender Advocacy"],
  },
]

const boardOfTrustees = [
  {
    id: 14,
    name: "Anne Anjao",
    position: "Trustee",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121043875.jpg",
    bio: "Ann is a media scholar and Head of Media & Film Studies at Daystar University, with over 14 years of experience in journalism and academia across Kenya and Rwanda.",
    email: "trustee1@amwik.org",
    phone: "+254 700 111 111",
    linkedin: "linkedin.com/in/trusteeone",
    twitter: "@trusteeone",
    expertise: ["Strategy", "Leadership", "Media Studies"],
  },
  {
    id: 15,
    name: "Victoria Musimbi",
    position: "Trustee",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121001418.jpg",
    bio: "Victoria is a passionate journalist with 5+ years of experience reporting on health, climate change, gender, and education.",
    email: "trustee2@amwik.org",
    phone: "+254 700 222 222",
    linkedin: "linkedin.com/in/trusteetwo",
    twitter: "@trusteetwo",
    expertise: ["Advocacy", "Policy", "Community Development"],
  },
  {
    id: 16,
    name: "Mercy Wairimu",
    position: "Trustee",
    image: "https://amwik.org/wp-content/uploads/2025/09/retouch_2025090121001234.jpg",
    bio: "Mercy is a passionate communications professional and committed AMWIK member whose journey began as an intern in 2022. Now working at Ichiban Tax & Business Advisory LLP, she brings expertise in media relations, public affairs, and policy advocacy.",
    email: "trustee3@amwik.org",
    phone: "+254 700 333 333",
    linkedin: "linkedin.com/in/trusteethree",
    twitter: "@trusteethree",
    expertise: ["Partnerships", "Communications"],
  },
]

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("secretariat")

  const TeamMemberCard = ({ member }: { member: any }) => (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={member.image && member.image.trim() !== "" ? member.image : "/default-profile.png"}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-0 group-hover:opacity-80 transition-all duration-300 flex items-center justify-center">
            <div className="text-white p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 max-w-full">
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-sm mb-4 line-clamp-4">{member.bio}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  {member.phone}
                </div>
              </div>
              <div className="flex space-x-2 mb-4">
                <a
                  href={`https://${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/${member.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
              <div className="flex flex-wrap gap-1">
                {member.expertise?.slice(0, 3).map((skill: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-white bg-opacity-20 text-white border-white border-opacity-30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Basic info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{member.name}</h3>
          <p className="text-[var(--amwik-purple)] font-medium">{member.position}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow">
        <HeroSection
          title="Our Team"
          description="Meet the dedicated professionals driving AMWIK's mission to empower women in media"
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership & Expertise</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team combines decades of experience in journalism, media advocacy, and organizational leadership.
              Together, we work tirelessly to advance women's rights and representation in the media industry.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-fit grid-cols-3 bg-white shadow-sm">
                <TabsTrigger value="secretariat" className="px-8 py-3">
                  Secretariat Team
                  <Badge variant="secondary" className="ml-2">
                    {secretariatTeam.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="board" className="px-8 py-3">
                  Board of Directors
                  <Badge variant="secondary" className="ml-2">
                    {boardMembers.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="trustees" className="px-8 py-3">
                  Board of Trustees
                  <Badge variant="secondary" className="ml-2">
                    {boardOfTrustees.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Secretariat */}
            <TabsContent value="secretariat">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Secretariat Team</h3>
                <p className="text-gray-600 mb-8">
                  Our secretariat team handles the day-to-day operations of AMWIK, implementing programs, managing
                  communications, and ensuring our mission is carried out effectively.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {secretariatTeam.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            {/* Board of Directors */}
            <TabsContent value="board">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Board of Directors</h3>
                <p className="text-gray-600 mb-8">
                  Our board provides strategic oversight and governance, bringing together experienced leaders from
                  various sectors of the media industry to guide AMWIK's long-term vision.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {boardMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            {/* Board of Trustees */}
            <TabsContent value="trustees">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Board of Trustees</h3>
                <p className="text-gray-600 mb-8">
                  Our board of trustees provides foundational support and ensures accountability in AMWIK’s mission.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {boardOfTrustees.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
