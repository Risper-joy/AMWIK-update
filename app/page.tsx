import Navigation from "@/components/navigation"
import HeroSlideshow from "@/components/hero-slideshow"
import StatsCards from "@/components/stats-cards"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, BookOpen, Calendar, Award, User, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample blog data with updated AMWIK content
const featuredBlogs = [
  {
    id: 1,
    title: "AMWIK Spotlight: Cynthia Gichiri's Fearless Pursuit of Truth in Investigative Journalism",
    excerpt:
      "AMWIK recently sat down with award-winning investigative journalist and member Cynthia Gichiri, who shared the inspiring story of her 14-year journey in journalism—marked by resilience, groundbreaking exposés, and an unwavering commitment to truth.",
    author: "AMWIK Editorial Team",
    date: "2024-01-15",
    category: "Member Spotlight",
    readTime: "8 min read",
    image: "https://amwik.org/wp-content/uploads/2025/07/Screenshot-2025-07-28-145358.png",
  },
  {
    id: 2,
    title:
      "\"Children Are Today's Change-Makers\": Young Kenyan Climate Champion Shines at Africa's Largest Clean Air Forum",
    excerpt:
      'At just 12 years old, Karen Wanjiru Kimani stood before an audience of scientists, policymakers, and environmental leaders from across the continent with a powerful call to climate action. "We do not inherit the earth from our ancestors; we borrow it from our children."',
    author: "Grace Mutindi",
    date: "2024-01-10",
    category: "Climate Action",
    readTime: "6 min read",
    image: "https://amwik.org/wp-content/uploads/2025/08/bansah-photography-_Z6cPckgB2o-unsplash-870x410.jpg",
  },
  {
    id: 3,
    title: "Nurturing Future Storytellers: AMWIK Engages Aspiring Journalists at JSAK Forum",
    excerpt:
      "Association of Media Women in Kenya (AMWIK) participated in the Journalist Students Association of Kenya (JSAK) Forum, hosted at Kenya Methodist University (KeMU). The forum brought together vibrant student leaders from universities across Kenya offering media and communication studies.",
    author: "Mary Kiprotich",
    date: "2024-01-08",
    category: "Education & Training",
    readTime: "5 min read",
    image: "https://amwik.org/wp-content/uploads/2025/07/IMG_6930-870x410.jpg",
  },
]

// Sample events data (first 3 from events page)
const upcomingEvents = [
  {
    id: 1,
    title: "MEDIA CAPACITY WORKSHOP ON GENDER RESPONSIVE PROCUREMENT",
    description:
      "Join UN WOMEN For a sesion on Gender responsive Procurement",
    date: "2024-03-15",
    time: "09:00 AM - 05:00 PM",
    location: "IbiStyle, Nairobi",
    type: "Conference",
    capacity: 300,
    registered: 245,
    image: "https://amwik.org/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-15-at-9.34.46-AM-955x530.jpeg",
  },
  {
    id: 2,
    title: "ENHANCING NATURE CRIMES REPORTING AND COMMUNITY AWARENESS",
    description:
      "Learn the role of media in reporting nature crimes and enhancing community awareness.",
    date: "2024-02-28",
    time: "10:00 AM - 04:00 PM",
    location: "Kajiado",
    type: "Workshop",
    capacity: 50,
    registered: 38,
    price: "Free",
    image: "https://amwik.org/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-15-at-09.33.59_05600a43-955x530.jpg",
  },
  {
    id: 3,
    title: "Gender Policies Meeting",
    description:
      "Join us for a meeting to discuss and Gender Policies in Kenya.",
    date: "2024-02-20",
    time: "06:00 PM - 08:00 PM",
    location: "Kusyombunguo,Makueni",
    type: "in-Person",
    capacity: 200,
    registered: 156,
    price: "Free",
    image: "https://amwik.org/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-23.06.23_7ef5f271.jpg",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSlideshow />
      <StatsCards />

      {/* Join Our Community Section */}
      <section className="py-16 bg-[var(--amwik-purple)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of a network that's transforming media landscapes and empowering women across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership/new">
              <Button size="lg" className="bg-[var(--amwik-orange)] hover:bg-orange-600">
                Become a Member
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-[var(--amwik-purple)] bg-transparent"
              >
                Upcoming Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600">Comprehensive initiatives designed to empower women in media</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[var(--amwik-red)]" />
                </div>
                <CardTitle className="text-lg">Gender and Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Promoting gender equality and women's participation in governance and decision-making processes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-[var(--amwik-green)]" />
                </div>
                <CardTitle className="text-lg">Media Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Building capacity and skills for women journalists through training and professional development.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-lg">Economic Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Supporting women's economic independence through entrepreneurship and financial literacy programs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-[var(--amwik-blue)]" />
                </div>
                <CardTitle className="text-lg">Health & Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advocating for sexual health and reproductive rights through media awareness and education.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/about/programs">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
                View All Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600">Insights, stories, and perspectives from women in media</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[var(--amwik-purple)]">{post.category}</Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg hover:text-[var(--amwik-purple)] transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{post.readTime}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
                Read More Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Join us at our latest conferences, workshops, and networking events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[var(--amwik-blue)]">{event.type}</Badge>
                  {event.price === "Free" && <Badge className="absolute top-4 right-4 bg-green-500">Free</Badge>}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* Date and Time */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 ml-4 mr-2" />
                      <span>{event.time}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>

                    {/* Capacity and Price */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>
                          {event.registered}/{event.capacity} registered
                        </span>
                      </div>
                      <div className="font-semibold text-[var(--amwik-purple)]">{event.price}</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[var(--amwik-purple)] h-2 rounded-full"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      ></div>
                    </div>

                    {/* Register Button */}
                    <Button className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700">Register Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/events">
              <Button className="bg-[var(--amwik-purple)] hover:bg-purple-700">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
