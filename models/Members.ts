import mongoose from 'mongoose'

export interface IMember extends mongoose.Document {
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth?: Date
  nationality?: string
  id_number?: string
  current_position: string
  organization: string
  years_experience?: string
  media_type?: string
  specialization?: string
  education?: string
  membership_type: string
  interests?: string[]
  motivation: string
  referee1_name?: string
  referee1_contact?: string
  referee2_name?: string
  referee2_contact?: string
  status: string
  terms_accepted: boolean
  application_date: Date
  created_at: Date
  updated_at: Date
}

const MemberSchema = new mongoose.Schema<IMember>({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  date_of_birth: {
    type: Date,
    required: false
  },
  nationality: {
    type: String,
    trim: true
  },
  id_number: {
    type: String,
    trim: true
  },
  current_position: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    required: true,
    trim: true
  },
  years_experience: {
    type: String,
    enum: ['0-2', '3-5', '6-10', '10+'],
    required: false
  },
  media_type: {
    type: String,
    enum: ['print', 'broadcast', 'digital', 'freelance', 'other'],
    required: false
  },
  specialization: {
    type: String,
    trim: true
  },
  education: {
    type: String,
    trim: true
  },
  membership_type: {
    type: String,
    required: true,
    enum: ['Full Membership', 'Associate Membership']
  },
  interests: [{
    type: String,
    enum: [
      'Professional Development',
      'Networking Events',
      'Mentorship Programs',
      'Gender Advocacy',
      'Media Ethics',
      'Digital Skills',
      'Leadership Training',
      'Research & Publications',
      'Policy Advocacy'
    ]
  }],
  motivation: {
    type: String,
    required: true,
    trim: true
  },
  referee1_name: {
    type: String,
    trim: true
  },
  referee1_contact: {
    type: String,
    trim: true
  },
  referee2_name: {
    type: String,
    trim: true
  },
  referee2_contact: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending Review', 'Under Review', 'Approved', 'Rejected'],
    default: 'Pending Review'
  },
  terms_accepted: {
    type: Boolean,
    required: true,
    default: false
  },
  application_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

// Create indexes for better performance
MemberSchema.index({ email: 1 })
MemberSchema.index({ status: 1 })
MemberSchema.index({ application_date: -1 })

export default mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema)