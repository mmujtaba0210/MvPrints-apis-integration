"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Eye,
  Edit3,
  Trash2,
  Ban,
  RefreshCcw,
  Power,
} from "lucide-react";

type CustomerStatus = "all" | "active" | "banned" | "deactivated";

export interface Customer {
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
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ✅ Close dropdown when clicking outside
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

  return (
    <div ref={dropdownRef} className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Avatar
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Total Orders
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {data && data.length > 0 ? (
            data.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition">
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
                <td className="px-6 py-3">{customer.totalOrders}</td>

                <td className="px-6 py-3 relative text-right">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === customer.id ? null : customer.id
                      )
                    }
                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Actions ⌄
                  </button>

                  {openDropdown === customer.id && (
                    <div className="absolute z-10 right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul className="py-1 text-sm text-black">
                        <li
                          onClick={() => {
                            onView(customer);
                            setOpenDropdown(null);
                          }}
                          className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                        >
                          <Eye size={16} /> View
                        </li>
                        {onEdit && (
                          <li
                            onClick={() => {
                              onEdit(customer);
                              setOpenDropdown(null);
                            }}
                            className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                          >
                            <Edit3 size={16} /> Edit
                          </li>
                        )}
                        <li
                          onClick={() => {
                            onDelete(customer);
                            setOpenDropdown(null);
                          }}
                          className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                        >
                          <Trash2 size={16} /> Delete
                        </li>
                        <li
                          onClick={() => {
                            onBanToggle(customer);
                            setOpenDropdown(null);
                          }}
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
                          onClick={() => {
                            onDeactivateToggle(customer);
                            setOpenDropdown(null);
                          }}
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
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500 italic">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;