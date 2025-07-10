import React from 'react';

const OrderDetailCard = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 p-4 sm:p-6 bg-white rounded-md shadow-sm border border-gray-200 m-5">
      <div className="w-full">
        {/* Order status and ID - now wraps on small screens */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
          <span className="font-medium">Order</span>
          <span className="text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">#OC3142-EN</span>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Shipping</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">No Action Needed</span>
        </div>

        {/* Order title */}
        <h2 className="mt-2 text-base sm:text-lg font-semibold text-gray-900">
          Order ID : <span className="text-gray-800 font-mono">#OC3142-EN</span>
        </h2>

        {/* Date and delivery - stacks on small screens */}
        <div className="mt-1 text-sm text-gray-600 flex flex-wrap items-center gap-x-2">
          <span>Order Date: <span className="text-black">2 July 2024</span></span>
          <span className="hidden sm:inline">|</span>
          <span className="text-green-600">
            🛵 Estimated delivery: <span className="font-medium">July 9, 2024</span>
          </span>
        </div>
      </div>

      {/* Buttons - full width on mobile, auto width on larger screens */}
      <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 sm:gap-2">
        <button className="px-4 py-1.5 rounded bg-indigo-100 text-indigo-600 text-sm font-medium hover:bg-indigo-200 transition w-full sm:w-auto">
          Invoice
        </button>
        <button className="px-4 py-1.5 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition w-full sm:w-auto">
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default OrderDetailCard;