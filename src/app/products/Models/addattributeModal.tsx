"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { createAttribute } from "@/redux/slices/authSlice/Product/productAttributionSlice/productAttributionSlice";
import { toast } from "react-toastify";

interface CreateAttributesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateAttributesModal: React.FC<CreateAttributesModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    attributeName: "",
    attributeValue: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const values = formData.attributeValue.split(",").map((v) => v.trim());

    try {
      await dispatch(
        createAttribute({
          name: formData.attributeName,
          description: formData.description,
          values: values,
        })
      ).unwrap();
      toast.success("Attribute created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create attribute:", error);
      toast.error("Failed to create attribute. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Create Print Attribute
            </h2>
            <p className="text-blue-100 mt-1">
              Define a new print attribute for your products
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
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

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <label
                htmlFor="attributeName"
                className="block text-sm font-medium text-gray-700"
              >
                Attribute Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="attributeName"
                name="attributeName"
                value={formData.attributeName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="e.g. Paper Type, Finishing"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="attributeValue"
                className="block text-sm font-medium text-gray-700"
              >
                Attribute Value <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="attributeValue"
                name="attributeValue"
                value={formData.attributeValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="e.g. Glossy, Matte, UV Coating"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple values with commas
              </p>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-800"
                placeholder="Provide details about this attribute..."
              />
            </div>
          </div>

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
              Create Attribute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAttributesModal;
