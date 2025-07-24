"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { updateCategory } from "@/redux/slices/productCategorySlices/updateCategorySlice";

interface UpdateProductCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: {
    id: number;
    name: string;
    title: string;
    slug: string;
    status: boolean;
    ordering: number;
    product_category_id: number;
  };
}

const UpdateProductCategoryModal: React.FC<UpdateProductCategoryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  category,
}) => {
  const [formData, setFormData] = useState({
    id: category.id,
    name: category.name,
    title: category.title,
    slug: category.slug,
    status: category.status ? 1 : 0,
    ordering: category.ordering || 0,
    product_category_id: category.product_category_id,
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setFormData({
      id: category.id,
      name: category.name,
      title: category.title,
      slug: category.slug,
      status: category.status ? 1 : 0,
      ordering: category.ordering || 0,
      product_category_id: category.product_category_id,
    });
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(updateCategory(formData));

    toast.success("Category updated successfully");
    onSuccess();
    onClose();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Update Category</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Ordering
            </label>
            <input
              name="ordering"
              type="number"
              value={formData.ordering}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductCategoryModal;
