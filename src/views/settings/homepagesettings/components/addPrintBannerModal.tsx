"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BannerFormData {
  id?: string;
  title: string;
  subtitle: string;
  featuredImage: File | null;
  featuredImagePreview: string;
  isActive: boolean;
}

interface AddBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BannerFormData) => void;
  initialData?: BannerFormData | null;
}

const AddBannerModal: React.FC<AddBannerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<BannerFormData>({
    title: "",
    subtitle: "",
    featuredImage: null,
    featuredImagePreview: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        subtitle: "",
        featuredImage: null,
        featuredImagePreview: "",
        isActive: true,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        featuredImage: file,
        featuredImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      featuredImage: null,
      featuredImagePreview: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            {initialData ? "Edit Banner" : "Add New Banner"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-sky-100 transition-all duration-200 transform hover:rotate-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-1">
                Banner Image
              </label>
              {formData.featuredImagePreview ? (
                <div className="relative group">
                  <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-sky-300">
                    <Image
                      src={formData.featuredImagePreview}
                      alt="Preview"
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-full h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-sky-300 bg-sky-50 hover:bg-sky-100 transition-colors">
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <svg
                      className="mx-auto h-12 w-12 text-sky-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-sky-600">
                      Click to upload an image
                    </p>
                    <p className="mt-1 text-xs text-sky-500">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required={!initialData}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-sky-300 text-gray-700"
                placeholder="Enter banner title"
                required
              />
            </div>

            {/* Subtitle Input */}
            <div>
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                id="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-sky-300 text-gray-700"
                placeholder="Enter banner subtitle"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is-active"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
              />
              <label
                htmlFor="is-active"
                className="ml-2 block text-sm text-sky-700"
              >
                Make this banner active
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-xl space-y-3 sm:space-y-0 mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-base font-medium text-white hover:from-sky-500 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {initialData ? "Update Banner" : "Add Banner"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBannerModal;