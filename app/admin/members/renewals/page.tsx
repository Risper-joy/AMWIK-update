"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ArrowLeft, Edit, Calendar, User, MoreHorizontal, CreditCard, Clock, Mail } from "lucide-react"

const renewals = [
  {
    id: 1,
    memberName: "Maria Powerson",
    membershipType: "Full Membership",
    currentExpiry: "2024-03-15",
    renewalDate: "2024-02-15",
    newExpiry: "2025-03-15",
    amount: 5000,
    paymentStatus: "Paid",
    paymentMethod: "M-Pesa",
    status: "Active",
    email: "maria@example.com",
    phone: "+254712345678",
  },
  {
    id: 2,
    memberName: "Grace Wanjiku",
    membershipType: "Associate Membership",
    currentExpiry: "2024-04-20",
    renewalDate: "2024-03-20",
    newExpiry: "2025-04-20",
    amount: 3000,
    paymentStatus: "Pending",
    paymentMethod: "Bank Transfer",
    status: "Pending",
    email: "grace@example.com",
    phone: "+254723456789",
  },
  {
    id: 3,
    memberName: "Sarah Njeri",
    membershipType: "Student Membership",
    currentExpiry: "2024-05-10",
    renewalDate: "2024-04-10",
    newExpiry: "2025-05-10",
    amount: 1500,
    paymentStatus: "Paid",
    paymentMethod: "Card",
    status: "Active",
    email: "sarah@example.com",
    phone: "+254734567890",
  },
  {
    id: 4,
    memberName: "Catherine Mwangi",
    membershipType: "Full Membership",
    currentExpiry: "2024-02-28",
    renewalDate: null,
    newExpiry: null,
    amount: 5000,
    paymentStatus: "Overdue",
    paymentMethod: null,
    status: "Expired",
    email: "catherine@example.com",
    phone: "+254745678901",
  },
]

export default function AdminRenewalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [paymentFilter, setPaymentFilter] = useState("All")
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [extensionData, setExtensionData] = useState({
    months: "12",
    amount: "",
    paymentMethod: "",
    notes: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredRenewals = renewals.filter((renewal) => {
    const matchesSearch =
      renewal.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.membershipType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || renewal.status === statusFilter
    const matchesPayment = paymentFilter === "All" || renewal.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const handleExtendMembership = () => {
    console.log("Extending membership for:", selectedMember, extensionData)
    setIsExtendDialogOpen(false)
    setSelectedMember(null)
    setExtensionData({ months: "12", amount: "", paymentMethod: "", notes: "" })
  }

  const handleSendReminder = (member: any) => {
    console.log("Sending reminder to:", member.email)
  }

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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Renewals</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{renewals.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Renewals</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{renewals.filter((r) => r.status === "Active").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{renewals.filter((r) => r.paymentStatus === "Pending").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{renewals.filter((r) => r.paymentStatus === "Overdue").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search members, membership types, or emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Payments</SelectItem>
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
            <CardDescription>Manage member renewals and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Membership Type</TableHead>
                  <TableHead>Current Expiry</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRenewals.map((renewal) => (
                  <TableRow key={renewal.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {renewal.memberName}
                        </div>
                        <div className="text-sm text-gray-500">{renewal.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{renewal.membershipType}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(renewal.currentExpiry).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {renewal.renewalDate ? (
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(renewal.renewalDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                        KES {renewal.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(renewal.paymentStatus)}>{renewal.paymentStatus}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(renewal.status)}>{renewal.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedMember(renewal)
                              setIsExtendDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Extend Membership
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendReminder(renewal)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            View Payment Details
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

        {/* Extend Membership Dialog */}
        <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Extend Membership</DialogTitle>
              <DialogDescription>Extend membership for {selectedMember?.memberName}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="months" className="text-right">
                  Extension Period
                </Label>
                <Select
                  value={extensionData.months}
                  onValueChange={(value) => setExtensionData({ ...extensionData, months: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                    <SelectItem value="24">24 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount (KES)
                </Label>
                <Input
                  id="amount"
                  value={extensionData.amount}
                  onChange={(e) => setExtensionData({ ...extensionData, amount: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter amount"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentMethod" className="text-right">
                  Payment Method
                </Label>
                <Select
                  value={extensionData.paymentMethod}
                  onValueChange={(value) => setExtensionData({ ...extensionData, paymentMethod: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right mt-2">
                  Notes
                </Label>
                <Input
                  id="notes"
                  value={extensionData.notes}
                  onChange={(e) => setExtensionData({ ...extensionData, notes: e.target.value })}
                  className="col-span-3"
                  placeholder="Optional notes"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleExtendMembership}>
                Extend Membership
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
