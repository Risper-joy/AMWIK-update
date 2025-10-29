// models/TeamMember.ts

import { ObjectId } from "mongodb"

/**
 * Interface for a Team Member document stored in MongoDB.
 * Now supporting three distinct teams.
 */
export interface TeamMember {
  _id?: ObjectId | string
  name: string
  position: string
  // Updated 'team' field to support three distinct categories
  team: 'secretariat' | 'board_directors' | 'board_trustees' 
  image: string // URL or path to the image
  bio: string
  email: string
  phone: string
  linkedin?: string
  twitter?: string
  expertise: string[] // Array of strings (from comma-separated input)
  joinDate?: string // Date member joined (ISO String or simple date string)
  status?: 'active' | 'inactive' | 'on leave' // Member's current status
  createdAt?: Date
  updatedAt?: Date
}

// Optional: MongoDB Schema for Collection Validation
export const teamMemberSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "position", "team", "bio", "email", "phone", "expertise"],
      properties: {
        name: { bsonType: "string" },
        position: { bsonType: "string" },
        team: { 
          bsonType: "string", 
          // Updated enum list
          enum: ["secretariat", "board_directors", "board_trustees"], 
          description: "The team (secretariat, board_directors, or board_trustees) - required"
        },
        email: { bsonType: "string" },
        phone: { bsonType: "string" },
        expertise: { bsonType: "array", items: { bsonType: "string" } },
        joinDate: { bsonType: "string" },
        status: { bsonType: "string", enum: ["active", "inactive", "on leave"] },
      }
    }
  }
}