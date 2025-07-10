"use client";

import CustomTabs from "@/common/customtabbar";
import { FiBell, FiMessageSquare, FiAlertCircle } from "react-icons/fi";
import NotificationPage from "./alert-message-page/notification-page";
import SmsMessagePage from "./alert-message-page/sms-page";
import PopupMessagePage from "./alert-message-page/popup-page";

export const MainAlertMessagePage = () => {
  const tabs = [
    {
      id: "notification-message",
      label: "Notification Message",
      icon: <FiBell className="mr-2" />,
      content: <NotificationPage />,
    },
    {
      id: "sms-message",
      label: "SMS Message",
      icon: <FiMessageSquare className="mr-2" />,
      content: <SmsMessagePage />,
    },
    {
      id: "popup-message",
      label: "Popup Message",
      icon: <FiAlertCircle className="mr-2" />,
      content: <PopupMessagePage/>,
    },
  ];

  return (
    <div className="bg-gray-50 h-fit">
      <div className="w-fit mx-auto">
        <CustomTabs
          tabs={tabs}
          variant="pill"
          size="lg"
          className="mb-8"
          tabContainerClassName="bg-white rounded-xl shadow-sm p-1.5 border border-gray-200"
          tabClassName="hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center px-4 py-2.5"
          activeTabClassName="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:text-white"
        />
      </div>
    </div>
  );
};

export default MainAlertMessagePage;