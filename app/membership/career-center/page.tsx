"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroSection from "@/components/hero-section"
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  GraduationCap,
  Users,
  FileText,
  ExternalLink,
  Download,
} from "lucide-react"

const jobListings = [
  {
    id: 1,
    title: "Senior Journalist",
    company: "Daily Nation",
    location: "Nairobi, Kenya",
    type: "Full-time",
    category: "Journalism",
    salary: "KES 80,000 - 120,000",
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    description:
      "We are seeking an experienced journalist to join our newsroom team. The ideal candidate will have strong investigative skills and experience in political reporting.",
    requirements: [
      "Bachelor's degree in Journalism or related field",
      "5+ years of journalism experience",
      "Strong writing and research skills",
      "Experience with digital media platforms",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Professional development opportunities",
      "Flexible working arrangements",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Digital Content Creator",
    company: "Standard Group",
    location: "Nairobi, Kenya",
    type: "Full-time",
    category: "Digital Media",
    salary: "KES 60,000 - 90,000",
    postedDate: "2024-01-12",
    deadline: "2024-02-12",
    description:
      "Join our digital team to create engaging content across multiple platforms. You'll be responsible for social media content, video production, and audience engagement.",
    requirements: [
      "Diploma/Degree in Media Studies or related field",
      "3+ years in digital content creation",
      "Proficiency in video editing software",
      "Strong social media presence",
    ],
    benefits: [
      "Creative work environment",
      "Training opportunities",
      "Performance bonuses",
      "Modern equipment provided",
    ],
    featured: false,
  },
  {
    id: 3,
    title: "Radio Presenter",
    company: "Radio Africa Group",
    location: "Nairobi, Kenya",
    type: "Full-time",
    category: "Broadcasting",
    salary: "KES 70,000 - 100,000",
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    description:
      "We're looking for a dynamic radio presenter to host our morning show. The role involves interviewing guests, presenting news, and engaging with listeners.",
    requirements: [
      "Experience in radio broadcasting",
      "Excellent communication skills",
      "Knowledge of current affairs",
      "Ability to work early morning shifts",
    ],
    benefits: ["Competitive package", "Brand building opportunities", "Networking events", "Career progression"],
    featured: true,
  },
  {
    id: 4,
    title: "Communications Officer",
    company: "UN Women Kenya",
    location: "Nairobi, Kenya",
    type: "Contract",
    category: "Communications",
    salary: "USD 3,000 - 4,000",
    postedDate: "2024-01-08",
    deadline: "2024-02-08",
    description:
      "Support our communications team in developing and implementing communication strategies for women's empowerment programs across Kenya.",
    requirements: [
      "Master's degree in Communications or related field",
      "5+ years in development communications",
      "Experience with international organizations",
      "Fluency in English and Swahili",
    ],
    benefits: ["International exposure", "Comprehensive benefits", "Professional development", "Impactful work"],
    featured: false,
  },
  {
    id: 5,
    title: "Video Producer",
    company: "KTN News",
    location: "Nairobi, Kenya",
    type: "Full-time",
    category: "Production",
    salary: "KES 75,000 - 110,000",
    postedDate: "2024-01-05",
    deadline: "2024-02-05",
    description:
      "Lead video production for news segments and documentaries. You'll manage the entire production process from concept to final delivery.",
    requirements: [
      "Degree in Film/Media Production",
      "4+ years in video production",
      "Proficiency in editing software",
      "Strong project management skills",
    ],
    benefits: ["Creative freedom", "Latest equipment", "Team collaboration", "Industry recognition"],
    featured: false,
  },
  {
    id: 6,
    title: "Media Relations Specialist",
    company: "Safaricom PLC",
    location: "Nairobi, Kenya",
    type: "Full-time",
    category: "Public Relations",
    salary: "KES 90,000 - 130,000",
    postedDate: "2024-01-03",
    deadline: "2024-02-03",
    description:
      "Manage media relationships and coordinate press activities for Kenya's leading telecommunications company.",
    requirements: [
      "Bachelor's degree in PR/Communications",
      "6+ years in media relations",
      "Strong network in Kenyan media",
      "Crisis communication experience",
    ],
    benefits: ["Excellent compensation", "Corporate benefits", "Career advancement", "Industry leadership"],
    featured: true,
  },
]

const trainingPrograms = [
  {
    id: 1,
    title: "Digital Journalism Masterclass",
    provider: "AMWIK Training Institute",
    duration: "3 months",
    format: "Online & In-person",
    level: "Intermediate",
    price: "KES 25,000",
    startDate: "2024-02-15",
    description:
      "Comprehensive program covering modern digital journalism techniques, multimedia storytelling, and audience engagement strategies.",
    modules: [
      "Digital Storytelling Techniques",
      "Social Media Journalism",
      "Data Journalism Basics",
      "Video Production for News",
      "Audience Analytics",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Investigative Journalism Workshop",
    provider: "International Center for Journalists",
    duration: "2 weeks",
    format: "In-person",
    level: "Advanced",
    price: "Free (Scholarship)",
    startDate: "2024-03-01",
    description:
      "Intensive workshop on investigative journalism techniques, research methods, and ethical considerations in investigative reporting.",
    modules: [
      "Research Methodologies",
      "Source Protection",
      "Legal Considerations",
      "Data Analysis",
      "Story Development",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "Media Entrepreneurship Bootcamp",
    provider: "Kenya Media Entrepreneurs",
    duration: "1 month",
    format: "Hybrid",
    level: "Beginner",
    price: "KES 15,000",
    startDate: "2024-02-20",
    description:
      "Learn how to start and grow your own media business, from content creation to monetization strategies.",
    modules: [
      "Business Planning",
      "Content Monetization",
      "Digital Marketing",
      "Financial Management",
      "Legal Framework",
    ],
    featured: false,
  },
  {
    id: 4,
    title: "Broadcast Journalism Certificate",
    provider: "Kenya Institute of Mass Communication",
    duration: "6 months",
    format: "In-person",
    level: "Beginner",
    price: "KES 45,000",
    startDate: "2024-02-10",
    description:
      "Complete certificate program in broadcast journalism covering radio and television production, presentation skills, and news writing.",
    modules: [
      "News Writing for Broadcast",
      "Presentation Skills",
      "Studio Operations",
      "Interview Techniques",
      "Live Reporting",
    ],
    featured: false,
  },
]

const resources = [
  {
    id: 1,
    title: "Media Career Guide 2024",
    type: "PDF Guide",
    description: "Comprehensive guide to building a successful career in media and journalism in Kenya.",
    downloadUrl: "#",
    category: "Career Development",
  },
  {
    id: 2,
    title: "Salary Survey Report",
    type: "Research Report",
    description: "Annual salary survey for media professionals across different sectors and experience levels.",
    downloadUrl: "#",
    category: "Industry Insights",
  },
  {
    id: 3,
    title: "Interview Preparation Toolkit",
    type: "Toolkit",
    description: "Templates, questions, and tips for preparing for media industry job interviews.",
    downloadUrl: "#",
    category: "Job Search",
  },
  {
    id: 4,
    title: "Freelancing in Media",
    type: "eBook",
    description: "Complete guide to starting and managing a successful freelance media career.",
    downloadUrl: "#",
    category: "Entrepreneurship",
  },
]

export default function CareerCenterPage() {
  const [activeTab, setActiveTab] = useState("jobs")
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "All" || job.location.includes(locationFilter)
    const matchesCategory = categoryFilter === "All" || job.category === categoryFilter
    const matchesType = typeFilter === "All" || job.type === typeFilter

    return matchesSearch && matchesLocation && matchesCategory && matchesType
  })

  const filteredTraining = trainingPrograms.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="text-2xl font-bold">{jobListings.length}</div>
              <p className="text-xs text-muted-foreground">
                {jobListings.filter((job) => job.featured).length} featured positions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Programs</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trainingPrograms.length}</div>
              <p className="text-xs text-muted-foreground">Available this quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Career Resources</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources.length}</div>
              <p className="text-xs text-muted-foreground">Free downloads available</p>
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
            {/* Job Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Find Your Next Opportunity</CardTitle>
                <CardDescription>Filter jobs by location, category, and type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Locations</SelectItem>
                      <SelectItem value="Nairobi">Nairobi</SelectItem>
                      <SelectItem value="Mombasa">Mombasa</SelectItem>
                      <SelectItem value="Kisumu">Kisumu</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      <SelectItem value="Journalism">Journalism</SelectItem>
                      <SelectItem value="Digital Media">Digital Media</SelectItem>
                      <SelectItem value="Broadcasting">Broadcasting</SelectItem>
                      <SelectItem value="Communications">Communications</SelectItem>
                      <SelectItem value="Production">Production</SelectItem>
                      <SelectItem value="Public Relations">Public Relations</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Job Listings */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={`hover:shadow-lg transition-shadow duration-200 ${job.featured ? "border-[var(--amwik-purple)] border-2" : ""}`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          {job.featured && <Badge className="bg-[var(--amwik-purple)] text-white">Featured</Badge>}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{job.category}</Badge>
                          <span className="text-sm font-medium text-[var(--amwik-green)]">{job.salary}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="mt-1">Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Benefits:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Training Programs Tab */}
          <TabsContent value="training">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Professional Development</CardTitle>
                <CardDescription>Enhance your skills with our training programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search training programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTraining.map((program) => (
                <Card
                  key={program.id}
                  className={`hover:shadow-lg transition-shadow duration-200 ${program.featured ? "border-[var(--amwik-green)] border-2" : ""}`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{program.title}</CardTitle>
                          {program.featured && <Badge className="bg-[var(--amwik-green)] text-white">Featured</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">{program.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[var(--amwik-purple)]">{program.price}</div>
                        <div className="text-sm text-gray-500">{program.duration}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{program.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Format:</span>
                        <Badge variant="outline">{program.format}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Level:</span>
                        <Badge variant="outline">{program.level}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Start Date:</span>
                        <span>{new Date(program.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Course Modules:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {program.modules.slice(0, 3).map((module, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {module}
                          </li>
                        ))}
                        {program.modules.length > 3 && (
                          <li className="text-[var(--amwik-purple)] text-sm">
                            +{program.modules.length - 3} more modules
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Learn More
                      </Button>
                      <Button className="flex-1 bg-[var(--amwik-green)] hover:bg-green-700">Enroll Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Career Resources Tab */}
          <TabsContent value="resources">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Career Resources</CardTitle>
                <CardDescription>Download guides, reports, and tools to advance your career</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{resource.type}</Badge>
                          <Badge variant="outline">{resource.category}</Badge>
                        </div>
                      </div>
                      <FileText className="h-8 w-8 text-[var(--amwik-blue)]" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{resource.description}</p>

                    <Button className="w-full bg-[var(--amwik-blue)] hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Success Stories Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--amwik-purple)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[var(--amwik-purple)]" />
              </div>
              <h4 className="text-lg font-semibold mb-2">150+ Job Placements</h4>
              <p className="text-gray-600">
                AMWIK members have successfully secured positions in leading media organizations across Kenya and
                beyond.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--amwik-green)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-[var(--amwik-green)]" />
              </div>
              <h4 className="text-lg font-semibold mb-2">500+ Trained</h4>
              <p className="text-gray-600">
                Over 500 women have enhanced their skills through our comprehensive training programs and workshops.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--amwik-blue)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-[var(--amwik-blue)]" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Career Advancement</h4>
              <p className="text-gray-600">
                85% of our members report career advancement within two years of joining AMWIK programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
