"use client";

import React, { useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import { Coupon } from "../types/couponsTypes";
import AddCouponModal from "./addCouponModal"; // Import the modal component

const mockData: Coupon[] = [
  {
    id: 1,
    code: "SUMMER25",
    type: "Percentage",
    amount: "25%",
    used: "45/100",
    status: "Active",
  },
  {
    id: 2,
    code: "FREESHIP",
    type: "Fixed",
    amount: "$10.00",
    used: "82/200",
    status: "Active",
  },
  {
    id: 3,
    code: "WELCOME10",
    type: "Percentage",
    amount: "10%",
    used: "120/500",
    status: "Active",
  },
];

const CouponsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchData = React.useCallback(() => mockData, []);
  
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
  } = useTableData<Coupon>(
    fetchData,
    ["code", "type", "amount", "status"],
    "status"
  );

  const handleCreateCoupon = () => {
    setIsModalOpen(true);
  };

  const handleCouponCreated = () => {
    setIsModalOpen(false);
    reload(); // Refresh the table data after creating a coupon
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "code",
      header: "Code",
      width: "200px",
      render: (item: Coupon) => (
        <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded">
          {item.code}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "160px",
    },
    {
      key: "amount",
      header: "Amount",
      width: "160px",
      render: (item: Coupon) => (
        <span className="font-semibold">
          {item.type === "Percentage" ? item.amount : `$${parseFloat(item.amount.replace('$', '')).toFixed(2)}`}
        </span>
      ),
    },
    {
      key: "used",
      header: "Used",
      width: "250px",
      render: (item: Coupon) => {
        const [used, total] = item.used.split('/');
        const percentage = (parseInt(used) / parseInt(total)) * 100;
        return (
          <div className="flex flex-col">
            <span className="text-sm">{item.used}</span>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className={`h-1.5 rounded-full ${
                  percentage >= 80 ? 'bg-red-500' : 
                  percentage >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      width: "220px",
      render: (item: Coupon) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Expired"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "120px",
      render: (item: Coupon) => (
        <div className="flex gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            title="Edit Plan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            className="text-red-600 hover:text-red-800"
            title="Delete Plan"
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
    { value: "Expired", label: "Expired" },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add Coupon Modal */}
      <AddCouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCouponCreated}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Coupon Management</h1>
        <div className="flex gap-4">
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            onClick={reload}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={handleCreateCoupon}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Coupon
          </button>
        </div>
      </div>
      <CommonCustomTable<Coupon>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Coupons List"
      />
    </div>
  );
};

export default CouponsPage;