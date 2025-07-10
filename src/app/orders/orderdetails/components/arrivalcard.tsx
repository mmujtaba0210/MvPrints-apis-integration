import { FaShippingFast } from 'react-icons/fa';

const ArrivalCard = () => {
  return (
    <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full sm:w-auto">
      <div className="flex items-center space-x-2 mb-2">
        <FaShippingFast className="text-indigo-600 text-xl" />
        <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Track Order
        </button>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        <div>
          <span className="block text-gray-800 font-medium">Estimated Arrival</span>
          9 July 2024
        </div>
        <div className="mt-1">
          <span className="block text-gray-800 font-medium">Tracker ID</span>
          #TR73647
        </div>
      </div>
    </div>
  );
};

export default ArrivalCard;
