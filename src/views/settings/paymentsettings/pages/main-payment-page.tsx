"use client";

import CustomTabs from "@/common/customtabbar";
import { FiCreditCard, FiDollarSign, FiShield, FiGlobe, FiPieChart, FiGift } from "react-icons/fi";
import PaymentGatewaysPage from "./../components/payment-gateway";
import PaymentInformation from "../components/payment-information";


export const PaymentSettingsPage = () => {
  const tabs = [
    {
      id: "payment-methods",
      label: "Payment Methods",
      icon: <FiCreditCard />,
      content: <PaymentGatewaysPage />,
    },
    {
      id: "payment-information",
      label: "Payment Information",
      icon: <FiDollarSign />,
      content: <PaymentInformation />,
    },
  ];

  return (
    <div className="p-4">
      <CustomTabs
        tabs={tabs}
        variant="pill"
        size="md"
        className="mb-6 p-4"
        tabContainerClassName="bg-gray-50 rounded-lg p-1 text-black"
        tabClassName="hover:bg-gray-200 text-black"
        activeTabClassName="bg-blue-600 shadow-sm text-white hover:text-black"
      />
    </div>
  );
};

export default PaymentSettingsPage;