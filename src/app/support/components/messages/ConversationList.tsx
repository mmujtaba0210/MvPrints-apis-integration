"use client";
import { Conversation } from "../../types/messageType";
import ConversationItem from "./ConversationItems";
import { useState } from "react";

const dummyConversations: Conversation[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastMessage: "Hey, how are you doing?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2,
    type: "direct",
    online: true,
  },
  {
    id: "2",
    name: "Acme Store",
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
    lastMessage: "Your order has been shipped",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    type: "user-seller",
  },
  {
    id: "3",
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    lastMessage: "Let me know when you arrive",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 5,
    type: "direct",
    online: true,
  },
  {
    id: "4",
    name: "Tech Gadgets",
    avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    lastMessage: "New products available now!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unreadCount: 0,
    type: "user-seller",
  },
];

type ConversationListProps = {
  activeTab: "all" | "user-seller" | "direct";
};

const ConversationList = ({ activeTab }: ConversationListProps) => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const filteredConversations = dummyConversations.filter((conv) => {
    if (activeTab === "all") return true;
    return conv.type === activeTab;
  });

  return (
    <div>
      {filteredConversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={selectedConversation === conversation.id}
          onSelect={() => setSelectedConversation(conversation.id)}
        />
      ))}
    </div>
  );
};

export default ConversationList;
