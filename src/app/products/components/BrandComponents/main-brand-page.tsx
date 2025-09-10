"use client";

import React, { useState } from "react";
import BrandForm from "./brandForm";
import BrandTable from "./brandTable";

const BrandsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Create Brand Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Brands</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Create Brand
        </button>
      </div>

      {/* Brand Table (always visible now) */}
      <BrandTable />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Brand Form */}
            <BrandForm onSuccess={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;
