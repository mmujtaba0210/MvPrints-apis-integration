"use client";

import React from "react";
import Image from "next/image";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface Brand {
  id: number;
  name: string;
  logo: string;
  metaTitle: string;
  metaDescription: string;
  status: "Active" | "Inactive";
}

const mockData: Brand[] = [
  {
    id: 1,
    name: "Nike",
    logo: "https://via.placeholder.com/40/3b82f6/ffffff?text=N",
    metaTitle: "Nike - Just Do It",
    metaDescription: "Official Nike brand products and merchandise",
    status: "Active",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "https://via.placeholder.com/40/ef4444/ffffff?text=A",
    metaTitle: "Adidas - Impossible is Nothing",
    metaDescription: "Adidas sportswear and footwear collections",
    status: "Active",
  },
  {
    id: 3,
    name: "Apple",
    logo: "https://via.placeholder.com/40/10b981/ffffff?text=A",
    metaTitle: "Apple - Think Different",
    metaDescription: "Apple products and technology innovations",
    status: "Active",
  },
  {
    id: 4,
    name: "Samsung",
    logo: "https://via.placeholder.com/40/f59e0b/ffffff?text=S",
    metaTitle: "Samsung - Do What You Can't",
    metaDescription: "Samsung electronics and mobile devices",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Sony",
    logo: "https://via.placeholder.com/40/8b5cf6/ffffff?text=S",
    metaTitle: "Sony - Make.Believe",
    metaDescription: "Sony electronics and entertainment products",
    status: "Active",
  },
];

const BrandTable = () => {
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
  } = useTableData<Brand>(
    fetchData,
    ["name", "metaTitle", "metaDescription", "status"],
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
      header: "Brand",
      width: "200px",
      render: (item: Brand) => (
        <div className="flex items-center">
          <Image 
            src={item.logo} 
            alt={item.name}
            width={32}
            height={32}
            className="rounded-full object-cover mr-3"
            unoptimized={true} // Remove this if you configure remote patterns
          />
          <span className="font-medium">{item.name}</span>
        </div>
      ),
    },
    {
      key: "metaTitle",
      header: "Meta Title",
      width: "200px",
    },
    {
      key: "metaDescription",
      header: "Meta Description",
      width: "250px",
      render: (item: Brand) => (
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.metaDescription}
        </p>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "100px",
      render: (item: Brand) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
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
      render: (item: Brand) => (
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
      <div className="p-4 border-b">
        {/* Optional header content can go here */}
      </div>
      <CommonCustomTable<Brand>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Brands List"
      />
    </div>
  );
};

export default BrandTable;