// models/HistoricalMember.ts
export interface HistoricalMember {
  _id?: string
  name: string
  organisation: string
  email: string
  phone: string
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
  phone: ['phone', 'Phone', 'phone_number', 'Phone Number', 'contact', 'Contact', 'mobile', 'Mobile']
}

// Sample CSV format documentation
export const csvFormat = `
Expected CSV Format:
1. Headers (first row): name, organisation, email, phone
2. Data rows with corresponding values

Alternative accepted column names:
- Name: name, Name, full_name, Full Name, member_name, Member Name
- Organisation: organisation, organization, Organisation, Organization, company, Company
- Email: email, Email, email_address, Email Address, e-mail, E-mail
- Phone: phone, Phone, phone_number, Phone Number, contact, Contact, mobile, Mobile

Sample CSV:
name,organisation,email,phone
John Doe,ABC Media,john@example.com,+254700123456
Jane Smith,XYZ Broadcasting,jane@example.com,+254711234567
`