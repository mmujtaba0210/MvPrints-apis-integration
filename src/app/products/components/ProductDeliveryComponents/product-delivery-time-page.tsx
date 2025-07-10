"use client";

import React, { useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import AddProductDeliveryTimeModal from "../../Models/AddProductDeliveryModal";
import { useForm } from "react-hook-form";

interface ProductDeliveryTime {
  id: number;
  name: string;
  minDays: number;
  maxDays: number;
  status: "Active" | "Inactive";
}

const mockData: ProductDeliveryTime[] = [
  {
    id: 1,
    name: "Standard Delivery",
    minDays: 3,
    maxDays: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Express Delivery",
    minDays: 1,
    maxDays: 2,
    status: "Active",
  },
  {
    id: 3,
    name: "Extended Delivery",
    minDays: 7,
    maxDays: 14,
    status: "Inactive",
  },
];

const ProductDeliveryTimeTable = () => {
  const fetchData = React.useCallback(() => mockData, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    error,
    reload,
  } = useTableData<ProductDeliveryTime>(
    fetchData,
    ["name", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "name",
      header: "Delivery Option",
      width: "200px",
      render: (item: ProductDeliveryTime) => (
        <span className="font-medium text-gray-800">{item.name}</span>
      ),
    },
    {
      key: "minDays",
      header: "Min Days",
      width: "120px",
      render: (item: ProductDeliveryTime) => (
        <span className="text-sm text-gray-600">{item.minDays} days</span>
      ),
    },
    {
      key: "maxDays",
      header: "Max Days",
      width: "120px",
      render: (item: ProductDeliveryTime) => (
        <span className="text-sm text-gray-600">{item.maxDays} days</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: ProductDeliveryTime) => {
        const statusStyles = {
          Active: "bg-green-100 text-green-600",
          Inactive: "bg-gray-100 text-gray-600",
        };
        
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      key: "options",
      header: "Options",
      width: "150px",
      render: (item: ProductDeliveryTime) => (
        <div className="flex gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
        <button 
          onClick={reload}
          className="absolute top-0 right-0 px-4 py-3"
        >
          <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Product Delivery Times</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New
        </button>
      </div>
      <CommonCustomTable<ProductDeliveryTime>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Product Delivery Times List"
      />

      <AddProductDeliveryTimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          console.log("Delivery time added successfully");
          setIsModalOpen(false);
          reload();
        }}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default ProductDeliveryTimeTable;