import mongoose, { Schema, Document } from "mongoose";

export interface IRenewal extends Document {
  membershipNumber: string;
  currentMembershipType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  idNumber?: string;
  address?: string;
  city?: string;
  county?: string;
  postalCode?: string;
  organization: string;
  position: string;
  workAddress?: string;
  workPhone?: string;
  workEmail?: string;
  yearsOfExperience?: string;
  mediaExperience?: string;
  membershipType: string;
  renewalPeriod: string;
  interests: string[];
  volunteerInterest: boolean;
  mentorshipInterest: boolean;
  paymentMethod: string;
  specialRequests?: string;
  referralSource?: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  communicationConsent: boolean;
  status: string;
  renewalDate: Date;
  newExpiry: Date;
  createdAt: Date;
}

const RenewalSchema = new Schema<IRenewal>({
  membershipNumber: { type: String, required: true },
  currentMembershipType: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: String,
  nationality: String,
  idNumber: String,
  address: String,
  city: String,
  county: String,
  postalCode: String,
  organization: { type: String, required: true },
  position: { type: String, required: true },
  workAddress: String,
  workPhone: String,
  workEmail: String,
  yearsOfExperience: String,
  mediaExperience: String,
  membershipType: String,
  renewalPeriod: String,
  interests: [String],
  volunteerInterest: Boolean,
  mentorshipInterest: Boolean,
  paymentMethod: String,
  specialRequests: String,
  referralSource: String,
  termsAccepted: Boolean,
  privacyAccepted: Boolean,
  communicationConsent: Boolean,
  status: { type: String, default: "Active" },
  renewalDate: { type: Date, default: Date.now },
  newExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Renewal || mongoose.model<IRenewal>("Renewal", RenewalSchema);
