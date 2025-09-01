import mongoose, { Schema, Document, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  type: string;
  startDate: string;
  endDate: string;
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
  capacity: string;
  registrationRequired: boolean;
  registrationDeadline: string;
  price: string;
  currency: string;
  earlyBirdPrice: string;
  earlyBirdDeadline: string;
  tags: string;
  featuredImage?: string;
  status: string;
  featured: boolean;
  allowWaitlist: boolean;
  sendReminders: boolean;
  metaTitle: string;
  metaDescription: string;
  createdDate: string;
}

const EventSchema: Schema = new Schema(
  {
    title: String,
    description: String,
    fullDescription: String,
    category: String,
    type: String,
    startDate: String,
    endDate: String,
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
    capacity: String,
    registrationRequired: Boolean,
    registrationDeadline: String,
    price: String,
    currency: String,
    earlyBirdPrice: String,
    earlyBirdDeadline: String,
    tags: String,
    featuredImage: String,
    status: String,
    featured: Boolean,
    allowWaitlist: Boolean,
    sendReminders: Boolean,
    metaTitle: String,
    metaDescription: String,
    createdDate: String,
  },
  { timestamps: true }
);

const Event = models.Event || mongoose.model<IEvent>("Event", EventSchema);
export default Event;
