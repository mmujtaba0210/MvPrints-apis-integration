// app/settings/payment-settings/page.tsx
"use client";

import CustomTabs from "@/common/customtabbar";
import { FiPlusCircle, FiPrinter } from "react-icons/fi";
import PrintPlans from "./pricing-sections/print-plans-page";
import PrintPricingPlanNames from "./pricing-sections/print-pricing-plan-page";


export const MainPricingPlansPage = () => {
  const tabs = [
    {
      id: "pricing-plan-name",
      label: "Pricing Plans Names",
      icon: <FiPlusCircle />,
      content: <PrintPricingPlanNames />,
    },
    {
      id: "print-plan",
      label: "Print Plans",
      icon: <FiPrinter />,
      content: <PrintPlans />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <CustomTabs
          tabs={tabs}
          variant="pill"
          size="lg"
          className="mb-8"
          tabContainerClassName="bg-white rounded-xl shadow-sm p-1.5 border border-gray-200"
          tabClassName="hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center px-4 py-2.5"
          activeTabClassName="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:text-white"
        //   iconPosition="left"
        />
    </div>
  );
};

export default MainPricingPlansPage;