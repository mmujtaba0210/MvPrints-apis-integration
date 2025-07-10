import { FaBoxOpen } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

const DeliveryStatusCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full sm:w-auto">
      <div className="flex items-center space-x-2 mb-2">
        <FaBoxOpen className="text-indigo-600 text-xl" />
        <h4 className="text-sm font-semibold text-gray-800">Be patient, package on deliver!</h4>
      </div>
      <div className="text-sm text-gray-600 flex items-center space-x-1">
        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">📍 613 Kuhi Avenue</span>
        <FaArrowRightLong className="text-gray-400" />
        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">1890 Uitsig St Grahamstad USA</span>
      </div>
      <div className="w-full bg-yellow-100 h-2 rounded-full mt-3">
        <div className="bg-yellow-400 h-2 rounded-full w-[80%]" />
      </div>
    </div>
  );
};

export default DeliveryStatusCard;
