// app/popular-products/page.tsx
"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface PopularProduct {
  id: number;
  product: {
    name: string;
    image: string;
  };
  category: string;
  type: string;
  clicks: number;
}

const mockData: PopularProduct[] = [
  {
    id: 1,
    product: {
      name: "Wireless Headphones",
      image: "/images/products/headphones.jpg",
    },
    category: "Electronics",
    type: "Best Seller",
    clicks: 1245,
  },
  {
    id: 2,
    product: {
      name: "Yoga Mat",
      image: "/images/products/yoga-mat.jpg",
    },
    category: "Fitness",
    type: "Trending",
    clicks: 892,
  },
  {
    id: 3,
    product: {
      name: "Organic Coffee",
      image: "/images/products/coffee.jpg",
    },
    category: "Food & Beverage",
    type: "New Arrival",
    clicks: 756,
  },
];

const PopularProductsPage = () => {
  const fetchData = React.useCallback(() => mockData, []);
  
  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    isLoading,
    error,
    reload,
  } = useTableData<PopularProduct>(
    fetchData,
    ["product.name", "category", "type"]
  );

  const columns = [
    {
      key: "product",
      header: "Product",
      width: "250px",
      render: (item: PopularProduct) => (
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
      key: "category",
      header: "Category",
      width: "150px",
    },
    {
      key: "type",
      header: "Type",
      width: "200px",
      render: (item: PopularProduct) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.type === "Best Seller"
              ? "bg-purple-100 text-purple-600"
              : item.type === "Trending"
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {item.type}
        </span>
      ),
    },
    {
      key: "clicks",
      header: "Clicks",
      width: "180px",
      render: (item: PopularProduct) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold">{item.clicks.toLocaleString()}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-green-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "120px",
      render: () => (
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
            title="View Analytics"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </button>
        </div>
      ),
    },
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
        <h1 className="text-2xl font-bold text-gray-800">Popular Products</h1>
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
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export
          </button>
        </div>
      </div>
      <CommonCustomTable<PopularProduct>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        title="Popular Products"
      />
    </div>
  );
};

export default PopularProductsPage;