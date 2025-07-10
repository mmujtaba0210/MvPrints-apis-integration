"use client";

import React from "react";
import Image from "next/image";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface Referral {
  id: number;
  username: string;
  avatar: string;
  referralCount: number;
  earned: number;
  joinDate: string;
  status: "Active" | "Inactive" | "Suspended";
}

const mockData: Referral[] = [
  {
    id: 1,
    username: "john_doe",
    avatar: "https://via.placeholder.com/40/3b82f6/ffffff?text=JD",
    referralCount: 12,
    earned: 245.50,
    joinDate: "2023-01-15",
    status: "Active",
  },
  {
    id: 2,
    username: "jane_smith",
    avatar: "https://via.placeholder.com/40/ef4444/ffffff?text=JS",
    referralCount: 8,
    earned: 180.00,
    joinDate: "2023-02-22",
    status: "Active",
  },
  {
    id: 3,
    username: "alex_wong",
    avatar: "https://via.placeholder.com/40/10b981/ffffff?text=AW",
    referralCount: 3,
    earned: 75.25,
    joinDate: "2023-03-10",
    status: "Inactive",
  },
];

const ReferralPage = () => {
  const fetchData = React.useCallback(() => mockData, []);
  
  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    error,
    reload,
  } = useTableData<Referral>(
    fetchData,
    ["username", "status"],
    "status"
  );

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "80px",
    },
    {
      key: "username",
      header: "Username",
      width: "180px",
      render: (item: Referral) => (
        <div className="flex items-center">
          <Image 
            src={item.avatar} 
            alt={item.username}
            width={32}
            height={32}
            className="rounded-full object-cover mr-3"
            unoptimized={true}
          />
          <span className="font-medium">{item.username}</span>
        </div>
      ),
    },
    {
      key: "referralCount",
      header: "Referrals",
      width: "120px",
      render: (item: Referral) => (
        <span className="font-semibold text-blue-600">
          {item.referralCount}
        </span>
      ),
    },
    {
      key: "earned",
      header: "Earned",
      width: "150px",
      render: (item: Referral) => (
        <span className="font-semibold text-green-600">
          ${item.earned.toFixed(2)}
        </span>
      ),
    },
    {
      key: "joinDate",
      header: "Join Date",
      width: "150px",
      render: (item: Referral) => (
        <span className="text-sm text-gray-600">
          {new Date(item.joinDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: Referral) => {
        const statusStyles = {
          Active: "bg-green-100 text-green-600",
          Inactive: "bg-gray-100 text-gray-600",
          Suspended: "bg-red-100 text-red-600",
        };
        
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      key: "details",
      header: "Details",
      width: "120px",
      render: (item: Referral) => (
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
            className="text-purple-600 hover:text-purple-800"
            title="Referral History"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-4a1 1 0 01-1-1V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Suspended", label: "Suspended" },
  ];

  if (error) {
    return (
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
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">User Referrals</h2>
      </div>
      <CommonCustomTable<Referral>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        onFilter={setStatusFilter}
        filterOptions={filterOptions}
        title="User Referral Program"
      />
    </div>
  );
};

export default ReferralPage;