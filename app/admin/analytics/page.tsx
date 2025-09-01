"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Users, TrendingUp, Calendar, ArrowLeft, Download } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("last-month")

  const membershipStats = {
    totalMembers: 523,
    newMembers: 45,
    renewals: 89,
    pendingApplications: 12,
    membershipTypes: {
      full: 320,
      associate: 150,
      corporate: 53,
    },
  }

  const engagementStats = {
    eventAttendance: 78,
    blogViews: 12450,
    resourceDownloads: 890,
    newsletterOpens: 65,
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
              <h1 className="text-2xl font-bold">Analytics & Reports</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white hover:text-[var(--amwik-purple)] bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Member Analytics</h2>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Membership Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membershipStats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Members</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membershipStats.newMembers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Renewals</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membershipStats.renewals}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.3%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membershipStats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
        </div>

        {/* Membership Types Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Membership Types Distribution</CardTitle>
              <CardDescription>Breakdown by membership category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[var(--amwik-purple)] rounded-full"></div>
                    <span className="text-sm font-medium">Full Membership</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{membershipStats.membershipTypes.full}</div>
                    <div className="text-xs text-gray-500">61.2%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[var(--amwik-green)] rounded-full"></div>
                    <span className="text-sm font-medium">Associate Membership</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{membershipStats.membershipTypes.associate}</div>
                    <div className="text-xs text-gray-500">28.7%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[var(--amwik-orange)] rounded-full"></div>
                    <span className="text-sm font-medium">Corporate Membership</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{membershipStats.membershipTypes.corporate}</div>
                    <div className="text-xs text-gray-500">10.1%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Member activity and participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Event Attendance Rate</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">{engagementStats.eventAttendance}%</div>
                    <div className="text-xs text-green-600">+5% from last month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Blog Views</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">{engagementStats.blogViews.toLocaleString()}</div>
                    <div className="text-xs text-green-600">+15% from last month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Resource Downloads</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">{engagementStats.resourceDownloads}</div>
                    <div className="text-xs text-green-600">+8% from last month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Newsletter Open Rate</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">{engagementStats.newsletterOpens}%</div>
                    <div className="text-xs text-red-600">-2% from last month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geographic Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Member distribution across Kenya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--amwik-purple)]">245</div>
                <div className="text-sm text-gray-600">Nairobi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--amwik-purple)]">89</div>
                <div className="text-sm text-gray-600">Mombasa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--amwik-purple)]">67</div>
                <div className="text-sm text-gray-600">Kisumu</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--amwik-purple)]">122</div>
                <div className="text-sm text-gray-600">Other Counties</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
            <CardDescription>Member age distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-[var(--amwik-purple)]">45</div>
                <div className="text-sm text-gray-600">18-25</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[var(--amwik-purple)]">156</div>
                <div className="text-sm text-gray-600">26-35</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[var(--amwik-purple)]">189</div>
                <div className="text-sm text-gray-600">36-45</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[var(--amwik-purple)]">98</div>
                <div className="text-sm text-gray-600">46-55</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[var(--amwik-purple)]">35</div>
                <div className="text-sm text-gray-600">55+</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
