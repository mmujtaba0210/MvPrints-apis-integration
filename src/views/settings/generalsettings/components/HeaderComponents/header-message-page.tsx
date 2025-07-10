"use client";

import React, { useState } from 'react';
import AddHeaderMessageModal from './addHeaderModal';

interface HeaderMessage {
  id: string;
  text: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

const HeaderMessagesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<HeaderMessage | null>(null);
  const [messages, setMessages] = useState<HeaderMessage[]>([
    {
      id: '1',
      text: '🌟 Summer Sale - 20% off all products!',
      isActive: true,
      startDate: '2023-06-01',
      endDate: '2023-06-30'
    },
    {
      id: '2',
      text: '🚚 Free shipping on orders over $50',
      isActive: false,
      startDate: '2023-05-01',
      endDate: '2023-12-31'
    }
  ]);

  const handleSave = (message: HeaderMessage) => {
    if (editingMessage) {
      setMessages(messages.map(m => m.id === message.id ? message : m));
    } else {
      setMessages([...messages, { ...message, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
    setEditingMessage(null);
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-sky-800">Header Messages</h1>
            <p className="text-sky-600 mt-1">Manage your website header announcements</p>
          </div>
          <button
            onClick={() => {
              setEditingMessage(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Message
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-sky-100">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18v4H3V4z" />
            </svg>
            <h2 className="text-xl font-semibold text-sky-800">Active Messages</h2>
          </div>
          
          {messages.length === 0 ? (
            <div className="bg-sky-50 p-6 rounded-lg border border-sky-200 text-center">
              <p className="text-sky-600">No header messages found. Add your first message!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`p-4 rounded-lg border ${message.isActive ? 'bg-sky-50 border-sky-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`font-medium ${message.isActive ? 'text-sky-800' : 'text-gray-600'}`}>
                        {message.text}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                        <span className={`flex items-center ${message.isActive ? 'text-sky-600' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {message.startDate} to {message.endDate}
                        </span>
                        <span className={`flex items-center ${message.isActive ? 'text-sky-600' : 'text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {message.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingMessage(message);
                          setIsModalOpen(true);
                        }}
                        className="text-sky-600 hover:text-sky-800 p-1 rounded-full hover:bg-sky-100 transition-colors duration-200"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="text-rose-600 hover:text-rose-800 p-1 rounded-full hover:bg-rose-100 transition-colors duration-200"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <AddHeaderMessageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMessage(null);
        }}
        onSave={()=>handleSave}
        initialData={editingMessage}
      />
    </div>
  );
};

export default HeaderMessagesPage;