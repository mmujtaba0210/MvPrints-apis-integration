"use client";

import React, { useState, useEffect } from 'react';

interface CustomFooterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  initialContent: string;
}

const CustomFooterModal: React.FC<CustomFooterModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialContent,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Customize Footer Content
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
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="footer-content" className="block text-sm font-medium text-sky-700">
                Footer Content (HTML allowed)
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors duration-200"
              >
                {isPreview ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Show Editor
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Show Preview
                  </>
                )}
              </button>
            </div>

            {isPreview ? (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-40 shadow-inner transition-all duration-300">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : (
              <textarea
                id="footer-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
                placeholder="✨ Enter your footer content here (HTML allowed)..."
              />
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-xl space-y-3 sm:space-y-0">
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-base font-medium text-white hover:from-sky-500 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save Changes
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

export default CustomFooterModal;