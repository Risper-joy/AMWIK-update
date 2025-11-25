import mongoose, { Document, Schema, Model } from 'mongoose'

/**
 * Interface for a Team Member document
 */
export interface ITeamMember extends Document {
  name: string
  position: string
  team: 'secretariat' | 'board_directors' | 'board_trustees'
  image: string
  bio: string
  email: string
  phone: string
  linkedin?: string
  twitter?: string
  expertise: string[]
  joinDate?: Date
  status: 'active' | 'inactive' | 'on leave'
  createdAt?: Date
  updatedAt?: Date
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [100, 'Position cannot exceed 100 characters'],
    },
    team: {
      type: String,
      enum: ['secretariat', 'board_directors', 'board_trustees'],
      required: [true, 'Team is required'],
      lowercase: true,
    },
    image: {
      type: String,
      default: '',
      // FIX 1: Removed the strict Regex that required specific file extensions.
      // Cloudinary URLs often have versions or params that broke the previous regex.
      validate: {
        validator: function (v: string) {
          // Allow empty string OR a valid URL format
          if (!v) return true
          return v.startsWith('http')
        },
        message: 'Image must be a valid URL starting with http/https',
      },
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      maxlength: [2000, 'Bio cannot exceed 2000 characters'], // Increased limit for longer bios
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // This creates a unique index in MongoDB
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      maxlength: [50, 'Phone cannot exceed 50 characters'], // Increased to handle international formats
    },
    linkedin: {
      type: String,
      trim: true,
      default: '',
    },
    twitter: {
      type: String,
      trim: true,
      default: '',
    },
    expertise: {
      // FIX 2: Simplified array definition
      type: [String],
      default: [],
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on leave'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

// FIX 3: Prevent Model Overwrite Error in Next.js Hot Reloading
// If the model exists, delete it before redefining (optional, but safer in dev)
// OR simpler: just check if it exists.
const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)

export default TeamMember