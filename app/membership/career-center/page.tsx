"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroSection from "@/components/hero-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {
  Briefcase,
  GraduationCap,
  FileText,
  Users,
} from "lucide-react"

export default function CareerCenterPage() {
  const [activeTab, setActiveTab] = useState("jobs")

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          title="Career Center"
          description="Advance your media career with job opportunities, training programs, and professional resources"
          backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Career Center Overview */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Gateway to Media Career Success</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover job opportunities, enhance your skills through training programs, and access valuable resources to
              advance your career in media and journalism.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Coming Soon</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Programs</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Coming Soon</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Career Resources</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Coming Soon</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Stories</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150+</div>
                <p className="text-xs text-muted-foreground">Members placed in jobs</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="jobs" className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Job Opportunities
              </TabsTrigger>
              <TabsTrigger value="training" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Training Programs
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Career Resources
              </TabsTrigger>
            </TabsList>

            {/* Job Opportunities Tab */}
            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Find Your Next Opportunity</CardTitle>
                  <CardDescription>Job opportunities will be announced soon.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            {/* Training Programs Tab */}
            <TabsContent value="training">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Development</CardTitle>
                  <CardDescription>Training programs will be announced soon.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            {/* Career Resources Tab */}
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Career Resources</CardTitle>
                  <CardDescription>Resources will be announced soon.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
