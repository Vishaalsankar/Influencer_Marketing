
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Send, MessageCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase, createMockMessages } from "@/lib/supabase";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize mock data on component mount
  useEffect(() => {
    if (user) {
      createMockMessages().catch(console.error);
    }
  }, [user]);

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
      
      // Set as selected contact if not already in contacts
      if (!contacts.some(c => c.user_id === contactId)) {
        setContacts(prev => [...prev, preselectedContact]);
      }
      
      setSelectedContact(preselectedContact);
      
      // Show toast to indicate starting a new conversation
      toast({
        title: "Starting conversation",
        description: `You can now chat with ${decodeURIComponent(contactName)}`,
      });
    }
  }, [searchParams, contacts, toast, user?.role]);

  // Initialize contacts based on user role
  useEffect(() => {
    if (user) {
      const fetchContacts = async () => {
        try {
          // This query finds all unique users with whom the current user has exchanged messages
          const { data, error } = await supabase
            .from('messages')
            .select(`
              sender_id, receiver_id,
              sender:profiles!sender_id(name, role, profile_image),
              receiver:profiles!receiver_id(name, role, profile_image)
            `)
            .or(`sender_id.eq.${user.user_id},receiver_id.eq.${user.user_id}`);
          
          if (error) throw error;
          
          if (data) {
            // Extract unique contacts from messages
            const uniqueContacts = new Map<string, Contact>();
            
            data.forEach(msg => {
              // If the sender is not the current user, add them as a contact
              if (msg.sender_id !== user.user_id && msg.sender) {
                uniqueContacts.set(msg.sender_id, {
                  user_id: msg.sender_id,
                  name: msg.sender.name, // Use dot notation for accessing properties
                  role: msg.sender.role,
                  profile_image: msg.sender.profile_image
                });
              }
              
              // If the receiver is not the current user, add them as a contact
              if (msg.receiver_id !== user.user_id && msg.receiver) {
                uniqueContacts.set(msg.receiver_id, {
                  user_id: msg.receiver_id,
                  name: msg.receiver.name, // Use dot notation for accessing properties
                  role: msg.receiver.role,
                  profile_image: msg.receiver.profile_image
                });
              }
            });
            
            setContacts(Array.from(uniqueContacts.values()));
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
          setMessages(data);
        }
      };
      
      fetchMessages();
      
      // Subscribe to new messages
      const messagesSubscription = supabase
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
        supabase.removeChannel(messagesSubscription);
      };
    }
  }, [selectedContact, user, toast]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        
        // Clear message input after sending
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
    if (e.key === "Enter") {
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
          <Card className="md:col-span-1 overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-grow">
              {contacts.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  No contacts yet
                </div>
              ) : (
                <div className="divide-y">
                  {contacts.map((contact) => (
                    <div
                      key={contact.user_id}
                      onClick={() => setSelectedContact(contact)}
                      className={`flex items-center gap-3 p-4 hover:bg-muted cursor-pointer transition-colors ${
                        selectedContact?.user_id === contact.user_id ? "bg-muted" : ""
                      }`}
                    >
                      <Avatar>
                        <AvatarImage src={contact.profile_image || undefined} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{contact.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 overflow-hidden flex flex-col">
            <CardHeader className="border-b">
              {selectedContact ? (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.profile_image || undefined} alt={selectedContact.name} />
                    <AvatarFallback>
                      {selectedContact.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedContact.name}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">{selectedContact.role}</p>
                  </div>
                </div>
              ) : (
                <CardTitle>Select a contact</CardTitle>
              )}
            </CardHeader>
            
            {selectedContact ? (
              <>
                <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender_id === user?.user_id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender_id === user?.user_id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Select a contact to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
