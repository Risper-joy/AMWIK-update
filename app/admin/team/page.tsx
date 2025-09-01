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
    name: "Sarah Wanjiku",
    position: "Executive Director",
    email: "sarah.wanjiku@amwik.org",
    phone: "+254 712 345 678",
    bio: "Experienced media professional with over 15 years in journalism and media advocacy.",
    expertise: ["Leadership", "Media Advocacy", "Strategic Planning"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2020-01-15",
  },
  {
    id: 2,
    name: "Grace Mutindi",
    position: "Programs Manager",
    email: "grace.mutindi@amwik.org",
    phone: "+254 723 456 789",
    bio: "Specialist in program development and implementation with focus on women empowerment.",
    expertise: ["Program Management", "Training", "Community Outreach"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2020-03-20",
  },
  {
    id: 3,
    name: "Mary Kiprotich",
    position: "Communications Officer",
    email: "mary.kiprotich@amwik.org",
    phone: "+254 734 567 890",
    bio: "Digital communications expert with background in social media and content strategy.",
    expertise: ["Digital Marketing", "Content Creation", "Social Media"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2021-06-10",
  },
  {
    id: 4,
    name: "Agnes Wanjiru",
    position: "Finance Manager",
    email: "agnes.wanjiru@amwik.org",
    phone: "+254 745 678 901",
    bio: "Certified accountant with expertise in non-profit financial management.",
    expertise: ["Financial Management", "Budgeting", "Compliance"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2020-08-05",
  },
  {
    id: 5,
    name: "Catherine Njeri",
    position: "Research Coordinator",
    email: "catherine.njeri@amwik.org",
    phone: "+254 756 789 012",
    bio: "Research specialist focusing on gender and media studies.",
    expertise: ["Research", "Data Analysis", "Report Writing"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2021-02-18",
  },
  {
    id: 6,
    name: "Esther Passaris",
    position: "Membership Coordinator",
    email: "esther.passaris@amwik.org",
    phone: "+254 767 890 123",
    bio: "Membership engagement specialist with background in member relations.",
    expertise: ["Member Relations", "Event Coordination", "Database Management"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2021-09-12",
  },
]

const boardMembers = [
  {
    id: 7,
    name: "Dr. Jane Wanjiku",
    position: "Chairperson",
    email: "jane.wanjiku@board.amwik.org",
    phone: "+254 778 901 234",
    bio: "Veteran journalist and media educator with 25 years of experience.",
    expertise: ["Journalism", "Media Education", "Governance"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2019-01-10",
  },
  {
    id: 8,
    name: "Lucy Mwangi",
    position: "Vice Chairperson",
    email: "lucy.mwangi@board.amwik.org",
    phone: "+254 789 012 345",
    bio: "Media entrepreneur and advocate for women's rights in media.",
    expertise: ["Entrepreneurship", "Advocacy", "Business Development"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2019-01-10",
  },
  {
    id: 9,
    name: "Rose Kimani",
    position: "Secretary",
    email: "rose.kimani@board.amwik.org",
    phone: "+254 790 123 456",
    bio: "Legal expert specializing in media law and women's rights.",
    expertise: ["Media Law", "Legal Compliance", "Policy Development"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2019-01-10",
  },
  {
    id: 10,
    name: "Margaret Wanjiru",
    position: "Treasurer",
    email: "margaret.wanjiru@board.amwik.org",
    phone: "+254 701 234 567",
    bio: "Financial expert with extensive experience in non-profit sector.",
    expertise: ["Financial Oversight", "Audit", "Risk Management"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2019-01-10",
  },
  {
    id: 11,
    name: "Faith Mukami",
    position: "Board Member",
    email: "faith.mukami@board.amwik.org",
    phone: "+254 712 345 678",
    bio: "Television producer and media trainer with focus on investigative journalism.",
    expertise: ["Television Production", "Investigative Journalism", "Training"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2020-06-15",
  },
  {
    id: 12,
    name: "Anne Waiguru",
    position: "Board Member",
    email: "anne.waiguru@board.amwik.org",
    phone: "+254 723 456 789",
    bio: "Radio personality and community media advocate.",
    expertise: ["Radio Broadcasting", "Community Media", "Public Speaking"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2020-06-15",
  },
  {
    id: 13,
    name: "Susan Kihika",
    position: "Board Member",
    email: "susan.kihika@board.amwik.org",
    phone: "+254 734 567 890",
    bio: "Digital media strategist and technology advocate.",
    expertise: ["Digital Strategy", "Technology", "Innovation"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2021-01-20",
  },
  {
    id: 14,
    name: "Joyce Laboso",
    position: "Board Member",
    email: "joyce.laboso@board.amwik.org",
    phone: "+254 745 678 901",
    bio: "Print media veteran and journalism mentor.",
    expertise: ["Print Media", "Mentorship", "Editorial Leadership"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2021-01-20",
  },
  {
    id: 15,
    name: "Gladys Shollei",
    position: "Board Member",
    email: "gladys.shollei@board.amwik.org",
    phone: "+254 756 789 012",
    bio: "Media researcher and academic with focus on gender representation.",
    expertise: ["Media Research", "Gender Studies", "Academic Writing"],
    image: "/placeholder.svg?height=200&width=200",
    status: "Active",
    joinDate: "2021-01-20",
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
