import mongoose, { Schema, Document, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  type: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  timezone: string;
  venue: string;
  address: string;
  city: string;
  country: string;
  virtualLink: string;
  virtualPlatform: string;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  capacity: number;
  registrationRequired: boolean;
  registrationDeadline: Date;
  price: number;
  currency: string;
  earlyBirdPrice: number;
  earlyBirdDeadline: Date;
  tags: string[];
  featuredImage?: string;
  status: string;
  featured: boolean;
  allowWaitlist: boolean;
  sendReminders: boolean;
  metaTitle: string;
  metaDescription: string;
  createdDate: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    fullDescription: String,
    category: String,
    type: String,
    startDate: Date,
    endDate: Date,
    startTime: String,
    endTime: String,
    timezone: String,
    venue: String,
    address: String,
    city: String,
    country: String,
    virtualLink: String,
    virtualPlatform: String,
    organizer: String,
    contactEmail: String,
    contactPhone: String,
    capacity: Number,
    registrationRequired: Boolean,
    registrationDeadline: Date,
    price: Number,
    currency: String,
    earlyBirdPrice: Number,
    earlyBirdDeadline: Date,
    tags: [String], // ✅ fixed
    featuredImage: String,
    status: String,
    featured: Boolean,
    allowWaitlist: Boolean,
    sendReminders: Boolean,
    metaTitle: String,
    metaDescription: String,
    createdDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Event = models.Event || mongoose.model<IEvent>("Event", EventSchema);
export default Event;
