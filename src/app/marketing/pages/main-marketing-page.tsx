// app/marketing/main-marketing-page.tsx
"use client";

import LeftSideTabs from "@/common/customlefttabbar";
import { FiMail, FiMessageSquare, FiTag, FiSettings } from "react-icons/fi";
import BulkEmailForm from "../components/bulk-email-page";
import SmsForm from "../components/sms-form-page";
import CouponsPage from "../components/coupons-page";

export const MainMarketingPage = () => {
  const tabs = [
    {
      id: "bulk-email",
      label: "Bulk Email",
      icon: <FiMail size={18} />,
      content: <BulkEmailForm />,
    },
    {
      id: "bulk-sms",
      label: "Bulk SMS",
      icon: <FiMessageSquare size={18} />,
      content: <SmsForm />,
    },
    {
      id: "coupons",
      label: "Coupon Management",
      icon: <FiTag size={18} />,
      content: <CouponsPage />,
    },
  ];

  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <LeftSideTabs 
        tabs={tabs}
        defaultActiveTab="bulk-email"
        tabWidth="260px"
        tabStyle={{
          fontSize: '14px',
          padding: '12px 16px',
          margin: '4px 8px',
          borderRadius: '6px',
        }}
        activeTabStyle={{
          backgroundColor: '#f0f7ff',
          color: '#1a73e8',
          fontWeight: '500'
        }}
        contentStyle={{
          padding: '24px',
          backgroundColor: '#f9fafb'
        }}
        showIcons={true}
      />
    </div>
  );
};

export default MainMarketingPage;