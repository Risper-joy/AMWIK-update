"use client"

import { useState } from "react"
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
} from "lucide-react"

const memberApplications = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    email: "sarah.wanjiku@email.com",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    membershipType: "Full Membership",
    applicationDate: "2024-01-15",
    status: "Pending Review",
    organization: "Daily Nation",
    position: "Senior Reporter",
    experience: "5 years",
    education: "Bachelor's in Journalism - University of Nairobi",
    motivation:
      "I want to join AMWIK to connect with other women in media and contribute to advancing women's rights in journalism. I believe in the power of media to create positive change.",
    references: [
      { name: "Jane Doe", position: "Editor-in-Chief", organization: "Daily Nation", email: "jane.doe@nation.co.ke" },
      { name: "Mary Smith", position: "News Director", organization: "KTN", email: "mary.smith@ktn.co.ke" },
    ],
    portfolio: "https://sarahwanjiku.portfolio.com",
    socialMedia: {
      twitter: "@sarahwanjiku",
      linkedin: "linkedin.com/in/sarahwanjiku",
    },
  },
  {
    id: 2,
    name: "Grace Mutindi",
    email: "grace.mutindi@email.com",
    phone: "+254 723 456 789",
    location: "Mombasa, Kenya",
    membershipType: "Associate Membership",
    applicationDate: "2024-01-12",
    status: "Under Review",
    organization: "KTN News",
    position: "Correspondent",
    experience: "2 years",
    education: "Diploma in Mass Communication - Kenya Institute of Mass Communication",
    motivation:
      "As a young journalist, I see AMWIK as a platform to learn from experienced women in media and grow my career while advocating for gender equality in newsrooms.",
    references: [
      { name: "Alice Johnson", position: "Bureau Chief", organization: "KTN News", email: "alice.johnson@ktn.co.ke" },
    ],
    portfolio: "https://gracemutindi.journoportfolio.com",
    socialMedia: {
      twitter: "@gracemutindi",
      linkedin: "linkedin.com/in/gracemutindi",
    },
  },
  {
    id: 3,
    name: "Mary Kiprotich",
    email: "mary.kiprotich@email.com",
    phone: "+254 734 567 890",
    location: "Eldoret, Kenya",
    membershipType: "Full Membership",
    applicationDate: "2024-01-10",
    status: "Approved",
    organization: "The Standard",
    position: "Investigative Reporter",
    experience: "8 years",
    education: "Master's in Journalism - Moi University",
    motivation:
      "I want to be part of AMWIK's mission to empower women in media. My experience in investigative journalism has shown me the importance of having strong networks and support systems.",
    references: [
      { name: "Peter Kimani", position: "Editor", organization: "The Standard", email: "peter.kimani@standard.co.ke" },
      {
        name: "Susan Wanjiru",
        position: "Managing Editor",
        organization: "The Star",
        email: "susan.wanjiru@star.co.ke",
      },
    ],
    portfolio: "https://marykiprotich.medium.com",
    socialMedia: {
      twitter: "@marykiprotich",
      linkedin: "linkedin.com/in/marykiprotich",
    },
  },
]

export default function MemberApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [membershipTypeFilter, setMembershipTypeFilter] = useState("All")
  const [dateFilter, setDateFilter] = useState("All")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

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

  const filteredApplications = memberApplications.filter((application) => {
    const matchesSearch =
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || application.status === statusFilter
    const matchesMembershipType = membershipTypeFilter === "All" || application.membershipType === membershipTypeFilter

    let matchesDate = true
    if (dateFilter !== "All") {
      const applicationDate = new Date(application.applicationDate)
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

  const handleApproveApplication = (applicationId: number) => {
    // Handle approval logic
    console.log("Approving application:", applicationId)
  }

  const handleRejectApplication = (applicationId: number) => {
    // Handle rejection logic
    console.log("Rejecting application:", applicationId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/members">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Members
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Membership Applications</h1>
            <p className="text-gray-600 mt-2">Review and manage new membership applications</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberApplications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberApplications.filter((app) => app.status === "Pending Review").length}
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
              {memberApplications.filter((app) => app.status === "Under Review").length}
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
              {memberApplications.filter((app) => app.status === "Approved").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
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
                <SelectItem value="Corporate Membership">Corporate Membership</SelectItem>
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
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{application.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {application.location}
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
                        {application.position}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getMembershipTypeColor(application.membershipType)}>
                      {application.membershipType}
                    </Badge>
                  </TableCell>
                  <TableCell>{application.experience}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {new Date(application.applicationDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Application Details - {application.name}</DialogTitle>
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
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                        {selectedApplication.location}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Membership Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium">Type: </span>
                                        <Badge className={getMembershipTypeColor(selectedApplication.membershipType)}>
                                          {selectedApplication.membershipType}
                                        </Badge>
                                      </div>
                                      <div>
                                        <span className="font-medium">Application Date: </span>
                                        {new Date(selectedApplication.applicationDate).toLocaleDateString()}
                                      </div>
                                      <div>
                                        <span className="font-medium">Status: </span>
                                        <Badge className={getStatusColor(selectedApplication.status)}>
                                          {selectedApplication.status}
                                        </Badge>
                                      </div>
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
                                        {selectedApplication.position}
                                      </div>
                                      <div>
                                        <span className="font-medium">Experience: </span>
                                        {selectedApplication.experience}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Education</h4>
                                    <div className="flex items-center text-sm">
                                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                                      {selectedApplication.education}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Portfolio & Social Media</h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium">Portfolio: </span>
                                        <a
                                          href={selectedApplication.portfolio}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:underline"
                                        >
                                          {selectedApplication.portfolio}
                                        </a>
                                      </div>
                                      <div>
                                        <span className="font-medium">Twitter: </span>
                                        {selectedApplication.socialMedia.twitter}
                                      </div>
                                      <div>
                                        <span className="font-medium">LinkedIn: </span>
                                        {selectedApplication.socialMedia.linkedin}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="motivation" className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Motivation for Joining AMWIK</h4>
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    {selectedApplication.motivation}
                                  </p>
                                </div>
                              </TabsContent>

                              <TabsContent value="references" className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Professional References</h4>
                                  <div className="space-y-4">
                                    {selectedApplication.references.map((reference: any, index: number) => (
                                      <div key={index} className="border rounded-lg p-4">
                                        <div className="font-medium">{reference.name}</div>
                                        <div className="text-sm text-gray-600">{reference.position}</div>
                                        <div className="text-sm text-gray-600">{reference.organization}</div>
                                        <div className="text-sm text-gray-600 flex items-center mt-1">
                                          <Mail className="h-3 w-3 mr-1" />
                                          {reference.email}
                                        </div>
                                      </div>
                                    ))}
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
                                  className="text-red-600 hover:text-red-700 bg-transparent"
                                  onClick={() => handleRejectApplication(selectedApplication.id)}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveApplication(selectedApplication.id)}
                                >
                                  <Check className="h-4 w-4 mr-2" />
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
                            className="text-green-600 hover:text-green-700 bg-transparent"
                            onClick={() => handleApproveApplication(application.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                            onClick={() => handleRejectApplication(application.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
