import { Message } from '../../types/messageType';
import MessageBubble from './MessageBubble';
import { useState } from 'react';
import MessageInput from './MessageInput';

const dummyMessages: Message[] = [
  {
    id: '1',
    content: 'Hey there! How are you doing?',
    sender: 'other',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'read',
  },
  {
    id: '2',
    content: "I'm good, thanks! How about you?",
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
    status: 'read',
  },
  {
    id: '3',
    content: 'Pretty good! Just working on some projects.',
    sender: 'other',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'read',
  },
  {
    id: '4',
    content: 'That sounds interesting. What kind of projects?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'delivered',
  },
];

const MessageArea = () => {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
        <p className="text-sm text-gray-500">Online</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default MessageArea;