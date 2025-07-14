"use client";
import React, { useState } from "react";
import OrderTable from "@/app/orders/components/OrderTable";
import OrderFilters from "@/app/orders/components/OrderFilters";
import { filters } from "@/app/orders/configs/FilterConfigs";
import { Order, OrderStatus } from "@/app/orders/types/OrderTypes";

const AllOrdersPage = () => {
  const [activeFilter, setActiveFilter] = useState<OrderStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - in a real app, this would come from an API
  const allOrders: Order[] = [
    {
      id: 1,
      customer: "John Doe",
      date: "2023-05-01",
      status: "Completed",
      amount: 120,
      daysPending: 0,
      urgency: "Normal",
      stage: "Packaging",
      progress: 75,
      rating: "5 stars",
      reason: "Changed mind",
      refundStatus: "Processed",
      refundId: "REF-001",
      returnId: "RET-001",
      replacementId: "REP-001",
      verificationId: "VER-001",
      items: "1 item",
      documents: "2 files",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2023-05-02",
      status: "Pending",
      amount: 85,
      daysPending: 3,
      urgency: "High",
      stage: "Processing",
      progress: 25,
      rating: "",
      reason: "",
      refundStatus: "",
      refundId: "REF-002",
      returnId: "RET-002",
      replacementId: "REP-002",
      verificationId: "VER-002",
      items: "2 items",
      documents: "1 file",
    },
  ];

  // Filter data based on active filter and search term
  const filteredData = allOrders.filter((order) => {
    // Apply status filter
    const statusMatch =
      activeFilter === "all" || order.status.toLowerCase() === activeFilter;

    // Apply search term filter
    const searchMatch =
      searchTerm === "" ||
      Object.values(order).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );

    return statusMatch && searchMatch;
  });

  const handleView = (order: Order) => {
    console.log("View order:", order.id);
    // Navigate to order detail page or show modal
  };

  const handleDelete = (order: Order) => {
    console.log("Delete order:", order.id);
    // Call API to delete order
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <h1 className="text-3xl font-bold text-gray-900">
              Orders Management
              <span className="block mt-1 text-sm font-medium text-gray-500">
                Manage all customer orders from this dashboard
              </span>
            </h1>
          </div>

          <div className="p-6">
            <OrderFilters
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              // searchTerm={searchTerm}
              // onSearchChange={setSearchTerm}
            />

            <OrderTable
              activeFilter={activeFilter}
              data={filteredData}
              onView={handleView}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrdersPage;
