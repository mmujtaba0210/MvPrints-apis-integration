"use client";
import React from "react";
import { Customer } from "../types/customerTypes";

interface CustomerTableProps {
  data: Customer[];
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
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

        <tbody className="divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4 capitalize">{customer.status}</td>
                <td className="px-6 py-4">{customer.totalOrders}</td>
                <td className="px-6 py-4 text-right space-x-2 flex gap-2">
                  <button
                    onClick={() => onView(customer)}
                    className="bg-blue-600 text-white rounded-2xl px-2 text-sm hover:underline cursor-pointer "
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="bg-green-600 text-white rounded-2xl px-2 text-sm hover:underline cursor-pointer "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(customer)}
                    className="bg-red-600 text-white rounded-2xl px-2 text-sm cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-4 text-center text-gray-500 italic"
              >
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
