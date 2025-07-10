"use client";

import React, { useCallback } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Manager" | "Editor" | "Viewer";
  avatar: string;
}

const StaffTable = () => {
  // Mock data fetching function that matches the expected signature
  const fetchUsers = useCallback(async (): Promise<User[]> => {
    return [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        role: "Admin",
        avatar: "/images/chair1.jpg",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 (555) 987-6543",
        role: "Manager",
        avatar: "/images/chair1.jpg",
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "michael.b@example.com",
        phone: "+1 (555) 456-7890",
        role: "Editor",
        avatar: "/images/chair1.jpg",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.d@example.com",
        phone: "+1 (555) 789-0123",
        role: "Viewer",
        avatar: "/images/chair1.jpg",
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.w@example.com",
        phone: "+1 (555) 234-5678",
        role: "Editor",
        avatar: "/images/chair1.jpg",
      },
    ];
  }, []);

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
  } = useTableData<User>(
    fetchUsers,
    ["name", "email", "phone", "role"], // Searchable fields
    "role" // Filter field
  );

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: User) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.avatar} 
            alt={item.name}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/default-avatar.jpg';
            }}
          />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "role",
      header: "Role",
      render: (item: User) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.role === "Admin"
              ? "bg-purple-100 text-purple-600"
              : item.role === "Manager"
              ? "bg-blue-100 text-blue-600"
              : item.role === "Editor"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.role}
        </span>
      ),
    },
  ];

  const filterOptions = [
    { value: "", label: "All Roles" },
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "Editor", label: "Editor" },
    { value: "Viewer", label: "Viewer" },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading staff: {error.message}</div>
        <button 
          onClick={reload}
          className="mt-4 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Staff Management</h1>
      <CommonCustomTable<User>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="All Staff"
        // isLoading={isLoading}
      />
    </div>
  );
};

export default StaffTable;