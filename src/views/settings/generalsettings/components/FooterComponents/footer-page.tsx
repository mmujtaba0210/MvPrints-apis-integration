"use client";

import React, { useState } from 'react';
import CustomFooterModal from './addFooterModal';

const CustomFooterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [footerContent, setFooterContent] = useState<string>(
    "© 2023 My Company. All rights reserved."
  );
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = (content: string) => {
    setFooterContent(content);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-sky-800">Custom Footer Editor</h1>
            <p className="text-sky-600 mt-1">Design your perfect website footer</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-lg flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Footer
            </button>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-white border border-sky-300 hover:bg-sky-50 text-sky-700 px-5 py-2.5 rounded-lg flex items-center transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {previewMode ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-sky-100">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-sky-800">Current Footer Content</h2>
          </div>
          <div className="bg-sky-50 p-4 rounded-lg border border-sky-200 min-h-20">
            {footerContent ? (
              <div className="text-sky-800" dangerouslySetInnerHTML={{ __html: footerContent }} />
            ) : (
              <span className="text-sky-600 italic">No footer content set</span>
            )}
          </div>
        </div>

        {previewMode && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-sky-200 transition-all duration-300">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <h2 className="text-xl font-semibold text-sky-800">Page Preview</h2>
            </div>
            <div className="border border-sky-200 rounded-xl overflow-hidden min-h-[400px] flex flex-col shadow-inner">
              <div className="flex-grow p-8 bg-gradient-to-br from-sky-50 to-white">
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-2xl font-medium text-sky-800 mb-3">Your Website Content</h3>
                  <p className="text-sky-600">This area shows how your page content will appear above the custom footer.</p>
                </div>
              </div>
              <footer className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-6 text-center">
                <div className="text-sky-100" dangerouslySetInnerHTML={{ __html: footerContent }} />
              </footer>
            </div>
          </div>
        )}
      </main>

      <CustomFooterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialContent={footerContent}
      />
    </div>
  );
};

export default CustomFooterPage;