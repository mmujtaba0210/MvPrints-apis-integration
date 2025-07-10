import React from 'react';

const PurchaseSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full md:max-w-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Purchase Summary</h2>
      <ul className="text-sm space-y-3 text-gray-700">
        <li className="flex justify-between">
          <span>Sub Total :</span>
          <span>$1001.8</span>
        </li>
        <li className="flex justify-between">
          <span>Discount :</span>
          <span className="text-red-500">- $120.00</span>
        </li>
        <li className="flex justify-between">
          <span>Delivery Charge :</span>
          <span className="text-green-500">Free</span>
        </li>
        <li className="flex justify-between">
          <span>Estimated Tax (18.5%) :</span>
          <span>$30.00</span>
        </li>
        <hr />
        <li className="flex justify-between font-bold text-base">
          <span>Grand Amount</span>
          <span>$911.8</span>
        </li>
      </ul>
      <div className="flex justify-end space-x-3 mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Contact To Seller
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
          Invoice
        </button>
      </div>
    </div>
  );
};

export default PurchaseSummary;
