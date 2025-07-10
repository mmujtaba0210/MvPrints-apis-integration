// app/transaction/page.tsx
"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface Transaction {
  id: number;
  customer: {
    name: string;
    avatar: string;
  };
  amount: number;
  transactionId: string;
  transactionDate: Date;
  status: "Completed" | "Pending" | "Failed";
  paymentMethod: "Credit Card" | "PayPal" | "Bank Transfer" | "Crypto";
}

const TransactionPage = () => {
  const mockData: Transaction[] = [
    {
      id: 1,
      customer: {
        name: "John Doe",
        avatar: "/images/chair1.jpg",
      },
      amount: 150.00,
      transactionId: "TXN123456",
      transactionDate: new Date("2023-05-15"),
      status: "Completed",
      paymentMethod: "Credit Card"
    },
    {
      id: 2,
      customer: {
        name: "Jane Smith",
        avatar: "/images/chair1.jpg",
      },
      amount: 250.50,
      transactionId: "TXN789012",
      transactionDate: new Date("2023-06-20"),
      status: "Pending",
      paymentMethod: "PayPal"
    },
    {
      id: 3,
      customer: {
        name: "Robert Johnson",
        avatar: "/images/chair1.jpg",
      },
      amount: 75.25,
      transactionId: "TXN345678",
      transactionDate: new Date("2023-07-10"),
      status: "Failed",
      paymentMethod: "Bank Transfer"
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
  } = useTableData<Transaction>(
    fetchData,
    ["customer.name", "transactionId", "paymentMethod", "status"],
    "status"
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "100px",
    },
    {
      key: "customer",
      header: "Customer Name",
      width: "200px",
      render: (item: Transaction) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.customer.avatar} 
            alt={item.customer.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="font-medium">{item.customer.name}</div>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      width: "150px",
      render: (item: Transaction) => (
        <span className="font-semibold">
          {formatCurrency(item.amount)}
        </span>
      ),
    },
    {
      key: "transactionId",
      header: "Transaction ID",
      width: "200px",
      render: (item: Transaction) => (
        <span className="text-blue-600 font-mono">
          {item.transactionId}
        </span>
      ),
    },
    {
      key: "transactionDate",
      header: "Transaction Date",
      width: "200px",
      render: (item: Transaction) => (
        <span className="text-gray-600">
          {formatDate(item.transactionDate)}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      header: "Payment Method",
      width: "150px",
      render: (item: Transaction) => (
        <span className="flex items-center gap-2">
          {item.paymentMethod === "Credit Card" && (
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )}
          {item.paymentMethod === "PayPal" && (
            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 6.5h9c.21 0 .39.09.53.22.14.13.22.31.22.53v9c0 .21-.08.39-.22.53-.14.14-.32.22-.53.22h-9c-.21 0-.39-.08-.53-.22-.14-.14-.22-.32-.22-.53v-9c0-.22.08-.4.22-.53.14-.13.32-.22.53-.22z" />
            </svg>
          )}
          {item.paymentMethod === "Bank Transfer" && (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          )}
          {item.paymentMethod === "Crypto" && (
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1.5v21m8-11.5l-8 8-8-8" />
            </svg>
          )}
          {item.paymentMethod}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "150px",
      render: (item: Transaction) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Completed"
              ? "bg-green-100 text-green-600"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
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
      render: (item: Transaction) => (
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
              title="Approve"
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
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Failed", label: "Failed" },
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
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
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
      <CommonCustomTable<Transaction>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Transaction History"
      />
    </div>
  );
};

export default TransactionPage;