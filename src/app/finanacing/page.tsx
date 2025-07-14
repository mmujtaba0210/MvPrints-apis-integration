// app/settings/products/page.tsx
"use client";

import LeftSideTabs from "@/common/customlefttabbar";
import {
  FiBox,
  FiLayers,
  FiPlus,
  FiFileText,
  FiUsers,
  FiStar,
} from "react-icons/fi";
import BusinessAdvantagePage from "./components/business-advantage-table";
import BusinessAdvantageVerificationPage from "./components/business-advantage-verification-page";
import BusinessPreferredPage from "./components/business-preferred-page";
import BusinessPreferredVerificationPage from "./components/business-preferred-verification";
import BusinessStorePage from "./components/business-store-page";
import BusinessStoreVerificationPage from "./components/business-store-verification";

export default function MainFinancePage() {
  const tabs = [
    {
      id: "business-advantage",
      label: "Business Advantage",
      icon: <FiBox size={18} />,
      content: <BusinessAdvantagePage />,
    },
    {
      id: "business-advantage-verification",
      label: "Business Advantage Verification",
      icon: <FiLayers size={18} />,
      content: <BusinessAdvantageVerificationPage />,
    },
    {
      id: "business-preferred",
      label: "Business Preferred",
      icon: <FiPlus size={18} />,
      content: <BusinessPreferredPage />,
    },
    {
      id: "business-preferred-verification",
      label: "Business Preferred Verification",
      icon: <FiFileText size={18} />,
      content: <BusinessPreferredVerificationPage />,
    },
    {
      id: "business-store",
      label: "Business Store",
      icon: <FiUsers size={18} />,
      content: <BusinessStorePage />,
    },
    {
      id: "business-store-verification",
      label: "Business Store Verification",
      icon: <FiStar size={18} />,
      content: <BusinessStoreVerificationPage />,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] bg-white">
      <LeftSideTabs
        tabs={tabs}
        defaultActiveTab="business-advantage"
        tabWidth="280px"
        tabStyle={{
          fontSize: "14px",
          padding: "12px 20px",
          margin: "4px 12px",
          borderRadius: "8px",
        }}
        activeTabStyle={{
          backgroundColor: "#f0f9ff",
          color: "#0369a1",
          fontWeight: "500",
        }}
        contentStyle={{
          padding: "28px",
          backgroundColor: "#f8fafc",
        }}
        showIcons={true}
        containerClassName="border-t"
      />
    </div>
  );
}
