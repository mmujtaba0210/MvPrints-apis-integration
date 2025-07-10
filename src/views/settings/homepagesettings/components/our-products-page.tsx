"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface Product {
  id: number;
  title: string;
  price: number;
  link: string;
  image: string;
  status: "Active" | "Out of Stock" | "Draft" | "Archived";
}

const mockData: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 199.99,
    link: "/products/premium-wireless-headphones",
    image: "https://example.com/images/headphones.jpg",
    status: "Active",
  },
  {
    id: 2,
    title: "Ultra HD Smart TV 55\"",
    price: 899.99,
    link: "/products/ultra-hd-smart-tv",
    image: "https://example.com/images/smart-tv.jpg",
    status: "Out of Stock",
  },
  {
    id: 3,
    title: "Ergonomic Office Chair",
    price: 249.99,
    link: "/products/ergonomic-office-chair",
    image: "https://example.com/images/office-chair.jpg",
    status: "Active",
  },
  {
    id: 4,
    title: "Smartphone Pro Max",
    price: 1099.99,
    link: "/products/smartphone-pro-max",
    image: "https://example.com/images/smartphone.jpg",
    status: "Active",
  },
  {
    id: 5,
    title: "Wireless Charging Pad",
    price: 39.99,
    link: "/products/wireless-charging-pad",
    image: "https://example.com/images/charging-pad.jpg",
    status: "Draft",
  },
  {
    id: 6,
    title: "Bluetooth Speaker",
    price: 129.99,
    link: "/products/bluetooth-speaker",
    image: "https://example.com/images/bluetooth-speaker.jpg",
    status: "Archived",
  },
];

const OurProductsPage = () => {
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
  } = useTableData<Product>(
    fetchData,
    ["title", "price", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "title",
      header: "Title",
      width: "200px",
    },
    {
      key: "price",
      header: "Price",
      width: "120px",
      render: (item: Product) => (
        <span className="font-medium">
          ${item.price.toFixed(2)}
        </span>
      ),
    },
    {
      key: "link",
      header: "Link",
      width: "200px",
      render: (item: Product) => (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Product
        </a>
      ),
    },
    {
      key: "image",
      header: "Image",
      width: "150px",
      render: (item: Product) => (
        <img 
          src={item.image} 
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: Product) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Out of Stock"
              ? "bg-red-100 text-red-600"
              : item.status === "Draft"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Options",
      width: "150px",
      render: (item: Product) => (
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
            className="text-green-600 hover:text-green-800"
            title="View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
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
    { value: "Out of Stock", label: "Out of Stock" },
    { value: "Draft", label: "Draft" },
    { value: "Archived", label: "Archived" },
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
        <h1 className="text-2xl font-bold text-gray-800">Our Products</h1>
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
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Product
          </button>
        </div>
      </div>
      <CommonCustomTable<Product>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Products List"
      />
    </div>
  );
};

export default OurProductsPage;