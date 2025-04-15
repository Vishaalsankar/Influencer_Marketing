import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ContactsList from "@/components/chat/ContactsList";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  sender_role: string;
};

type Contact = {
  user_id: string;
  name: string;
  role: string;
  profile_image: string | null;
};

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Get contact info from URL params if available
  useEffect(() => {
    const contactId = searchParams.get("contact");
    const contactName = searchParams.get("name");
    
    if (contactId && contactName) {
      const preselectedContact = {
        user_id: contactId,
        name: decodeURIComponent(contactName),
        role: user?.role === "brand" ? "influencer" : "brand",
        profile_image: null
      };
      
      setSelectedContact(preselectedContact);
      
      // Show toast to indicate starting a new conversation
      toast({
        title: "Starting conversation",
        description: `You can now chat with ${decodeURIComponent(contactName)}`,
      });
    }
  }, [searchParams, user?.role, toast]);

  // Initialize contacts based on user role
  useEffect(() => {
    if (user) {
      const fetchContacts = async () => {
        try {
          // Get profiles based on role
          const targetRole = user.role === "brand" ? "influencer" : "brand";
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', targetRole);
          
          if (profilesError) throw profilesError;
          
          if (profilesData) {
            const contactsData = profilesData.map(profile => ({
              user_id: profile.user_id,
              name: profile.name,
              role: profile.role,
              profile_image: profile.profile_image
            }));
            
            setContacts(contactsData);
          }
        } catch (error) {
          console.error("Error fetching contacts:", error);
          toast({
            title: "Error",
            description: "Failed to load contacts",
            variant: "destructive",
          });
        }
      };
      
      fetchContacts();
    }
  }, [user, toast]);

  // Load messages when contact is selected
  useEffect(() => {
    if (selectedContact && user) {
      const fetchMessages = async () => {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user.user_id},receiver_id.eq.${selectedContact.user_id}),and(sender_id.eq.${selectedContact.user_id},receiver_id.eq.${user.user_id})`)
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error("Error fetching messages:", error);
          toast({
            title: "Error",
            description: "Failed to load messages",
            variant: "destructive",
          });
          return;
        }
        
        if (data) {
          setMessages(data.map(msg => ({
            ...msg,
            id: msg.id.toString()
          })));
        }
      };
      
      fetchMessages();
      
      // Subscribe to new messages
      const channel = supabase
        .channel('messages')
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `or(and(sender_id=eq.${user.user_id},receiver_id=eq.${selectedContact.user_id}),and(sender_id=eq.${selectedContact.user_id},receiver_id=eq.${user.user_id}))` 
        }, (payload) => {
          // Add the new message to the existing messages
          const newMsg = payload.new as Message;
          setMessages(prev => [...prev, newMsg]);
        })
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedContact, user, toast]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedContact && user) {
      try {
        const { error } = await supabase
          .from('messages')
          .insert({
            sender_id: user.user_id,
            receiver_id: selectedContact.user_id,
            content: newMessage,
            sender_role: user.role
          });
        
        if (error) throw error;
        
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        toast({
          title: "Error",
          description: "Failed to send message",
          variant: "destructive",
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MainLayout requiredRole={user?.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with {user?.role === "brand" ? "influencers" : "brands"}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 h-[calc(80vh-120px)]">
          <ContactsList
            contacts={contacts}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />
          
          <Card className="md:col-span-2 overflow-hidden flex flex-col">
            <MessageList
              messages={messages}
              selectedContact={selectedContact}
              currentUserId={user?.user_id}
            />
            {selectedContact && (
              <MessageInput
                newMessage={newMessage}
                onMessageChange={setNewMessage}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
              />
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
