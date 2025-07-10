import { Message } from '@/app/support/types/messageType';
import { format } from 'date-fns';

type MessageBubbleProps = {
  message: Message;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}
      >
        <p>{message.content}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          <span>{format(message.timestamp, 'h:mm a')}</span>
          {isUser && (
            <span>
              {message.status === 'sent' && '✉️'}
              {message.status === 'delivered' && '✓'}
              {message.status === 'read' && '✓✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;