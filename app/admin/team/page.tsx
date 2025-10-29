// app/admin/team/page.tsx

"use client"

import { useState, useEffect, useCallback } from "react"
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, RefreshCw, User, Mail, Phone } from "lucide-react"

// --- INTERFACE/MODEL DEFINITION ---
type TeamType = 'secretariat' | 'board_directors' | 'board_trustees'

interface TeamMember {
  _id?: string
  name: string
  position: string
  team: TeamType
  image: string
  bio: string
  email: string
  phone: string
  linkedin?: string
  twitter?: string
  expertise: string[]
  joinDate?: string
  status?: 'active' | 'inactive' | 'on leave'
}

// Initial state for the Add Member Form
const initialNewMemberState: Omit<TeamMember, '_id' | 'image' | 'expertise'> & { expertiseInput: string } = {
  name: "",
  position: "",
  team: 'secretariat', 
  bio: "",
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
  expertiseInput: "",
  joinDate: new Date().toISOString().split('T')[0],
  status: 'active'
}

// Helper to map DB value to UI display name
const teamMap: Record<TeamType, string> = {
    secretariat: "Secretariat Team",
    board_directors: "Board of Directors",
    board_trustees: "Board of Trustees",
}

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  // Use the database value for the active tab
  const [activeTab, setActiveTab] = useState<TeamType>("secretariat")
  const [newMember, setNewMember] = useState(initialNewMemberState)

  // --- API FETCH FUNCTION (READ) ---
  const fetchMembers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/team-members")
      if (!response.ok) {
        throw new Error("Failed to fetch team members from database.")
      }
      
      const data: TeamMember[] = await response.json()
      setTeamMembers(data)
    } catch (err: any) {
      console.error("Fetch error:", err)
      setError(err.message || "Could not connect to the database. Check API route and MongoDB connection.")
      setTeamMembers([]) 
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  // --- ADD MEMBER HANDLER (CREATE) ---
  const handleAddMember = async () => {
    setError(null)
    setSuccess(null)
    
    // 1. Prepare data for API
    const memberData: Omit<TeamMember, '_id'> = {
      name: newMember.name,
      position: newMember.position,
      team: newMember.team,
      bio: newMember.bio,
      email: newMember.email,
      phone: newMember.phone,
      expertise: newMember.expertiseInput.split(',').map(e => e.trim()).filter(e => e.length > 0), 
      linkedin: newMember.linkedin,
      twitter: newMember.twitter,
      image: "default-placeholder.png", 
      joinDate: newMember.joinDate,
      status: newMember.status,
    }

    if (!memberData.name || !memberData.position || !memberData.team || !memberData.email) {
      setError("Please fill in all mandatory fields (Name, Position, Team, Email).")
      return
    }

    try {
      const response = await fetch("/api/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add team member.")
      }

      const result = await response.json() as { member: TeamMember }
      
      setSuccess(`Successfully added ${result.member.name} to the ${teamMap[result.member.team]}.`)
      
      setNewMember(initialNewMemberState)
      setIsAddDialogOpen(false)
      
      // Refresh the list 
      await fetchMembers()
    } catch (err: any) {
      console.error("Add error:", err)
      setError(err.message || "An unexpected error occurred during member addition.")
    }
  }

  // --- DELETE MEMBER HANDLER (DELETE) ---
  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${name}? This action cannot be undone.`)) return

    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`/api/team-members?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete team member.")
      }

      setTeamMembers(prev => prev.filter(member => member._id !== id))
      setSuccess(`${name} successfully deleted.`)
    } catch (err: any) {
      console.error("Delete error:", err)
      setError(err.message || "An unexpected error occurred during member deletion.")
    }
  }
  
  // --- UI LOGIC HELPERS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewMember(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setNewMember(prev => ({ ...prev, [id]: value as TeamType }))
  }

  // Filter members into the three groups
  const secretariatMembers = teamMembers.filter(m => m.team === 'secretariat')
  const boardDirectors = teamMembers.filter(m => m.team === 'board_directors')
  const boardTrustees = teamMembers.filter(m => m.team === 'board_trustees')
  
  // Determine which list to display based on the active tab
  const getMembersForActiveTab = (): TeamMember[] => {
    switch (activeTab) {
      case 'secretariat':
        return secretariatMembers
      case 'board_directors':
        return boardDirectors
      case 'board_trustees':
        return boardTrustees
      default:
        return []
    }
  }

  const currentMembers = getMembersForActiveTab()

  const filteredMembers = currentMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderMemberTable = (members: TeamMember[], teamKey: TeamType) => (
      <Card>
        <CardHeader>
          <CardTitle>{teamMap[teamKey]} ({members.length})</CardTitle>
          <CardDescription>Manage {teamMap[teamKey].toLowerCase()} members and their information.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && members.length === 0 ? (
            <div className="flex justify-center py-8 items-center text-gray-500">
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Loading members...
            </div>
          ) : members.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No members found in the database for this team. Add one above.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
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
                    <TableRow key={member._id}>
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
                              {(member.expertise || []).slice(0, 2).map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                              ))}
                              {(member.expertise || []).length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                      +{(member.expertise || []).length - 2}
                                  </Badge>
                              )}
                          </div>
                      </TableCell>
                      <TableCell>{member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                          <Badge className={member.status === 'active' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                              {member.status || 'active'}
                          </Badge>
                      </TableCell>
                      <TableCell>
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setSelectedMember(member)}>
                                      <Eye className="mr-2 h-4 w-4" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                      <Edit className="mr-2 h-4 w-4" /> Edit Member
                                  </DropdownMenuItem>
                                  {member._id && (
                                      <DropdownMenuItem 
                                          className="text-red-600" 
                                          onClick={() => handleDeleteMember(member._id!, member.name)}
                                      >
                                          <Trash2 className="mr-2 h-4 w-4" /> Remove Member
                                      </DropdownMenuItem>
                                  )}
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredMembers.length === 0 && members.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No results found for your search query in this team.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
  )
  
  // Stats
  const totalMembers = teamMembers.length
  const secretariatCount = secretariatMembers.length
  const boardDirectorsCount = boardDirectors.length
  const boardTrusteesCount = boardTrustees.length
  
  return (
    <div className="space-y-6">
      {/* Header and Add Member Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-2">Manage secretariat, board of directors, and board of trustees members</p>
        </div>
        
        {/* Add Member Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <Button 
            className="bg-[var(--amwik-purple)] hover:bg-purple-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
              <Plus className="h-4 w-4 mr-2" /> Add Team Member
            </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Add a new member to the secretariat, board of directors, or board of trustees.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {error && <p className="text-sm text-red-600 border border-red-200 p-2 rounded">{error}</p>}
              {success && isAddDialogOpen === false && <p className="text-sm text-green-800 border border-green-200 bg-green-50 p-3 rounded-lg">{success}</p>}
              
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="name">Full Name *</Label><Input id="name" placeholder="Enter full name" value={newMember.name} onChange={handleInputChange} /></div>
                <div><Label htmlFor="position">Position *</Label><Input id="position" placeholder="Enter position" value={newMember.position} onChange={handleInputChange} /></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" placeholder="Enter email" value={newMember.email} onChange={handleInputChange} /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" placeholder="Enter phone number" value={newMember.phone} onChange={handleInputChange} /></div>
              </div>
              
              {/* Team Select Dropdown - Now includes Board of Trustees */}
              <div>
                <Label htmlFor="team">Team *</Label>
                <Select value={newMember.team} onValueChange={(val) => handleSelectChange('team', val)}>
                  <SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secretariat">Secretariat</SelectItem>
                    <SelectItem value="board_directors">Board of Directors</SelectItem>
                    <SelectItem value="board_trustees">Board of Trustees</SelectItem> {/* New item */}
                  </SelectContent>
                </Select>
              </div>

              <div><Label htmlFor="bio">Biography</Label><Textarea id="bio" placeholder="Enter member biography" rows={3} value={newMember.bio} onChange={handleInputChange} /></div>
              
              <div>
                <Label htmlFor="expertiseInput">Expertise (comma-separated)</Label>
                <Input id="expertiseInput" placeholder="e.g., Leadership, Media Advocacy" value={newMember.expertiseInput} onChange={handleInputChange} />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-[var(--amwik-purple)] hover:bg-purple-700"
                  onClick={handleAddMember}
                  disabled={loading}
                >Add Member</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Success Alert (outside of dialog) */}
      {success && isAddDialogOpen === false && (
        <p className="text-sm text-green-800 border border-green-200 bg-green-50 p-3 rounded-lg flex items-center">
            <User className="h-4 w-4 mr-2" /> {success}
        </p>
      )}

      {/* Stats Cards - Updated to reflect three teams */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secretariat Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{secretariatCount}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Board of Directors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{boardDirectorsCount}</div></CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Board of Trustees</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{boardTrusteesCount}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Team</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalMembers}</div></CardContent>
        </Card>
      </div>

      {/* Team Management Tabs - Updated for three tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TeamType)} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-fit grid-cols-3"> {/* Changed to grid-cols-3 */}
            <TabsTrigger value="secretariat">Secretariat Team</TabsTrigger>
            <TabsTrigger value="board_directors">Board of Directors</TabsTrigger>
            <TabsTrigger value="board_trustees">Board of Trustees</TabsTrigger> {/* New Tab */}
          </TabsList>

          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Search members in ${teamMap[activeTab]}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="secretariat">
          {renderMemberTable(secretariatMembers, "secretariat")}
        </TabsContent>

        <TabsContent value="board_directors">
          {renderMemberTable(boardDirectors, "board_directors")}
        </TabsContent>
        
        {/* New TabsContent */}
        <TabsContent value="board_trustees">
          {renderMemberTable(boardTrustees, "board_trustees")}
        </TabsContent>
      </Tabs>

      {/* Member Details Dialog (View Details) */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMember.name}</DialogTitle>
              <DialogDescription>{selectedMember.position} ({teamMap[selectedMember.team]})</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm"><Mail className="h-4 w-4 mr-2 text-gray-400" />{selectedMember.email}</div>
                  <div className="flex items-center text-sm"><Phone className="h-4 w-4 mr-2 text-gray-400" />{selectedMember.phone}</div>
                </div>
              </div>
              <div><h4 className="font-medium mb-2">Biography</h4><p className="text-sm text-gray-600">{selectedMember.bio}</p></div>
              <div>
                <h4 className="font-medium mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedMember.expertise || []).map((skill: string, index: number) => (<Badge key={index} variant="outline">{skill}</Badge>))}
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedMember(null)}>Close</Button>
                <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700" disabled>Edit Member (TODO)</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}