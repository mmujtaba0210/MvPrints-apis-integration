"use client";

import React, { useEffect, useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchProducts } from "@/redux/slices/productSlices/getAllProductsSlice";

import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  deleteProduct,
  resetDeleteState,
} from "@/redux/slices/productSlices/deleteProductSlice";
import { AddProductModal } from "../Models/FAddProductModal";
import { fetchPaginatedProducts } from "@/redux/slices/productSlices/paginationProductSlice";
import { Loader2 } from "lucide-react";

const AllProductsTable = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.paginatedProducts
  );

  const { success: deleteSuccess } = useSelector(
    (state: RootState) => state.deleteProduct
  );

  // ✅ Fetch all products initially
  useEffect(() => {
    dispatch(fetchPaginatedProducts({ page: 1, type: "prints" }));
    console.log(data);
  }, [dispatch]);

  // ✅ Handle Delete Success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("🗑️ Product deleted successfully!");
      dispatch(fetchPaginatedProducts({ page: 1, type: "prints" }));
      dispatch(resetDeleteState());
    }
  }, [deleteSuccess, dispatch]);

  // ✅ Delete Product Handler
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // ✅ Search and Filter Logic
  const filteredData = data.filter(
    (product: { name: string; category: string; is_active: any }) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        !statusFilter ||
        (product.is_active ? "Published" : "Draft").toLowerCase() ===
          statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    }
  );

  // ✅ Table Columns
  const columns = [
    { key: "name", header: "Name" },

    { key: "category", header: "Category" },

    { key: "price", header: "Price" },

    { key: "sku", header: "SKU" },

    {
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              setSelectedProduct(item);
              setEditModalOpen(true);
              console.log("🛠 Editing Product:", item);
            }}
          >
            <FaEdit />
          </button>
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Physical Products</h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={() => dispatch(fetchProducts())}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="animate-spin w-4 h-4" /> Please Wait ...
              </div>
            ) : (
              "Refresh"
            )}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      {/* Product Table */}
      <CommonCustomTable
        data={filteredData}
        columns={columns}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        title="Physical Product List"
        onSearch={(query: string) => setSearchQuery(query)}
      />

      {/* ✅ Add Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="add"
        onSuccess={() => dispatch(fetchProducts())}
      />

      {/* ✅ Update Product Modal */}
      {editModalOpen && selectedProduct && (
        <AddProductModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSuccess={() => dispatch(fetchProducts())}
          mode="edit"
          initialValues={selectedProduct}
        />
      )}
    </div>
  );
};

export default AllProductsTable;
