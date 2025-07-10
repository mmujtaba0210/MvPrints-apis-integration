"use client";

import React, { useState } from 'react';
import ConfirmationMessageModal from './confirmationModal';

interface ConfirmationMessage {
  id: string;
  title: string;
  message: string;
  buttonText: string;
  redirectUrl: string;
  isActive: boolean;
}

const ConfirmationMessagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<ConfirmationMessage | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<ConfirmationMessage>({
    id: '1',
    title: 'Thank You!',
    message: 'Your order has been received successfully. We will process it shortly and send you a confirmation email.',
    buttonText: 'Continue Shopping',
    redirectUrl: '/products',
    isActive: true
  });

  const handleSave = (message: ConfirmationMessage) => {
    setConfirmationMessage(message);
    setIsModalOpen(false);
    setEditingMessage(null);
  };

  const toggleActiveStatus = () => {
    setConfirmationMessage({
      ...confirmationMessage,
      isActive: !confirmationMessage.isActive
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-sky-800">Confirmation Message</h1>
            <p className="text-sky-600 mt-1">Customize your order confirmation page</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setEditingMessage(confirmationMessage);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Message
            </button>
            <button
              onClick={toggleActiveStatus}
              className={`px-5 py-2.5 rounded-lg flex items-center transition-all duration-300 shadow-sm hover:shadow-md ${
                confirmationMessage.isActive
                  ? 'bg-white border border-sky-300 text-sky-700 hover:bg-sky-50'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {confirmationMessage.isActive ? (
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l3.5-3.5L6 10l-.5-.5L2 6v4H0V2h4l3.5 3.5L10 4l.5.5L14 0h4v6h-2V8z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
              {confirmationMessage.isActive ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-sky-100">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-sky-800">Current Confirmation Message</h2>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
              confirmationMessage.isActive
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {confirmationMessage.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className={`p-6 rounded-lg border ${
            confirmationMessage.isActive
              ? 'bg-sky-50 border-sky-200'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-sky-800 mb-4">
                {confirmationMessage.title}
              </h3>
              <div className="text-sky-700 mb-6">
                {confirmationMessage.message.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
              <button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                {confirmationMessage.buttonText}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-sky-100">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <h2 className="text-xl font-semibold text-sky-800">Preview</h2>
          </div>
          
          <div className="border border-sky-200 rounded-xl overflow-hidden min-h-[400px] flex flex-col shadow-inner">
            <div className="flex-grow p-8 bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
              <div className="w-full max-w-2xl mx-auto text-center">
                <div className="mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-3xl font-bold text-sky-800 mb-3">
                    {confirmationMessage.title}
                  </h3>
                  <div className="text-sky-700 text-lg">
                    {confirmationMessage.message.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                <button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                  {confirmationMessage.buttonText}
                </button>
              </div>
            </div>
            <footer className="bg-gray-800 text-white p-4 text-center text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
          </div>
        </div>
      </main>

      <ConfirmationMessageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMessage(null);
        }}
        onSave={()=>handleSave}
        initialData={editingMessage || confirmationMessage}
      />
    </div>
  );
};

export default ConfirmationMessagePage;