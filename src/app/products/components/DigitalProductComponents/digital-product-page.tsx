"use client";

import React,{useState} from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import { AddDigitalProductModal } from "../../Models/AddDigitalProductModal";

interface DigitalProduct {
  id: number;
  product: {
    image: string;
    title: string;
  };
  category: string;
  stock: number;
  price: number;
  sales: number;
  rating: number;
  status: "Active" | "Draft" | "Archived";
}

const mockData: DigitalProduct[] = [
  {
    id: 1,
    product: {
      image: "https://via.placeholder.com/40",
      title: "Premium WordPress Theme"
    },
    category: "Themes",
    stock: 45,
    price: 59.99,
    sales: 124,
    rating: 4.8,
    status: "Active",
  },
  {
    id: 2,
    product: {
      image: "https://via.placeholder.com/40",
      title: "Mobile UI Kit"
    },
    category: "UI Kits",
    stock: 0,
    price: 39.99,
    sales: 89,
    rating: 4.5,
    status: "Draft",
  },
  {
    id: 3,
    product: {
      image: "https://via.placeholder.com/40",
      title: "eBook - React Guide"
    },
    category: "eBooks",
    stock: 120,
    price: 19.99,
    sales: 256,
    rating: 4.9,
    status: "Active",
  },
];

const DigitalProductsPage = () => {
  const fetchData = React.useCallback(() => mockData, []);
   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    // Add any success handling logic here
  };

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
  } = useTableData<DigitalProduct>(
    fetchData,
    ["product.title", "category", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "product",
      header: "Product",
      width: "250px",
      render: (item: DigitalProduct) => (
        <div className="flex items-center">
          <img 
            src={item.product.image} 
            alt={item.product.title}
            className="w-10 h-10 rounded-md object-cover mr-3"
          />
          <span className="font-medium">{item.product.title}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      width: "120px",
    },
    {
      key: "stock",
      header: "Stock",
      width: "100px",
      render: (item: DigitalProduct) => (
        <span className={item.stock === 0 ? "text-red-500 font-medium" : ""}>
          {item.stock}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      width: "100px",
      render: (item: DigitalProduct) => (
        <span className="font-mono font-medium">
          ${item.price.toFixed(2)}
        </span>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      width: "100px",
      render: (item: DigitalProduct) => (
        <span className="font-mono font-medium">
          {item.sales}
        </span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      width: "120px",
      render: (item: DigitalProduct) => (
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 text-yellow-400 mr-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-medium">{item.rating}</span>
          <span className="text-gray-500 text-xs ml-1">({Math.floor(item.rating * 20)}%)</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: DigitalProduct) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Archived"
              ? "bg-gray-100 text-gray-600"
              : "bg-yellow-100 text-yellow-600"
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
      render: (item: DigitalProduct) => (
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
        <h1 className="text-2xl font-bold text-gray-800">Digital Products</h1>
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
            onClick={() => setIsModalOpen(true)}
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
      <CommonCustomTable<DigitalProduct>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Digital Products List"
      />

      <AddDigitalProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default DigitalProductsPage;