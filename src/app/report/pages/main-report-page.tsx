// app/settings/payment-settings/page.tsx
"use client";

import { FiCreditCard, FiDollarSign, FiUsers, FiPrinter } from "react-icons/fi";
import AdminSalesReportTable from "../components/admin-sales-page";
import ReferralPage from "../components/referral-report-page";
import CustomTabs from "@/common/customtabbar";

export const MainReportPage = () => {
  const tabs = [
    {
      id: "admin-sales-report",
      label: "Admin Sales Report",
      icon: <FiDollarSign />,
      content: <AdminSalesReportTable />,
    },
    {
      id: "referral-report",
      label: "Referral Report",
      icon: <FiUsers />,
      content: <ReferralPage />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
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

export default MainReportPage;