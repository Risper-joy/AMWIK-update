"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import HeroSection from "@/components/hero-section"
import { Check, CreditCard, Smartphone, Building, RefreshCw } from "lucide-react"

const membershipTypes = [
  {
    type: "Full Membership",
    price: "KES 3,000",
    duration: "Annual",
    benefits: [
      "Full voting rights",
      "Access to all training programs",
      "Priority event registration",
      "Networking opportunities",
      "Career development resources",
      "Mentorship programs",
    ],
  },
  {
    type: "Associate Membership",
    price: "KES 1,500",
    duration: "Annual",
    benefits: [
      "Access to training programs",
      "Event participation",
      "Networking opportunities",
      "Career resources",
      "Newsletter subscription",
    ],
  },
  
]

export default function RenewMembershipPage() {
  const [formData, setFormData] = useState({
    // Current Member Information
    membershipNumber: "",
    currentMembershipType: "",

    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "Kenyan",
    idNumber: "",

    // Contact Information
    address: "",
    city: "",
    county: "",
    postalCode: "",

    // Professional Information
    organization: "",
    position: "",
    workAddress: "",
    workPhone: "",
    workEmail: "",
    yearsOfExperience: "",
    mediaExperience: "",

    // Membership Details
    membershipType: "",
    renewalPeriod: "1-year",

    // Interests and Involvement
    interests: [] as string[],
    volunteerInterest: false,
    mentorshipInterest: false,

    // Payment Information
    paymentMethod: "",

    // Additional Information
    specialRequests: "",
    referralSource: "",

    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    communicationConsent: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Membership renewal submitted:", formData)
    // Handle form submission
  }

  const selectedMembership = membershipTypes.find((m) => m.type === formData.membershipType)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        title="Renew Your Membership"
        description="Continue your journey with AMWIK and maintain access to all member benefits"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Current Membership Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-[var(--amwik-purple)]" />
                Current Membership Information
              </CardTitle>
              <CardDescription>Please provide your current membership details for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="membershipNumber">Membership Number *</Label>
                  <Input
                    id="membershipNumber"
                    value={formData.membershipNumber}
                    onChange={(e) => handleInputChange("membershipNumber", e.target.value)}
                    placeholder="e.g., AMWIK-2023-001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currentMembershipType">Current Membership Type *</Label>
                  <Select
                    value={formData.currentMembershipType}
                    onValueChange={(value) => handleInputChange("currentMembershipType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select current membership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Membership">Full Membership</SelectItem>
                      <SelectItem value="Associate Membership">Associate Membership</SelectItem>
                      <SelectItem value="Corporate Membership">Corporate Membership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details if any changes have occurred</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => handleInputChange("nationality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kenyan">Kenyan</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="idNumber">ID/Passport Number</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Physical Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City/Town</Label>
                  <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="county">County</Label>
                  <Select value={formData.county} onValueChange={(value) => handleInputChange("county", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nairobi">Nairobi</SelectItem>
                      <SelectItem value="Mombasa">Mombasa</SelectItem>
                      <SelectItem value="Kisumu">Kisumu</SelectItem>
                      <SelectItem value="Nakuru">Nakuru</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Update your current professional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organization">Current Organization *</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Current Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workAddress">Work Address</Label>
                <Input
                  id="workAddress"
                  value={formData.workAddress}
                  onChange={(e) => handleInputChange("workAddress", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workPhone">Work Phone</Label>
                  <Input
                    id="workPhone"
                    value={formData.workPhone}
                    onChange={(e) => handleInputChange("workPhone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="workEmail">Work Email</Label>
                  <Input
                    id="workEmail"
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => handleInputChange("workEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsOfExperience">Years of Professional Experience</Label>
                  <Select
                    value={formData.yearsOfExperience}
                    onValueChange={(value) => handleInputChange("yearsOfExperience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="16+">16+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mediaExperience">Years in Media Industry</Label>
                  <Select
                    value={formData.mediaExperience}
                    onValueChange={(value) => handleInputChange("mediaExperience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="16+">16+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Renewal Options */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Renewal Options</CardTitle>
              <CardDescription>Choose your membership type and renewal period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Select Membership Type *</Label>
                <RadioGroup
                  value={formData.membershipType}
                  onValueChange={(value) => handleInputChange("membershipType", value)}
                  className="mt-3"
                >
                  {membershipTypes.map((membership) => (
                    <div
                      key={membership.type}
                      className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <RadioGroupItem value={membership.type} id={membership.type} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={membership.type} className="font-medium cursor-pointer">
                          {membership.type} - {membership.price}/{membership.duration}
                        </Label>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          {membership.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="renewalPeriod">Renewal Period</Label>
                <Select
                  value={formData.renewalPeriod}
                  onValueChange={(value) => handleInputChange("renewalPeriod", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="2-year">2 Years (5% discount)</SelectItem>
                    <SelectItem value="3-year">3 Years (10% discount)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Updated Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Areas of Interest</CardTitle>
              <CardDescription>Update your areas of interest and involvement preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Professional Interests (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {[
                    "Investigative Journalism",
                    "Digital Media",
                    "Broadcast Journalism",
                    "Print Media",
                    "Media Ethics",
                    "Community Media",
                    "Media Law",
                    "Public Relations",
                    "Media Entrepreneurship",
                    "Documentary Production",
                    "Social Media",
                    "Media Training",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm cursor-pointer">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="volunteerInterest"
                    checked={formData.volunteerInterest}
                    onCheckedChange={(checked) => handleInputChange("volunteerInterest", checked)}
                  />
                  <Label htmlFor="volunteerInterest">I'm interested in volunteering for AMWIK activities</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mentorshipInterest"
                    checked={formData.mentorshipInterest}
                    onCheckedChange={(checked) => handleInputChange("mentorshipInterest", checked)}
                  />
                  <Label htmlFor="mentorshipInterest">
                    I'm interested in mentorship opportunities (as mentor or mentee)
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-[var(--amwik-green)]" />
                Payment Information
              </CardTitle>
              <CardDescription>
                {selectedMembership && (
                  <span className="font-medium text-[var(--amwik-purple)]">
                    Total Amount: {selectedMembership.price}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Payment Method *</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <Label htmlFor="mpesa" className="cursor-pointer">
                      M-Pesa Mobile Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <Building className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="bank" className="cursor-pointer">
                      Bank Transfer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <Label htmlFor="card" className="cursor-pointer">
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="specialRequests">Special Requests or Comments</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Any special accommodations, requests, or additional information..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="referralSource">How did you hear about AMWIK renewal?</Label>
                <Select
                  value={formData.referralSource}
                  onValueChange={(value) => handleInputChange("referralSource", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email reminder</SelectItem>
                    <SelectItem value="website">AMWIK website</SelectItem>
                    <SelectItem value="social-media">Social media</SelectItem>
                    <SelectItem value="colleague">Colleague/Friend</SelectItem>
                    <SelectItem value="event">AMWIK event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                  required
                />
                <Label htmlFor="termsAccepted" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="/terms" className="text-[var(--amwik-purple)] hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and confirm that the information provided is accurate and complete.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked)}
                  required
                />
                <Label htmlFor="privacyAccepted" className="text-sm leading-relaxed">
                  I acknowledge that I have read and understood the{" "}
                  <a href="/privacy" className="text-[var(--amwik-purple)] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="communicationConsent"
                  checked={formData.communicationConsent}
                  onCheckedChange={(checked) => handleInputChange("communicationConsent", checked)}
                />
                <Label htmlFor="communicationConsent" className="text-sm leading-relaxed">
                  I consent to receiving communications from AMWIK about membership benefits, events, and organizational
                  updates.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="bg-[var(--amwik-purple)] hover:bg-purple-700 px-12 py-3"
              disabled={!formData.termsAccepted || !formData.privacyAccepted}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Renew Membership
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
