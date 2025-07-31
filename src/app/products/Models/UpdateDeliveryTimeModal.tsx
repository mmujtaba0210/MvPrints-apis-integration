"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateDeliveryTime } from "@/redux/slices/Product/DeliveryTime/updateDeliveryTimeSlice";
import { toast } from "react-toastify";

interface UpdateDeliveryTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  deliveryTime: {
    id: string;
    delivery_option: string;
    minimum_days: string;
    maximum_days: string;
  };
}

const UpdateDeliveryTimeModal: React.FC<UpdateDeliveryTimeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  deliveryTime,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    delivery_option: deliveryTime.delivery_option,
    minimum_days: deliveryTime.minimum_days,
    maximum_days: deliveryTime.maximum_days,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        updateDeliveryTime({
          id: deliveryTime.id,
          payload: formData,
        })
      ).unwrap();

      toast.success("Delivery time updated successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Error updating delivery time:", error);
      toast.error(error || "Failed to update delivery time.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Update Delivery Time</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Option ID
            </label>
            <input
              type="number"
              name="delivery_option"
              value={formData.delivery_option}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Days
            </label>
            <input
              type="number"
              name="minimum_days"
              value={formData.minimum_days}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Days
            </label>
            <input
              type="number"
              name="maximum_days"
              value={formData.maximum_days}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDeliveryTimeModal;
