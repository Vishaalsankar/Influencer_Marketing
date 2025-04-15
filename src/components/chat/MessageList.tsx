
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";

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

interface MessageListProps {
  messages: Message[];
  selectedContact: Contact | null;
  currentUserId?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  selectedContact,
  currentUserId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedContact) {
    return (
      <CardContent className="flex items-center justify-center h-full">
        <div className="text-center">
          <MessageCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Select a contact to start messaging</p>
        </div>
      </CardContent>
    );
  }

  return (
    <>
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            {selectedContact.profile_image ? (
              <AvatarImage src={selectedContact.profile_image} alt={selectedContact.name} />
            ) : (
              <AvatarFallback>
                {selectedContact.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle>{selectedContact.name}</CardTitle>
            <p className="text-sm text-muted-foreground capitalize">{selectedContact.role}</p>
          </div>
        </div>
      </CardHeader>
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
                msg.sender_id === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender_id === currentUserId
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
    </>
  );
};

export default MessageList;
