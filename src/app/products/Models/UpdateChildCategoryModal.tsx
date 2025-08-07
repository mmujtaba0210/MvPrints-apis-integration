"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "@/redux/store/store";
import { updateChildCategory } from "@/redux/slices/productCategorySlices/ChildCategorySlices/updateChildCategorySlice";
import { getAllCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { getAllSubCategoriesWithoutPagination } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";

interface UpdateChildCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  childCategory: {
    id: string;
    name: string;
    category: string;
    subCategory: string;
    slug: string;
    product_category_id: string;
    product_sub_category_id: string;
    icon?: string;
    status: boolean;
  };
}

const UpdateChildCategoryModal: React.FC<UpdateChildCategoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  childCategory,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { allCategories } = useSelector(
    (state: RootState) => state.getAllCategories
  );
  const { subCategories } = useSelector(
    (state: RootState) => state.getAllProductSubCategories
  );

  const [formData, setFormData] = useState({
    categoryId: "",
    subcategoryId: "",
    name: "",
    slug: "",
    status: 1,
  });

  const [iconPreview, setIconPreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllSubCategoriesWithoutPagination());
  }, [dispatch]);

  useEffect(() => {
    if (childCategory) {
      setFormData({
        categoryId: childCategory.product_category_id || "",
        subcategoryId: childCategory.product_sub_category_id || "",
        name: childCategory.name || "",
        slug: childCategory.slug || "",
        status: childCategory.status ? 1 : 0,
      });
      setIconPreview(childCategory.icon || null);
    }
  }, [childCategory]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result as string);
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
    formPayload.append("status", formData.status.toString());

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
        error?.message ||
          "Failed to update child category. Slug might be taken."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        {/* Header */}
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
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Category</option>
                {allCategories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block mb-1 font-medium">Sub Category</label>
              <select
                name="subcategoryId"
                value={formData.subcategoryId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Subcategory</option>
                {subCategories?.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">
                Child Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block mb-1 font-medium">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="1">Active</option>
                <option value="0">Pending</option>
              </select>
            </div>

            {/* Icon Upload */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Icon (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="w-full"
              />
              {iconPreview && (
                <div className="mt-2 relative w-fit">
                  <Image
                    src={iconPreview}
                    alt="Icon Preview"
                    width={80}
                    height={80}
                    className="rounded border"
                  />
                  <button
                    onClick={removeIcon}
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ✖
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !formData.categoryId ||
                !formData.subcategoryId ||
                !formData.name ||
                !formData.slug
              }
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 font-medium"
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
