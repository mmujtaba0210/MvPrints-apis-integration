import React from 'react';

const Topbar = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white to-[#f6f9fc] border-b border-gray-200 py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-600 ">
      <div className="font-semibold text-gray-800 text-base sm:text-sm">Order Details</div>
      <div className="flex flex-wrap items-center gap-x-1 text-gray-400">
        <span className="hover:text-gray-600 cursor-pointer whitespace-nowrap">Osen</span>
        <span>{'>'}</span>
        <span className="hover:text-gray-600 cursor-pointer whitespace-nowrap">eCommerce</span>
        <span>{'>'}</span>
        <span className="text-gray-500 whitespace-nowrap">Order Details</span>
      </div>
    </div>
  );
};

export default Topbar;