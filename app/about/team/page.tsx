"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroSection from "@/components/hero-section"
import { Mail, Phone, Linkedin, Twitter, X } from "lucide-react"

interface TeamMember {
  _id?: string
  name: string
  position: string
  team: 'secretariat' | 'board_directors' | 'board_trustees'
  image: string
  bio: string
  email: string
  phone: string
  linkedin?: string
  twitter?: string
  expertise: string[]
  joinDate?: string
  status?: 'active' | 'inactive' | 'on leave'
  // ADDED: Include the automatic Mongoose timestamps for precise sorting
  createdAt?: string 
  updatedAt?: string
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("secretariat")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch team members on mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/team-members")
        if (response.ok) {
          const data: TeamMember[] = await response.json()
          
          // FIX: Sort members by the precise 'createdAt' timestamp (oldest first)
          const sortedData = data.sort((a, b) => {
            // Use createdAt, which is provided by Mongoose timestamps
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            
            // Ascending sort (a - b) ensures the earliest created member appears first
            return dateA - dateB;
          });

          setTeamMembers(sortedData)
        }
      } catch (error) {
        console.error("Error fetching team members:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  // Filter members by team
  const secretariatMembers = teamMembers.filter(m => m.team === 'secretariat')
  const boardMembers = teamMembers.filter(m => m.team === 'board_directors')
  const trusteeMembers = teamMembers.filter(m => m.team === 'board_trustees')

  const getMembersForActiveTab = () => {
    switch (activeTab) {
      case 'secretariat':
        return secretariatMembers
      case 'board':
        return boardMembers
      case 'trustees':
        return trusteeMembers
      default:
        return []
    }
  }

  const currentMembers = getMembersForActiveTab()

  // Member Profile Modal Component
  const ProfileModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => (
    <>
      {/* Background blur - Click handler closes the modal */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal - Horizontal Layout */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden transition-all duration-300 transform scale-100 opacity-100" // Increased max-width
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {/* Left: Image (2/5 width) */}
            <div className="md:col-span-2 relative h-full min-h-[400px] bg-gray-200 overflow-hidden">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-4xl font-bold text-gray-600">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              {/* Purple translucent frame overlay */}
              <div className="absolute inset-0 border-8 border-purple-500 border-opacity-40 pointer-events-none" />
            </div>

            {/* Right: Info (3/5 width) */}
            <div className="md:col-span-3 p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              {/* Title section */}
              <div className="mb-6 mt-4">
                <p className="text-sm font-medium text-purple-600 mb-1 uppercase">{member.position}</p>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{member.name}</h2>
                <p className="text-md font-medium text-pink-600">{member.team.replace(/_/g, ' ')}</p>
              </div>

              {/* Social links - Moved higher for visibility */}
              <div className="flex gap-4 mb-6">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-purple-100 hover:bg-purple-600 hover:text-white rounded-full transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-purple-600 hover:text-white" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-pink-100 hover:bg-pink-600 hover:text-white rounded-full transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-pink-600 hover:text-white" />
                  </a>
                )}
              </div>
              
              {/* Bio */}
              <div className="mb-6 max-h-48 overflow-y-auto pr-2">
                <p className="text-gray-700 text-base leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Contact info and Expertise in a structured grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">Contact</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <a
                              href={`mailto:${member.email}`}
                              className="text-sm text-purple-600 hover:text-pink-600 transition-colors truncate"
                            >
                              {member.email}
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{member.phone}</span>
                        </div>
                    </div>
                </div>

                {member.expertise && member.expertise.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-purple-50 text-purple-700 border-purple-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // Team Member Card Component
  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="group relative overflow-hidden transition-all duration-300 cursor-pointer" onClick={() => setSelectedMember(member)}>
      <CardContent
        className="p-0"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <span className="text-5xl font-bold text-gray-600">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
          {/* Purple translucent frame */}
          <div className="absolute inset-0 border-8 border-purple-500 border-opacity-40 pointer-events-none" />

          {/* HOVER OVERLAY: Appears on hover */}
          <div className='absolute inset-0 bg-purple-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
              <div className='text-white w-full'>
                  <p className="text-sm font-medium mb-1">{member.position}</p>
                  <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                  {/* Bio Preview (first three lines) */}
                  <p className="text-xs line-clamp-3">
                      {member.bio}
                  </p>
                  <span className='mt-2 inline-block text-xs font-semibold underline'>
                      Click for full profile →
                  </span>
              </div>
          </div>
        </div>
        {/* Basic info (always visible) */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-purple-600 transition-colors">
            {member.name}
          </h3>
          <p className="text-purple-600 font-medium text-sm">{member.position}</p>
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
                    {secretariatMembers.length}
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
                    {trusteeMembers.length}
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
                {secretariatMembers.map((member) => (
                  <TeamMemberCard key={member._id} member={member} />
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
                  <TeamMemberCard key={member._id} member={member} />
                ))}
              </div>
            </TabsContent>

            {/* Board of Trustees */}
            <TabsContent value="trustees">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Board of Trustees</h3>
                <p className="text-gray-600 mb-8">
                  Our board of trustees provides foundational support and ensures accountability in AMWIK's mission.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trusteeMembers.map((member) => (
                  <TeamMemberCard key={member._id} member={member} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Profile Modal */}
      {selectedMember && (
        <ProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}