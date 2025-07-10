"use client";

import React, { useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import AddPaymentGatewayModal from "./../components/addPaymentGatewayModal";

interface PaymentGateway {
  id: number;
  title: string;
  details: string;
  status: "Active" | "Inactive" | "Pending" | "Testing";
}

const mockData: PaymentGateway[] = [
  {
    id: 1,
    title: "Stripe",
    details: "Credit cards, Apple Pay, Google Pay",
    status: "Active",
  },
  {
    id: 2,
    title: "PayPal",
    details: "PayPal accounts, Credit cards",
    status: "Active",
  },
  {
    id: 3,
    title: "Square",
    details: "Credit cards, ACH transfers",
    status: "Inactive",
  },
  {
    id: 4,
    title: "Authorize.Net",
    details: "Credit cards, eChecks",
    status: "Pending",
  },
  {
    id: 5,
    title: "Amazon Pay",
    details: "Amazon accounts",
    status: "Testing",
  },
  {
    id: 6,
    title: "Klarna",
    details: "Buy now, pay later",
    status: "Active",
  },
];

const PaymentGatewaysPage = () => {
  const fetchData = React.useCallback(() => mockData, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  } = useTableData<PaymentGateway>(
    fetchData,
    ["title", "details", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "130px",
    },
    {
      key: "title",
      header: "Title",
      width: "200px",
      render: (item: PaymentGateway) => (
        <span className="font-medium">{item.title}</span>
      ),
    },
    {
      key: "details",
      header: "Details",
      width: "320px",
    },
    {
      key: "status",
      header: "Status",
      width: "270px",
      render: (item: PaymentGateway) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Inactive"
              ? "bg-red-100 text-red-600"
              : item.status === "Testing"
              ? "bg-purple-100 text-purple-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Options",
      width: "120px",
      render: (item: PaymentGateway) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            title="Configure"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Pending", label: "Pending" },
    { value: "Testing", label: "Testing" },
  ];

  const handleAddSuccess = () => {
    setIsModalOpen(false);
    reload(); // Refresh the table data
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
          <button onClick={reload} className="absolute top-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payment Gateways</h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            onClick={reload}
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            {isLoading ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Gateway
          </button>
        </div>
      </div>
      <CommonCustomTable<PaymentGateway>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Payment Gateways List"
      />

      <AddPaymentGatewayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default PaymentGatewaysPage;
