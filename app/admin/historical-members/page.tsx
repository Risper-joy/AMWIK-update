"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, FileText, Search, Users, Download, Trash2, RefreshCw, Calendar, Loader2 } from "lucide-react"
import * as Papa from "papaparse"
import React from "react"

// Import the column mappings for robust key-finding
import { csvColumnMappings } from "@/models/HistoricalMember" 

interface HistoricalMember {
  _id?: string
  name: string
  organisation: string
  email: string
  phone: string
  membershipNumber: string 
  year: string
  uploadDate: string
}

/**
 * Helper function to find the actual column key in a CSV row object,
 * matching against a list of acceptable mappings in a case-insensitive, trimmed manner.
 */
const findKey = (row: any, fieldMappings: string[]) => {
  const rowKeys = Object.keys(row)
  const trimmedLowerRowKeys = rowKeys.map(key => key.toLowerCase().trim()) 
  
  for (const mapping of fieldMappings) {
    const targetMapping = mapping.toLowerCase().trim() 
    const foundIndex = trimmedLowerRowKeys.indexOf(targetMapping)
    
    if (foundIndex !== -1) {
      return rowKeys[foundIndex]
    }
  }
  return null
}

export default function HistoricalMembersPage() {
  const [historicalMembers, setHistoricalMembers] = useState<HistoricalMember[]>([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [uploadYear, setUploadYear] = useState(new Date().getFullYear().toString())
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("All")
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState<Partial<HistoricalMember>[]>([])

  const fetchHistoricalMembers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/historical-members")
      if (!response.ok) {
        throw new Error("Failed to fetch members")
      }
      const data: HistoricalMember[] = await response.json()
      setHistoricalMembers(data)
    } catch (err) {
      setError("Failed to load historical members. Check API connection.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHistoricalMembers()
  }, [fetchHistoricalMembers])

  // Handle file selection and preview
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
      setError("Invalid file type. Please upload a CSV file.")
      setFile(null)
      setShowPreview(false)
      return
    }

    setFile(selectedFile)
    setError("")
    setSuccess("")

    // Parse CSV for preview
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`CSV parsing error: ${results.errors[0].message}`)
          setShowPreview(false)
          return
        }
        
        const processedPreview = results.data
            .slice(0, 5)
            .map((row: any) => {
                const nameKey = findKey(row, csvColumnMappings.name)
                const organisationKey = findKey(row, csvColumnMappings.organisation)
                const emailKey = findKey(row, csvColumnMappings.email)
                const phoneKey = findKey(row, csvColumnMappings.phone)
                const membershipNumberKey = findKey(row, csvColumnMappings.membershipNumber)

                return {
                    name: (row[nameKey!] || "").trim(),
                    organisation: (row[organisationKey!] || "").trim(),
                    email: (row[emailKey!] || "").trim(),
                    phone: (row[phoneKey!] || "").trim(),
                    membershipNumber: (row[membershipNumberKey!] || "").trim(),
                }
            })
        
        setPreviewData(processedPreview)
        setShowPreview(true)
      },
      error: (error) => {
        setError(`CSV reading failed: ${error.message}`)
        setShowPreview(false)
      }
    })
  }

  // Upload CSV data
  const uploadCSVData = async () => {
    if (!file || !uploadYear) {
      setError("Please select a file and specify the membership year.")
      return
    }

    setUploading(true)
    setError("")
    setSuccess("")

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: async (results) => {
        try {
          if (results.errors.length > 0) {
            throw new Error(`CSV parsing error: ${results.errors[0].message}`)
          }

          const membersData = results.data
            .map((row: any) => {
              const nameKey = findKey(row, csvColumnMappings.name)
              const organisationKey = findKey(row, csvColumnMappings.organisation)
              const emailKey = findKey(row, csvColumnMappings.email)
              const phoneKey = findKey(row, csvColumnMappings.phone)
              const membershipNumberKey = findKey(row, csvColumnMappings.membershipNumber)

              return {
                name: (row[nameKey!] || "").trim(),
                organisation: (row[organisationKey!] || "").trim(),
                email: (row[emailKey!] || "").trim(),
                phone: (row[phoneKey!] || "").trim(),
                membershipNumber: (row[membershipNumberKey!] || "").trim(),
                year: uploadYear,
                uploadDate: new Date().toISOString()
              }
            })
            .filter(member => member.name.trim())

          if (membersData.length === 0) {
            throw new Error("No valid member records found in the CSV.")
          }

          const response = await fetch("/api/historical-members", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ members: membersData }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to upload members to database.")
          }

          const result = await response.json()
          setSuccess(`Successfully uploaded ${result.count} historical members.`)
          
          setFile(null)
          setShowPreview(false)
          setPreviewData([])
          
          // Reset file input
          const fileInput = document.getElementById("csvFile") as HTMLInputElement
          if (fileInput) fileInput.value = ""
          
          fetchHistoricalMembers()
        } catch (err: any) {
          setError(err.message || "An unknown error occurred during upload.")
        } finally {
          setUploading(false)
        }
      },
      error: (error) => {
        setError(`CSV reading failed: ${error.message}`)
        setUploading(false)
      }
    })
  }

  const deleteHistoricalMember = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this historical member?")) return
    
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const response = await fetch(`/api/historical-members?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete member.")
      }

      setSuccess("Historical member deleted successfully.")
      fetchHistoricalMembers()
    } catch (err: any) {
      setError(err.message || "An unknown error occurred during deletion.")
      setLoading(false)
    }
  }

  // Filter members
  const filteredMembers = historicalMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm) ||
                         member.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase())
                         
    const matchesYear = selectedYear === "All" || member.year === selectedYear
    return matchesSearch && matchesYear
  })

  // Get unique years and stats
  const uniqueYears = Array.from(new Set(historicalMembers.map(m => m.year))).sort().reverse()
  const totalHistoricalMembers = historicalMembers.length
  const availableYears = uniqueYears
  const membersByYear = historicalMembers.reduce((acc, member) => {
    acc[member.year] = (acc[member.year] || 0) + 1
    return acc
  }, {} as Record<string, number>)

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
              <h1 className="text-2xl font-bold">Historical Members</h1>
            </div>
            <Button 
              onClick={fetchHistoricalMembers} 
              variant="outline" 
              size="sm" 
              className="text-white border-white hover:bg-purple-700" 
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 bg-green-100 border-green-500 text-green-700">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Historical Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHistoricalMembers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Available Years</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableYears.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Latest Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableYears[0] || "N/A"}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Oldest Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableYears[availableYears.length - 1] || "N/A"}</div>
            </CardContent>
          </Card>
        </div>

        {/* CSV Upload Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Historical Members CSV</CardTitle>
            <CardDescription>
              Upload a CSV file containing historical member data. Expected columns: name, organisation, email, phone, membership number
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="csvFile" className="block text-sm font-medium mb-2">
                  Select CSV File
                </label>
                <Input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <Select
                  value={uploadYear}
                  onValueChange={setUploadYear}
                  disabled={uploading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={uploadCSVData}
                  disabled={!file || uploading || !uploadYear}
                  className="w-full"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload CSV
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* CSV Preview */}
            {showPreview && previewData.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">CSV Preview (First 5 rows)</h4>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Organisation</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Member No.</TableHead> 
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.name || "N/A"}</TableCell>
                          <TableCell>{row.organisation || "N/A"}</TableCell>
                          <TableCell>{row.email || "N/A"}</TableCell> 
                          <TableCell>{row.phone || "N/A"}</TableCell>
                          <TableCell>{row.membershipNumber || "N/A"}</TableCell> 
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filter Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Historical Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, organisation, email, phone, or member number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Years</SelectItem>
                  {uniqueYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Historical Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historical Members ({filteredMembers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-3 text-lg text-gray-600">Loading members...</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Member No.</TableHead> 
                    <TableHead>Year</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.organisation}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.membershipNumber}</TableCell> 
                      <TableCell>
                        <Badge variant="outline">{member.year}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(member.uploadDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteHistoricalMember(member._id!)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredMembers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No historical members found
                      </TableCell>
                    </TableRow>
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