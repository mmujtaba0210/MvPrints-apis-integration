"use client";

import React, { useState } from "react";
import { CustomInput } from "@/common/customInputField";

export const AboutUsMiddleBanner = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFeaturedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        title,
        description,
        featuredImage: featuredImage ? "Image uploaded" : "No image"
      });
      setIsSubmitting(false);
      alert("About Us Middle Banner saved successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">About Us Middle Banner</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Text Fields */}
        <div className="space-y-6">
          {/* Title Field */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <CustomInput
              label="Banner Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter banner title"
              required
            />
          </div>

          {/* Description Field */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter banner description"
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Column - Image Upload */}
        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Featured Image
            </label>
            
            <div className="flex-1 flex flex-col">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="featuredImage"
              />
              
              {featuredImage ? (
                <div className="flex-1 flex flex-col">
                  <div className="relative flex-1 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    <img 
                      src={featuredImage} 
                      alt="Featured preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                      <label
                        htmlFor="featuredImage"
                        className="p-3 bg-white bg-opacity-80 rounded-full cursor-pointer hover:bg-opacity-100 transition-all"
                        title="Change image"
                      >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFeaturedImage("")}
                    className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Remove Image
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="featuredImage"
                  className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
                </label>
              )}
            </div>
          </div>

          {/* Submit Button - Placed in right column but spans full width on mobile */}
          <div className="lg:col-span-2 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : "Save Banner"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};