"use client";

import React, { useState, useEffect } from "react";
import { CustomInput } from "@/common/customInputField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateDeliveryTime } from "@/redux/slices/Product/DeliveryTime/updateDeliveryTimeSlice";
import { useForm } from "react-hook-form";
import { createDeliveryTime } from "@/redux/slices/Product/DeliveryTime/createDeliveryTimeSlice";
import { toast } from "react-toastify";

interface DeliveryTimeFormValues {
  name: string;
  min_days: number;
  max_days: number;
  status: "Active" | "Inactive";
}

interface AddProductDeliveryTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: {
    id: number;
    name: string;
    min_days: number;
    max_days: number;
    status: boolean;
  } | null;
}

const AddProductDeliveryTimeModal: React.FC<
  AddProductDeliveryTimeModalProps
> = ({ isOpen, onClose, onSuccess, editData }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeliveryTimeFormValues>({
    defaultValues: {
      name: "",
      min_days: 0,
      max_days: 0,
      status: "Active",
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        min_days: editData.min_days,
        max_days: editData.max_days,
        status: editData.status ? "Active" : "Inactive",
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data: DeliveryTimeFormValues) => {
    try {
      if (editData) {
        await dispatch(
          updateDeliveryTime({
            id: String(editData.id),
            payload: {
              name: data.name,
              min_days: Number(data.min_days),
              max_days: Number(data.max_days),
              status: data.status === "Active" ? 1 : 0,
            },
          })
        ).unwrap();
        toast.success("Delivery time updated successfully");
      } else {
        try {
          await dispatch(
            createDeliveryTime({
              name: data.name,
              min_days: Number(data.min_days),
              max_days: Number(data.max_days),
              status: data.status === "Active" ? 1 : 0,
            })
          ).unwrap();
          toast.success("Delivery time added successfully");
        } catch (error) {
          console.log(error);
        }
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error saving delivery time:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {editData ? "Update Delivery Time" : "Add Delivery Time"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            ✕
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 overflow-y-auto flex-1 space-y-4"
        >
          {/* Name */}
          <CustomInput
            label="Delivery Option Name"
            name="name"
            register={register}
            required
            placeholder="e.g. Fast Delivery"
            errors={errors}
          />

          {/* Min Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Days
            </label>
            <input
              type="number"
              {...register("min_days", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.min_days && (
              <p className="text-red-500 text-xs">Required</p>
            )}
          </div>

          {/* Max Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Days
            </label>
            <input
              type="number"
              {...register("max_days", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.max_days && (
              <p className="text-red-500 text-xs">Required</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input type="radio" value="Active" {...register("status")} />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="Inactive" {...register("status")} />
                <span className="ml-2">Inactive</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductDeliveryTimeModal;
