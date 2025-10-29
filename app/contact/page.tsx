"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HeroSection from "@/components/hero-section"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, HelpCircle, Users, Calendar } from "lucide-react"

const contactInfo = {
  address: "AMWIK House, Ngong Road, Nairobi, Kenya",
  phone: "+254 722-201958 |  +254 737-201958",
  email: "info@amwik.org",
  hours: "Monday - Friday: 8:00 AM - 5:00 PM",
}

const departments = [
  { name: "General Inquiries", email: "info@amwik.org", description: "General questions about AMWIK" },
  { name: "Membership", email: "info@amwik.org", description: "Membership applications and renewals" },
  { name: "Training & Programs", email: "info@amwik.org", description: "Training programs and workshops" },
  { name: "Events", email: "info@amwik.org", description: "Event registrations and inquiries" },
  { name: "Media & Communications", email: "info@amwik.org", description: "Press inquiries and media relations" },
  { name: "Partnerships", email: "info@amwik.org", description: "Partnership and collaboration opportunities" },
]

const faqs = [
  {
    question: "How do I become a member of AMWIK?",
    answer:
      "To become a member, you can apply online through our membership application form. We offer different membership categories including Full Membership and Associate Membership",
  },
  {
    question: "What are the membership fees?",
    answer:
      "Membership fees vary by category: Full Membership is KES 3,000 annually, Associate Membership is KES 1,500 annually, and Corporate Membership is KES 15,000 annually.",
  },
  {
    question: "What training programs do you offer?",
    answer:
      "We offer training programs in Digital Journalism, Investigative Reporting, Media Ethics, Leadership Development, and more. Programs are offered both online and in-person.",
  },
  {
    question: "How can I attend AMWIK events?",
    answer:
      "AMWIK events are announced on our website, social media, and member newsletters. Members get priority registration and discounted rates.",
  },
  {
    question: "Do you offer mentorship programs?",
    answer:
      "Yes, we have a mentorship program pairing experienced media professionals with emerging journalists, including one-on-one and group sessions.",
  },
  {
    question: "How can my organization partner with AMWIK?",
    answer:
      "We welcome partnerships in sponsoring events, training, internships, and collaborative projects. Contact our partnerships team to learn more.",
  },
  {
    question: "What support do you provide for freelance journalists?",
    answer:
      "We offer networking, business skills training, legal workshops, and advocate for fair conditions for freelance media professionals.",
  },
  {
    question: "How do I access career development resources?",
    answer:
      "Members can access our Career Center, including job listings, guides, interview prep, and career counseling.",
  },
  
  {
    question: "How do I report harassment or discrimination?",
    answer:
      "We provide confidential reporting and legal support for harassment cases. Contact our support team directly for assistance.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    department: "",
    message: "",
    urgency: "normal",
    preferredContact: "email",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Handle form submission (API, email, etc.)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          title="Contact Us"
          description="Get in touch with AMWIK - we're here to help and answer your questions"
          backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-[var(--amwik-purple)]" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+254 7XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organization">Organization/Company</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        placeholder="Your organization or company name"
                      />
                    </div>

                    {/* Inquiry Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleInputChange("department", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.name} value={dept.name}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgency">Urgency Level</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - General inquiry</SelectItem>
                            <SelectItem value="normal">Normal - Standard response</SelectItem>
                            <SelectItem value="high">High - Urgent matter</SelectItem>
                            <SelectItem value="critical">Critical - Immediate attention needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide detailed information about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                      <Select
                        value={formData.preferredContact}
                        onValueChange={(value) => handleInputChange("preferredContact", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="any">Any method</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Get in touch with us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-[var(--amwik-purple)] mt-0.5" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-gray-600">{contactInfo.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-[var(--amwik-green)] mt-0.5" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-gray-600">{contactInfo.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-[var(--amwik-blue)] mt-0.5" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600">{contactInfo.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-[var(--amwik-orange)] mt-0.5" />
                    <div>
                      <div className="font-medium">Office Hours</div>
                      <div className="text-sm text-gray-600">{contactInfo.hours}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Contacts</CardTitle>
                  <CardDescription>Direct contact for specific inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((dept) => (
                      <div key={dept.name} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="font-medium text-sm">{dept.name}</div>
                        <div className="text-xs text-gray-600 mb-1">{dept.description}</div>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-xs text-[var(--amwik-purple)] hover:underline"
                        >
                          {dept.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common requests and actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Apply for Membership
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Register for Events
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Join Our Newsletter
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Report an Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-[var(--amwik-blue)]" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find answers to common questions about AMWIK</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

        {/* Map Section */}
<div className="mt-16">
  <Card>
    <CardHeader>
      <CardTitle>Find Us</CardTitle>
      <CardDescription>Visit our office in Nairobi</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31741.XXXXXXX!2d36.801246!3d-1.303191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182fxxxxxxxxxxx%3A0xyyyyyyyyyyyyyyyy!2sMbaruk%20Road%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1693000000000!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="text-sm mt-2 text-center">AMWIK, Mbaruk Road, Nairobi</p>
    </CardContent>
  </Card>
</div>
</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
