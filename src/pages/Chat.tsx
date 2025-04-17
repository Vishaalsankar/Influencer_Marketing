
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockInfluencers } from "@/services/mockData";
import { Send, MessageCircle, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Mock messages for demo
const mockUsers = [
  {
    user_id: "4",
    name: "Jane Smith",
    role: "influencer",
    profile_image: "https://source.unsplash.com/random/200x200/?woman",
  },
  {
    user_id: "5",
    name: "Alex Johnson",
    role: "brand",
    profile_image: "https://source.unsplash.com/random/200x200/?man",
  },
  {
    user_id: "6",
    name: "Emily Davis",
    role: "influencer",
    profile_image: "https://source.unsplash.com/random/200x200/?woman",
  },
];

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get contact info from URL params if available
  useEffect(() => {
    const contactId = searchParams.get("contact");
    const contactName = searchParams.get("name");
    
    if (contactId && contactName) {
      const preselectedContact = {
        user_id: contactId,
        name: decodeURIComponent(contactName),
        role: user?.role === "brand" ? "influencer" : "brand",
        profile_image: mockInfluencers.find(inf => inf.user_id === contactId)?.profile_image || "/placeholder.svg",
      };
      
      // Set as selected contact if not already in contacts
      if (!contacts.some(c => c.user_id === contactId)) {
        setContacts(prev => [...prev, preselectedContact]);
        setFilteredContacts(prev => [...prev, preselectedContact]);
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
      // In a real app, these would come from an API
      if (user.role === "brand") {
        // A brand would see influencers as contacts
        const influencerContacts = mockInfluencers.map(inf => ({
          user_id: inf.user_id,
          name: inf.name,
          role: "influencer",
          profile_image: inf.profile_image || "/placeholder.svg",
        }));
        setContacts(influencerContacts);
        setFilteredContacts(influencerContacts);
      } else if (user.role === "influencer") {
        // An influencer would see brands as contacts
        const brandContacts = mockUsers.filter(u => u.role === "brand");
        setContacts(brandContacts);
        setFilteredContacts(brandContacts);
      }
    }
  }, [user]);

  // Filter contacts based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts]);

  // Load messages when contact is selected
  useEffect(() => {
    if (selectedContact) {
      const fetchMessages = async () => {
        try {
          // In a real app, we would fetch messages from Supabase
          // For now, using mock data
          const chatMessages = mockMessages.filter(
            msg =>
              (msg.sender_id === user?.user_id && msg.receiver_id === selectedContact.user_id) ||
              (msg.receiver_id === user?.user_id && msg.sender_id === selectedContact.user_id)
          );
          setMessages(chatMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
          toast({
            title: "Error",
            description: "Failed to load messages",
            variant: "destructive",
          });
        }
      };

      fetchMessages();
    }
  }, [selectedContact, user, toast]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedContact && user) {
      // Create a new message object
      const newMsg = {
        message_id: `new-${Date.now()}`,
        sender_id: user.user_id,
        receiver_id: selectedContact.user_id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        is_read: false,
        sender_role: user.role,
      };
      
      try {
        // In a real app, we would send this to Supabase
        // For now, just updating the local state
        
        // Add to local messages
        setMessages(prevMessages => [...prevMessages, newMsg]);
        setNewMessage("");
        
        // Show success toast for demo purposes
        toast({
          title: "Message sent",
          description: "Your message has been delivered",
        });
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
            <CardHeader className="pb-2">
              <CardTitle>Contacts</CardTitle>
              <div className="relative mt-2">
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-grow">
              {filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  {searchQuery ? "No matching contacts found" : "No contacts available"}
                </div>
              ) : (
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.user_id}
                      onClick={() => setSelectedContact(contact)}
                      className={`flex items-center gap-3 p-4 hover:bg-muted cursor-pointer transition-colors ${
                        selectedContact?.user_id === contact.user_id ? "bg-muted" : ""
                      }`}
                    >
                      <Avatar>
                        <AvatarImage src={contact.profile_image} alt={contact.name} />
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
                    <AvatarImage src={selectedContact.profile_image} alt={selectedContact.name} />
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
                      <div className="text-center">
                        <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.message_id}
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
                          <p className="break-words">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
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
                      className="flex-grow"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!newMessage.trim()}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" /> Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground text-lg">Select a contact to start messaging</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can chat with {user?.role === "brand" ? "influencers" : "brands"} from your network
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

// Mock messages for demo
const mockMessages = [
  {
    message_id: "1",
    sender_id: "2", // brand user
    receiver_id: "3", // influencer user
    content: "Hello! We're interested in working with you on our new product launch.",
    timestamp: "2023-09-15T10:00:00Z",
    is_read: true,
    sender_role: "brand",
  },
  {
    message_id: "2",
    sender_id: "3", // influencer user
    receiver_id: "2", // brand user
    content: "Hi! Thank you for reaching out. I'd be interested in learning more about your campaign.",
    timestamp: "2023-09-15T10:05:00Z",
    is_read: true,
    sender_role: "influencer",
  },
  {
    message_id: "3",
    sender_id: "2", // brand user
    receiver_id: "3", // influencer user
    content: "Great! We're launching a new line of eco-friendly products and we think your audience would love it.",
    timestamp: "2023-09-15T10:10:00Z",
    is_read: true,
    sender_role: "brand",
  },
];

export default Chat;
