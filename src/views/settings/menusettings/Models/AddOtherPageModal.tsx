"use client";

import React, { useState } from "react";

interface AddOtherPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddOtherPageModal: React.FC<AddOtherPageModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    allowSeo: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to add the page
    console.log("Adding new page:", formData);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Add New Page</h2>
            <p className="text-blue-100 mt-1">Enter details for your new page</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="e.g. About Us"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Page Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-gray-500">
                  /
                </span>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                  placeholder="e.g. about-us"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                The slug is the URL-friendly version of the name
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Page Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="Enter the page content or description..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="allowSeo"
                name="allowSeo"
                checked={formData.allowSeo}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="allowSeo" className="text-sm font-medium text-gray-700">
                Allow SEO for this page
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Create Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOtherPageModal;