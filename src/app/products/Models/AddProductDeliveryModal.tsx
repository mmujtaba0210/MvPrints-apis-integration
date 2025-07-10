"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { CustomInput } from "@/common/customInputField";

interface AddProductDeliveryTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  register: any;
  errors: any;
}

const AddProductDeliveryTimeModal: React.FC<AddProductDeliveryTimeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  register,
  errors,
}) => {
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to add the delivery time
    console.log("Adding delivery time with data:", { 
      status
    });
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Add Delivery Time</h2>
            <p className="text-blue-100 text-sm mt-1">Create a new product delivery time option</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* Delivery Option Name */}
            <CustomInput
              label="Delivery Option Name"
              name="name"
              register={register}
              required={true}
              placeholder="e.g. Standard Delivery"
              errors={errors}
            />

            {/* Minimum Days */}
            <div className="space-y-1">
              <label htmlFor="minDays" className="block text-sm font-medium text-gray-700">
                Minimum Days <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="minDays"
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Enter minimum delivery days"
                min="1"
                {...register("minDays", { required: true, min: 1 })}
              />
              {errors.minDays && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.minDays.type === "required" 
                    ? "This field is required" 
                    : "Minimum days must be at least 1"}
                </p>
              )}
            </div>

            {/* Maximum Days */}
            <div className="space-y-1">
              <label htmlFor="maxDays" className="block text-sm font-medium text-gray-700">
                Maximum Days <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="maxDays"
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                placeholder="Enter maximum delivery days"
                min="1"
                {...register("maxDays", { required: true, min: 1 })}
              />
              {errors.maxDays && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maxDays.type === "required" 
                    ? "This field is required" 
                    : "Maximum days must be at least 1"}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    checked={status === "Active"}
                    onChange={() => setStatus("Active")}
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-gray-600"
                    checked={status === "Inactive"}
                    onChange={() => setStatus("Inactive")}
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
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
            >
              Add Delivery Time
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductDeliveryTimeModal;