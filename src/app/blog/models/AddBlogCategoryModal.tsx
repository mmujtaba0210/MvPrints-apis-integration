"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { CustomInput } from "@/common/customInputField";

interface AddNewBlogCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  register: any;
  errors: any;
}

const AddNewBlogCategoryModal: React.FC<AddNewBlogCategoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  register,
  errors,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to add the blog category
    console.log("Adding blog category:", { ...formData, icon: iconPreview });
    onSuccess();
  };

  const removeIcon = useCallback(() => {
    setIconPreview(null);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Add Blog Category</h2>
            <p className="text-blue-100 mt-1">Define a new blog category</p>
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
            <CustomInput
              label="Name"
              name="name"
              register={register}
              required={true}
              placeholder="e.g. Technology, Lifestyle"
              errors={errors}
            />

            <CustomInput
              label="Slug"
              name="slug"
              register={register}
              required={true}
              placeholder="e.g. technology, lifestyle"
              errors={errors}
            />

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Set Icon <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {iconPreview ? (
                    <>
                      <Image
                        src={iconPreview}
                        alt="Blog category icon"
                        fill
                        className="object-contain p-1"
                      />
                      <button
                        type="button"
                        onClick={removeIcon}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <label className="flex flex-col items-center px-4 py-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">
                      {iconPreview ? 'Change Icon' : 'Upload Icon'}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleIconChange}
                      required={!iconPreview}
                    />
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</span>
                  </label>
                </div>
              </div>
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
              disabled={!iconPreview || !formData.name || !formData.slug}
            >
              Add Blog Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBlogCategoryModal;