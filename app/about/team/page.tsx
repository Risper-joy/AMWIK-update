"use client"

import { useState } from "react"
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
    image: "https://amwik.org/wp-content/uploads/2024/01/Queenter-Mbori.png",
    bio: "Queenter is a seasoned journalist and media advocate with over 12 years of experience in the industry. She has led AMWIK since 2024, driving initiatives",
    email: "@amwik.org",
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
    bio: "Lilian Museka is a seasoned professional with over 16 years of experience in media and advocacy, currently serving as the Monitoring, Evaluation, and Learning (MEAL) Officer at the Association of Media Women in Kenya (AMWIK). She has a strong background in promoting gender equality and has been actively involved in various initiatives aimed at addressing violence and discrimination against women and girls.Her career highlights include advocating for gender equality through participatory research, multimedia journalism, public speaking, and video production. Lilian is skilled in gender mainstreaming, communication strategy development, public/media relations, editing, social media management, event management, IT, fundraising, and training. She is fluent in both English and Kiswahili and is recognized for her ability to work effectively with diverse groups, both independently and within teams.Lilian’s impactful work includes rallying civil societies in Zambia to develop programs addressing sexual violence against schoolgirls during an exchange program in 2010. Additionally, her article on restoring women’s dignity through sanitary towel dispensers won an award at the 2019 Africa Women Innovation and Entrepreneurship Forum (AWIEF) in South Africa.She is committed to driving positive change and continues to leverage her expertise to advocate for a world free of violence and discrimination against women and girls",
    email: "@amwik.org",
    phone: "+254 723 456 789",
    linkedin: "linkedin.com/in/lilianmuseka",
    twitter: "@lilianmuseka",
    expertise: ["Program Management", "Training", "Community Outreach", "Project Coordination"],
  },
  {
    id: 3,
    name: "Denis Mbau",
    position: "Communications Officer ",
    image: "https://amwik.org/wp-content/uploads/2024/01/Dennis-Mbau.png",
    bio: "Denis is a communications and media professional with over 8 years of cross-sector experience in supporting brands formulate and implement impactful corporate communication strategies. Denis has a Bachelor of Science degree in Journalism and Mass Communication and is currently working on his dissertation for a Master of Arts degree in Communication Studies- Development Communication.He has worked with many brands in the NGO, private and public sectors in the realms of digital media, mass media, content creation, publishing and Public",
    email: "mary.kiprotich@amwik.org",
    phone: "+254 734 567 890",
    linkedin: "linkedin.com/in/marykiprotich",
    twitter: "@marykiprotich",
    expertise: ["Digital Marketing", "Content Creation", "Social Media", "Brand Management"],
  },
  {
    id: 4,
    name: "Gladys Muveva",
    position: "Finance Manager",
    image: "https://amwik.org/wp-content/uploads/2024/01/Gladys-Muveva.png",
    bio: "Gladys is an experienced Finance & Administration Manager with over a decade of comprehensive expertise in financial management, administrative operations, and strategic planning. Possessing a proven track record of success in optimizing financial performance, implementing robust internal controls, and driving operational efficiencies.Adept at overseeing diverse administrative functions while ensuring compliance with regulatory standards and company policies. She is currently pursuing a Master’s Degree in Business Administration to further enhance leadership and management skills.",
    email: "info@amwik.org",
    phone: "+254 745 678 901",
    linkedin: "linkedin.com/in/gladysmuveva",
    twitter: "@gladysmuveva",
    expertise: ["Financial Management", "Budgeting", "Compliance", "Audit"],
  },
  {
    id: 5,
    name: "Peter Mwangi",
    position: "Programs Assistant",
    image: "/placeholder.svg?height=300&width=300",
    bio: ".",
    email: "@amwik.org",
    phone: "+254 756 789 012",
    linkedin: "linkedin.com/in/petermwangi",
    twitter: "@petermwangi",
    expertise:  ["Program Management", "Training", "Community Outreach", "Project Coordination"],
  },
  {
    id: 6,
    name: "Mercy Mwikali",
    position: "Admin Assistant & Membership Coordinator",
    image: "",
    bio: "",
    email: "esther.passaris@amwik.org",
    phone: "+254 767 890 123",
    linkedin: "linkedin.com/in/estherpassaris",
    twitter: "@estherpassaris",
    expertise: ["Member Relations", "Event Coordination", "Database Management", "Customer Service"],
  },
]

const boardMembers = [
  {
    id: 7,
    name: "Dr. Jane Thuo",
    position: "Chairperson",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Jane is a veteran journalist and media educator with 25 years of experience. She has served in various leadership roles in media organizations and academic institutions.",
    email: "jane.wanjiku@board.amwik.org",
    phone: "+254 778 901 234",
    linkedin: "linkedin.com/in/drjanewanjiku",
    twitter: "@drjanewanjiku",
    expertise: ["Journalism", "Media Education", "Governance", "Academic Leadership"],
  },
  {
    id: 8,
    name: "Lilian Anyango",
    position: "Vice Chairperson",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Lucy is a media entrepreneur and advocate for women's rights in media. She founded several successful media ventures and mentors young women journalists.",
    email: "lucy.mwangi@board.amwik.org",
    phone: "+254 789 012 345",
    linkedin: "linkedin.com/in/lucymwangi",
    twitter: "@lucymwangi",
    expertise: ["Entrepreneurship", "Advocacy", "Business Development", "Mentorship"],
  },
  
  {
    id: 10,
    name: "venter Nkatha",
    position: "Treasurer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Margaret is a financial expert with extensive experience in the non-profit sector. She oversees AMWIK's financial strategy and ensures fiscal responsibility.",
    email: "margaret.wanjiru@board.amwik.org",
    phone: "+254 701 234 567",
    linkedin: "linkedin.com/in/margaretwanjiru",
    twitter: "@margaretwanjiru",
    expertise: ["Financial Oversight", "Audit", "Risk Management", "Strategic Planning"],
  },
  
    
]

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("secretariat")

  const TeamMemberCard = ({ member }: { member: any }) => (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 bg-[var(--amwik-purple)] bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center">
            <div className="text-white p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
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
                {member.expertise.slice(0, 3).map((skill: string, index: number) => (
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

        {/* Basic info always visible */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{member.name}</h3>
          <p className="text-[var(--amwik-purple)] font-medium">{member.position}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        title="Our Team"
        description="Meet the dedicated professionals driving AMWIK's mission to empower women in media"
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Team Overview */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership & Expertise</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team combines decades of experience in journalism, media advocacy, and organizational leadership.
            Together, we work tirelessly to advance women's rights and representation in the media industry.
          </p>
        </div>

        {/* Team Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-fit grid-cols-2 bg-white shadow-sm">
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
            </TabsList>
          </div>

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
        </Tabs>

        {/* Team Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Team by Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--amwik-purple)] mb-2">
                {secretariatTeam.length + boardMembers.length}
              </div>
              <div className="text-gray-600">Total Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--amwik-green)] mb-2">150+</div>
              <div className="text-gray-600">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--amwik-blue)] mb-2">12</div>
              <div className="text-gray-600">Areas of Expertise</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--amwik-orange)] mb-2">100%</div>
              <div className="text-gray-600">Women Leadership</div>
            </div>
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 bg-gradient-to-r from-[var(--amwik-purple)] to-purple-700 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
          <p className="text-lg mb-6 opacity-90">
            Are you passionate about advancing women's rights in media? We're always looking for dedicated professionals
            to join our team and make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/membership/career-center"
              className="bg-white text-[var(--amwik-purple)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[var(--amwik-purple)] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
