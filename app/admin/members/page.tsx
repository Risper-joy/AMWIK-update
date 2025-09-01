"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, ArrowLeft, Users, Edit, Trash2, Eye, MoreHorizontal, Calendar, Mail, Phone, RefreshCw } from "lucide-react"

// Define the Member interface to match MongoDB schema
interface Member {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth?: string
  nationality?: string
  id_number?: string
  current_position: string
  organization: string
  years_experience?: string
  media_type?: string
  specialization?: string
  education?: string
  membership_type: string
  interests?: string[]
  motivation: string
  referee1_name?: string
  referee1_contact?: string
  referee2_name?: string
  referee2_contact?: string
  status: string
  terms_accepted: boolean
  application_date: string
  created_at: string
  updated_at: string
}

export default function AdminMembersPage() {
  const [newMembers, setNewMembers] = useState<Member[]>([])
  const [renewalMembers] = useState([]) // Keep this for future implementation
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [actionLoading, setActionLoading] = useState<string>("")
  const [newMemberSearch, setNewMemberSearch] = useState("")
  const [renewalMemberSearch, setRenewalMemberSearch] = useState("")
  const [newMemberStatus, setNewMemberStatus] = useState("All")
  const [renewalMemberStatus, setRenewalMemberStatus] = useState("All")

  // Fetch new members from MongoDB API
  const fetchNewMembers = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch('/api/members', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch members')
      }

      const data = await response.json()
      setNewMembers(data || [])
    } catch (err: any) {
      console.error('Error fetching members:', err)
      setError(err.message || 'Failed to fetch members')
    } finally {
      setLoading(false)
    }
  }

  // Load members on component mount
  useEffect(() => {
    fetchNewMembers()
  }, [])

  // Update member status
  const updateMemberStatus = async (memberId: string, newStatus: string) => {
    try {
      setActionLoading(memberId)
      
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update member status')
      }

      const updatedMember = await response.json()

      // Update local state
      setNewMembers(prev => 
        prev.map(member => 
          member._id === memberId 
            ? { ...member, status: newStatus }
            : member
        )
      )
    } catch (err: any) {
      console.error('Error updating member status:', err)
      setError(err.message || 'Failed to update member status')
    } finally {
      setActionLoading("")
    }
  }

  // Delete member
  const deleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this member application?')) {
      return
    }

    try {
      setActionLoading(memberId)
      
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete member')
      }

      // Update local state
      setNewMembers(prev => prev.filter(member => member._id !== memberId))
    } catch (err: any) {
      console.error('Error deleting member:', err)
      setError(err.message || 'Failed to delete member')
    } finally {
      setActionLoading("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending Review":
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
      case "Expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case "Full Membership":
        return "bg-purple-100 text-purple-800"
      case "Associate Membership":
        return "bg-blue-100 text-blue-800"
      case "Corporate Membership":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredNewMembers = newMembers.filter((member) => {
    const memberName = `${member.first_name} ${member.last_name}`.toLowerCase()
    const matchesSearch =
      memberName.includes(newMemberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(newMemberSearch.toLowerCase())
    const matchesStatus = newMemberStatus === "All" || member.status === newMemberStatus
    return matchesSearch && matchesStatus
  })

  const filteredRenewalMembers = renewalMembers.filter((member: any) => {
    const matchesSearch =
      member.name.toLowerCase().includes(renewalMemberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(renewalMemberSearch.toLowerCase())
    const matchesStatus = renewalMemberStatus === "All" || member.status === renewalMemberStatus
    return matchesSearch && matchesStatus
  })

  // Get statistics
  const totalMembers = newMembers.length + renewalMembers.length
  const pendingMembers = newMembers.filter(m => m.status === "Pending Review" || m.status === "Under Review").length
  const approvedMembers = newMembers.filter(m => m.status === "Approved").length
  const activeRenewals = renewalMembers.filter((m: any) => m.status === "Active").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[var(--amwik-purple)] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Members Management</h1>
            </div>
            <Button 
              onClick={fetchNewMembers} 
              variant="outline" 
              size="sm" 
              className="text-white border-white hover:bg-purple-700"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newMembers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedMembers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingMembers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Members Tabs */}
        <Tabs defaultValue="new-members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-members">New Member Applications</TabsTrigger>
            <TabsTrigger value="renewals">Membership Renewals</TabsTrigger>
          </TabsList>

          {/* New Members Tab */}
          <TabsContent value="new-members" className="space-y-6">
            {/* Filters for New Members */}
            <Card>
              <CardHeader>
                <CardTitle>Filter New Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search members..."
                      value={newMemberSearch}
                      onChange={(e) => setNewMemberSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={newMemberStatus} onValueChange={setNewMemberStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Pending Review">Pending Review</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* New Members Table */}
            <Card>
              <CardHeader>
                <CardTitle>New Member Applications ({filteredNewMembers.length})</CardTitle>
                <CardDescription>Review and manage new membership applications</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
                    <span className="ml-2">Loading members...</span>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Membership Type</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNewMembers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            No members found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredNewMembers.map((member) => (
                          <TableRow key={member._id}>
                            <TableCell className="font-medium">
                              {member.first_name} {member.last_name}
                            </TableCell>
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
                            <TableCell>{member.organization}</TableCell>
                            <TableCell>
                              <Badge className={getMembershipTypeColor(member.membership_type)}>
                                {member.membership_type}
                              </Badge>
                            </TableCell>
                            <TableCell>{member.years_experience || 'N/A'}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                {member.application_date ? new Date(member.application_date).toLocaleDateString() : 'N/A'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(member.status || 'Pending Review')}>
                                {member.status || 'Pending Review'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0"
                                    disabled={actionLoading === member._id}
                                  >
                                    {actionLoading === member._id ? (
                                      <RefreshCw className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <MoreHorizontal className="h-4 w-4" />
                                    )}
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    // TODO: Implement view application modal
                                    alert('View application functionality to be implemented')
                                  }}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Application
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateMemberStatus(member._id, 'Under Review')}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Mark Under Review
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateMemberStatus(member._id, 'Approved')}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => updateMemberStatus(member._id, 'Rejected')}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => deleteMember(member._id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Renewals Tab */}
          <TabsContent value="renewals" className="space-y-6">
            {/* Filters for Renewals */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Membership Renewals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search members..."
                      value={renewalMemberSearch}
                      onChange={(e) => setRenewalMemberSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={renewalMemberStatus} onValueChange={setRenewalMemberStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Renewals Table */}
            <Card>
              <CardHeader>
                <CardTitle>Membership Renewals ({filteredRenewalMembers.length})</CardTitle>
                <CardDescription>Manage existing member renewals and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Renewal management functionality coming soon.</p>
                  <p className="text-sm mt-2">This will be implemented once you have existing members to manage.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}