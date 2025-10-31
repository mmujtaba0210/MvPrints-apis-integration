"use client";
import React, { useEffect, useRef, useState } from "react";
import { Eye, Edit3, Trash2, Ban, RefreshCcw, Power, X } from "lucide-react";

type CustomerStatus = "all" | "active" | "banned" | "deactivated";

export interface Customer {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: CustomerStatus;
  totalOrders: number;
  totalSpent: number;
  phone?: string;
  avatar?: string;
}

interface CustomerTableProps {
  data: Customer[];
  onView: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onBanToggle: (customer: Customer) => void;
  onDeactivateToggle: (customer: Customer) => void;
  onDataChanged?: () => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
  onBanToggle,
  onDeactivateToggle,
  onDataChanged, // Add this to props destructuring
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    status: "",
  });

  const API_TOKEN = "48|NOtPrzpY4Sk2H1raMxmygMzCFto3I2Sg8MAkcNQx31ef5f49";
  const BASE_URL = "https://testbackend.mecarviprints.com/api/admin";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showAlert = (message: string, isSuccess: boolean = true) => {
    alert(`${isSuccess ? "✅ Success:" : "❌ Error:"} ${message}`);
  };

  // ✅ Ban/Unban
  const handleBanToggle = async (customer: Customer) => {
    const actionKey = `ban-${customer.id}`;
    setLoading((prev) => ({ ...prev, [actionKey]: true }));
    try {
      const response = await fetch(
        `${BASE_URL}/customers/${customer.id}/ban-status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        onBanToggle(customer);
        showAlert(result.message);
        onDataChanged?.(); // Refresh parent data
      } else {
        showAlert(result.message || "Failed to toggle ban status", false);
      }
    } catch (error) {
      showAlert("Error toggling ban status", false);
    } finally {
      setLoading((prev) => ({ ...prev, [actionKey]: false }));
      setOpenDropdown(null);
    }
  };

  // ✅ Activate/Deactivate
  const handleDeactivateToggle = async (customer: Customer) => {
    const actionKey = `deactivate-${customer.id}`;
    setLoading((prev) => ({ ...prev, [actionKey]: true }));
    try {
      const response = await fetch(
        `${BASE_URL}/customers/${customer.id}/toggle-status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        onDeactivateToggle(customer);
        showAlert(result.message);
        onDataChanged?.(); // Refresh parent data
      } else {
        showAlert(result.message || "Failed to toggle status", false);
      }
    } catch (error) {
      showAlert("Error toggling status", false);
    } finally {
      setLoading((prev) => ({ ...prev, [actionKey]: false }));
      setOpenDropdown(null);
    }
  };

  // ✅ Update Customer API - FIXED VERSION
  const handleUpdateCustomer = async (customerId: number, updatedData: any) => {
    const actionKey = `update-${customerId}`;
    setLoading((prev) => ({ ...prev, [actionKey]: true }));

    try {
      // Since the main update endpoint doesn't exist, we'll simulate the update
      // by updating the local state and handling status changes through working endpoints
      console.log(
        "🔄 Simulating customer update (main endpoint not available)"
      );

      // Handle status changes through working endpoints
      if (updatedData.status !== editCustomer?.status) {
        await handleStatusChange(editCustomer!, updatedData.status);
      }

      // For name and email updates, we'll simulate success since the API endpoint doesn't exist
      // In a real scenario, you would need to check with your backend team for the correct endpoint
      const updatedCustomer: Customer = {
        ...editCustomer!,
        name: updatedData.name,
        email: updatedData.email,
        status: updatedData.status as CustomerStatus,
      };

      console.log("✅ Simulated Updated Customer:", updatedCustomer);

      showAlert(
        "Customer updated successfully (simulated - main API endpoint not available)"
      );
      onEdit?.(updatedCustomer);
      onDataChanged?.(); // Refresh parent data
      setEditCustomer(null);
    } catch (error) {
      console.error("🚨 Error updating customer:", error);
      showAlert("Error updating customer - API endpoint not found", false);
    } finally {
      setLoading((prev) => ({ ...prev, [actionKey]: false }));
    }
  };

  // ✅ Handle status changes through appropriate endpoints
  const handleStatusChange = async (customer: Customer, newStatus: string) => {
    console.log(
      `🔄 Handling status change from ${customer.status} to ${newStatus}`
    );

    if (newStatus === "banned" && customer.status !== "banned") {
      // Ban the customer
      console.log("🚫 Banning customer");
      await handleBanToggle(customer);
    } else if (customer.status === "banned" && newStatus !== "banned") {
      // Unban first if changing from banned to another status
      console.log("🔓 Unbanning customer first");
      await handleBanToggle(customer);

      // If changing to deactivated, also call deactivate
      if (newStatus === "deactivated") {
        console.log("⏸️ Deactivating customer after unban");
        await handleDeactivateToggle(customer);
      }
    } else if (
      (newStatus === "deactivated" && customer.status === "active") ||
      (newStatus === "active" && customer.status === "deactivated")
    ) {
      // Toggle between active and deactivated
      console.log("🔄 Toggling active/deactivated status");
      await handleDeactivateToggle(customer);
    } else {
      console.log("✅ No status change needed");
    }
  };

  // ✅ Edit Modal Handler
  const openEditModal = (customer: Customer) => {
    setEditCustomer(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      status: customer.status,
    });
    setOpenDropdown(null);
  };

  // ✅ View Modal Handler
  const openViewModal = (customer: Customer) => {
    setViewCustomer(customer);
    onView(customer);
    setOpenDropdown(null);
  };

  const handleDelete = (customer: Customer) => {
    onDelete(customer);
    setOpenDropdown(null);
  };

  const isLoading = (action: string, id: number) =>
    loading[`${action}-${id}`] || false;

  const isAnyActionLoading = (id: number) =>
    Object.keys(loading).some((key) => key.includes(id.toString()));

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
              Avatar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-3">
                <img
                  src={customer.avatar || "/images/default-avatar.png"}
                  alt={customer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-3 font-medium text-gray-800">
                {customer.name}
              </td>
              <td className="px-6 py-3 text-gray-600">{customer.email}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    customer.status === "active"
                      ? "bg-green-100 text-green-700"
                      : customer.status === "banned"
                      ? "bg-red-100 text-red-700"
                      : customer.status === "deactivated"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {customer.status}
                </span>
              </td>

              {/* ✅ Dropdown */}
              <td className="px-6 py-3 relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === customer.id ? null : customer.id
                    )
                  }
                  className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                  disabled={isAnyActionLoading(customer.id)}
                >
                  {isAnyActionLoading(customer.id) ? "Loading..." : "Actions ⌄"}
                </button>

                {openDropdown === customer.id && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg"
                  >
                    <ul className="py-1 text-sm text-black">
                      <li
                        onClick={() => openViewModal(customer)}
                        className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                      >
                        <Eye size={16} /> View
                      </li>

                      <li
                        onClick={() => openEditModal(customer)}
                        className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                      >
                        <Edit3 size={16} /> Edit
                      </li>

                      <li
                        onClick={() => handleDelete(customer)}
                        className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                      >
                        <Trash2 size={16} /> Delete
                      </li>

                      <li
                        onClick={() => handleBanToggle(customer)}
                        className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                      >
                        {customer.status === "banned" ? (
                          <>
                            <RefreshCcw size={16} /> Unban
                          </>
                        ) : (
                          <>
                            <Ban size={16} /> Ban
                          </>
                        )}
                      </li>

                      <li
                        onClick={() => handleDeactivateToggle(customer)}
                        className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                      >
                        {customer.status === "deactivated" ? (
                          <>
                            <RefreshCcw size={16} /> Reactivate
                          </>
                        ) : (
                          <>
                            <Power size={16} /> Deactivate
                          </>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ View Modal */}
      {viewCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Customer Details</h2>
              <button onClick={() => setViewCustomer(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {viewCustomer.name}
              </p>
              <p>
                <strong>Email:</strong> {viewCustomer.email}
              </p>
              <p>
                <strong>Status:</strong> {viewCustomer.status}
              </p>
              <p>
                <strong>Joined:</strong> {viewCustomer.joinDate}
              </p>
              <p>
                <strong>Total Orders:</strong> {viewCustomer.totalOrders}
              </p>
              <p>
                <strong>Total Spent:</strong> ${viewCustomer.totalSpent}
              </p>
              {viewCustomer.phone && (
                <p>
                  <strong>Phone:</strong> {viewCustomer.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Edit Modal */}
      {editCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Edit Customer</h2>
              <button onClick={() => setEditCustomer(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="banned">Banned</option>
                  <option value="deactivated">Deactivated</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Note: Name/email changes are simulated (API endpoint not
                  available)
                </p>
              </div>

              <button
                onClick={() => handleUpdateCustomer(editCustomer.id, editForm)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading("update", editCustomer.id)}
              >
                {isLoading("update", editCustomer.id)
                  ? "Updating..."
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;