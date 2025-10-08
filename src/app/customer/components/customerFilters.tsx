"use client";
import React from "react";
import { CustomerStatus } from "../types/customerTypes";

interface Filter {
  label: string;
  value: string;
}

interface CustomerFiltersProps {
  filters: Filter[];
  activeFilter: CustomerStatus;
  onFilterChange: (value: CustomerStatus) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value as CustomerStatus)} // ✅ cast to CustomerStatus
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter.value
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {onSearchChange && (
        <input
          type="text"
          value={searchTerm || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search customers..."
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default CustomerFilters;
