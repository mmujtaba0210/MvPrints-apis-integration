"use client";

import {
  getAllCategories,
  Category,
} from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { updateProductSubCategory } from "@/redux/slices/productCategorySlices/SubCategorySlices/updateSubCategorySlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface UpdateProductSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subCategory: {
    id: number;
    name: string;
    slug: string;
    status: number;
    product_category_id: number;
  };
}

const UpdateProductSubCategoryModal: React.FC<
  UpdateProductSubCategoryModalProps
> = ({ isOpen, onClose, onSuccess, subCategory }) => {
  const [formData, setFormData] = useState({
    name: subCategory.name,
    category: String(subCategory.product_category_id),
    slug: subCategory.slug,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.getAllCategories
  );

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(getAllCategories());
    }
  }, [isOpen, dispatch]);

  // Update local state when subCategory changes
  useEffect(() => {
    setFormData({
      name: subCategory.name,
      category: String(subCategory.product_category_id),
      slug: subCategory.slug,
    });
  }, [subCategory]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      updateProductSubCategory({
        id: subCategory.id,
        name: formData.name,
        slug: formData.slug,
        status: 1,
        product_category_id: Number(formData.category),
      })
    ).unwrap();

    toast.success("Sub Category Updated Successfully");
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Update Product Subcategory
            </h2>
            <p className="text-green-100 mt-1">
              Modify the details of an existing subcategory
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Parent Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-800 appearance-none"
              >
                <option value="">Select a category</option>
                {categories.length > 0 &&
                  categories.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {loading && (
                <p className="text-xs text-gray-500">Loading categories...</p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Subcategory Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-800"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700"
              >
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-800"
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
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Update Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductSubCategoryModal;
