"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, FileText, Search, Users, Download, Trash2, RefreshCw, Calendar } from "lucide-react"
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
  year: string
  uploadDate: string
}

/**
 * Helper function to find the actual column key in a CSV row object,
 * matching against a list of acceptable mappings in a case-insensitive, trimmed manner.
 */
const findKey = (row: any, fieldMappings: string[]) => {
  const rowKeys = Object.keys(row)
  // Create an array of trimmed and lowercased keys from the CSV row
  const trimmedLowerRowKeys = rowKeys.map(key => key.toLowerCase().trim()) 
  
  for (const mapping of fieldMappings) {
    // Trim and lowercase the expected mapping name
    const targetMapping = mapping.toLowerCase().trim() 
    
    // Find the index of the target mapping in the processed row keys
    const foundIndex = trimmedLowerRowKeys.indexOf(targetMapping)
    
    if (foundIndex !== -1) {
      // Return the original key corresponding to the found index
      return rowKeys[foundIndex]
    }
  }
  return null // Return null if no matching key is found
}


export default function HistoricalMembersPage() {
  const [historicalMembers, setHistoricalMembers] = useState<HistoricalMember[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("All")
  const [file, setFile] = useState<File | null>(null)
  const [uploadYear, setUploadYear] = useState(new Date().getFullYear().toString())
  const [previewData, setPreviewData] = useState<any[]>([])
  const [showPreview, setShowPreview] = useState(false)

  // Fetch historical members
  const fetchHistoricalMembers = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("/api/historical-members")
      if (!response.ok) throw new Error("Failed to fetch historical members")
      const data = await response.json()
      setHistoricalMembers(data || [])
    } catch (err: any) {
      console.error("Error fetching historical members:", err)
      setError(err.message || "Failed to fetch historical members")
    } finally {
      setLoading(false)
    }
  }

  // Handle file selection and preview
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.type !== "text/csv") {
      setError("Please select a CSV file")
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
          setError("Error parsing CSV: " + results.errors[0].message)
          return
        }
        
        // NEW: Pre-process the preview data using the robust findKey logic
        const processedPreview = results.data
            .slice(0, 5) // Show first 5 rows for preview
            .map((row: any) => {
                const nameKey = findKey(row, csvColumnMappings.name)
                const organisationKey = findKey(row, csvColumnMappings.organisation)
                const emailKey = findKey(row, csvColumnMappings.email)
                const phoneKey = findKey(row, csvColumnMappings.phone)

                // Return a structured object for display in the preview table
                return {
                    name: (row[nameKey!] || "").trim(),
                    organisation: (row[organisationKey!] || "").trim(),
                    email: (row[emailKey!] || "").trim(),
                    phone: (row[phoneKey!] || "").trim(),
                }
            })
        
        setPreviewData(processedPreview)
        setShowPreview(true)
      },
      error: (error) => {
        setError("Error reading file: " + error.message)
      }
    })
  }

  // Upload CSV data
  const uploadCSVData = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    if (!uploadYear) {
      setError("Please select a year")
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
            setError("Error parsing CSV: " + results.errors[0].message)
            return
          }

          // Log column names to debug
          if (results.data.length > 0) {
            const firstRow = results.data[0] as Record<string, any>
            console.log("CSV Columns:", Object.keys(firstRow))
            console.log("First row:", firstRow)
          }

          // Transform data to match our schema
          const membersData = results.data
            .map((row: any) => {
              // Use the robust key finder with the imported mappings
              const nameKey = findKey(row, csvColumnMappings.name)
              const organisationKey = findKey(row, csvColumnMappings.organisation)
              const emailKey = findKey(row, csvColumnMappings.email)
              const phoneKey = findKey(row, csvColumnMappings.phone)

              return {
                // Use the found key, or an empty string if no key was found
                name: (row[nameKey!] || "").trim(),
                organisation: (row[organisationKey!] || "").trim(),
                email: (row[emailKey!] || "").trim(),
                phone: (row[phoneKey!] || "").trim(),
                year: uploadYear,
                uploadDate: new Date().toISOString()
              }
            })
            .filter(member => member.name.trim()) // Filter out empty names

          console.log("Final members data:", membersData)

          if (membersData.length === 0) {
            setError("No valid member data found in CSV. Check if 'name' column exists and has values.")
            return
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
            throw new Error(errorData.message || "Failed to upload members")
          }

          const result = await response.json()
          setSuccess(`Successfully uploaded ${result.count} historical members`)
          setFile(null)
          setPreviewData([])
          setShowPreview(false)
          
          // Reset file input
          const fileInput = document.getElementById("csv-file") as HTMLInputElement
          if (fileInput) fileInput.value = ""
          
          // Refresh the list
          await fetchHistoricalMembers()
        } catch (err: any) {
          console.error("Error uploading CSV:", err)
          setError(err.message || "Failed to upload CSV")
        } finally {
          setUploading(false)
        }
      },
      error: (error) => {
        setError("Error reading file: " + error.message)
        setUploading(false)
      }
    })
  }

  // Delete historical member
  const deleteHistoricalMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this historical member record?")) return

    try {
      const response = await fetch(`/api/historical-members?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete member")

      setHistoricalMembers(prev => prev.filter(m => m._id !== id))
      setSuccess("Historical member deleted successfully")
    } catch (err: any) {
      setError(err.message || "Failed to delete member")
    }
  }

  // Filter members
  const filteredMembers = historicalMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm)
    const matchesYear = selectedYear === "All" || member.year === selectedYear
    return matchesSearch && matchesYear
  })

  // Get unique years for filter
  const availableYears = Array.from(new Set(historicalMembers.map(m => m.year))).sort((a, b) => b.localeCompare(a))

  // Stats
  const totalHistoricalMembers = historicalMembers.length
  const membersByYear = historicalMembers.reduce((acc, member) => {
    acc[member.year] = (acc[member.year] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  React.useEffect(() => {
    fetchHistoricalMembers()
  }, [])

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
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
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

        {/* CSV Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Historical Members CSV</CardTitle>
            <CardDescription>
              Upload a CSV file containing historical member data. Expected columns: name, organisation, email, phone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="csv-file" className="block text-sm font-medium mb-2">
                  Select CSV File
                </label>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <Select value={uploadYear} onValueChange={setUploadYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
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
                  disabled={!file || uploading}
                  className="w-full"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* NOW USING THE PROCESSED DATA FIELDS */}
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.name || "N/A"}</TableCell>
                          <TableCell>{row.organisation || "N/A"}</TableCell>
                          <TableCell>{row.email || "N/A"}</TableCell> 
                          <TableCell>{row.phone || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Historical Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, organisation, email, or phone..."
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
                  {availableYears.map(year => (
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
              <div className="flex justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
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
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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