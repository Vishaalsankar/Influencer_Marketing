
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ysiuxthjpmslgrxyibii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzaXV4dGhqcG1zbGdyeHlpYmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTEzMTAsImV4cCI6MjA2MDE4NzMxMH0.WwBKEqsolXhGmkTCf5zWzEAr8rWz5oSpPeqr9MxzQvU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createMockMessages = async () => {
  try {
    // Sample users from our auth context
    const users = [
      { user_id: "1", name: "Admin User", role: "admin" },
      { user_id: "2", name: "Brand User", role: "brand" },
      { user_id: "3", name: "Influencer User", role: "influencer" }
    ];
    
    // Add profiles if they don't exist
    for (const user of users) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', user.user_id)
        .single();
      
      if (!existingProfile) {
        await supabase
          .from('profiles')
          .insert({
            user_id: user.user_id,
            name: user.name,
            role: user.role,
            profile_image: user.user_id === "3" ? "https://source.unsplash.com/random/200x200/?person" : "/placeholder.svg"
          });
      }
    }

    // Check if messages exist
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true });
    
    if (count && count > 0) {
      console.log('Messages already exist, skipping mock data creation');
      return;
    }

    // Create sample messages
    const mockMessages = [
      {
        sender_id: "2", // Brand
        receiver_id: "3", // Influencer
        content: "Hi there! I'd like to discuss a potential campaign.",
        sender_role: "brand"
      },
      {
        sender_id: "3", // Influencer
        receiver_id: "2", // Brand
        content: "Hello! I'd be interested in hearing more about your campaign.",
        sender_role: "influencer"
      },
      {
        sender_id: "2", // Brand
        receiver_id: "3", // Influencer
        content: "Great! We're launching a new product line and looking for influencers to promote it.",
        sender_role: "brand"
      }
    ];
    
    await supabase.from('messages').insert(mockMessages);
    console.log('Mock data created successfully');
  } catch (error) {
    console.error('Error in createMockMessages:', error);
  }
};
