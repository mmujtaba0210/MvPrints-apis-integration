// app/deactivatedProducts/page.tsx
"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface DeactivatedProduct {
  id: number;
  product: string;
  category: string;
  stock: number;
  price: number;
  sales: number;
  rating: number;
  status: "Deactivated" | "Archived" | "Out of Stock";
}

const mockData: DeactivatedProduct[] = [
  {
    id: 1,
    product: "Wireless Headphones Pro",
    category: "Electronics",
    stock: 0,
    price: 199.99,
    sales: 1245,
    rating: 4.5,
    status: "Deactivated",
  },
  {
    id: 2,
    product: "Organic Cotton T-Shirt",
    category: "Fashion",
    stock: 0,
    price: 29.99,
    sales: 876,
    rating: 4.2,
    status: "Archived",
  },
  {
    id: 3,
    product: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    stock: 0,
    price: 24.95,
    sales: 1532,
    rating: 4.7,
    status: "Out of Stock",
  },
  {
    id: 4,
    product: "Smart Fitness Band",
    category: "Electronics",
    stock: 0,
    price: 79.99,
    sales: 987,
    rating: 3.9,
    status: "Deactivated",
  },
  {
    id: 5,
    product: "Ceramic Coffee Mug Set",
    category: "Home & Kitchen",
    stock: 0,
    price: 34.99,
    sales: 654,
    rating: 4.3,
    status: "Archived",
  },
];

const DeactivatedProductsPage = () => {
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
  } = useTableData<DeactivatedProduct>(
    fetchData,
    ["product", "category"],
    "status"
  );

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-gray-600 text-sm">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const columns = [
    {
      key: "product",
      header: "Product",
      width: "200px",
      render: (item: DeactivatedProduct) => (
        <span className="font-medium">{item.product}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      width: "150px",
      render: (item: DeactivatedProduct) => (
        <span className="text-gray-600">{item.category}</span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      width: "100px",
      render: (item: DeactivatedProduct) => (
        <span className={`font-semibold ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {item.stock}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      width: "120px",
      render: (item: DeactivatedProduct) => (
        <span className="font-medium">${item.price.toFixed(2)}</span>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      width: "100px",
      render: (item: DeactivatedProduct) => (
        <span className="text-blue-600">{item.sales}</span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      width: "150px",
      render: (item: DeactivatedProduct) => renderRating(item.rating),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: DeactivatedProduct) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Deactivated"
              ? "bg-red-100 text-red-600"
              : item.status === "Archived"
              ? "bg-gray-100 text-gray-600"
              : "bg-orange-100 text-orange-600"
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
      render: (item: DeactivatedProduct) => (
        <div className="flex gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            title="View Product"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className="text-green-600 hover:text-green-800"
            title="Reactivate Product"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className="text-red-600 hover:text-red-800"
            title="Delete Permanently"
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
    { value: "Deactivated", label: "Deactivated" },
    { value: "Archived", label: "Archived" },
    { value: "Out of Stock", label: "Out of Stock" },
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
        <h1 className="text-2xl font-bold text-gray-800">Deactivated Products</h1>
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
            Add New Product
          </button>
        </div>
      </div>
      <CommonCustomTable<DeactivatedProduct>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Deactivated Products"
      />
    </div>
  );
};

export default DeactivatedProductsPage;