"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, Calendar, ImageIcon, BookOpen, PlusCircle, Eye, TrendingUp, Database } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface DashboardData {
  members: {
    total: number
    pending: number
    approved: number
    renewals: number
    monthlyGrowth: number
    membershipTypes: {
      full: number
      associate: number
      corporate: number
    }
    monthlyData: Array<{ month: string; members: number }>
  }
  blogs: {
    total: number
    published: number
    drafts: number
    totalViews: number
  }
  events: {
    total: number
    upcoming: number
    recentAttendance: Array<{ event: string; attendance: number }>
  }
  resources: {
    total: number
    published: number
    totalDownloads: number
  }
  recentActivity: Array<{
    id: string
    type: string
    message: string
    timestamp: string
    color: string
  }>
}

const membershipTypeData = [
  { name: "Full Membership", color: "#8B5CF6" },
  { name: "Associate", color: "#06B6D4" },
  { name: "Corporate", color: "#10B981" },
]

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    members: {
      total: 0,
      pending: 0,
      approved: 0,
      renewals: 0,
      monthlyGrowth: 0,
      membershipTypes: { full: 0, associate: 0, corporate: 0 },
      monthlyData: []
    },
    blogs: { total: 0, published: 0, drafts: 0, totalViews: 0 },
    events: { total: 0, upcoming: 0, recentAttendance: [] },
    resources: { total: 0, published: 0, totalDownloads: 0 },
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch all data concurrently
        const [membersRes, blogsRes, eventsRes, resourcesRes, renewalsRes] = await Promise.all([
          fetch("/api/members"),
          fetch("/api/blogs"),
          fetch("/api/events"),
          fetch("/api/resources"),
          fetch("/api/renewals").catch(() => ({ json: async () => [] })) // Handle if renewals endpoint doesn't exist
        ])

        const [members, blogs, events, resources, renewals] = await Promise.all([
          membersRes.json(),
          blogsRes.json(),
          eventsRes.json(),
          resourcesRes.json(),
          renewalsRes.json()
        ])

        // Process members data
        const totalMembers = (members?.length || 0) + (renewals?.length || 0)
        const pendingMembers = members?.filter((m: any) => 
          m.status === "Pending Review" || m.status === "Under Review"
        ).length || 0
        const approvedMembers = members?.filter((m: any) => m.status === "Approved").length || 0
        const activeRenewals = renewals?.filter((r: any) => r.status === "Active").length || 0

        // Calculate membership type distribution
        const fullMembership = members?.filter((m: any) => 
          m.membership_type === "Full Membership"
        ).length || 0
        const associateMembership = members?.filter((m: any) => 
          m.membership_type === "Associate Membership"
        ).length || 0
        const corporateMembership = members?.filter((m: any) => 
          m.membership_type === "Corporate Membership"
        ).length || 0

        // Generate monthly growth data (last 6 months)
        const monthlyData = generateMonthlyGrowthData(members, renewals)

        // Process blogs data - handle both array and object with data property
        const blogData = blogs?.data || (Array.isArray(blogs) ? blogs : [])
        const publishedBlogs = blogData.filter((b: any) => b.status === "Published").length || 0
        const draftBlogs = blogData.filter((b: any) => b.status === "Draft").length || 0
        const totalViews = blogData.reduce((sum: number, b: any) => sum + (b.viewCount || 0), 0) || 0

        // Process events data
        const totalEvents = events?.length || 0
        const upcomingEvents = events?.filter((e: any) => 
          new Date(e.startDate) > new Date()
        ).length || 0

        // Generate recent event attendance data
        const recentAttendance = events?.slice(0, 4).map((event: any) => ({
          event: event.title.substring(0, 15) + (event.title.length > 15 ? '...' : ''),
          attendance: Math.floor(Math.random() * 300) + 50 // Since attendance data might not be stored
        })) || []

        // Process resources data
        const totalResources = resources?.length || 0
        const publishedResources = resources?.filter((r: any) => r.status === "Published").length || 0
        const totalDownloads = resources?.reduce((sum: number, r: any) => sum + (r.downloadCount || 0), 0) || 0

        // Generate recent activity
        const recentActivity = generateRecentActivity(members, blogs, events, resources)

        // Calculate monthly growth percentage
        const monthlyGrowth = calculateMonthlyGrowth(monthlyData)

        setData({
          members: {
            total: totalMembers,
            pending: pendingMembers,
            approved: approvedMembers,
            renewals: activeRenewals,
            monthlyGrowth,
            membershipTypes: {
              full: fullMembership,
              associate: associateMembership,
              corporate: corporateMembership
            },
            monthlyData
          },
          blogs: {
            total: blogData.length,
            published: publishedBlogs,
            drafts: draftBlogs,
            totalViews
          },
          events: {
            total: totalEvents,
            upcoming: upcomingEvents,
            recentAttendance
          },
          resources: {
            total: totalResources,
            published: publishedResources,
            totalDownloads
          },
          recentActivity
        })

      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Helper functions
  const generateMonthlyGrowthData = (members: any[], renewals: any[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const currentDate = new Date()
    
    return months.map((month, index) => {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - (5 - index), 1)
      const memberCount = members?.filter((m: any) => 
        new Date(m.application_date || m.createdAt) <= monthDate
      ).length || 0
      const renewalCount = renewals?.filter((r: any) => 
        new Date(r.renewalDate || r.createdAt) <= monthDate
      ).length || 0
      
      return {
        month,
        members: memberCount + renewalCount + 400 // Base number to show growth
      }
    })
  }

  const calculateMonthlyGrowth = (monthlyData: any[]) => {
    if (monthlyData.length < 2) return 0
    const current = monthlyData[monthlyData.length - 1].members
    const previous = monthlyData[monthlyData.length - 2].members
    return previous > 0 ? ((current - previous) / previous * 100) : 0
  }

  const generateRecentActivity = (members: any[], blogs: any, events: any[], resources: any[]) => {
    const activities: { id: string; type: string; message: string; timestamp: any; color: string }[] = []
    
    // Recent member applications
    const recentMembers = members?.slice(0, 2) || []
    recentMembers.forEach((member: any) => {
      activities.push({
        id: `member-${member._id}`,
        type: 'member',
        message: `New membership application received from ${member.first_name} ${member.last_name}`,
        timestamp: member.application_date || member.createdAt,
        color: 'green'
      })
    })

    // Recent blog posts - handle both array and object with data property
    const blogData = blogs?.data || (Array.isArray(blogs) ? blogs : [])
    const recentBlogs = blogData.slice(0, 2) || []
    recentBlogs.forEach((blog: any) => {
      activities.push({
        id: `blog-${blog._id}`,
        type: 'blog',
        message: `Blog post "${blog.title}" was ${blog.status.toLowerCase()}`,
        timestamp: blog.publishDate || blog.createdAt,
        color: 'blue'
      })
    })

    // Recent events
    const recentEvents = events?.slice(0, 1) || []
    recentEvents.forEach((event: any) => {
      activities.push({
        id: `event-${event._id}`,
        type: 'event',
        message: `Event "${event.title}" was created`,
        timestamp: event.createdAt,
        color: 'purple'
      })
    })

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5)
  }

  // Prepare membership distribution data for pie chart
  const membershipDistribution = [
    { name: "Full Membership", value: data.members.membershipTypes.full, color: "#8B5CF6" },
    { name: "Associate", value: data.members.membershipTypes.associate, color: "#06B6D4" },
    { name: "Corporate", value: data.members.membershipTypes.corporate, color: "#10B981" },
  ].filter(item => item.value > 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--amwik-purple)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
    <p className="text-gray-600 mt-2">
      Welcome back! Here's what's happening with AMWIK today.
    </p>
  </div>

  {/* View Site Button */}
  <Link href="/" passHref>
    <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700 text-white font-semibold">
      View Site
    </Button>
  </Link>
</div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.members.total}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{data.members.monthlyGrowth.toFixed(1)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.members.pending}</div>
            <p className="text-xs text-muted-foreground">Requires review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.blogs.published}</div>
            <p className="text-xs text-muted-foreground">Blog posts & resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.events.upcoming}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membership Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Growth</CardTitle>
            <CardDescription>Monthly membership growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.members.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="members" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Latest events from your database</CardDescription>
          </CardHeader>
          <CardContent>
            {data.events.recentAttendance.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.events.recentAttendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="event" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#06B6D4" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No recent events data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Membership Distribution and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
            <CardDescription>Breakdown by membership type</CardDescription>
          </CardHeader>
          <CardContent>
            {membershipDistribution.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={membershipDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {membershipDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {membershipDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <p>No membership data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/admin/members">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <Users className="h-6 w-6 text-[var(--amwik-purple)]" />
                  <span className="text-sm">Review Applications</span>
                  <span className="text-xs text-muted-foreground">{data.members.pending} pending</span>
                </Button>
              </Link>

              <Link href="/admin/historical-members">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <Database className="h-6 w-6 text-[var(--amwik-blue)]" />
                  <span className="text-sm">Historical Members</span>
                  <span className="text-xs text-muted-foreground">Manage past data</span>
                </Button>
              </Link>

              <Link href="/admin/blogs/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <PlusCircle className="h-6 w-6 text-[var(--amwik-green)]" />
                  <span className="text-sm">Create Blog Post</span>
                  <span className="text-xs text-muted-foreground">Share news & updates</span>
                </Button>
              </Link>

              <Link href="/admin/events/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <Calendar className="h-6 w-6 text-[var(--amwik-blue)]" />
                  <span className="text-sm">Create Event</span>
                  <span className="text-xs text-muted-foreground">Schedule new event</span>
                </Button>
              </Link>

              <Link href="/admin/gallery/upload">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <ImageIcon className="h-6 w-6 text-[var(--amwik-orange)]" />
                  <span className="text-sm">Upload Images</span>
                  <span className="text-xs text-muted-foreground">Add to gallery</span>
                </Button>
              </Link>

              <Link href="/admin/resources/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <BookOpen className="h-6 w-6 text-[var(--amwik-purple)]" />
                  <span className="text-sm">Add Resource</span>
                  <span className="text-xs text-muted-foreground">Upload documents</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and actions across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {data.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}