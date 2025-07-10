"use client";

import React, { useState, useEffect } from 'react';

interface HeaderMessage {
  id?: string;
  text: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

interface AddHeaderMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (message: HeaderMessage) => void;
  initialData?: HeaderMessage | null;
}

const AddHeaderMessageModal: React.FC<AddHeaderMessageModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [message, setMessage] = useState<HeaderMessage>({
    text: '',
    isActive: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setMessage(initialData);
    } else {
      setMessage({
        text: '',
        isActive: true,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            {initialData ? 'Edit Header Message' : 'Add New Header Message'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-sky-100 transition-all duration-200 transform hover:rotate-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="message-text" className="block text-sm font-medium text-sky-700 mb-1">
                Message Text
              </label>
              <textarea
                id="message-text"
                value={message.text}
                onChange={(e) => setMessage({...message, text: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-sky-300 text-gray-700"
                placeholder="Enter your header message (e.g., Special promotion announcement)..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-sky-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={message.startDate}
                  onChange={(e) => setMessage({...message, startDate: e.target.value})}
                  className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700"
                  required
                />
              </div>

              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-sky-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={message.endDate}
                  onChange={(e) => setMessage({...message, endDate: e.target.value})}
                  className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-700"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is-active"
                checked={message.isActive}
                onChange={(e) => setMessage({...message, isActive: e.target.checked})}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
              />
              <label htmlFor="is-active" className="ml-2 block text-sm text-sky-700">
                Make this message active immediately
              </label>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-xl space-y-3 sm:space-y-0 mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-base font-medium text-white hover:from-sky-500 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {initialData ? 'Update Message' : 'Add Message'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHeaderMessageModal;