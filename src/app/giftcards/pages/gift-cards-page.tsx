// app/giftCards/page.tsx
"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface GiftCard {
  id: number;
  customer: {
    name: string;
    avatar: string;
    email: string;
  };
  receiverName: string;
  orderDate: string;
  orderTotal: string;
  status: "Pending" | "Processed" | "Shipped" | "Delivered" | "Cancelled";
}

const GiftCardsPage = () => {
  const mockData: GiftCard[] = [
    {
      id: 1,
      customer: {
        name: "Alex Johnson",
        avatar: "/images/avatars/1.jpg",
        email: "alex@example.com"
      },
      receiverName: "Taylor Smith",
      orderDate: "May 15, 2023",
      orderTotal: "$100.00",
      status: "Processed",
    },
    {
      id: 2,
      customer: {
        name: "Maria Garcia",
        avatar: "/images/avatars/2.jpg",
        email: "maria@example.com"
      },
      receiverName: "Jamie Wilson",
      orderDate: "May 18, 2023",
      orderTotal: "$250.00",
      status: "Shipped",
    },
    {
      id: 3,
      customer: {
        name: "David Kim",
        avatar: "/images/avatars/3.jpg",
        email: "david@example.com"
      },
      receiverName: "Casey Brown",
      orderDate: "May 20, 2023",
      orderTotal: "$50.00",
      status: "Pending",
    },
  ];

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
  } = useTableData<GiftCard>(
    fetchData,
    ["customer.name", "customer.email", "receiverName", "orderTotal", "status"],
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
      width: "250px",
      render: (item: GiftCard) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.customer.avatar} 
            alt={item.customer.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{item.customer.name}</div>
            <div className="text-xs text-gray-500">
              <a href={`mailto:${item.customer.email}`} className="hover:underline">
                {item.customer.email}
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "receiverName",
      header: "Receiver",
      width: "200px",
    },
    {
      key: "orderDate",
      header: "Order Date",
      width: "170px",
    },
    {
      key: "orderTotal",
      header: "Order Total",
      width: "180px",
      render: (item: GiftCard) => (
        <span className="font-semibold">{item.orderTotal}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "180px",
      render: (item: GiftCard) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : item.status === "Processed"
              ? "bg-blue-100 text-blue-600"
              : item.status === "Shipped"
              ? "bg-purple-100 text-purple-600"
              : item.status === "Delivered"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
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
      render: (item: GiftCard) => (
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
            <button 
              className="text-green-600 hover:text-green-800"
              title="Process Order"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          {item.status === "Processed" && (
            <button 
              className="text-purple-600 hover:text-purple-800"
              title="Mark as Shipped"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a1 1 0 00-.293-.707l-3-3A1 1 0 0016 7h-1V5a1 1 0 00-1-1H3z" />
              </svg>
            </button>
          )}
          {item.status === "Shipped" && (
            <button 
              className="text-green-600 hover:text-green-800"
              title="Mark as Delivered"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Processed", label: "Processed" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" },
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
        <h1 className="text-2xl font-bold text-gray-800">Gift Card Management</h1>
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
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export
          </button>
        </div>
      </div>
      <CommonCustomTable<GiftCard>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Gift Card Orders"
      />
    </div>
  );
};

export default GiftCardsPage;