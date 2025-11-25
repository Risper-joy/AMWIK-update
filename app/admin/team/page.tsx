"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, RefreshCw, Upload, Loader2, X } from "lucide-react"

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

interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
}

const initialMemberState: TeamMember = {
  name: "",
  position: "",
  team: 'secretariat',
  image: "",
  bio: "",
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
  expertise: [],
  joinDate: new Date().toISOString().split('T')[0],
  status: 'active'
}

const teamMap: Record<TeamType, string> = {
  secretariat: "Secretariat Team",
  board_directors: "Board of Directors",
  board_trustees: "Board of Trustees",
}

function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<TeamType>("secretariat")
  
  // Dialog States
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  
  const [currentMember, setCurrentMember] = useState<TeamMember>(initialMemberState)
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [expertiseInput, setExpertiseInput] = useState("")

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/team-members")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setTeamMembers(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  const handleImageUpload = async (file: File) => {
    if (!file) return
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'team-members')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (result.success && result.data) {
        setUploadedImage(result.data)
        setCurrentMember(prev => ({ ...prev, image: result.data.url }))
        setSuccess("Image uploaded!")
      } else {
        setError(result.error || "Upload failed")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const removeImage = async () => {
    if (!uploadedImage) return
    try {
      await fetch(`/api/upload?publicId=${uploadedImage.publicId}`, { method: 'DELETE' })
      setUploadedImage(null)
      setCurrentMember(prev => ({ ...prev, image: "" }))
    } catch (err: any) {
      setError("Error removing image")
    }
  }

  const handleAddMember = async () => {
    if (!currentMember.name || !currentMember.email || !currentMember.position || !currentMember.bio) {
      setError("Fill all required fields")
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch("/api/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentMember,
          expertise: expertiseInput.split(',').map(e => e.trim()).filter(e => e)
        }),
      })

      if (!response.ok) throw new Error("Failed to add")
      setSuccess("Member added!")
      handleCloseForm()
      await fetchMembers()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateMember = async () => {
    if (!currentMember._id) return
    if (!currentMember.name || !currentMember.email || !currentMember.position || !currentMember.bio) {
      setError("Fill all required fields")
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch(`/api/team-members?id=${currentMember._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentMember,
          expertise: expertiseInput.split(',').map(e => e.trim()).filter(e => e)
        }),
      })

      if (!response.ok) throw new Error("Failed to update")
      setSuccess("Member updated!")
      handleCloseForm()
      await fetchMembers()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return
    try {
      const response = await fetch(`/api/team-members?id=${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      setSuccess("Member deleted!")
      await fetchMembers()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Helper to reset form state when closing dialogs
  const handleCloseForm = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setCurrentMember(initialMemberState)
    setUploadedImage(null)
    setExpertiseInput("")
    setError(null)
  }

  const openEditDialog = (member: TeamMember) => {
    setCurrentMember(member)
    setExpertiseInput(member.expertise.join(', '))
    if (member.image) {
      setUploadedImage({
        url: member.image,
        publicId: "",
        width: 0,
        height: 0,
      })
    }
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (member: TeamMember) => {
    setCurrentMember(member)
    setIsViewDialogOpen(true)
  }

  const secretariatMembers = teamMembers.filter(m => m.team === 'secretariat')
  const boardDirectors = teamMembers.filter(m => m.team === 'board_directors')
  const boardTrustees = teamMembers.filter(m => m.team === 'board_trustees')

  const getMembersForActiveTab = (): TeamMember[] => {
    switch (activeTab) {
      case 'secretariat': return secretariatMembers
      case 'board_directors': return boardDirectors
      case 'board_trustees': return boardTrustees
      default: return []
    }
  }

  const currentMembers = getMembersForActiveTab()
  const filteredMembers = currentMembers.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderMemberTable = (members: TeamMember[], teamKey: TeamType) => (
    <Card>
      <CardHeader>
        <CardTitle>{teamMap[teamKey]}</CardTitle>
        <CardDescription>{members.length} members</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8"><RefreshCw className="h-4 w-4 animate-spin mx-auto" /></div>
        ) : filteredMembers.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No members</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge className={member.status === 'active' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openViewDialog(member)}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(member)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => member._id && handleDeleteMember(member._id, member.name)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Manage team members</p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => {
            setCurrentMember(initialMemberState)
            setUploadedImage(null)
            setExpertiseInput("")
            setError(null)
            setIsAddDialogOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Member
        </Button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Secretariat</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{secretariatMembers.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Board Directors</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{boardDirectors.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Board Trustees</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{boardTrustees.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{teamMembers.length}</div></CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TeamType)}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="secretariat">Secretariat</TabsTrigger>
            <TabsTrigger value="board_directors">Board Directors</TabsTrigger>
            <TabsTrigger value="board_trustees">Board Trustees</TabsTrigger>
          </TabsList>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="secretariat">{renderMemberTable(secretariatMembers, "secretariat")}</TabsContent>
        <TabsContent value="board_directors">{renderMemberTable(boardDirectors, "board_directors")}</TabsContent>
        <TabsContent value="board_trustees">{renderMemberTable(boardTrustees, "board_trustees")}</TabsContent>
      </Tabs>

      {/* FIX: The Dialogs are now direct children of the main component 
        instead of being defined as nested functions.
      */}
      
      {/* ADD / EDIT FORM DIALOG */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => { if (!open) handleCloseForm() }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
          </DialogHeader>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
              {error}
            </div>
          )}

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={currentMember.name}
                  onChange={(e) => setCurrentMember(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label>Position *</Label>
                <Input
                  value={currentMember.position}
                  onChange={(e) => setCurrentMember(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="Position"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={currentMember.email}
                  onChange={(e) => setCurrentMember(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={currentMember.phone}
                  onChange={(e) => setCurrentMember(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Team *</Label>
                <Select value={currentMember.team} onValueChange={(value) => setCurrentMember(prev => ({ ...prev, team: value as TeamType }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secretariat">Secretariat</SelectItem>
                    <SelectItem value="board_directors">Board of Directors</SelectItem>
                    <SelectItem value="board_trustees">Board of Trustees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={currentMember.status || 'active'} onValueChange={(value) => setCurrentMember(prev => ({ ...prev, status: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Biography *</Label>
              <Textarea
                value={currentMember.bio}
                onChange={(e) => setCurrentMember(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Biography"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={currentMember.linkedin || ""}
                  onChange={(e) => setCurrentMember(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <Label>Twitter</Label>
                <Input
                  value={currentMember.twitter || ""}
                  onChange={(e) => setCurrentMember(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>

            <div>
              <Label>Expertise (comma-separated)</Label>
              <Input
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                placeholder="Leadership, Media Advocacy, Training"
              />
            </div>

            <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
              <Label className="text-base font-semibold mb-3 block">Profile Image</Label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                }}
                className="hidden"
                disabled={isUploading}
              />

              {uploadedImage?.url ? (
                <div className="space-y-3">
                  <div className="relative inline-block">
                    <img 
                      src={uploadedImage.url} 
                      alt="Profile" 
                      className="w-40 h-40 rounded-lg object-cover border-4 border-purple-300"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    type="button"
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center cursor-pointer hover:bg-white" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-700 font-medium mb-2">Click to upload profile image</p>
                  <p className="text-xs text-gray-500 mb-4">PNG, JPG up to 5MB</p>
                  <Button
                    variant="outline"
                    disabled={isUploading}
                    type="button"
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handleCloseForm}
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={isEditDialogOpen ? handleUpdateMember : handleAddMember}
                disabled={isSaving || isUploading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isEditDialogOpen ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  isEditDialogOpen ? "Update Member" : "Add Member"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIEW DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentMember.name}</DialogTitle>
            <DialogDescription>{currentMember.position}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {currentMember.image && (
              <img 
                src={currentMember.image} 
                alt={currentMember.name} 
                className="w-48 h-48 rounded-lg object-cover"
              />
            )}

            <div>
              <h4 className="font-semibold text-sm">Email</h4>
              <p className="text-sm text-gray-600">{currentMember.email}</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Phone</h4>
              <p className="text-sm text-gray-600">{currentMember.phone || "N/A"}</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Biography</h4>
              <p className="text-sm text-gray-600">{currentMember.bio}</p>
            </div>

            {currentMember.expertise.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {currentMember.expertise.map((skill, i) => (
                    <Badge key={i}>{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              <Button onClick={() => { 
                setIsViewDialogOpen(false); 
                openEditDialog(currentMember); 
              }}>
                Edit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminTeamPage