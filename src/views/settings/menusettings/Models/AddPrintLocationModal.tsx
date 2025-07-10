"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface AddPrintLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddPrintLocationModal: React.FC<AddPrintLocationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    address: "",
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
    // API call to add the print location would go here
    console.log("Adding print location:", formData);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Add New Print Location</h2>
            <p className="text-blue-100 mt-1">Enter details for your new print location</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="e.g. United States"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State/Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="e.g. California"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Full Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="e.g. 123 Main St, Los Angeles, CA 90001"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Location Image
              </label>
              <div className="flex items-center gap-4">
                <div 
                  onClick={triggerFileInput}
                  className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  {formData.previewImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={formData.previewImage}
                        alt="Location preview"
                        fill
                        className="object-cover rounded-lg"
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
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    {formData.previewImage ? 'Change Image' : 'Upload Image'}
                  </button>
                  {formData.previewImage && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: null, previewImage: "" }))}
                      className="ml-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Recommended size: 800x600px (4:3 ratio)</p>
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
              Add Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrintLocationModal;