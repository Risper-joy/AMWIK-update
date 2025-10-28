"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewMembershipPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      nationality: "",
      idNumber: "",
    },
    professionalInfo: {
      currentPosition: "",
      organization: "",
      yearsExperience: "",
      mediaType: "",
      specialization: "",
      education: "",
    },
    membershipType: "",
    interests: [] as string[],
    motivation: "",
    references: {
      referee1Name: "",
      referee1Contact: "",
      referee2Name: "",
      referee2Contact: "",
    },
    termsAccepted: false,
  })

  const handleInputChange = (section: keyof typeof formData, field: string, value: any) => {
    if (section === 'interests') {
      setFormData(prev => ({
        ...prev,
        interests: value
      }))
    } else if (section === 'membershipType' || section === 'motivation') {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }))
    } else if (section === 'termsAccepted') {
      setFormData(prev => ({
        ...prev,
        termsAccepted: value
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    }
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = formData.interests
    if (checked) {
      handleInputChange('interests', '', [...currentInterests, interest])
    } else {
      handleInputChange('interests', '', currentInterests.filter(i => i !== interest))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Prepare data for MongoDB (using snake_case to match your schema)
      const memberData = {
        first_name: formData.personalInfo.firstName,
        last_name: formData.personalInfo.lastName,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        date_of_birth: formData.personalInfo.dateOfBirth || null,
        nationality: formData.personalInfo.nationality || null,
        id_number: formData.personalInfo.idNumber || null,
        current_position: formData.professionalInfo.currentPosition,
        organization: formData.professionalInfo.organization,
        years_experience: formData.professionalInfo.yearsExperience || null,
        media_type: formData.professionalInfo.mediaType || null,
        specialization: formData.professionalInfo.specialization || null,
        education: formData.professionalInfo.education || null,
        membership_type: formData.membershipType,
        interests: formData.interests.length > 0 ? formData.interests : [],
        motivation: formData.motivation,
        referee1_name: formData.references.referee1Name || null,
        referee1_contact: formData.references.referee1Contact || null,
        referee2_name: formData.references.referee2Name || null,
        referee2_contact: formData.references.referee2Contact || null,
        status: 'Pending Review',
        terms_accepted: formData.termsAccepted,
        application_date: new Date(),
      }

      // Send data to MongoDB via API route
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      })

      if (!response.ok) {
        // Log the full response for debugging
        const responseText = await response.text()
        console.error('API Response:', responseText)
        
        try {
          const errorData = JSON.parse(responseText)
          throw new Error(errorData.error || errorData.message || 'Failed to submit application')
        } catch {
          throw new Error(`Server error: ${response.status} - ${responseText.substring(0, 100)}`)
        }
      }

      const result = await response.json()

      // Success
      setSubmitStatus({
        type: 'success',
        message: 'Your membership application has been submitted successfully! We will review it and get back to you soon.'
      })

      // Reset form after successful submission
      setTimeout(() => {
        router.push('/')
      }, 3000)

    } catch (error: any) {
      console.error('Error submitting application:', error)
      setSubmitStatus({
        type: 'error',
        message: error.message || 'There was an error submitting your application. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-white py-16">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-5xl font-bold mb-4 text-white">Join AMWIK</h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Become part of Kenya's premier network of women in media. Join us in our mission to empower women
            journalists and transform the media landscape.
          </p>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Membership Benefits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--amwik-purple)]">Professional Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Access to training workshops</li>
                  <li>• Mentorship opportunities</li>
                  <li>• Career guidance and support</li>
                  <li>• Professional certification programs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--amwik-purple)]">Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Connect with industry professionals</li>
                  <li>• Exclusive networking events</li>
                  <li>• Online community platform</li>
                  <li>• Regional chapter meetings</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[var(--amwik-purple)]">Resources & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Research and publications</li>
                  <li>• Legal support and advocacy</li>
                  <li>• Scholarship opportunities</li>
                  <li>• Job placement assistance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Membership Application</CardTitle>
              <CardDescription className="text-center text-lg">
                Please fill out all sections to complete your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Status Alert */}
              {submitStatus.type && (
                <Alert className={`mb-6 ${submitStatus.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <AlertDescription className={submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                    {submitStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--amwik-purple)]">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.personalInfo.dateOfBirth}
                        onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        value={formData.personalInfo.nationality}
                        onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="idNumber">National ID/Passport Number</Label>
                      <Input
                        id="idNumber"
                        value={formData.personalInfo.idNumber}
                        onChange={(e) => handleInputChange('personalInfo', 'idNumber', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--amwik-purple)]">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentPosition">Current Position *</Label>
                      <Input
                        id="currentPosition"
                        value={formData.professionalInfo.currentPosition}
                        onChange={(e) => handleInputChange('professionalInfo', 'currentPosition', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization/Company *</Label>
                      <Input
                        id="organization"
                        value={formData.professionalInfo.organization}
                        onChange={(e) => handleInputChange('professionalInfo', 'organization', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsExperience">Years of Experience</Label>
                      <Select
                        value={formData.professionalInfo.yearsExperience}
                        onValueChange={(value) => handleInputChange('professionalInfo', 'yearsExperience', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mediaType">Media Type</Label>
                      <Select
                        value={formData.professionalInfo.mediaType}
                        onValueChange={(value) => handleInputChange('professionalInfo', 'mediaType', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select media type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="print">Print Media</SelectItem>
                          <SelectItem value="broadcast">Broadcast Media</SelectItem>
                          <SelectItem value="digital">Digital Media</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="specialization">Area of Specialization</Label>
                      <Input
                        id="specialization"
                        value={formData.professionalInfo.specialization}
                        onChange={(e) => handleInputChange('professionalInfo', 'specialization', e.target.value)}
                        placeholder="e.g., Politics, Health, Sports, etc."
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="education">Highest Level of Education</Label>
                      <Input
                        id="education"
                        value={formData.professionalInfo.education}
                        onChange={(e) => handleInputChange('professionalInfo', 'education', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Membership Type */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--amwik-purple)]">Membership Type</h3>
                  <RadioGroup
                    value={formData.membershipType}
                    onValueChange={(value) => handleInputChange('membershipType', '', value)}
                    disabled={isSubmitting}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Full Membership" id="full" />
                      <Label htmlFor="full">Full Membership (KES 3,000/year) - For practicing journalists</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Associate Membership" id="associate" />
                      <Label htmlFor="associate">
                        Associate Membership (KES 1,500/year) - For media students and recent graduates
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Areas of Interest */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--amwik-purple)]">Areas of Interest</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Professional Development",
                      "Networking Events",
                      "Mentorship Programs",
                      "Gender Advocacy",
                      "Media Ethics",
                      "Digital Skills",
                      "Leadership Training",
                      "Research & Publications",
                      "Policy Advocacy",
                    ].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                          disabled={isSubmitting}
                        />
                        <Label htmlFor={interest} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <Label htmlFor="motivation">Why do you want to join AMWIK? *</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Please share your motivation for joining AMWIK and how you hope to contribute to our mission..."
                    className="min-h-[100px]"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', '', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* References */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--amwik-purple)]">References</h3>
                  <p className="text-gray-600 mb-4">Please provide two professional references</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referee1Name">Reference 1 - Name</Label>
                      <Input
                        id="referee1Name"
                        value={formData.references.referee1Name}
                        onChange={(e) => handleInputChange('references', 'referee1Name', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee1Contact">Reference 1 - Contact</Label>
                      <Input
                        id="referee1Contact"
                        value={formData.references.referee1Contact}
                        onChange={(e) => handleInputChange('references', 'referee1Contact', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee2Name">Reference 2 - Name</Label>
                      <Input
                        id="referee2Name"
                        value={formData.references.referee2Name}
                        onChange={(e) => handleInputChange('references', 'referee2Name', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referee2Contact">Reference 2 - Contact</Label>
                      <Input
                        id="referee2Contact"
                        value={formData.references.referee2Contact}
                        onChange={(e) => handleInputChange('references', 'referee2Contact', e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', '', checked as boolean)}
                    required
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the AMWIK terms and conditions and code of conduct *
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[var(--amwik-purple)] hover:bg-purple-700 text-white py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}