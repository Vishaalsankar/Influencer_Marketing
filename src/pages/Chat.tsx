
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockInfluencers } from "@/services/mockData";
import { Send } from "lucide-react";

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

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize contacts based on user role
  useEffect(() => {
    if (user) {
      // In a real app, these would come from an API
      if (user.role === "brand") {
        // A brand would see influencers as contacts
        setContacts(mockInfluencers.map(inf => ({
          user_id: inf.user_id,
          name: inf.name,
          role: "influencer",
          profile_image: inf.profile_image || "/placeholder.svg",
        })));
      } else if (user.role === "influencer") {
        // An influencer would see brands as contacts
        setContacts(mockUsers.filter(u => u.role === "brand"));
      }
    }
  }, [user]);

  // Load messages when contact is selected
  useEffect(() => {
    if (selectedContact) {
      // In a real app, these would come from an API
      const chatMessages = mockMessages.filter(
        msg =>
          (msg.sender_id === user?.user_id && msg.receiver_id === selectedContact.user_id) ||
          (msg.receiver_id === user?.user_id && msg.sender_id === selectedContact.user_id)
      );
      setMessages(chatMessages);
    }
  }, [selectedContact, user]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const newMsg = {
        message_id: `new-${Date.now()}`,
        sender_id: user?.user_id || "",
        receiver_id: selectedContact.user_id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        is_read: false,
        sender_role: user?.role,
      };
      
      // In a real app, this would be sent to an API
      setMessages([...messages, newMsg]);
      setNewMessage("");
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
                      <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
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
                          <p>{msg.content}</p>
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
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a contact to start messaging</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
