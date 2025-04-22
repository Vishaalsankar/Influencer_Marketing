
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/types";

// Mock chat messages for demo purposes
const mockMessages: Message[] = [
  {
    message_id: "msg-1",
    sender_id: "brand-1",
    receiver_id: "influencer-1",
    content: "Hi! I really like your content and would love to discuss a potential collaboration for our upcoming campaign.",
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
    is_read: true,
    sender_role: "brand"
  },
  {
    message_id: "msg-2",
    sender_id: "influencer-1",
    receiver_id: "brand-1",
    content: "Thank you for reaching out! I'd be happy to discuss the collaboration. Could you tell me more about your campaign?",
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
    is_read: true,
    sender_role: "influencer"
  },
  {
    message_id: "msg-3",
    sender_id: "brand-1",
    receiver_id: "influencer-1",
    content: "We're launching a new sustainable fashion line and think your audience would be a great fit. Our budget is ₹25,000 for 2 Instagram posts.",
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    is_read: true,
    sender_role: "brand"
  },
  {
    message_id: "msg-4",
    sender_id: "influencer-1",
    receiver_id: "brand-1",
    content: "That sounds interesting! I'd love to learn more about the products and your brand values.",
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    is_read: true,
    sender_role: "influencer"
  },
  {
    message_id: "msg-5",
    sender_id: "brand-1",
    receiver_id: "influencer-1",
    content: "Great! Can we schedule a call next week to discuss the details? I can share mood boards and product samples.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    is_read: false,
    sender_role: "brand"
  }
];

interface ChatHistoryProps {
  title?: string;
  limit?: number;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  title = "Recent Messages", 
  limit = 3 
}) => {
  const { userRole, user } = useAuth();
  
  // Filter messages for the current user based on role
  const filteredMessages = mockMessages
    .filter(message => {
      if (userRole === "brand") {
        return message.sender_id === "brand-1" || message.receiver_id === "brand-1";
      }
      return message.sender_id === "influencer-1" || message.receiver_id === "influencer-1";
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
  
  // Format the timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredMessages.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No messages yet
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div 
                key={message.message_id} 
                className={`flex gap-3 p-3 rounded-lg ${
                  !message.is_read ? "bg-primary/5" : ""
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={message.sender_role === "brand" ? "/placeholder.svg" : "/placeholder.svg"} 
                    alt={message.sender_role} 
                  />
                  <AvatarFallback>
                    {message.sender_role === "brand" ? "B" : "I"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-medium flex items-center gap-2">
                      {message.sender_role === 'brand' ? 'Brand' : 'Influencer'}
                      {!message.is_read && 
                        <Badge variant="outline" className="bg-primary/80 text-primary-foreground text-xs">
                          New
                        </Badge>
                      }
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-2">
              <a href="/chat" className="text-sm text-primary hover:underline">
                View all messages
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatHistory;
