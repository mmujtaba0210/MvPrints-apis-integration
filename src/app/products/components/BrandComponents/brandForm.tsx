"use client";

import { createBrand } from "@/redux/slices/Product/productBrandSlice/createProductBrandSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface BrandFormData {
  name: string;
  logo: FileList | null;
  metaTitle: string;
  metaDescription: string;
}
interface BrandFormProps {
  onSubmit: (data: BrandFormData) => void;
}

const BrandForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormData>();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.createBrand);
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

  const onFormSubmit = async (data: BrandFormData) => {
    try {
      const dataR = await dispatch(createBrand(data))
        .unwrap()
        .catch((error) => {
          console.error("Failed to create brand:", error);
          toast.error("Failed to create brand");
          toast.success("Created Successfully");
          console.log(dataR);
        });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create brand");
    }

    setLogoPreview(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4  text-gray-700">
        Add New Brand
      </h2>
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Brand
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
