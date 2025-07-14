"use client";
import React, { useState } from "react";
import {
  FaEye,
  FaTrash,
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Centralized type definitions to prevent conflicts
export type TableColumn = {
  header: string;
  field: string;
  type?: "text" | "badge" | "progress" | "date" | "avatar" | "currency";
  filterable?: boolean;
};

export type TableRow = {
  [key: string]: any;
};

type Props = {
  columns: TableColumn[];
  data: TableRow[];
  showActions?: boolean;
  onView?: (row: TableRow) => void;
  onEdit?: (row: TableRow) => void; // Added edit handler
  onDelete?: (row: TableRow) => void;
  itemsPerPage?: number;
  filters?: { label: string; value: string }[];
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
};

const badgeColor: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Blocked: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Declined: "bg-red-100 text-red-700",
  Refund: "bg-purple-100 text-purple-700",
  Returned: "bg-indigo-100 text-indigo-700",
  Verified: "bg-teal-100 text-teal-700",
  Unverified: "bg-orange-100 text-orange-700",
};

export default function CustomTable({
  columns,
  data,
  showActions = true,
  onView,
  onEdit,
  onDelete,
  itemsPerPage = 10,
  filters = [],
  onFilterChange,
  activeFilter = "all",
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = data.filter((row) => {
    return columns.some((col) => {
      const value = String(row[col.field]).toLowerCase();
      return value.includes(searchTerm.toLowerCase());
    });
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Filter and Search Controls */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => onFilterChange?.(filter.value)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === filter.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg w-full text-black"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="px-6 py-3"><input type="checkbox" /></th> */}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                >
                  {col.header}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {/* <td className="px-6 py-4"><input type="checkbox" /></td> */}
                  {columns.map((col, idx) => {
                    const value = row[col.field];
                    return (
                      <td key={idx} className="px-6 py-4 text-sm text-gray-800">
                        {col.type === "badge" ? (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              badgeColor[value] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {value}
                          </span>
                        ) : col.type === "progress" ? (
                          <div className="w-32 bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-yellow-400 h-2.5 rounded-full"
                              style={{ width: value + "%" }}
                            ></div>
                          </div>
                        ) : col.type === "date" ? (
                          <span>{new Date(value).toLocaleDateString()}</span>
                        ) : col.type === "avatar" ? (
                          <div className="flex items-center space-x-3">
                            <img
                              src={row.avatar}
                              alt="avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{row.name}</span>
                          </div>
                        ) : col.type === "currency" ? (
                          <span>{formatCurrency(Number(value))}</span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                  {showActions && (
                    <td className="px-6 py-4 flex space-x-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
                          title="View"
                        >
                          <FaEye className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-1 bg-blue-100 hover:bg-blue-200 rounded"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4 text-blue-600" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1 bg-red-100 hover:bg-red-200 rounded"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4 text-red-600" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginatedData.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredData.length)}
            </span>{" "}
            of <span className="font-medium">{filteredData.length}</span>{" "}
            results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-3 py-1">...</span>
            )}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
