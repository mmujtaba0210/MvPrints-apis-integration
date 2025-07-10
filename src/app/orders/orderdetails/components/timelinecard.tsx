import React from 'react';

const TimelineCard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      <h2 className="font-semibold mb-4 text-gray-800">Timeline</h2>
      <ul className="space-y-3 text-sm text-gray-600">
        <li>
          <p className="font-medium">4 July (Now)</p>
          <p className="text-xs">06:00 – Your package is packed by the courier</p>
          <p className="text-xs text-gray-400">613 Kuhi Avenue Jennifer Lane</p>
        </li>
        <li>
          <p className="font-medium">2 July</p>
          <p className="text-xs">Shipment has been created</p>
          <p className="text-xs text-gray-400">613 Kuhi Avenue</p>
        </li>
        <li>
          <p className="font-medium">2 July</p>
          <p className="text-xs">04:00 – Order Placed</p>
          <p className="text-xs text-green-500">Coderthemes ●</p>
        </li>
      </ul>
    </div>
  );
};

export default TimelineCard;
