"use client";

import React, { useEffect, useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { AddProductModal } from "../../Models/AddProductModal";
import {
  fetchDigitalProducts,
  fetchProducts,
} from "@/redux/slices/productSlices/getAllProductsSlice";
import {
  updateProduct,
  resetUpdateState,
} from "@/redux/slices/productSlices/updateProductSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateProductModal from "../../Models/UpdateProductModal";
import { toast } from "react-toastify";
import {
  deleteProduct,
  resetDeleteState,
} from "@/redux/slices/productSlices/deleteProductSlice";

const AllProductsTable = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.fetchProducts
  );
  const { success: deleteSuccess } = useSelector(
    (state: RootState) => state.deleteProduct
  );
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state: RootState) => state.updateProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // fetch products initially
  useEffect(() => {
    dispatch(fetchDigitalProducts());
  }, [dispatch]);

  // handle delete refresh
  useEffect(() => {
    if (deleteSuccess) {
      dispatch(fetchProducts());
      dispatch(resetDeleteState());
    }
  }, [deleteSuccess, dispatch]);

  // handle update refresh
  useEffect(() => {
    if (updateSuccess) {
      toast.success("✅ Product updated successfully!");
      dispatch(fetchDigitalProducts());
      dispatch(resetUpdateState());
      setEditModalOpen(false);
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(resetUpdateState());
    }
  }, [updateSuccess, updateError, dispatch]);

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
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 cursor-pointer "
            onClick={() => {
              setSelectedProduct(item);
              setEditModalOpen(true);
              console.log(item);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Digital Products</h1>
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

      <CommonCustomTable
        data={filteredData}
        columns={columns}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        title="Digital Product List"
        onSearch={(query: string) => setSearchQuery(query)}
      />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => dispatch(fetchProducts())}
      />

      <UpdateProductModal
        isOpen={editModalOpen}
        product={selectedProduct}
        onClose={() => setEditModalOpen(false)}
        onUpdate={(updatedData) =>
          dispatch(updateProduct({ id: updatedData.id, updatedData }))
        }
      />
    </div>
  );
};

export default AllProductsTable;
