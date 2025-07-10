"use client";

import React from "react";
import Image from "next/image";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface SalesReport {
  id: number;
  productName: string;
  productImage: string;
  totalEarning: number;
  refunds: number;
  createDate: string;
  status: "Completed" | "Pending" | "Refunded";
}

const mockData: SalesReport[] = [
  {
    id: 1,
    productName: "Nike Air Max",
    productImage: "https://via.placeholder.com/40/3b82f6/ffffff?text=N",
    totalEarning: 129.99,
    refunds: 0,
    createDate: "2023-05-15",
    status: "Completed",
  },
  {
    id: 2,
    productName: "Adidas Ultraboost",
    productImage: "https://via.placeholder.com/40/ef4444/ffffff?text=A",
    totalEarning: 159.99,
    refunds: 25.99,
    createDate: "2023-06-22",
    status: "Refunded",
  },
  {
    id: 3,
    productName: "Apple AirPods Pro",
    productImage: "https://via.placeholder.com/40/10b981/ffffff?text=A",
    totalEarning: 249.99,
    refunds: 0,
    createDate: "2023-07-10",
    status: "Completed",
  },
];

const AdminSalesReportTable = () => {
  const fetchData = React.useCallback(() => mockData, []);
  
  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    error,
    reload,
  } = useTableData<SalesReport>(
    fetchData,
    ["productName", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "productName",
      header: "Product",
      width: "200px",
      render: (item: SalesReport) => (
        <div className="flex items-center">
          <Image 
            src={item.productImage} 
            alt={item.productName}
            width={32}
            height={32}
            className="rounded-full object-cover mr-3"
            unoptimized={true}
          />
          <span className="font-medium">{item.productName}</span>
        </div>
      ),
    },
    {
      key: "totalEarning",
      header: "Total Earning",
      width: "150px",
      render: (item: SalesReport) => (
        <span className="font-semibold text-green-600">
          ${item.totalEarning.toFixed(2)}
        </span>
      ),
    },
    {
      key: "refunds",
      header: "Refunds",
      width: "150px",
      render: (item: SalesReport) => (
        <span className={`font-semibold ${item.refunds > 0 ? "text-red-600" : "text-gray-600"}`}>
          ${item.refunds.toFixed(2)}
        </span>
      ),
    },
    {
      key: "createDate",
      header: "Create Date",
      width: "150px",
      render: (item: SalesReport) => (
        <span className="text-sm text-gray-600">
          {new Date(item.createDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: SalesReport) => {
        const statusStyles = {
          Completed: "bg-green-100 text-green-600",
          Pending: "bg-yellow-100 text-yellow-600",
          Refunded: "bg-red-100 text-red-600",
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
      key: "actions",
      header: "Actions",
      width: "120px",
      render: (item: SalesReport) => (
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
            className="text-gray-600 hover:text-gray-800"
            title="Download Invoice"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Refunded", label: "Refunded" },
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
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Sales Report</h2>
      </div>
      <CommonCustomTable<SalesReport>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Admin Sales Report"
      />
    </div>
  );
};

export default AdminSalesReportTable;