"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const couponTypes = [
  { value: "percentage", label: "Percentage Discount" },
  { value: "fixed", label: "Fixed Amount" },
  { value: "free_shipping", label: "Free Shipping" },
];

const AddCouponModal: React.FC<AddCouponModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    percentage: "",
    minPurchase: "",
    perLimit: "",
    maxValue: "",
    perCustomer: "",
    quantity: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        [field]: date
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to add the coupon
    console.log("Adding coupon:", formData);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Create New Coupon</h2>
            <p className="text-purple-100 mt-1">Setup discount rules and limitations</p>
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
            {/* Coupon Code */}
            <div className="space-y-1">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Coupon Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-800"
                placeholder="e.g. SUMMER20"
              />
            </div>

            {/* Coupon Type */}
            <div className="space-y-1">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Coupon Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
              >
                {couponTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Percentage Discount (shown when type is percentage) */}
            {formData.type === "percentage" && (
              <div className="space-y-1">
                <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                  Discount Percentage <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="percentage"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-800"
                    placeholder="e.g. 20"
                  />
                  <span className="absolute left-3 top-3 text-gray-500">%</span>
                </div>
              </div>
            )}

            {/* Minimum Purchase */}
            <div className="space-y-1">
              <label htmlFor="minPurchase" className="block text-sm font-medium text-gray-700">
                Minimum Purchase
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="minPurchase"
                  name="minPurchase"
                  value={formData.minPurchase}
                  onChange={handleChange}
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-800"
                  placeholder="e.g. 50.00"
                />
              </div>
            </div>

            {/* Per Limit */}
            <div className="space-y-1">
              <label htmlFor="perLimit" className="block text-sm font-medium text-gray-700">
                Uses Per Coupon
              </label>
              <input
                type="number"
                id="perLimit"
                name="perLimit"
                value={formData.perLimit}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-800"
                placeholder="Leave empty for unlimited"
              />
            </div>

            {/* Max Value (for percentage coupons) */}
            {formData.type === "percentage" && (
              <div className="space-y-1">
                <label htmlFor="maxValue" className="block text-sm font-medium text-gray-700">
                  Maximum Discount Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    id="maxValue"
                    name="maxValue"
                    value={formData.maxValue}
                    onChange={handleChange}
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-800"
                    placeholder="e.g. 100.00"
                  />
                </div>
              </div>
            )}

            {/* Uses Per Customer */}
            <div className="space-y-1">
              <label htmlFor="perCustomer" className="block text-sm font-medium text-gray-700">
                Uses Per Customer
              </label>
              <input
                type="number"
                id="perCustomer"
                name="perCustomer"
                value={formData.perCustomer}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-800"
                placeholder="Leave empty for unlimited"
              />
            </div>

            {/* Total Quantity */}
            <div className="space-y-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Total Coupon Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-800"
                placeholder="Leave empty for unlimited"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date, "startDate")}
                selectsStart
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={new Date()}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* End Date */}
            <div className="space-y-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange(date, "endDate")}
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={formData.startDate}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
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
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponModal;