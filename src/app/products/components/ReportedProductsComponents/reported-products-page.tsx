// app/reported-products/page.tsx
"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface ReportedProduct {
  id: number;
  product: {
    name: string;
    image: string;
  };
  customer: {
    name: string;
    avatar: string;
  };
  title: string;
  dateTime: string;
  status: "Pending" | "Reviewed" | "Resolved";
}

const mockData: ReportedProduct[] = [
  {
    id: 1,
    product: {
      name: "Wireless Headphones",
      image: "/images/products/headphones.jpg",
    },
    customer: {
      name: "John Smith",
      avatar: "/images/avatars/1.jpg",
    },
    title: "Product not as described",
    dateTime: "2023-06-15T14:30:00",
    status: "Pending",
  },
  {
    id: 2,
    product: {
      name: "Smart Watch",
      image: "/images/products/smartwatch.jpg",
    },
    customer: {
      name: "Sarah Johnson",
      avatar: "/images/avatars/2.jpg",
    },
    title: "Defective item received",
    dateTime: "2023-06-14T10:15:00",
    status: "Reviewed",
  },
  {
    id: 3,
    product: {
      name: "Organic Coffee",
      image: "/images/products/coffee.jpg",
    },
    customer: {
      name: "Michael Brown",
      avatar: "/images/avatars/3.jpg",
    },
    title: "Wrong product delivered",
    dateTime: "2023-06-12T16:45:00",
    status: "Resolved",
  },
  {
    id: 4,
    product: {
      name: "Yoga Mat",
      image: "/images/products/yoga-mat.jpg",
    },
    customer: {
      name: "Emily Davis",
      avatar: "/images/avatars/4.jpg",
    },
    title: "Quality issues",
    dateTime: "2023-06-10T09:20:00",
    status: "Pending",
  },
  {
    id: 5,
    product: {
      name: "Running Shoes",
      image: "/images/products/shoes.jpg",
    },
    customer: {
      name: "David Wilson",
      avatar: "/images/avatars/5.jpg",
    },
    title: "Size mismatch",
    dateTime: "2023-06-08T11:30:00",
    status: "Reviewed",
  },
];

const ReportedProductsPage = () => {
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
  } = useTableData<ReportedProduct>(
    fetchData,
    ["product.name", "customer.name", "title"],
    "status"
  );

  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
  };

  const columns = [
    {
      key: "product",
      header: "Product",
      width: "200px",
      render: (item: ReportedProduct) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.product.image} 
            alt={item.product.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <span className="font-medium">{item.product.name}</span>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      width: "150px",
      render: (item: ReportedProduct) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.customer.avatar} 
            alt={item.customer.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{item.customer.name}</span>
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      width: "250px",
      render: (item: ReportedProduct) => (
        <span className="text-gray-800">{item.title}</span>
      ),
    },
    {
      key: "dateTime",
      header: "Date & Time",
      width: "180px",
      render: (item: ReportedProduct) => (
        <span className="text-sm text-gray-600">
          {formatDateTime(item.dateTime)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: ReportedProduct) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : item.status === "Reviewed"
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      render: (item: ReportedProduct) => (
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
          <button 
            className="text-green-600 hover:text-green-800"
            title="Mark as Resolved"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Reviewed", label: "Reviewed" },
    { value: "Resolved", label: "Resolved" },
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
        <h1 className="text-2xl font-bold text-gray-800">Reported Products</h1>
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
      <CommonCustomTable<ReportedProduct>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Reported Products"
      />
    </div>
  );
};

export default ReportedProductsPage;