"use client";

import React, { useState } from "react";
import { FiPlus, FiX, FiChevronDown, FiDollarSign, FiCalendar, FiPercent, FiTag, FiInfo } from "react-icons/fi";

interface CustomField {
  id: string;
  name: string;
  value: string;
}

const SubscriptionAddPlanModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    cost: "",
    days: "",
    percentage: "",
    priceOverOrder: "",
    details: "",
    availability: "available",
  });
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, availability: value }));
    setIsDropdownOpen(false);
  };

  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      { id: Date.now().toString(), name: "", value: "" },
    ]);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };

  const handleCustomFieldChange = (
    id: string,
    field: "name" | "value",
    value: string
  ) => {
    setCustomFields(
      customFields.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subscriptionData = {
      ...formData,
      customFields: customFields.filter((field) => field.name && field.value),
    };
    onSubmit(subscriptionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Add New Subscription Plan
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-sky-100 transition-all duration-200 transform hover:rotate-90"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Subscription Title */}
          <div>
            <label
              htmlFor="title"
              className=" text-sm font-medium text-sky-700 mb-2 flex items-center"
            >
              <FiTag className="mr-2" />
              Subscription Title <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter subscription title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
              required
            />
          </div>

          {/* Cost and Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="cost"
                className="text-sm font-medium text-sky-700 mb-2 flex items-center"
              >
                <FiDollarSign className="mr-2" />
                Cost ($) <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label
                htmlFor="days"
                className=" text-sm font-medium text-sky-700 mb-2 flex items-center"
              >
                <FiCalendar className="mr-2" />
                Days <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="30"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
                required
                min="1"
              />
            </div>
          </div>

          {/* Percentage and Price Over Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="percentage"
                className="text-sm font-medium text-sky-700 mb-2 flex items-center"
              >
                <FiPercent className="mr-2" />
                Percentage (%)
              </label>
              <input
                type="number"
                id="percentage"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                placeholder="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label
                htmlFor="priceOverOrder"
                className="text-sm font-medium text-sky-700 mb-2 flex items-center"
              >
                <FiDollarSign className="mr-2" />
                Price Over Order ($)
              </label>
              <input
                type="number"
                id="priceOverOrder"
                name="priceOverOrder"
                value={formData.priceOverOrder}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className=" text-sm font-medium text-sky-700 mb-2 flex items-center"
            >
              <FiInfo className="mr-2" />
              Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter subscription details"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
            ></textarea>
          </div>

          {/* Availability Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-sky-700 mb-2">
              Availability <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex justify-between items-center bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            >
              <span className="capitalize">
                {formData.availability === "available"
                  ? "Available"
                  : "Not Available"}
              </span>
              <FiChevronDown
                className={`transition-transform ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleAvailabilityChange("available")}
                      className="w-full px-4 py-2 text-left hover:bg-sky-50 hover:text-sky-600 transition-colors duration-200"
                    >
                      Available
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleAvailabilityChange("not available")}
                      className="w-full px-4 py-2 text-left hover:bg-sky-50 hover:text-sky-600 transition-colors duration-200"
                    >
                      Not Available
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Custom Fields */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-sky-700">
                Additional Fields
              </label>
              <button
                type="button"
                onClick={addCustomField}
                className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors duration-200"
              >
                <FiPlus className="mr-1" /> Add Field
              </button>
            </div>

            {customFields.map((field) => (
              <div key={field.id} className="flex items-center mb-3 gap-3">
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) =>
                    handleCustomFieldChange(field.id, "name", e.target.value)
                  }
                  placeholder="Field name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
                />
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) =>
                    handleCustomFieldChange(field.id, "value", e.target.value)
                  }
                  placeholder="Field value"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 placeholder-sky-300 text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => removeCustomField(field.id)}
                  className="text-red-500 hover:text-red-700 p-2 transition-colors duration-200"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-base font-medium text-white hover:from-sky-500 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 sm:w-auto sm:text-sm transition-all duration-200 hover:shadow-md"
            >
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionAddPlanModal;