// app/order-replacements/page.tsx
"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface OrderReplacement {
  id: number;
  customer: string;
  orderNumber: string;
  orderDate: string;
  orderTotal: string;
  seller: string;
  replacementReason: string;
  approvedBy: string;
  status: "Pending" | "Approved" | "Rejected" | "Shipped" | "Delivered";
}

const mockData: OrderReplacement[] = [
  {
    id: 1,
    customer: "John Doe",
    orderNumber: "ORD-1001",
    orderDate: "2023-05-15",
    orderTotal: "$125.99",
    seller: "ElectroHub",
    replacementReason: "Defective product",
    approvedBy: "Admin Sarah",
    status: "Approved",
  },
  {
    id: 2,
    customer: "Jane Smith",
    orderNumber: "ORD-1002",
    orderDate: "2023-05-14",
    orderTotal: "$89.50",
    seller: "FashionPlus",
    replacementReason: "Wrong item shipped",
    approvedBy: "Admin Mike",
    status: "Shipped",
  },
  {
    id: 3,
    customer: "Robert Johnson",
    orderNumber: "ORD-1003",
    orderDate: "2023-05-12",
    orderTotal: "$45.75",
    seller: "BookWorld",
    replacementReason: "Damaged during delivery",
    approvedBy: "",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Emily Davis",
    orderNumber: "ORD-1004",
    orderDate: "2023-05-10",
    orderTotal: "$230.00",
    seller: "ElectroHub",
    replacementReason: "Wrong color received",
    approvedBy: "Admin Sarah",
    status: "Rejected",
  },
  {
    id: 5,
    customer: "Michael Brown",
    orderNumber: "ORD-1005",
    orderDate: "2023-05-08",
    orderTotal: "$67.30",
    seller: "HomeGoods",
    replacementReason: "Incomplete product",
    approvedBy: "Admin Mike",
    status: "Delivered",
  },
  {
    id: 6,
    customer: "Sarah Wilson",
    orderNumber: "ORD-1006",
    orderDate: "2023-05-05",
    orderTotal: "$154.20",
    seller: "FashionPlus",
    replacementReason: "Product not working",
    approvedBy: "Admin Sarah",
    status: "Approved",
  },
];

const OrderReplacementsPage = () => {
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
  } = useTableData<OrderReplacement>(
    fetchData,
    ["customer", "orderNumber", "seller", "replacementReason", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "customer",
      header: "Customer",
      width: "150px",
    },
    {
      key: "orderNumber",
      header: "Order Number",
      width: "120px",
      render: (item: OrderReplacement) => (
        <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded">
          {item.orderNumber}
        </span>
      ),
    },
    {
      key: "orderDate",
      header: "Order Date",
      width: "120px",
    },
    {
      key: "orderTotal",
      header: "Order Total",
      width: "120px",
      render: (item: OrderReplacement) => (
        <span className="font-semibold">{item.orderTotal}</span>
      ),
    },
    {
      key: "seller",
      header: "Seller",
      width: "150px",
    },
    {
      key: "replacementReason",
      header: "Replacement Reason",
      width: "200px",
    },
    {
      key: "approvedBy",
      header: "Approved By",
      width: "150px",
      render: (item: OrderReplacement) => (
        <span>{item.approvedBy || "-"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: OrderReplacement) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Approved"
              ? "bg-green-100 text-green-600"
              : item.status === "Rejected"
              ? "bg-red-100 text-red-600"
              : item.status === "Shipped"
              ? "bg-blue-100 text-blue-600"
              : item.status === "Delivered"
              ? "bg-purple-100 text-purple-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Options",
      width: "120px",
      render: (item: OrderReplacement) => (
        <div className="flex gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            title="View Details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
          {item.status === "Pending" && (
            <>
              <button 
                className="text-green-600 hover:text-green-800"
                title="Approve"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="text-red-600 hover:text-red-800"
                title="Reject"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}
          {item.status === "Approved" && (
            <button 
              className="text-blue-600 hover:text-blue-800"
              title="Mark as Shipped"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
              </svg>
            </button>
          )}
          {item.status === "Shipped" && (
            <button 
              className="text-purple-600 hover:text-purple-800"
              title="Mark as Delivered"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Replacements Management</h1>
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
        </div>
      </div>
      <CommonCustomTable<OrderReplacement>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Order Replacements List"
        // isLoading={isLoading}
      />
    </div>
  );
};

export default OrderReplacementsPage;