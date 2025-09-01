// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface NewMember {
  id?: string
  created_at?: string
  updated_at?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth?: string
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
  status?: string
  application_date?: string
  terms_accepted?: boolean
}
