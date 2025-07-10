"use client";

import React, { useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import AddSliderModal from "./addPrintSliderModal";

interface PrintSlider {
  id: number;
  title: string;
  featuredImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockSliders: PrintSlider[] = [
  {
    id: 1,
    title: "Summer Collection 2023",
    featuredImage: "/images/sliders/summer-collection.jpg",
    isActive: true,
    createdAt: "2023-05-15",
    updatedAt: "2023-06-10",
  },
  {
    id: 2,
    title: "New Product Launch",
    featuredImage: "/images/sliders/new-product.jpg",
    isActive: true,
    createdAt: "2023-06-01",
    updatedAt: "2023-06-05",
  },
  {
    id: 3,
    title: "Special Discount Offer",
    featuredImage: "/images/sliders/discount-offer.jpg",
    isActive: false,
    createdAt: "2023-04-20",
    updatedAt: "2023-05-15",
  },
];

const PrintSlidersPage = () => {
  const fetchData = React.useCallback(() => mockSliders, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    isLoading,
    error,
    reload,
  } = useTableData<PrintSlider>(
    fetchData,
    ["title", "featuredImage", "isActive"],
    "isActive"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "120px",
    },
    {
      key: "featuredImage",
      header: "Featured Image",
      width: "190px",
      render: (item: PrintSlider) => (
        <div className="w-20 h-12 rounded-md overflow-hidden border border-gray-200">
          <img
            src={item.featuredImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      width: "240px",
    },
    {
      key: "isActive",
      header: "Status",
      width: "120px",
      render: (item: PrintSlider) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.isActive
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      width: "150px",
    },
    {
      key: "updatedAt",
      header: "Updated At",
      width: "120px",
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      render: (item: PrintSlider) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className={`p-1 rounded hover:bg-gray-100 ${
              item.isActive ? "text-yellow-600 hover:text-yellow-800" : "text-green-600 hover:text-green-800"
            }`}
            title={item.isActive ? "Deactivate" : "Activate"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              {item.isActive ? (
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              ) : (
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
              )}
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
          <button onClick={reload} className="absolute top-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Print Sliders</h1>
        <div className="flex gap-4">
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
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
            Add New Slider
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            onClick={reload}
            disabled={isLoading}
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
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      <CommonCustomTable<PrintSlider>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Print Sliders List"
        // searchPlaceholder="Search sliders by title..."
      />

      <AddSliderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log("Form submitted:", data);
          // Handle form submission here
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default PrintSlidersPage;
