"use client";

import React, { useEffect, useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import AddProductCategoryModal from "../../Models/AddProductCatgeoryModal";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import UpdateProductSubCategoryModal from "../../Models/UpdateProductMainCategoryForm";

interface Category {
  id: number;
  name: string;
  ordering: number;
  status: boolean;
  slug: string;
}

const MainCategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();
  const { categories, totalPages } = useSelector(
    (state: RootState) => state.getAllCategories
  );

  const [page, setPage] = useState(1);

  const fetchData = React.useCallback(
    () =>
      categories.map((cat: any) => ({
        ...cat,
        status: cat.status === 1,
      })),
    [categories]
  );

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    dispatch(getCategories(page));
  };

  useEffect(() => {
    dispatch(getCategories(page));
    console.log(paginatedData);
  }, [dispatch, page]);

  const {
    paginatedData,
    currentPage,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    isLoading,
    error,
    reload,
  } = useTableData<Category>(fetchData, ["name", "slug"], "status");

  const columns = [
    {
      key: "name",
      header: "Name",
      width: "200px",
      render: (item: Category) => (
        <span className="font-medium">{item.name}</span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      width: "250px",
      render: (item: Category) => (
        <span className="text-gray-600 font-mono">{item.slug}</span>
      ),
    },
    {
      key: "order",
      header: "Order",
      width: "170px",
      render: (item: Category) => (
        <span className="font-semibold">{item.ordering}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "170px",
      render: (item: Category) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status ? "Active" : "Pending"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      render: (item: Category) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Edit Category"
            onClick={() => {
              setSelectedCategory(item);
              setIsModalOpen(true);
            }}
          >
            ✏️
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete Category"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Pending" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Main Categories</h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            onClick={() => dispatch(getCategories(page))}
            disabled={isLoading}
          >
            Refresh
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
          >
            + Add Main Category
          </button>
        </div>
      </div>

      <CommonCustomTable<Category>
        data={paginatedData}
        columns={columns}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Main Categories"
        isLoading={isLoading}
      />

      <AddProductCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {selectedCategory && (
        <UpdateProductSubCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          onSuccess={handleSuccess}
          category={{
            ...selectedCategory,
            title: selectedCategory.name,
            product_category_id: selectedCategory.id,
          }}
        />
      )}
    </div>
  );
};

export default MainCategoryPage;
