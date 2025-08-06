"use client";

import React, { useEffect, useState, useCallback } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import AddProductSubCategoryModal from "../../Models/AddSubCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAllProductSubCategories } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";

interface SubCategory {
  id: number;
  category: string;
  subCategory: string;
  slug: string;
  status: number;
}

const SubCategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subCategories, totalPages, loading, error } = useSelector(
    (state: RootState) => state.getAllProductSubCategories
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProductSubCategories(currentPage));
  }, [dispatch, currentPage]);

  const fetchData = useCallback((): SubCategory[] => {
    return (subCategories || []).map((item: any) => ({
      id: item.id,
      category: item.category?.name || "N/A",
      subCategory: item.name,
      slug: item.slug,
      status: item.status,
    }));
  }, [subCategories]);

  const handleSuccess = () => {
    setIsModalOpen(false);
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
            item.status === 1
              ? "bg-green-100 text-green-600"
              : item.status === 0
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status === 1 ? "Active" : "Pending"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      render: (item: SubCategory) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Edit Sub Category"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
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
        onFilter={() => {}}
        onSearch={() => {}}
      />

      <AddProductSubCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default SubCategoryPage;
