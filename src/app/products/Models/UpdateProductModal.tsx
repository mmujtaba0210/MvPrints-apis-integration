"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAllCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { getAllProductSubCategories } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import { fetchChildCategories } from "@/redux/slices/productCategorySlices/ChildCategorySlices/fetchChildCategorySlice";
import { fetchBrands } from "@/redux/slices/Product/productBrandSlice/fetchBrandsSlice";
import { getAllDeliveryTimes } from "@/redux/slices/Product/DeliveryTime/getAllDeliveryTimesSlice";

interface UpdateProductModalProps {
  isOpen: boolean;
  product: any;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

const UpdateProductModal = ({
  isOpen,
  product,
  onClose,
  onUpdate,
}: UpdateProductModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { allCategories } = useSelector(
    (state: RootState) => state.getAllCategories
  );
  const { subCategories } = useSelector(
    (state: RootState) => state.getAllProductSubCategories
  );
  const { childCategories } = useSelector(
    (state: RootState) => state.fetchChildCategories
  );
  const { brands } = useSelector((state: RootState) => state.fetchBrands);
  const { deliveryTimes } = useSelector(
    (state: RootState) => state.getAllDeliveryTimes
  );

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllCategories());
      dispatch(getAllProductSubCategories(1));
      dispatch(fetchChildCategories(1));
      dispatch(fetchBrands(1));
      dispatch(getAllDeliveryTimes(1));
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {/* Name */}
          <label className="block">
            <span className="font-medium">Product Name</span>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          {/* Slug */}
          <label className="block">
            <span className="font-medium">Slug</span>
            <input
              type="text"
              name="slug"
              value={formData.slug || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          {/* SKU */}
          <label className="block">
            <span className="font-medium">SKU</span>
            <input
              type="text"
              name="sku"
              value={formData.sku || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          {/* Price */}
          <label className="block">
            <span className="font-medium">Price</span>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          {/* Discount */}
          <label className="block">
            <span className="font-medium">Discount</span>
            <input
              type="number"
              name="discount"
              value={formData.discount || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          {/* Stock */}
          <label className="block">
            <span className="font-medium">Stock</span>
            <input
              type="number"
              name="stock"
              value={formData.stock || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          {/* Category */}
          <label className="block">
            <span className="font-medium">Category</span>
            <select
              name="product_category_id"
              value={formData.product_category_id || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select Category</option>
              {allCategories?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          {/* Sub Category */}
          <label className="block">
            <span className="font-medium">Sub Category</span>
            <select
              name="product_sub_category_id"
              value={formData.product_sub_category_id || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select Sub Category</option>
              {subCategories?.map((sub: any) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </label>

          {/* Child Category */}
          <label className="block">
            <span className="font-medium">Child Category</span>
            <select
              name="product_child_category_id"
              value={formData.product_child_category_id || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select Child Category</option>
              {childCategories?.map((child: any) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </label>

          {/* Brand */}
          <label className="block">
            <span className="font-medium">Brand</span>
            <select
              name="product_brand_id"
              value={formData.product_brand_id || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select Brand</option>
              {brands?.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>

          {/* Delivery Time */}
          <label className="block">
            <span className="font-medium">Delivery Time</span>
            <select
              name="product_deleivery_time_id"
              value={formData.product_deleivery_time_id || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select Delivery Time</option>
              {deliveryTimes?.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.min_days} - {d.maximum_days} Days
                </option>
              ))}
            </select>
          </label>

          {/* Shipping */}
          <label className="block">
            <span className="font-medium">Shipping</span>
            <select
              name="is_shipping_cost"
              value={formData.is_shipping_cost || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="0">No Shipping Cost</option>
              <option value="1">Has Shipping Cost</option>
            </select>
          </label>

          {formData.is_shipping_cost === "1" && (
            <label className="block">
              <span className="font-medium">Shipping Cost</span>
              <input
                type="number"
                name="shipping_cost"
                value={formData.shipping_cost || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
