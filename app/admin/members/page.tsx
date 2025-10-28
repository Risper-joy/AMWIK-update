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
import useRenewals from "@/hooks/useRenewals"

// Interface for new member applications (unchanged)
interface Member {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  organization: string
  membership_type: string
  years_experience?: string
  status: string
  application_date: string
}

export default function AdminMembersPage() {
  const [newMembers, setNewMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [actionLoading, setActionLoading] = useState<string>("")
  const [newMemberSearch, setNewMemberSearch] = useState("")
  const [renewalMemberSearch, setRenewalMemberSearch] = useState("")
  const [newMemberStatus, setNewMemberStatus] = useState("All")
  const [renewalMemberStatus, setRenewalMemberStatus] = useState("All")

  // Hook for renewals
  const { renewals, loading: renewalsLoading, error: renewalsError, refetch: refetchRenewals } = useRenewals()

  // Fetch new members (existing logic)
  const fetchNewMembers = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("/api/members")
      if (!response.ok) throw new Error("Failed to fetch members")
      const data = await response.json()
      setNewMembers(data || [])
    } catch (err: any) {
      console.error("Error fetching members:", err)
      setError(err.message || "Failed to fetch members")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewMembers()
  }, [])

  // Update member status
  const updateMemberStatus = async (memberId: string, newStatus: string) => {
    try {
      setActionLoading(memberId)
      const res = await fetch(`/api/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update member status")
      setNewMembers(prev => prev.map(m => (m._id === memberId ? { ...m, status: newStatus } : m)))
    } catch (err: any) {
      setError(err.message || "Failed to update member status")
    } finally {
      setActionLoading("")
    }
  }

  // Delete member
  const deleteMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to delete this member application?")) return
    try {
      setActionLoading(memberId)
      const res = await fetch(`/api/members/${memberId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete member")
      setNewMembers(prev => prev.filter(m => m._id !== memberId))
    } catch (err: any) {
      setError(err.message || "Failed to delete member")
    } finally {
      setActionLoading("")
    }
  }

  // Helpers
  const getStatusColor = (status: string) =>
    status === "Approved" || status === "Active"
      ? "bg-green-100 text-green-800"
      : status === "Pending Review" || status === "Under Review"
      ? "bg-yellow-100 text-yellow-800"
      : status === "Rejected" || status === "Expired"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800"

  const getMembershipTypeColor = (type: string) =>
    type === "Full Membership"
      ? "bg-purple-100 text-purple-800"
      : type === "Associate Membership"
      ? "bg-blue-100 text-blue-800"
      : type === "Corporate Membership"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800"

  // Filters
  const filteredNewMembers = newMembers.filter((m) => {
    const name = `${m.first_name} ${m.last_name}`.toLowerCase()
    const matchesSearch = name.includes(newMemberSearch.toLowerCase()) || m.email.toLowerCase().includes(newMemberSearch.toLowerCase())
    const matchesStatus = newMemberStatus === "All" || m.status === newMemberStatus
    return matchesSearch && matchesStatus
  })

  const filteredRenewalMembers = renewals.filter((r) => {
    const matchesSearch =
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(renewalMemberSearch.toLowerCase()) ||
      r.email?.toLowerCase().includes(renewalMemberSearch.toLowerCase())
    const matchesStatus = renewalMemberStatus === "All" || r.status === renewalMemberStatus
    return matchesSearch && matchesStatus
  })

  // Stats
  const totalMembers = newMembers.length + renewals.length
  const pendingMembers = newMembers.filter(m => m.status === "Pending Review" || m.status === "Under Review").length
  const approvedMembers = newMembers.filter(m => m.status === "Approved").length
  const activeRenewals = renewals.filter(r => r.status === "Active").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <Button onClick={fetchNewMembers} variant="outline" size="sm" className="text-white border-white hover:bg-purple-700" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card><CardHeader><CardTitle>Total Members</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalMembers}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>New Applications</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{newMembers.length}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Approved</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{approvedMembers}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Active Renewals</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{activeRenewals}</div></CardContent></Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="new-members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-members">New Applications</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
          </TabsList>

          {/* New Members Tab */}
          <TabsContent value="new-members">
            {/* Filters */}
            <Card className="mb-6">
              <CardHeader><CardTitle>Filter Applications</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input placeholder="Search..." value={newMemberSearch} onChange={(e) => setNewMemberSearch(e.target.value)} />
                  <Select value={newMemberStatus} onValueChange={setNewMemberStatus}>
                    <SelectTrigger className="w-48"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Pending Review">Pending Review</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Applications ({filteredNewMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8"><RefreshCw className="h-6 w-6 animate-spin text-purple-600" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead><TableHead>Contact</TableHead>
                        <TableHead>Organization</TableHead><TableHead>Membership</TableHead>
                        <TableHead>Status</TableHead><TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNewMembers.map(m => (
                        <TableRow key={m._id}>
                          <TableCell>{m.first_name} {m.last_name}</TableCell>
                          <TableCell><Mail className="inline h-4 w-4 mr-1" />{m.email}</TableCell>
                          <TableCell>{m.organization}</TableCell>
                          <TableCell><Badge className={getMembershipTypeColor(m.membership_type)}>{m.membership_type}</Badge></TableCell>
                          <TableCell><Badge className={getStatusColor(m.status)}>{m.status}</Badge></TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal /></Button></DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => updateMemberStatus(m._id, "Under Review")}><Edit className="h-4 w-4 mr-2" />Under Review</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateMemberStatus(m._id, "Approved")}><Edit className="h-4 w-4 mr-2" />Approve</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => updateMemberStatus(m._id, "Rejected")}><Trash2 className="h-4 w-4 mr-2" />Reject</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => deleteMember(m._id)}><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Renewals Tab */}
          <TabsContent value="renewals">
            {/* Filters */}
            <Card className="mb-6">
              <CardHeader><CardTitle>Filter Renewals</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input placeholder="Search..." value={renewalMemberSearch} onChange={(e) => setRenewalMemberSearch(e.target.value)} />
                  <Select value={renewalMemberStatus} onValueChange={setRenewalMemberStatus}>
                    <SelectTrigger className="w-48"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
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
              </CardHeader>
              <CardContent>
                {renewalsLoading ? (
                  <div className="flex justify-center py-8"><RefreshCw className="h-6 w-6 animate-spin text-purple-600" /></div>
                ) : renewalsError ? (
                  <div className="text-red-500">{renewalsError}</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Membership</TableHead>
                        <TableHead>Renewal Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRenewalMembers.map(r => (
                        <TableRow key={r._id}>
                          <TableCell>{r.firstName} {r.lastName}</TableCell>
                          <TableCell>{r.email}</TableCell>
                          <TableCell>{r.membershipType}</TableCell>
                          <TableCell>{r.renewalDate ? new Date(r.renewalDate).toLocaleDateString() : "-"}</TableCell>
                          <TableCell><Badge className={getStatusColor(r.status)}>{r.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
