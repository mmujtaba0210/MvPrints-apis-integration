"use client";

import React, { useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface PopupMessage {
  id: number;
  title: string;
  message: string;
  key: string;
  status: "Active" | "Inactive";
}

const mockData: PopupMessage[] = [
  {
    id: 1,
    title: "Cookie Consent",
    message: "We use cookies to enhance your experience. Do you accept?",
    key: "cookie_consent",
    status: "Active",
  },
  {
    id: 2,
    title: "Special Offer",
    message: "Get 20% off your first purchase! Use code WELCOME20",
    key: "special_offer",
    status: "Active",
  },
  {
    id: 3,
    title: "Maintenance Alert",
    message: "We'll be performing maintenance tonight from 1-3 AM",
    key: "maintenance_alert",
    status: "Inactive",
  },
];

const PopupMessagePage = () => {
  const fetchData = React.useCallback(() => mockData, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    console.log("Popup message added successfully");
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
  } = useTableData<PopupMessage>(
    fetchData,
    ["title", "message", "key"],
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
      render: (item: PopupMessage) => (
        <span className="font-medium">{item.title}</span>
      ),
    },
    {
      key: "message",
      header: "Message",
      width: "400px",
      render: (item: PopupMessage) => (
        <p className="text-gray-600 line-clamp-2">{item.message}</p>
      ),
    },
    {
      key: "key",
      header: "Key",
      width: "150px",
      render: (item: PopupMessage) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
          {item.key}
        </code>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: PopupMessage) => (
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
      header: "Options",
      width: "150px",
      render: (item: PopupMessage) => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800" title="View Details">
            {/* Eye icon */}
          </button>
          <button className="text-green-600 hover:text-green-800" title="Edit">
            {/* Edit icon */}
          </button>
          <button className="text-red-600 hover:text-red-800" title="Delete">
            {/* Delete icon */}
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
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Popup Message Management</h1>
        <div className="flex gap-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            {/* Plus icon */}
            Add New
          </button>
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            onClick={reload}
            disabled={isLoading}
          >
            {/* Refresh icon */}
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
      <CommonCustomTable<PopupMessage>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="Popup Messages"
      />

      {/* <AddPopupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      /> */}
    </div>
  );
};

export default PopupMessagePage;