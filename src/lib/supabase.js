import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kzplrjpqtpjmabsyoznl.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cGxyanBxdHBqbWFic3lvem5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDg3MjUsImV4cCI6MjA3MDMyNDcyNX0.K2FpR6k5rs8VKflKltB_x9RRVCt1oURRi4W14Dhd6Oc'

export const supabase = createClient(supabaseUrl, supabaseKey)

