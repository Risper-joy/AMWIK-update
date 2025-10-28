"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ArrowLeft, Edit, Calendar, User, MoreHorizontal, CreditCard, Clock, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useRenewals from "@/hooks/useRenewals"

export default function AdminRenewalsPage() {
  const { renewals, loading, error, refetch } = useRenewals()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [paymentFilter, setPaymentFilter] = useState("All")
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [extensionData, setExtensionData] = useState({ months: "12", amount: "", paymentMethod: "", notes: "" })

  const getStatusColor = (status: string) =>
    status === "Active" ? "bg-green-100 text-green-800"
    : status === "Pending" ? "bg-yellow-100 text-yellow-800"
    : status === "Expired" ? "bg-red-100 text-red-800"
    : "bg-blue-100 text-blue-800"

  const getPaymentStatusColor = (status: string) =>
    status === "Paid" ? "bg-green-100 text-green-800"
    : status === "Pending" ? "bg-yellow-100 text-yellow-800"
    : status === "Overdue" ? "bg-red-100 text-red-800"
    : "bg-gray-100 text-gray-800"

  const filteredRenewals = renewals.filter((r) => {
    const matchesSearch =
      r.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.membershipType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || r.status === statusFilter
    const matchesPayment = paymentFilter === "All" || r.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

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
              <h1 className="text-2xl font-bold">Membership Renewals</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader><CardTitle>Filter Renewals</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Payment" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Renewals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Renewals ({filteredRenewals.length})</CardTitle>
            <CardDescription>Manage renewals and payments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Renewal Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRenewals.map((r) => (
                    <TableRow key={r._id}>
                      <TableCell>{r.firstName} {r.lastName}<div className="text-sm text-gray-500">{r.email}</div></TableCell>
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
      </div>
    </div>
  )
}
