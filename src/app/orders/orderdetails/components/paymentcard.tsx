import { FaCcMastercard } from 'react-icons/fa';

const PaymentCard = () => {
  return (
    <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full sm:w-auto">
      <div className="flex items-center space-x-2 mb-2">
        <FaCcMastercard className="text-3xl text-red-600" />
        <div className="text-sm text-gray-900 font-semibold">Master Card</div>
        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Paid</span>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        <div>
          <span className="block text-gray-800 font-medium">Transaction ID</span>
          TR626788-MR
        </div>
        <div className="mt-1">
          <span className="block text-gray-800 font-medium">Payment Method</span>
          **** **** **** 3541
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
