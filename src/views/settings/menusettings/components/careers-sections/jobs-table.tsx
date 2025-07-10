"use client";

import React, { useState } from "react";
import CommonCustomTable from "@/common/commonCustomTable";
import { useTableData } from "@/common/useTableData";
import AddJobModal from "../../Models/AddJobModal";

interface Job {
  id: number;
  title: string;
  category: string;
  partner: string;
  type: string;
  location: string;
}

const mockData: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    category: "Engineering",
    partner: "Tech Corp",
    type: "Full-time",
    location: "San Francisco, CA"
  },
  {
    id: 2,
    title: "Marketing Manager",
    category: "Marketing",
    partner: "Digital Solutions",
    type: "Contract",
    location: "Remote"
  },
  {
    id: 3,
    title: "HR Specialist",
    category: "Human Resources",
    partner: "People First",
    type: "Part-time",
    location: "New York, NY"
  },
];

const JobsTable = () => {
  const fetchData = React.useCallback(() => mockData, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    console.log("Job added successfully");
  };

  const {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    isLoading,
    error,
    reload,
  } = useTableData<Job>(fetchData, ["title", "category", "partner", "type", "location"]);

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
      render: (item: Job) => (
        <span className="font-medium">{item.title}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      width: "150px",
      render: (item: Job) => (
        <span className="text-gray-600">{item.category}</span>
      ),
    },
    {
      key: "partner",
      header: "Partner",
      width: "150px",
      render: (item: Job) => (
        <span className="text-gray-600">{item.partner}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "120px",
      render: (item: Job) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          item.type === "Full-time" ? "bg-blue-100 text-blue-600" :
          item.type === "Part-time" ? "bg-purple-100 text-purple-600" :
          "bg-gray-100 text-gray-600"
        }`}>
          {item.type}
        </span>
      ),
    },
    {
      key: "location",
      header: "Location",
      width: "150px",
      render: (item: Job) => (
        <span className="text-gray-600">{item.location}</span>
      ),
    },
    {
      key: "actions",
      header: "Options",
      width: "150px",
      render: (item: Job) => (
        <div className="flex gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            className="text-red-600 hover:text-red-800"
            title="Delete"
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
        <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
        <div className="flex gap-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Job
          </button>
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

      <CommonCustomTable<Job>
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onSearch={setSearchQuery}
        title="Jobs List"
      />

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default JobsTable;