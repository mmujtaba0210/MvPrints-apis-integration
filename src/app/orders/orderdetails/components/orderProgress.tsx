import React from "react";

const steps = [
  "Order Created",
  "Payment Success",
  "On Delivery",
  "Order Delivered",
];

const OrderProgress = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6 w-full max-w-5xl">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-1/4 relative">
            <div className={`w-6 h-6 rounded-full z-10 ${index <= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <p className={`mt-2 text-xs ${index <= 2 ? "text-blue-600" : "text-gray-400"}`}>{step}</p>
            {index < steps.length - 1 && (
              <div className={`absolute top-3 left-full h-0.5 w-full ${index < 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
