"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { getCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { getAllProductSubCategories } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import { AppDispatch, RootState } from "@/redux/store/store";
import { updateChildCategory } from "@/redux/slices/productCategorySlices/ChildCategorySlices/updateChildCategorySlice";

interface UpdateChildCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  childCategory: {
    id: string;
    name: string;
    slug: string;
    product_category_id: string;
    product_sub_category_id: string;
    icon?: string;
  };
}

const UpdateChildCategoryModal: React.FC<UpdateChildCategoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  childCategory,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector(
    (state: RootState) => state.getAllCategories
  );
  const { subCategories } = useSelector(
    (state: RootState) => state.getAllProductSubCategories
  );

  const [formData, setFormData] = useState({
    categoryId: childCategory.product_category_id,
    subcategoryId: childCategory.product_sub_category_id,
    name: childCategory.name,
    slug: childCategory.slug,
  });

  const [iconPreview, setIconPreview] = useState<string | null>(
    childCategory.icon || null
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProductSubCategories());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeIcon = useCallback(() => {
    setIconPreview(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("_method", "PUT");
    formPayload.append("name", formData.name);
    formPayload.append("slug", formData.slug);
    formPayload.append("product_category_id", formData.categoryId);
    formPayload.append("product_sub_category_id", formData.subcategoryId);
    formPayload.append("status", "1");

    if (iconPreview && iconPreview !== childCategory.icon) {
      const fileInput =
        document.querySelector<HTMLInputElement>('input[type="file"]');
      const file = fileInput?.files?.[0];
      if (file) {
        formPayload.append("icon", file);
      }
    }

    try {
      await dispatch(
        updateChildCategory({ id: childCategory.id, payload: formPayload })
      ).unwrap();

      toast.success("Child category updated successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Error updating child category:", error);
      toast.error(
        error || "Failed to update child category. Slug might be taken."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Update Child Category
            </h2>
            <p className="text-blue-100 mt-1">
              Update an existing child category
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Same fields as your Add modal... */}
            {/* Category */}
            {/* Subcategory */}
            {/* Name */}
            {/* Slug */}
            {/* Icon upload */}
            {/* Reuse your Add modal JSX here */}
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
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
              disabled={!formData.categoryId || !formData.subcategoryId}
            >
              Update Child Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateChildCategoryModal;
