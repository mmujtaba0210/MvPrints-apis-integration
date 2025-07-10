"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface AddNewPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddNewPartnerModal: React.FC<AddNewPartnerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    companyName: "",
    link: "",
    description: "",
    featuredImage: null as File | null,
    previewImage: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        featuredImage: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to add the partner would go here
    console.log("Adding new partner:", formData);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Add New Partner</h2>
            <p className="text-blue-100 text-sm mt-1">Enter details for your new partner company</p>
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

        {/* Modal Body - Scrollable content */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                    placeholder="e.g. Acme Corporation"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                    Website Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                    placeholder="e.g. https://www.example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Company Logo <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    <div 
                      onClick={triggerFileInput}
                      className="w-full aspect-square max-w-[200px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                    >
                      {formData.previewImage ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={formData.previewImage}
                            alt="Company logo preview"
                            fill
                            className="object-contain rounded-lg p-2"
                          />
                        </div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                        required={!formData.previewImage}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                      >
                        {formData.previewImage ? 'Change Logo' : 'Upload Logo'}
                      </button>
                      {formData.previewImage && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, featuredImage: null, previewImage: "" }))}
                          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Recommended: 300x300px (1:1 ratio)</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Company Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full h-full min-h-[200px] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                  placeholder="Brief description about the partner company..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm shadow-sm"
              >
                Add Partner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPartnerModal;