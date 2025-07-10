"use client";

import React, { useState } from "react";

const AboutUsForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    slogan: "",
    description: "",
    featuredImage: "",
    featuredSecondImage: "",
    backgroundImage: ""
  });

  const [previewImages, setPreviewImages] = useState({
    featuredImage: "",
    featuredSecondImage: "",
    backgroundImage: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [field]: file
        }));
        setPreviewImages(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 overflow">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">About Us Page Editor</h1>
          <p className="text-blue-100 mt-2">Customize your About Us page content and appearance</p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Our Company Story"
                />
              </div>

              <div>
                <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-1">
                  Slogan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slogan"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Building the future together"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell your company's story, mission, and values..."
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Page Images</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Featured Image */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Featured Image <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className={`w-full h-48 rounded-lg border-2 border-dashed ${previewImages.featuredImage ? 'border-transparent' : 'border-gray-300'} overflow-hidden`}>
                    {previewImages.featuredImage ? (
                      <img 
                        src={previewImages.featuredImage} 
                        alt="Featured preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "featuredImage")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById('featuredImage')?.click()}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {previewImages.featuredImage ? 'Change Image' : 'Upload Image'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Second Featured Image */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Second Featured Image
                </label>
                <div className="relative group">
                  <div className={`w-full h-48 rounded-lg border-2 border-dashed ${previewImages.featuredSecondImage ? 'border-transparent' : 'border-gray-300'} overflow-hidden`}>
                    {previewImages.featuredSecondImage ? (
                      <img 
                        src={previewImages.featuredSecondImage} 
                        alt="Second featured preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="featuredSecondImage"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "featuredSecondImage")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById('featuredSecondImage')?.click()}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {previewImages.featuredSecondImage ? 'Change Image' : 'Upload Image'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Background Image */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Background Image <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className={`w-full h-48 rounded-lg border-2 border-dashed ${previewImages.backgroundImage ? 'border-transparent' : 'border-gray-300'} overflow-hidden`}>
                    {previewImages.backgroundImage ? (
                      <img 
                        src={previewImages.backgroundImage} 
                        alt="Background preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="backgroundImage"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "backgroundImage")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById('backgroundImage')?.click()}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {previewImages.backgroundImage ? 'Change Image' : 'Upload Image'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Save About Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUsForm;