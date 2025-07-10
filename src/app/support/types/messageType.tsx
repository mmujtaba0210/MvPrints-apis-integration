export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  type: 'user-seller' | 'direct';
  online?: boolean;
};