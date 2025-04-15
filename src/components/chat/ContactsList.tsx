
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Contact = {
  user_id: string;
  name: string;
  role: string;
  profile_image: string | null;
};

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
}) => {
  return (
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
                onClick={() => onSelectContact(contact)}
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
  );
};

export default ContactsList;

