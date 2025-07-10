"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface ProductQuestion {
  id: number;
  product: {
    name: string;
    image: string;
  };
  customer: {
    name: string;
    avatar: string;
  };
  question: {
    text: string;
    isAnswered: boolean;
  };
  date: string;
  status: "Published" | "Pending" | "Flagged" | "Deleted";
}

const mockData: ProductQuestion[] = [
  {
    id: 1,
    product: {
      name: "Wireless Headphones",
      image: "/images/products/headphones.jpg"
    },
    customer: {
      name: "John Smith",
      avatar: "/images/avatars/1.jpg"
    },
    question: {
      text: "Does this product come with a warranty?",
      isAnswered: true
    },
    date: "2023-05-15",
    status: "Published"
  },
  {
    id: 2,
    product: {
      name: "Smart Watch",
      image: "/images/products/watch.jpg"
    },
    customer: {
      name: "Emma Johnson",
      avatar: "/images/avatars/2.jpg"
    },
    question: {
      text: "Is this compatible with iPhone 12?",
      isAnswered: false
    },
    date: "2023-06-20",
    status: "Pending"
  },
  {
    id: 3,
    product: {
      name: "Bluetooth Speaker",
      image: "/images/products/speaker.jpg"
    },
    customer: {
      name: "Michael Brown",
      avatar: "/images/avatars/3.jpg"
    },
    question: {
      text: "What's the battery life on this speaker?",
      isAnswered: true
    },
    date: "2023-07-10",
    status: "Published"
  },
];

const ProductQuestionsPage = () => {
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
  } = useTableData<ProductQuestion>(
    fetchData,
    ["product.name", "customer.name", "question.text", "status"],
    "status"
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "product",
      header: "Product",
      width: "200px",
      render: (item: ProductQuestion) => (
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
      render: (item: ProductQuestion) => (
        <div className="flex items-center gap-2">
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
      key: "question",
      header: "Question",
      width: "300px",
      render: (item: ProductQuestion) => (
        <div>
          <div className="text-sm text-gray-800 line-clamp-2">{item.question.text}</div>
          <div className="mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${item.question.isAnswered ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
              {item.question.isAnswered ? 'Answered' : 'Not Answered'}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: "160px",
      render: (item: ProductQuestion) => (
        <span className="text-gray-600">{formatDate(item.date)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "160px",
      render: (item: ProductQuestion) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Published"
              ? "bg-green-100 text-green-600"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : item.status === "Flagged"
              ? "bg-red-100 text-red-600"
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
      render: (item: ProductQuestion) => (
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
    { value: "Published", label: "Published" },
    { value: "Pending", label: "Pending" },
    { value: "Flagged", label: "Flagged" },
    { value: "Deleted", label: "Deleted" },
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
        <h1 className="text-2xl font-bold text-gray-800">Product Questions</h1>
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
      <CommonCustomTable<ProductQuestion>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Product Questions"
      />
    </div>
  );
};

export default ProductQuestionsPage;