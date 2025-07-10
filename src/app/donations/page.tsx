// app/donations/page.tsx
"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface Donation {
  id: number;
  customer: {
    name: string;
    avatar: string;
  };
  date: string;
  orderNo: string;
  charity: {
    name: string;
    logo: string;
  };
  amount: number;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
}

const mockData: Donation[] = [
  {
    id: 1,
    customer: {
      name: "John Smith",
      avatar: "/images/avatars/1.jpg",
    },
    date: "2023-06-15",
    orderNo: "DON-2023-001",
    charity: {
      name: "Red Cross",
      logo: "/images/logos/red-cross.png",
    },
    amount: 100.00,
    status: "Completed",
  },
  {
    id: 2,
    customer: {
      name: "Sarah Johnson",
      avatar: "/images/avatars/2.jpg",
    },
    date: "2023-06-16",
    orderNo: "DON-2023-002",
    charity: {
      name: "UNICEF",
      logo: "/images/logos/unicef.png",
    },
    amount: 50.00,
    status: "Pending",
  },
  {
    id: 3,
    customer: {
      name: "Michael Brown",
      avatar: "/images/avatars/3.jpg",
    },
    date: "2023-06-17",
    orderNo: "DON-2023-003",
    charity: {
      name: "World Wildlife Fund",
      logo: "/images/logos/wwf.png",
    },
    amount: 75.00,
    status: "Failed",
  },
  {
    id: 4,
    customer: {
      name: "Emily Davis",
      avatar: "/images/avatars/4.jpg",
    },
    date: "2023-06-18",
    orderNo: "DON-2023-004",
    charity: {
      name: "Doctors Without Borders",
      logo: "/images/logos/doctors.png",
    },
    amount: 200.00,
    status: "Completed",
  },
];

const DonationsPage = () => {
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
  } = useTableData<Donation>(
    fetchData,
    ["customer.name", "orderNo", "charity.name"],
    "status"
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "120px",
    },
    {
      key: "customer",
      header: "Customer",
      width: "180px",
      render: (item: Donation) => (
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
      key: "date",
      header: "Date",
      width: "150px",
      render: (item: Donation) => formatDate(item.date),
    },
    {
      key: "orderNo",
      header: "Order No",
      width: "160px",
      render: (item: Donation) => (
        <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded">
          {item.orderNo}
        </span>
      ),
    },
    {
      key: "charity",
      header: "Charity",
      width: "220px",
      render: (item: Donation) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.charity.logo} 
            alt={item.charity.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span>{item.charity.name}</span>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      width: "160px",
      render: (item: Donation) => (
        <span className="font-semibold text-green-600">
          ${item.amount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "170px",
      render: (item: Donation) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Completed"
              ? "bg-green-100 text-green-600"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : item.status === "Failed"
              ? "bg-red-100 text-red-600"
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
      render: (item: Donation) => (
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
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Failed", label: "Failed" },
    { value: "Refunded", label: "Refunded" },
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
        <h1 className="text-2xl font-bold text-gray-800">Donations</h1>
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
      <CommonCustomTable<Donation>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Donation History"
      />
    </div>
  );
};

export default DonationsPage;