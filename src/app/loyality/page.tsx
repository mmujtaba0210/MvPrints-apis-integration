// app/pointsManagement/page.tsx
"use client";

import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import React from "react";

interface LoyalityPointsManagement {
  id: number;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  totalPoints: number;
  pointsBalance: number;
  status: "Active" | "Inactive" | "Suspended" | "Expired";
}

const PointsManagementPage = () => {
  const mockData: LoyalityPointsManagement[] = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/images/avatars/1.jpg",
        email: "john@example.com"
      },
      totalPoints: 5000,
      pointsBalance: 3200,
      status: "Active",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "/images/avatars/2.jpg",
        email: "jane@example.com"
      },
      totalPoints: 2500,
      pointsBalance: 800,
      status: "Inactive",
    },
    {
      id: 3,
      user: {
        name: "Robert Johnson",
        avatar: "/images/avatars/3.jpg",
        email: "robert@example.com"
      },
      totalPoints: 10000,
      pointsBalance: 7500,
      status: "Suspended",
    },
    {
      id: 4,
      user: {
        name: "Emily Davis",
        avatar: "/images/avatars/4.jpg",
        email: "emily@example.com"
      },
      totalPoints: 3000,
      pointsBalance: 0,
      status: "Expired",
    },
    {
      id: 5,
      user: {
        name: "Michael Wilson",
        avatar: "/images/avatars/5.jpg",
        email: "michael@example.com"
      },
      totalPoints: 7500,
      pointsBalance: 4200,
      status: "Active",
    },
    {
      id: 6,
      user: {
        name: "Sarah Thompson",
        avatar: "/images/avatars/6.jpg",
        email: "sarah@example.com"
      },
      totalPoints: 6000,
      pointsBalance: 1500,
      status: "Active",
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
  } = useTableData<LoyalityPointsManagement>(
    fetchData,
    ["user.name", "user.email", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "140px",
    },
    {
      key: "user",
      header: "User",
      width: "380px",
      render: (item: LoyalityPointsManagement) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.user.avatar} 
            alt={item.user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{item.user.name}</div>
            <div className="text-xs text-gray-500">{item.user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "totalPoints",
      header: "Total Points",
      width: "220px",
      render: (item: LoyalityPointsManagement) => (
        <span className="font-semibold">
          {item.totalPoints.toLocaleString()}
        </span>
      ),
    },
    {
      key: "pointsBalance",
      header: "Points Balance",
      width: "180px",
      render: (item: LoyalityPointsManagement) => (
        <span className={item.pointsBalance < 1000 ? "text-red-500 font-semibold" : "text-green-600 font-semibold"}>
          {item.pointsBalance.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "150px",
      render: (item: LoyalityPointsManagement) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Inactive"
              ? "bg-gray-100 text-gray-600"
              : item.status === "Suspended"
              ? "bg-red-100 text-red-600"
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
      render: (item: LoyalityPointsManagement) => (
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
          {item.status === "Active" && (
            <button 
              className="text-indigo-600 hover:text-indigo-800"
              title="Adjust Points"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Suspended", label: "Suspended" },
    { value: "Expired", label: "Expired" },
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
        <h1 className="text-2xl font-bold text-gray-800">Points Management</h1>
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
          {/* <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export
          </button> */}
        </div>
      </div>
      <CommonCustomTable<LoyalityPointsManagement>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="User Points"
      />
    </div>
  );
};

export default PointsManagementPage;