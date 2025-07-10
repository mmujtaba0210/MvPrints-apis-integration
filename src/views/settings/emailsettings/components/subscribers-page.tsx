"use client";

import React from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";

interface Subscriber {
  id: number;
  name: string;
  email: string;
  birthday: string;
}

const mockData: Subscriber[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    birthday: "1990-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    birthday: "1985-08-22",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    birthday: "1995-02-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    birthday: "1992-11-30",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.w@example.com",
    birthday: "1988-07-18",
  },
];

const SubscribersPage = () => {
  const fetchData = React.useCallback(() => mockData, []);
  
  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    error,
    reload,
  } = useTableData<Subscriber>(
    fetchData,
    ["name", "email"]
  );

  const columns = [
    {
      key: "id",
      header: "Sl",
      width: "80px",
    },
    {
      key: "name",
      header: "Name",
      width: "200px",
      render: (item: Subscriber) => (
        <span className="font-medium">{item.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      width: "250px",
      render: (item: Subscriber) => (
        <span className="text-blue-600">{item.email}</span>
      ),
    },
    {
      key: "birthday",
      header: "Birthday",
      width: "150px",
      render: (item: Subscriber) => (
        <span className="text-sm text-gray-600">
          {new Date(item.birthday).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      width: "120px",
      render: (item: Subscriber) => (
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
            className="text-red-600 hover:text-red-800"
            title="Delete Subscriber"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ),
    },
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
        <h2 className="text-xl font-semibold text-gray-800">Subscribers</h2>
      </div>
      <CommonCustomTable<Subscriber>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        title="Subscribers List"
      />
    </div>
  );
};

export default SubscribersPage;