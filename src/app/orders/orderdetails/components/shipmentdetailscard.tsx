import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const ShipmentDetailsCard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      <h2 className="font-semibold mb-4 text-gray-800 text-base sm:text-lg">Shipment & Details</h2>
      
      {/* User info section - stacks on small screens */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://ui-avatars.com/api/?name=American+Franklin+Simon"
              alt="Avatar"
              width={40}
              height={40}
              className="object-cover"
              unoptimized 
            />
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm sm:text-base">American Franklin Simon</p>
            <p className="text-xs text-gray-400">danookangs142@armyspy.com</p>
          </div>
        </div>
      </div>

      {/* Details section - responsive text sizing */}
      <div className="text-sm space-y-2">
        <p className="break-words text-black">
          <span className="font-medium">Recipient:</span> Dhanoo K.
        </p>
        <p className="break-words  text-black">
          <span className="font-medium">Delivery Address:</span> 1890 Uitsig Grahamstad, USA
        </p>
        <p className="break-words  text-black">
          <span className="font-medium">Phone Number:</span> +727-456-6512
        </p>
        <p className="break-words  text-black">
          <span className="font-medium">Payment ID:</span>{' '}
          <span className="text-blue-600 font-mono">#PY26356-NT</span>
        </p>
      </div>
    </div>
  );
};

export default ShipmentDetailsCard;