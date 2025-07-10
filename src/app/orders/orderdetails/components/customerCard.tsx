import React from "react";

const CustomerCard = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6 w-full max-w-xl">
      <div className="flex items-center space-x-4">
        <img src="/avatar.png" alt="User" className="w-14 h-14 rounded-full" />
        <div>
          <h2 className="font-semibold text-lg text-black">John Doe</h2>
          <p className="text-sm text-gray-500">Customer</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-700">
        <p><strong>📞</strong> +1 123 456 7890</p>
        <p><strong>📍</strong> 1623 E Updahl Ct, Harrison, ID, 83833</p>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-black">Order Notes</h3>
        <p className="text-gray-500 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
    </div>
  );
};

export default CustomerCard;
