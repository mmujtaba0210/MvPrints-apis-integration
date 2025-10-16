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

const CustomersPage = () => {
  const [activeFilter, setActiveFilter] = useState<CustomerStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Customer data with correct types
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2023-01-15",
      status: "banned",
      totalOrders: 5,
      totalSpent: 1200,
      subscriptionPlan: "Premium",
      subscriptionExpiry: "2024-01-15",
      affiliateBalance: 150,
      lastWithdrawal: "2023-05-01",
      lastTransaction: "2023-05-10",
      verificationStatus: "verified",
      lastPurchase: "2023-05-10",
      tier: "Gold",
      location: "New York",
      phone: "+1 555-123-4567",
      notes: "VIP customer",
      tags: ["frequent-buyer", "high-value"],
      avatar: "/images/chair1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2023-03-20",
      status: "deactivated",
      totalOrders: 2,
      totalSpent: 350,
      subscriptionPlan: "Basic",
      subscriptionExpiry: "2023-09-20",
      affiliateBalance: 0,
      lastWithdrawal: "",
      lastTransaction: "2023-04-15",
      verificationStatus: "pending",
      lastPurchase: "2023-04-15",
      tier: "Silver",
      location: "Los Angeles",
      phone: "+1 555-987-6543",
      notes: "Account suspended for policy violation",
      tags: ["inactive"],
      avatar: "/images/chair1.jpg",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      joinDate: "2023-05-12",
      status: "deactivated",
      totalOrders: 8,
      totalSpent: 890,
      subscriptionPlan: "Standard",
      subscriptionExpiry: "2024-05-12",
      affiliateBalance: 50,
      lastWithdrawal: "2023-06-01",
      lastTransaction: "2023-07-10",
      verificationStatus: "verified",
      lastPurchase: "2023-07-10",
      tier: "Bronze",
      location: "Chicago",
      phone: "+1 555-321-9999",
      notes: "Regular customer",
      tags: ["returning"],
      avatar: "/images/chair1.jpg",
    },
  ]);

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

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <h1 className="text-3xl font-bold text-gray-900">
              Customers Management
              <span className="block mt-1 text-sm font-medium text-gray-500">
                Manage all customer accounts and activities
              </span>
            </h1>
          </div>

          <div className="p-6">
            <CustomerFilters
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            <CustomerTable
              data={filteredData}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBanToggle={handleBanToggle}
              onDeactivateToggle={handleDeactivateToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
