import { Conversation } from '../../types/messageType';
import { formatRelative } from 'date-fns';

type ConversationItemProps = {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
};

const ConversationItem = ({ conversation, isSelected, onSelect }: ConversationItemProps) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
    >
      <div className="relative mr-3">
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {conversation.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{conversation.name}</h3>
          <span className="text-xs text-gray-500">
            {formatRelative(conversation.lastMessageTime, new Date())}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
          {conversation.unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;