"use client";

import LeftSideTabs from "@/common/customlefttabbar";
import { FiSettings, FiTruck,} from "react-icons/fi";
import EmailConfigurationPage from "../components/email-configuration-page";
import SubscribersPage from "../components/subscribers-page";
import EmailTemplatePage from "../components/email-template-page";

export const MainEmailSettingsPage = () => {
  const tabs = [
    {
      id: "email-configuration",
      label: "Email Configurations",
      icon: <FiSettings size={18} />,
      content: <EmailConfigurationPage />,
    },
    {
      id: "email-template",
      label: "Email Template",
      icon: <FiSettings size={18} />,
      content: <EmailTemplatePage />,
    },
    {
      id: "subscribers",
      label: "Subscribers",
      icon: <FiTruck size={18} />,
      content: <SubscribersPage />,
    },
  ];

  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <LeftSideTabs 
        tabs={tabs}
        defaultActiveTab="email-configuration"
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

export default MainEmailSettingsPage;