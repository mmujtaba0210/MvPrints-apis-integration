"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { CustomInput } from "@/common/customInputField"; // Adjust the import path as needed

interface AddBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddBenefitsModal: React.FC<AddBenefitsModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
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
    console.log("Adding benefit:", formData);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"> {/* Changed max-w-md to max-w-2xl for wider modal */}
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <div>
            <h2 className="text-xl font-bold text-white">Add New Benefit</h2>
            <p className="text-blue-100 text-sm mt-1">Enter benefit details</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Added grid layout */}
            {/* Left Column */}
            <div className="space-y-4">
              {/* Title Field */}
              <CustomInput
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Health Insurance"
                errors={{}}
              />

              {/* Description Field */}
              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the benefit..."
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Benefit Image
                </label>
                <div className="flex flex-col items-start gap-3">
                  {formData.previewImage ? (
                    <div className="relative group">
                      <div className="w-full aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={formData.previewImage}
                          alt="Benefit preview"
                          width={400}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={triggerFileInput}
                      className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                    >
                      <FiUpload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 text-center px-2">Upload Image</span>
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
                <p className="text-xs text-gray-500 mt-1">Recommended size: 400x400px (1:1 ratio)</p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Add Benefit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBenefitsModal;