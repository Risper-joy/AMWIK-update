// models/HistoricalMember.ts
export interface HistoricalMember {
  _id?: string
  name: string
  organisation: string
  email: string
  phone: string
  // ADDED: New field for membership number
  membershipNumber: string 
  year: string
  uploadDate: string
  createdAt?: Date
  updatedAt?: Date
}

// MongoDB Collection Schema
export const historicalMembersSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "year", "uploadDate"],
      properties: {
        name: {
          bsonType: "string",
          description: "Member's full name - required"
        },
        organisation: {
          bsonType: "string",
          description: "Member's organization/company name"
        },
        email: {
          bsonType: "string",
          description: "Member's email address"
        },
        phone: {
          bsonType: "string",
          description: "Member's phone number"
        },
        // ADDED: Membership Number Schema property
        membershipNumber: {
          bsonType: "string",
          description: "Member's unique membership number"
        },
        year: {
          bsonType: "string",
          description: "Year of membership - required"
        },
        uploadDate: {
          bsonType: "string",
          description: "Date when the record was uploaded - required"
        },
        createdAt: {
          bsonType: "date",
          description: "Record creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Record last update timestamp"
        }
      }
    }
  }
}

// CSV Column Mapping
export const csvColumnMappings = {
  name: ['name', 'Name', 'full_name', 'Full Name', 'member_name', 'Member Name'],
  organisation: ['organisation', 'organization', 'Organisation', 'Organization', 'company', 'Company'],
  email: ['email', 'Email', 'email_address', 'Email Address', 'e-mail', 'E-mail'],
  phone: ['phone', 'Phone', 'phone_number', 'Phone Number', 'contact', 'Contact', 'mobile', 'Mobile'],
  // ADDED: Mappings for Membership Number
  membershipNumber: ['membershipNumber', 'membership_number', 'Membership Number', 'member_no', 'Member No']
}

// Sample CSV format documentation
export const csvFormat = `
Expected CSV Format:
1. Headers (first row): name, organisation, email, phone, membershipNumber
2. Data rows with corresponding values

Alternative accepted column names:
- Name: name, Name, full_name, Full Name, member_name, Member Name
- Organisation: organisation, organization, Organisation, Organization, company, Company
- Email: email, Email, email_address, Email Address, e-mail, E-mail
- Phone: phone, Phone, phone_number, Phone Number, contact, Contact, mobile, Mobile
- Membership Number: membershipNumber, membership_number, Membership Number, member_no, Member No
`