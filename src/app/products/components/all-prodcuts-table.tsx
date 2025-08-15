"use client";

import React, { useEffect, useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";

import {
  deleteProduct,
  resetDeleteState,
} from "@/redux/slices/productSlices/deleteProductSlice";
import { AddProductModal } from "../Models/AddProductModal";
import { fetchProducts } from "@/redux/slices/productSlices/getAllProductsSlice";
import { FaTrash } from "react-icons/fa";

interface ProductSEO {
  title: string;
  slug: string;
  keywords: string;
  meta_tags: string[];
  tags: string[];
  meta_description: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  category: string;
  sub_category: string;
  child_category: string;
  brand: string;
  delivery_days: number | null;
  varient: string;
  is_shipping_cost: boolean;
  shipping_cost: string;
  shipping_location: string;
  model: string;
  description: string;
  specification: string;
  refund_policy: string;
  allow_wholesale: boolean;
  price: string;
  discount: string;
  sku: string;
  stock: number;
  is_active: boolean;
  seo: ProductSEO;
  media: any[];
  labels: string[];
  created_at: string;
  updated_at: string;
}

const AllProductsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.fetchProducts
  );
  const { success: deleteSuccess } = useSelector(
    (state: RootState) => state.deleteProduct
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(fetchProducts());
      dispatch(resetDeleteState());
    }
  }, [deleteSuccess, dispatch]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredData = data.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      (product.is_active ? "Published" : "Draft").toLowerCase() ===
        statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: "name", header: "Name" },
    { key: "slug", header: "Slug" },
    { key: "type", header: "Type" },
    { key: "category", header: "Category" },
    { key: "sub_category", header: "Sub Category" },
    { key: "child_category", header: "Child Category" },
    { key: "brand", header: "Brand" },
    { key: "price", header: "Price" },
    { key: "discount", header: "Discount" },
    { key: "sku", header: "SKU" },
    { key: "stock", header: "Stock" },
    {
      key: "seo.meta_tags",
      header: "Meta Tags",
      render: (item: Product) => (
        <div className="flex flex-wrap gap-1">
          {item.seo.meta_tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "seo.tags",
      header: "Tags",
      render: (item: Product) => (
        <div className="flex flex-wrap gap-1">
          {item.seo.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-800 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "labels",
      header: "Labels",
      render: (item: Product) => (
        <div className="flex flex-wrap gap-1">
          {item.labels.map((label, i) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-800 px-2 py-1 rounded"
            >
              {label}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Product) => (
        <div className="flex gap-2">
          <button
            className="text-red-600"
            onClick={() => handleDelete(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Published", label: "Published" },
    { value: "Draft", label: "Draft" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={() => dispatch(fetchProducts())}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </button>
        </div>
      </div>

      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      <CommonCustomTable<Product>
        data={filteredData}
        columns={columns}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        title="Product List"
        onSearch={(query: string) => setSearchQuery(query)}
      />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => dispatch(fetchProducts())}
      />
    </div>
  );
};

export default AllProductsTable;
