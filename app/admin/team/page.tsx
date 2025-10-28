"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Upload, User, Mail, Phone } from "lucide-react"

const secretariatMembers = [
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


export default function AdminTeamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("secretariat")

  const currentMembers = activeTab === "secretariat" ? secretariatMembers : boardMembers

  const filteredMembers = currentMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-2">Manage secretariat and board members</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Add a new member to the secretariat or board</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Enter position" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
              </div>
              <div>
                <Label htmlFor="team">Team</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secretariat">Secretariat</SelectItem>
                    <SelectItem value="board">Board of Directors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" placeholder="Enter member biography" rows={3} />
              </div>
              <div>
                <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                <Input id="expertise" placeholder="e.g., Leadership, Media Advocacy, Strategic Planning" />
              </div>
              <div>
                <Label htmlFor="image">Profile Image</Label>
                <div className="flex items-center space-x-2">
                  <Input id="image" type="file" accept="image/*" />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">Add Member</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secretariat Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{secretariatMembers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Board Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boardMembers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Team</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{secretariatMembers.length + boardMembers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="secretariat">Secretariat Team</TabsTrigger>
            <TabsTrigger value="board">Board of Directors</TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="secretariat">
          <Card>
            <CardHeader>
              <CardTitle>Secretariat Team ({secretariatMembers.length})</CardTitle>
              <CardDescription>Manage secretariat team members and their information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {member.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {member.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.expertise.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.expertise.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.expertise.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{member.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedMember(member)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board">
          <Card>
            <CardHeader>
              <CardTitle>Board of Directors ({boardMembers.length})</CardTitle>
              <CardDescription>Manage board members and their information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {member.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {member.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.expertise.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.expertise.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.expertise.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{member.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedMember(member)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Member Details Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMember.name}</DialogTitle>
              <DialogDescription>{selectedMember.position}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {selectedMember.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {selectedMember.phone}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Biography</h4>
                <p className="text-sm text-gray-600">{selectedMember.bio}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedMember(null)}>
                  Close
                </Button>
                <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">Edit Member</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
