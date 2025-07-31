"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateBrand } from "@/redux/slices/authSlice/Product/productBrandSlice/updateBrandSlice";

interface UpdateBrandFormProps {
  selectedBrand: {
    id: number;
    name: string;
    file_path: string;
    meta_title: string;
    meta_description: string;
  };
  onClose: () => void;
}

interface UpdateBrandFormData {
  name: string;
  logo: FileList | null;
  metaTitle: string;
  metaDescription: string;
}

const UpdateBrandForm: React.FC<UpdateBrandFormProps> = ({
  selectedBrand,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBrandFormData>({
    defaultValues: {
      name: selectedBrand.name,
      metaTitle: selectedBrand.meta_title,
      metaDescription: selectedBrand.meta_description,
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(
    selectedBrand.file_path
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = async (data: UpdateBrandFormData) => {
    await dispatch(
      updateBrand({
        id: selectedBrand.id,
        name: data.name,
        logo: data.logo,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      })
    );

    reset();
    setLogoPreview(null);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg  p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Update Brand</h2>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Brand name is required" })}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Logo
          </label>
          <div className="flex items-center">
            <div className="mr-4">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-16 h-16 object-contain border rounded"
                />
              ) : (
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
                  No logo
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                {...register("logo")}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            {...register("metaTitle")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            {...register("metaDescription")}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.536-3.536A8 8 0 0120 12h-4l3.536 3.536A8 8 0 0112 20v-4l-3.536 3.536A8 8 0 014 12z"
                />
              </svg>
            )}
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBrandForm;
