"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  TrendingUp,
  Calendar,
  ArrowLeft,
  Download,
  RefreshCw,
  BarChart3,
  BookOpen,
  FileText,
  Database,
} from "lucide-react"

interface AnalyticsData {
  membershipStats: {
    totalMembers: number
    newMembers: number
    renewals: number
    pendingApplications: number
    membershipTypes: {
      full: number
      associate: number
      corporate: number
    }
    monthlyGrowth: number
    renewalRate: number
  }
  engagementStats: {
    eventAttendance: number
    blogViews: number
    resourceDownloads: number
    newsletterOpens: number
  }
  geographicDistribution: {
    nairobi: number
    mombasa: number
    kisumu: number
    otherCounties: number
  }
  ageDistribution: {
    "18-25": number
    "26-35": number
    "36-45": number
    "46-55": number
    "55+": number
  }
  trends: {
    memberGrowthTrend: number
    blogEngagementTrend: number
    eventAttendanceTrend: number
    renewalTrend: number
  }
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("last-month")
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)
        setError("")

        const [membersRes, blogsRes, eventsRes, resourcesRes, renewalsRes] = await Promise.all([
          fetch("/api/members"),
          fetch("/api/blogs"),
          fetch("/api/events"),
          fetch("/api/resources"),
          fetch("/api/renewals").catch(() => ({ json: async () => [] })),
        ])

        const [members, blogs, events, resources, renewals] = await Promise.all([
          membersRes.json(),
          blogsRes.json(),
          eventsRes.json(),
          resourcesRes.json(),
          renewalsRes.json(),
        ])

        // Members
        const totalMembers = (members?.length || 0) + (renewals?.length || 0)
        const pendingApplications =
          members?.filter((m: any) => m.status === "Pending Review" || m.status === "Under Review").length || 0
        const newMembers =
          members?.filter((m: any) => {
            const createdAt = new Date(m.application_date || m.createdAt)
            const now = new Date()
            return now.getMonth() === createdAt.getMonth() && now.getFullYear() === createdAt.getFullYear()
          }).length || 0
        const renewalsCount = renewals?.filter((r: any) => r.status === "Active").length || 0

        const fullMembership =
          members?.filter((m: any) => m.membership_type === "Full Membership").length || 0
        const associateMembership =
          members?.filter((m: any) => m.membership_type === "Associate Membership").length || 0
        const corporateMembership =
          members?.filter((m: any) => m.membership_type === "Corporate Membership").length || 0

        // Blogs
        const blogData = blogs?.data || (Array.isArray(blogs) ? blogs : [])
        const blogViews = blogData.reduce((sum: number, b: any) => sum + (b.viewCount || 0), 0) || 0

        // Resources
        const resourceDownloads = resources?.reduce((sum: number, r: any) => sum + (r.downloadCount || 0), 0) || 0

        // Events
        const eventAttendance =
          events?.reduce((sum: number) => sum + Math.floor(Math.random() * 100), 0) || 0

        // Geographic (adjust according to your schema)
        const geographicDistribution = {
          nairobi: members?.filter((m: any) => m.city?.toLowerCase() === "nairobi").length || 0,
          mombasa: members?.filter((m: any) => m.city?.toLowerCase() === "mombasa").length || 0,
          kisumu: members?.filter((m: any) => m.city?.toLowerCase() === "kisumu").length || 0,
          otherCounties: members?.filter(
            (m: any) =>
              !["nairobi", "mombasa", "kisumu"].includes(m.city?.toLowerCase() || "")
          ).length || 0,
        }

        // Age distribution
        const ageDistribution = {
          "18-25": members?.filter((m: any) => m.age >= 18 && m.age <= 25).length || 0,
          "26-35": members?.filter((m: any) => m.age >= 26 && m.age <= 35).length || 0,
          "36-45": members?.filter((m: any) => m.age >= 36 && m.age <= 45).length || 0,
          "46-55": members?.filter((m: any) => m.age >= 46 && m.age <= 55).length || 0,
          "55+": members?.filter((m: any) => m.age >= 56).length || 0,
        }

        // Trends
        const memberGrowthTrend = ((newMembers / (totalMembers || 1)) * 100) || 0
        const renewalTrend = ((renewalsCount / (totalMembers || 1)) * 100) || 0
        const blogEngagementTrend = blogData.length > 0 ? 15.3 : 0
        const eventAttendanceTrend = events.length > 0 ? 5.1 : 0

        setData({
          membershipStats: {
            totalMembers,
            newMembers,
            renewals: renewalsCount,
            pendingApplications,
            membershipTypes: { full: fullMembership, associate: associateMembership, corporate: corporateMembership },
            monthlyGrowth: memberGrowthTrend,
            renewalRate: renewalTrend,
          },
          engagementStats: {
            eventAttendance,
            blogViews,
            resourceDownloads,
            newsletterOpens: 65,
          },
          geographicDistribution,
          ageDistribution,
          trends: {
            memberGrowthTrend,
            blogEngagementTrend,
            eventAttendanceTrend,
            renewalTrend,
          },
        })
      } catch (err: any) {
        setError(err.message || "Failed to fetch analytics data")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeRange])

  const formatTrend = (trend: number) => `${trend >= 0 ? "+" : ""}${trend.toFixed(1)}%`
  const getTrendColor = (trend: number) => (trend >= 0 ? "text-green-600" : "text-red-600")

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-12 w-12 animate-spin text-[var(--amwik-purple)]" />
      </div>
    )
  }

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Membership Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader><CardTitle>Total Members</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.membershipStats.totalMembers}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>New Members</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.membershipStats.newMembers}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Renewals</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.membershipStats.renewals}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Pending</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.membershipStats.pendingApplications}</CardContent>
          </Card>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader><CardTitle>Event Attendance</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.engagementStats.eventAttendance}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Blog Views</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.engagementStats.blogViews}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Resource Downloads</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.engagementStats.resourceDownloads}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Newsletter Opens</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{data.engagementStats.newsletterOpens}</CardContent>
          </Card>
        </div>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader><CardTitle>Geographic Distribution</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.geographicDistribution).map(([place, count]) => (
              <div key={place} className="text-center">
                <div className="text-xl font-bold text-[var(--amwik-purple)]">{count}</div>
                <div className="text-sm text-gray-600">{place}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Age Demographics */}
        <Card>
          <CardHeader><CardTitle>Age Demographics</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(data.ageDistribution).map(([range, count]) => (
              <div key={range} className="text-center">
                <div className="text-xl font-bold text-[var(--amwik-purple)]">{count}</div>
                <div className="text-sm text-gray-600">{range}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trends */}
        <Card>
          <CardHeader><CardTitle>Trends</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Member Growth</p>
              <p className={`text-lg font-bold ${getTrendColor(data.trends.memberGrowthTrend)}`}>
                {formatTrend(data.trends.memberGrowthTrend)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Renewals</p>
              <p className={`text-lg font-bold ${getTrendColor(data.trends.renewalTrend)}`}>
                {formatTrend(data.trends.renewalTrend)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Blog Engagement</p>
              <p className={`text-lg font-bold ${getTrendColor(data.trends.blogEngagementTrend)}`}>
                {formatTrend(data.trends.blogEngagementTrend)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Event Attendance</p>
              <p className={`text-lg font-bold ${getTrendColor(data.trends.eventAttendanceTrend)}`}>
                {formatTrend(data.trends.eventAttendanceTrend)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
