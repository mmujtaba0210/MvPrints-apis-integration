"use client";

import React, { useState, useCallback } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import AddRoleModal from "../components/addRoleModal";

interface Role {
  id: number;
  name: string;
  permissions: string[];
  createdAt: string;
}

const RolesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data fetching function that matches the expected signature
  const fetchRoles = useCallback(async (): Promise<Role[]> => {
    return [
      {
        id: 1,
        name: "Admin",
        permissions: ["All Permissions"],
        createdAt: "2023-01-15",
      },
      {
        id: 2,
        name: "Manager",
        permissions: ["View Dashboard", "Manage Users", "Create Content"],
        createdAt: "2023-02-20",
      },
      // ... other mock data
    ];
  }, []);

  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    isLoading,
    error,
    reload,
  } = useTableData<Role>(
    fetchRoles,
    ["name", "permissions"] // Searchable fields
  );

  const formatPermissions = (permissions: string[]) => {
    return (
      <div className="flex flex-wrap gap-1">
        {permissions.map((permission, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
          >
            {permission}
          </span>
        ))}
      </div>
    );
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: Role) => (
        <span className="font-medium text-gray-800">{item.name}</span>
      ),
    },
    {
      key: "permissions",
      header: "Permissions",
      render: (item: Role) => formatPermissions(item.permissions),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (item: Role) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading roles: {error.message}</div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Role Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create New Role"}
        </button>
      </div>
      
      <CommonCustomTable<Role>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        title="System Roles"
        // isLoading={isLoading}
      />

      <AddRoleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newRole) => {
          console.log("New role:", newRole);
          // You might want to call reload() here to refresh the data
          reload();
        }}
      />
    </div>
  );
};

export default RolesTable;