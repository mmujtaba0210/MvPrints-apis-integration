// app/businessAdvantage/page.tsx
"use client";

import React from "react";
import GenericTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import { Business } from "../types/businessType";

const mockData: Business[] = [
  {
    businessName: "Tech Solutions Inc.",
    name: "John Doe",
    email: "john@techsolutions.com",
    phone: "+1 (555) 123-4567",
    percentage: "15%",
    allowedBalance: "$10,000",
    usedBalance: "$5,250",
    status: "Active",
  },
  {
    businessName: "Global Consulting",
    name: "Jane Smith",
    email: "jane@globalconsult.com",
    phone: "+1 (555) 987-6543",
    percentage: "20%",
    allowedBalance: "$15,000",
    usedBalance: "$12,300",
    status: "Block",
  },
  {
    businessName: "Innovate Corp",
    name: "Robert Johnson",
    email: "robert@innovate.com",
    phone: "+1 (555) 456-7890",
    percentage: "10%",
    allowedBalance: "$8,000",
    usedBalance: "$3,200",
    status: "Pending",
  },
  {
    businessName: "Digital Ventures",
    name: "Emily Davis",
    email: "emily@digitalventures.com",
    phone: "+1 (555) 789-0123",
    percentage: "25%",
    allowedBalance: "$20,000",
    usedBalance: "$18,750",
    status: "Completed",
  },
];

const BusinessStorePage = () => {
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
  } = useTableData<Business>(
    fetchData,
    ["businessName", "name", "email", "phone"],
    "status"
  );

  const columns = [
    {
      key: "businessName",
      header: "Business Name",
      width: "200px",
    },
    {
      key: "name",
      header: "Name",
      width: "150px",
    },
    {
      key: "email",
      header: "Email",
      width: "200px",
      render: (item: Business) => (
        <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
          {item.email}
        </a>
      ),
    },
    {
      key: "phone",
      header: "Phone #",
      width: "150px",
    },
    {
      key: "percentage",
      header: "Percentage",
      width: "100px",
      render: (item: Business) => (
        <span className="font-semibold">{item.percentage}</span>
      ),
    },
    {
      key: "allowedBalance",
      header: "Allowed Balance",
      width: "150px",
      render: (item: Business) => (
        <span className="font-semibold text-green-600">{item.allowedBalance}</span>
      ),
    },
    {
      key: "usedBalance",
      header: "Used Balance",
      width: "150px",
      render: (item: Business) => (
        <span className="font-semibold text-blue-600">{item.usedBalance}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "150px",
      render: (item: Business) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Block"
              ? "bg-red-100 text-red-600"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-blue-100 text-blue-600"
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
      render: (item: Business) => (
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
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          {item.status === "Active" && (
            <button 
              className="text-red-600 hover:text-red-800"
              title="Block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          {item.status === "Block" && (
            <button 
              className="text-green-600 hover:text-green-800"
              title="Activate"
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
    { value: "Active", label: "Active" },
    { value: "Block", label: "Block" },
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
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
        <h1 className="text-2xl font-bold text-gray-800">Business Store</h1>
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
      <GenericTable<Business>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Business Store"
        // isLoading={isLoading}
      />
    </div>
  );
};

export default BusinessStorePage;