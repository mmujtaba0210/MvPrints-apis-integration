"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { CustomInput } from "@/common/customInputField";

const BottomBannerForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
    previewImage: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        image: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      previewImage: ""
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving bottom banner:", formData);
    // Add your save logic here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bottom Banner Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-6">
            {/* Title Field */}
            <CustomInput
              label="Banner Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Special Offer Ending Soon"
              errors={{}}
            />

            {/* Save Button - Mobile First */}
            <button
              type="submit"
              className="lg:hidden w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Save Banner Settings
            </button>
          </div>

          {/* Right Column - Image Upload */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div className="flex flex-col items-start gap-3">
                {formData.previewImage ? (
                  <div className="relative w-full">
                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      <Image
                        src={formData.previewImage}
                        alt="Banner preview"
                        width={800}
                        height={450}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={triggerFileInput}
                    className="w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                  >
                    <FiUpload className="h-10 w-10 text-gray-400 mb-3" />
                    <span className="text-sm text-gray-500 text-center px-4">
                      Click to upload banner image (Recommended: 1600x900px)
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <FiUpload className="mr-1" />
                  {formData.previewImage ? 'Change Image' : 'Upload Image'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended aspect ratio: 16:9 (e.g. 1600×900, 800×450)
              </p>
            </div>

            {/* Save Button - Desktop */}
            <button
              type="submit"
              className="hidden lg:block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Save Banner Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BottomBannerForm;