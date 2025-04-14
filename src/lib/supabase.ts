
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ysiuxthjpmslgrxyibii.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaXV4dGhqcG1zbGdyeHlpYmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTEzMTAsImV4cCI6MjA2MDE4NzMxMH0.WwBKEqsolXhGmkTCf5zWzEAr8rWz5oSpPeqr9MxzQvU';

// Initialize the Supabase client with URL validation
if (!supabaseUrl) {
  console.error('Supabase URL is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
