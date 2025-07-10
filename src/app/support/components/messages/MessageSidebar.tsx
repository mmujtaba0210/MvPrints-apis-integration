import { useState } from 'react';
import ConversationList from './ConversationList';

const MessageSidebar = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'user-seller' | 'direct'>('all');

  return (
    <div className="w-full md:w-80 lg:w-96 h-full flex flex-col border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <div className="flex mt-4 space-x-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('user-seller')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'user-seller' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            User-Seller
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'direct' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
          >
            Direct
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ConversationList activeTab={activeTab} />
      </div>
    </div>
  );
};

export default MessageSidebar;