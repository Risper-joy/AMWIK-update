"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  ArrowLeft,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Check,
  X,
  Eye,
  RefreshCw,
  User,
  Building,
  Clock,
} from "lucide-react"

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

export default function MemberApplicationsPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [actionLoading, setActionLoading] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [membershipTypeFilter, setMembershipTypeFilter] = useState("All")
  const [dateFilter, setDateFilter] = useState("All")
  const [selectedApplication, setSelectedApplication] = useState<Member | null>(null)

  // Fetch members from MongoDB API
  const fetchMembers = async () => {
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
      setMembers(data || [])
    } catch (err: any) {
      console.error('Error fetching members:', err)
      setError(err.message || 'Failed to fetch members')
    } finally {
      setLoading(false)
    }
  }

  // Load members on component mount
  useEffect(() => {
    fetchMembers()
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

      // Update local state
      setMembers(prev => 
        prev.map(member => 
          member._id === memberId 
            ? { ...member, status: newStatus }
            : member
        )
      )

      // Update selected application if it's currently viewed
      if (selectedApplication && selectedApplication._id === memberId) {
        setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null)
      }

      setError("")
    } catch (err: any) {
      console.error('Error updating member status:', err)
      setError(err.message || 'Failed to update member status')
    } finally {
      setActionLoading("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
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

  const filteredApplications = members.filter((member) => {
    const memberName = `${member.first_name} ${member.last_name}`.toLowerCase()
    const matchesSearch =
      memberName.includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || member.status === statusFilter
    const matchesMembershipType = membershipTypeFilter === "All" || member.membership_type === membershipTypeFilter

    let matchesDate = true
    if (dateFilter !== "All") {
      const applicationDate = new Date(member.application_date)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - applicationDate.getTime()) / (1000 * 60 * 60 * 24))

      switch (dateFilter) {
        case "Last 7 days":
          matchesDate = daysDiff <= 7
          break
        case "Last 30 days":
          matchesDate = daysDiff <= 30
          break
        case "Last 90 days":
          matchesDate = daysDiff <= 90
          break
      }
    }

    return matchesSearch && matchesStatus && matchesMembershipType && matchesDate
  })

  const handleApproveApplication = async (memberId: string) => {
    await updateMemberStatus(memberId, 'Approved')
  }

  const handleRejectApplication = async (memberId: string) => {
    await updateMemberStatus(memberId, 'Rejected')
  }

  const handleSetUnderReview = async (memberId: string) => {
    await updateMemberStatus(memberId, 'Under Review')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[var(--amwik-purple)] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/members">
                <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Members
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Membership Applications</h1>
                <p className="text-purple-100 text-sm">Review and manage new membership applications</p>
              </div>
            </div>
            <Button 
              onClick={fetchMembers} 
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
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {members.filter((app) => app.status === "Pending Review").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {members.filter((app) => app.status === "Under Review").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {members.filter((app) => app.status === "Approved").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
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
              <Select value={membershipTypeFilter} onValueChange={setMembershipTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by membership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Full Membership">Full Membership</SelectItem>
                  <SelectItem value="Associate Membership">Associate Membership</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Time</SelectItem>
                  <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                  <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
            <CardDescription>Review membership applications and take action</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-2">Loading applications...</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
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
                  {filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No applications found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((application) => (
                      <TableRow key={application._id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{application.first_name} {application.last_name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {application.nationality || 'N/A'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {application.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {application.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{application.organization}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Briefcase className="h-3 w-3 mr-1" />
                              {application.current_position}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getMembershipTypeColor(application.membership_type)}>
                            {application.membership_type}
                          </Badge>
                        </TableCell>
                        <TableCell>{application.years_experience || 'N/A'}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {new Date(application.application_date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setSelectedApplication(application)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                    Application Details - {application.first_name} {application.last_name}
                                  </DialogTitle>
                                  <DialogDescription>Review the complete membership application</DialogDescription>
                                </DialogHeader>

                                {selectedApplication && (
                                  <Tabs defaultValue="personal" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4">
                                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                      <TabsTrigger value="professional">Professional</TabsTrigger>
                                      <TabsTrigger value="motivation">Motivation</TabsTrigger>
                                      <TabsTrigger value="references">References</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="personal" className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-medium mb-2">Contact Information</h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex items-center">
                                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                              {selectedApplication.email}
                                            </div>
                                            <div className="flex items-center">
                                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                              {selectedApplication.phone}
                                            </div>
                                            {selectedApplication.nationality && (
                                              <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                                {selectedApplication.nationality}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">Membership Details</h4>
                                          <div className="space-y-2 text-sm">
                                            <div>
                                              <span className="font-medium">Type: </span>
                                              <Badge className={getMembershipTypeColor(selectedApplication.membership_type)}>
                                                {selectedApplication.membership_type}
                                              </Badge>
                                            </div>
                                            <div>
                                              <span className="font-medium">Application Date: </span>
                                              {new Date(selectedApplication.application_date).toLocaleDateString()}
                                            </div>
                                            <div>
                                              <span className="font-medium">Status: </span>
                                              <Badge className={getStatusColor(selectedApplication.status)}>
                                                {selectedApplication.status}
                                              </Badge>
                                            </div>
                                            {selectedApplication.date_of_birth && (
                                              <div>
                                                <span className="font-medium">Date of Birth: </span>
                                                {new Date(selectedApplication.date_of_birth).toLocaleDateString()}
                                              </div>
                                            )}
                                            {selectedApplication.id_number && (
                                              <div>
                                                <span className="font-medium">ID Number: </span>
                                                {selectedApplication.id_number}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </TabsContent>

                                    <TabsContent value="professional" className="space-y-4">
                                      <div className="grid grid-cols-1 gap-4">
                                        <div>
                                          <h4 className="font-medium mb-2">Professional Background</h4>
                                          <div className="space-y-2 text-sm">
                                            <div>
                                              <span className="font-medium">Organization: </span>
                                              {selectedApplication.organization}
                                            </div>
                                            <div>
                                              <span className="font-medium">Position: </span>
                                              {selectedApplication.current_position}
                                            </div>
                                            {selectedApplication.years_experience && (
                                              <div>
                                                <span className="font-medium">Experience: </span>
                                                {selectedApplication.years_experience} years
                                              </div>
                                            )}
                                            {selectedApplication.media_type && (
                                              <div>
                                                <span className="font-medium">Media Type: </span>
                                                {selectedApplication.media_type}
                                              </div>
                                            )}
                                            {selectedApplication.specialization && (
                                              <div>
                                                <span className="font-medium">Specialization: </span>
                                                {selectedApplication.specialization}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        {selectedApplication.education && (
                                          <div>
                                            <h4 className="font-medium mb-2">Education</h4>
                                            <div className="flex items-start text-sm">
                                              <GraduationCap className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                                              {selectedApplication.education}
                                            </div>
                                          </div>
                                        )}
                                        {selectedApplication.interests && selectedApplication.interests.length > 0 && (
                                          <div>
                                            <h4 className="font-medium mb-2">Areas of Interest</h4>
                                            <div className="flex flex-wrap gap-2">
                                              {selectedApplication.interests.map((interest, index) => (
                                                <Badge key={index} variant="secondary">
                                                  {interest}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </TabsContent>

                                    <TabsContent value="motivation" className="space-y-4">
                                      <div>
                                        <h4 className="font-medium mb-2">Motivation for Joining AMWIK</h4>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                          {selectedApplication.motivation}
                                        </p>
                                      </div>
                                    </TabsContent>

                                    <TabsContent value="references" className="space-y-4">
                                      <div>
                                        <h4 className="font-medium mb-2">Professional References</h4>
                                        <div className="space-y-4">
                                          {selectedApplication.referee1_name && (
                                            <div className="border rounded-lg p-4">
                                              <div className="font-medium">{selectedApplication.referee1_name}</div>
                                              {selectedApplication.referee1_contact && (
                                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                                  <Mail className="h-3 w-3 mr-1" />
                                                  {selectedApplication.referee1_contact}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                          {selectedApplication.referee2_name && (
                                            <div className="border rounded-lg p-4">
                                              <div className="font-medium">{selectedApplication.referee2_name}</div>
                                              {selectedApplication.referee2_contact && (
                                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                                  <Mail className="h-3 w-3 mr-1" />
                                                  {selectedApplication.referee2_contact}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                          {!selectedApplication.referee1_name && !selectedApplication.referee2_name && (
                                            <p className="text-sm text-gray-500">No references provided</p>
                                          )}
                                        </div>
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                )}

                                <div className="flex justify-end space-x-2 pt-4 border-t">
                                  {selectedApplication?.status === "Pending Review" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        onClick={() => handleSetUnderReview(selectedApplication._id)}
                                        disabled={actionLoading === selectedApplication._id}
                                      >
                                        {actionLoading === selectedApplication._id ? (
                                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                          <Eye className="h-4 w-4 mr-2" />
                                        )}
                                        Set Under Review
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => handleRejectApplication(selectedApplication._id)}
                                        disabled={actionLoading === selectedApplication._id}
                                      >
                                        {actionLoading === selectedApplication._id ? (
                                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                          <X className="h-4 w-4 mr-2" />
                                        )}
                                        Reject
                                      </Button>
                                      <Button
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApproveApplication(selectedApplication._id)}
                                        disabled={actionLoading === selectedApplication._id}
                                      >
                                        {actionLoading === selectedApplication._id ? (
                                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                          <Check className="h-4 w-4 mr-2" />
                                        )}
                                        Approve
                                      </Button>
                                    </>
                                  )}
                                  {selectedApplication?.status === "Under Review" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => handleRejectApplication(selectedApplication._id)}
                                        disabled={actionLoading === selectedApplication._id}
                                      >
                                        {actionLoading === selectedApplication._id ? (
                                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                          <X className="h-4 w-4 mr-2" />
                                        )}
                                        Reject
                                      </Button>
                                      <Button
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApproveApplication(selectedApplication._id)}
                                        disabled={actionLoading === selectedApplication._id}
                                      >
                                        {actionLoading === selectedApplication._id ? (
                                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                          <Check className="h-4 w-4 mr-2" />
                                        )}
                                        Approve
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            {application.status === "Pending Review" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-700"
                                  onClick={() => handleSetUnderReview(application._id)}
                                  disabled={actionLoading === application._id}
                                >
                                  {actionLoading === application._id ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                  onClick={() => handleApproveApplication(application._id)}
                                  disabled={actionLoading === application._id}
                                >
                                  {actionLoading === application._id ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleRejectApplication(application._id)}
                                  disabled={actionLoading === application._id}
                                >
                                  {actionLoading === application._id ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <X className="h-4 w-4" />
                                  )}
                                </Button>
                              </>
                            )}

                            {application.status === "Under Review" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                  onClick={() => handleApproveApplication(application._id)}
                                  disabled={actionLoading === application._id}
                                >
                                  {actionLoading === application._id ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleRejectApplication(application._id)}
                                  disabled={actionLoading === application._id}
                                >
                                  {actionLoading === application._id ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <X className="h-4 w-4" />
                                  )}
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

























