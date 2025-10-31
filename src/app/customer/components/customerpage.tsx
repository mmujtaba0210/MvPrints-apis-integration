"use client";
import React, { useEffect, useState } from "react";
import CustomerFilters from "@/app/customer/components/customerFilters";
import { filters } from "@/app/customer/configs/FilterConfigs";
import CustomerTable from "./customerTable";

// ✅ Declare types directly here instead of importing
type CustomerStatus = "all" | "active" | "banned" | "deactivated";
interface Customer {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: CustomerStatus;
  totalOrders: number;
  totalSpent: number;
  subscriptionPlan?: string;
  subscriptionExpiry?: string;
  affiliateBalance?: number;
  lastWithdrawal?: string;
  lastTransaction?: string;
  verificationStatus?: string;
  lastPurchase?: string;
  tier?: string;
  location?: string;
  phone?: string;
  notes?: string;
  tags?: string[];
  avatar?: string;
}

// ✅ API Response Types
interface ApiCustomer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  plans: any[];
}

interface ApiResponse {
  message: string;
  success: boolean;
  code: number;
  data: ApiCustomer[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

const CustomersPage = () => {
  const [activeFilter, setActiveFilter] = useState<CustomerStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ API Configuration
  const API_URL = "https://testbackend.mecarviprints.com/api/admin/customers";
  const TOKEN = "48|NOtPrzpY4Sk2H1raMxmygMzCFto3I2Sg8MAkcNQx31ef5f49";

  // ✅ Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_URL}?sort_field=created_at&sort_direction=desc&page=1&per_page=5`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        // ✅ Transform API data to match your Customer interface
        const transformedCustomers: Customer[] = data.data.map(apiCustomer => ({
          id: apiCustomer.id,
          name: apiCustomer.name,
          email: apiCustomer.email,
          joinDate: new Date(apiCustomer.created_at).toISOString().split('T')[0], // Format as YYYY-MM-DD
          status: apiCustomer.is_active ? "active" : "deactivated", // Map is_active to status
          totalOrders: 0, // You might need to get this from another endpoint
          totalSpent: 0, // You might need to get this from another endpoint
          phone: apiCustomer.phone || undefined,
          avatar: apiCustomer.avatar || undefined,
          subscriptionPlan: apiCustomer.plans.length > 0 ? apiCustomer.plans[0]?.name : undefined,
          // Add default values or leave optional fields undefined
        }));

        setCustomers(transformedCustomers);
      } else {
        throw new Error(data.message || "Failed to fetch customers");
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(err instanceof Error ? err.message : "An error occurred while fetching customers");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // ✅ Filtering logic
  const filteredData = customers.filter((customer) => {
    if (!customer || typeof customer !== "object") return false;

    const statusMatch =
      activeFilter === "all"
        ? true
        : customer.status.toLowerCase() === activeFilter.toLowerCase();

    const searchMatch =
      searchTerm === "" ||
      Object.values(customer).some((val) => {
        if (val == null) return false;
        return String(val).toLowerCase().includes(searchTerm.toLowerCase());
      });

    return statusMatch && searchMatch;
  });

  // ✅ Handlers
  const handleView = (customer: Customer) => console.log("View:", customer.id);
  const handleEdit = (customer: Customer) => console.log("Edit:", customer.id);
  const handleDelete = (customer: Customer) =>
    console.log("Delete:", customer.id);

  const handleBanToggle = (customer: Customer) => {
    setCustomers((prev): Customer[] =>
      prev.map((c) =>
        c.id === customer.id
          ? {
              ...c,
              status: c.status === "banned" ? "active" : "banned",
            }
          : c
      )
    );
  };

  const handleDeactivateToggle = (customer: Customer) => {
    setCustomers((prev): Customer[] =>
      prev.map((c) =>
        c.id === customer.id
          ? {
              ...c,
              status: c.status === "deactivated" ? "active" : "deactivated",
            }
          : c
      )
    );
  };

  // ✅ Refresh customers
  const handleRefresh = () => {
    fetchCustomers();
  };

  // ✅ Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading customers...</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Customers</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Customers Management
                  <span className="block mt-1 text-sm font-medium text-gray-500">
                    Manage all customer accounts and activities
                  </span>
                </h1>
              </div>
              <button
                onClick={handleRefresh}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          <div className="p-6">
            <CustomerFilters
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {filteredData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No customers found.</p>
              </div>
            ) : (
              <CustomerTable
                data={filteredData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBanToggle={handleBanToggle}
                onDeactivateToggle={handleDeactivateToggle}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;