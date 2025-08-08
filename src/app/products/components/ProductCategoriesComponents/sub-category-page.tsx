"use client";

import React, { useEffect, useState, useCallback } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import AddProductSubCategoryModal from "../../Models/AddSubCategoryModal";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAllProductSubCategories } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import UpdateProductSubCategoryModal from "../../Models/UpdateProductSubCategoryModal";

interface SubCategory {
  id: number;
  category: string;
  subCategory: string;
  slug: string;
  status: boolean;
  product_category_id?: number; // optional for now
}

const SubCategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { subCategories, totalPages, loading, error } = useSelector(
    (state: RootState) => state.getAllProductSubCategories
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // ✅ new state
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null); // ✅ store row data

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProductSubCategories(currentPage));
  }, [dispatch, currentPage]);

  const fetchData = useCallback((): SubCategory[] => {
    let formatted = (subCategories || []).map((item: any) => ({
      id: item.id,
      category: item.product_category?.name || "N/A",
      subCategory: item.name,
      slug: item.slug,
      status:
        typeof item.status === "boolean" ? item.status : item.status === 1,
      product_category_id: item.product_category?.id || null,
    }));

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      formatted = formatted.filter(
        (item) =>
          item.category.toLowerCase().includes(term) ||
          item.subCategory.toLowerCase().includes(term) ||
          item.slug.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== null) {
      formatted = formatted.filter((item) => item.status === filterStatus);
    }

    return formatted;
  }, [subCategories, searchTerm, filterStatus]);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setIsUpdateModalOpen(false); // ✅ close update modal also
    dispatch(getAllProductSubCategories(currentPage));
  };

  const columns = [
    {
      key: "category",
      header: "Category",
      width: "200px",
      render: (item: SubCategory) => (
        <span className="font-medium">{item.category}</span>
      ),
    },
    {
      key: "subCategory",
      header: "Sub Category",
      width: "200px",
      render: (item: SubCategory) => (
        <span className="font-medium">{item.subCategory}</span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      width: "250px",
      render: (item: SubCategory) => (
        <span className="text-gray-600 font-mono">{item.slug}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "170px",
      render: (item: SubCategory) => (
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
      render: (item: SubCategory) => (
        <div className="flex gap-2">
          {/* ✅ Edit Button */}
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Edit Sub Category"
            onClick={() => {
              setSelectedSubCategory({
                id: item.id,
                name: item.subCategory,
                slug: item.slug,
                status: item.status ? 1 : 0,
                product_category_id: item.product_category_id || 0,
              });
              setIsUpdateModalOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>

          {/* Delete Button (future implementation) */}
          <button
            className="text-red-600 hover:text-red-800"
            title="Delete Sub Category"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: null, label: "All" },
    { value: true, label: "Active" },
    { value: false, label: "Pending" },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sub Categories</h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            onClick={() => dispatch(getAllProductSubCategories(currentPage))}
            disabled={loading}
          >
            Refresh
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={loading}
          >
            Add Sub Category
          </button>
        </div>
      </div>

      <CommonCustomTable<SubCategory>
        data={fetchData()}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        title="Sub Categories"
        isLoading={loading}
        filterOptions={filterOptions}
        onFilter={(value) => setFilterStatus(value === "" ? null : value)}
        onSearch={(value) => setSearchTerm(value)}
      />

      {/* Add Modal */}
      <AddProductSubCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {selectedSubCategory && (
        <UpdateProductSubCategoryModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSuccess={handleSuccess}
          subCategory={selectedSubCategory}
        />
      )}
    </div>
  );
};

export default SubCategoryPage;
