// app/settings/page.tsx
"use client";

import LeftSideTabs from "@/common/customlefttabbar";
import { FiSettings, FiTruck, FiPackage, FiMessageSquare, FiAlertCircle, FiImage } from "react-icons/fi";
import LogoPage from "./../components/logoComponents/logo";
import LoaderPage from "./../components/loaderComponents/loader-page";
import ShippingMethodsPage from "./../components/shippingComponents/shipping-methods-page";
import CustomFooterPage from "./../components/shippingComponents/shipping-methods-page";
import HeaderMessagesPage from "../components/HeaderComponents/header-message-page";
import ConfirmationMessagePage from "./../components/ConfirmationComponents/confirmation-page";
import MaintenanceTextsPage from "../components/other/website-maintaince-page";
import DefaultImagePage from "../components/other/default-image-page";

export const GeneralSettingsPage = () => {
  const tabs = [
    {
      id: "logo",
      label: "Logo",
      icon: <FiSettings size={18} />,
      content: <LogoPage />,
    },
    {
      id: "loader",
      label: "Loader",
      icon: <FiSettings size={18} />,
      content: <LoaderPage />,
    },
    {
      id: "shipping-methods",
      label: "Shipping Methods",
      icon: <FiTruck size={18} />,
      content: <ShippingMethodsPage />,
    },
    {
      id: "footer",
      label: "Footer",
      icon: <FiSettings size={18} />,
      content: <CustomFooterPage />,
    },
    {
      id: "header-message",
      label: "Header Message",
      icon: <FiMessageSquare size={18} />,
      content: <HeaderMessagesPage />,
    },
    {
      id: "confirmation-messages",
      label: "Confirmation Messages",
      icon: <FiMessageSquare size={18} />,
      content: <ConfirmationMessagePage />,
    },
    {
      id: "website-maintenance",
      label: "Website Maintenance",
      icon: <FiAlertCircle size={18} />,
      content: <MaintenanceTextsPage />,
    },
    {
      id: "default-images",
      label: "Default Images",
      icon: <FiImage size={18} />,
      content: <DefaultImagePage />,
    },
  ];

  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <LeftSideTabs 
        tabs={tabs}
        defaultActiveTab="logo"
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

export default GeneralSettingsPage;