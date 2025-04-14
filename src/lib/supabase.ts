
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ysiuxthjpmslgrxyibii.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaXV4dGhqcG1zbGdyeHlpYmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTEzMTAsImV4cCI6MjA2MDE4NzMxMH0.WwBKEqsolXhGmkTCf5zWzEAr8rWz5oSpPeqr9MxzQvU';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create mock data functions
export const createMockMessages = async () => {
  // Check if messages table already has data
  const { count } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true });
  
  if (count && count > 0) {
    console.log('Messages already exist, skipping mock data creation');
    return;
  }
  
  // Sample users from our auth context
  const users = [
    { user_id: "1", name: "Admin User", role: "admin" },
    { user_id: "2", name: "Brand User", role: "brand" },
    { user_id: "3", name: "Influencer User", role: "influencer" }
  ];
  
  // Create sample messages
  const mockMessages = [
    {
      sender_id: "2", // Brand
      receiver_id: "3", // Influencer
      content: "Hi there! I'd like to discuss a potential campaign.",
      sender_role: "brand",
      created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      sender_id: "3", // Influencer
      receiver_id: "2", // Brand
      content: "Hello! I'd be interested in hearing more about your campaign.",
      sender_role: "influencer",
      created_at: new Date(Date.now() - 82800000).toISOString() // 23 hours ago
    },
    {
      sender_id: "2", // Brand
      receiver_id: "3", // Influencer
      content: "Great! We're launching a new product line and looking for influencers to promote it.",
      sender_role: "brand",
      created_at: new Date(Date.now() - 79200000).toISOString() // 22 hours ago
    },
    {
      sender_id: "3", // Influencer
      receiver_id: "2", // Brand
      content: "That sounds exciting! What kind of content are you looking for?",
      sender_role: "influencer",
      created_at: new Date(Date.now() - 72000000).toISOString() // 20 hours ago
    },
    {
      sender_id: "2", // Brand
      receiver_id: "3", // Influencer
      content: "We're thinking about unboxing videos and lifestyle content showing the product in use.",
      sender_role: "brand",
      created_at: new Date(Date.now() - 36000000).toISOString() // 10 hours ago
    }
  ];
  
  // Add messages to the database
  const { error } = await supabase.from('messages').insert(mockMessages);
  
  if (error) {
    console.error('Error creating mock messages:', error);
    return;
  }
  
  // Insert or update user profiles
  for (const user of users) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.user_id,
        name: user.name,
        role: user.role,
        profile_image: user.user_id === "3" ? "https://source.unsplash.com/random/200x200/?person" : "/placeholder.svg"
      });
    
    if (profileError) {
      console.error('Error creating mock profile:', profileError);
    }
  }
  
  console.log('Mock data created successfully');
};
