"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { CustomInput } from "@/common/customInputField";

interface AddBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  register: any;
  errors: any;
  categories: Array<{ id: string; name: string }>;
}

const AddBlogPostModal: React.FC<AddBlogPostModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  register,
  errors,
  categories,
}) => {
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = useCallback(() => {
    setFeaturedImagePreview(null);
  }, []);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to add the blog post
    console.log("Adding blog post with data:", { 
      // Include all form data here
      tags,
      featuredImage: featuredImagePreview 
    });
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Add New Blog Post</h2>
            <p className="text-blue-100 text-sm mt-1">Create a new blog post with all required details</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                {...register("category", { required: true })}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">This field is required</p>
              )}
            </div>

            {/* Title */}
            <CustomInput
              label="Title"
              name="title"
              register={register}
              required={true}
              placeholder="Enter blog post title"
              errors={errors}
            />

            {/* Source */}
            <CustomInput
              label="Source"
              name="source"
              register={register}
              required={false}
              placeholder="Original source (if applicable)"
              errors={errors}
            />

            {/* Tags */}
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-sm">
                    {tag}
                    <button 
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add new tag"
                  className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={3}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Write a detailed description..."
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">This field is required</p>
              )}
            </div>

            {/* Featured Image */}
            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative w-full sm:w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  {featuredImagePreview ? (
                    <>
                      <Image
                        src={featuredImagePreview}
                        alt="Featured preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <label className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">
                      {featuredImagePreview ? 'Change Image' : 'Upload Featured Image'}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!featuredImagePreview}
                    />
                    <span className="text-xs text-gray-500 mt-1">Recommended: 1200x630 pixels</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm text-sm"
              disabled={!featuredImagePreview}
            >
              Publish Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPostModal;