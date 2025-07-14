"use client";

import React, { useState } from "react";
import Sidebar from "@/app/sidebar/components/sidebar";
import { SidebarType } from "@/app/sidebar/types/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
// Import all your page components
import QuotationsPage from "../quotation/pages/quotation";
import GiftCardsPage from "../giftcards/pages/gift-cards-page";
import GiftCardTransactionsPage from "../giftcards/pages/gift-card-transactions";
import StaffTable from "../users/pages/staff-page";
import RolesTable from "../users/pages/manage-role-page";
import RefundOrdersPage from "../orders/refundorder/refundorderspage";
import OrderProofsPage from "../orders/orderproof/orderproof";
import GeneralSettingsPage from "../../views/settings/generalsettings/pages/main-general-settings-tab";
import AllOrdersPage from "@/app/orders/allorders/allorderspage";
import PaymentSettingsPage from "../../views/settings/paymentsettings/pages/main-payment-page";
import MainHomeSettingsPage from "../../views/settings/homepagesettings/pages/main-home-setting-page";
import MainProductPage from "../products/pages/main-product-page";
import ProductCategoriesPage from "../products/pages/product-categories-page";
import OrderVerificationPage from "../orders/orderverification/orderverificationpage";
import MenuSettingsMainpage from "../../views/settings/menusettings/pages/main-menu-settings-page";
import MainReportPage from "../report/pages/main-report-page";
import MainEmailSettingsPage from "../../views/settings/emailsettings/pages/main-email-settings-page";
import SocialLinksForm from "../../views/settings/socialsettings/pages/social-links-page";
import MessagesPage from "../support/pages/message-page";
import MainMarketingPage from "../marketing/pages/main-marketing-page";
import OrderDetailsPage from "../orders/orderdetails/orderdetailspage";
import CustomerSettingsPage from "../customer/page";
import MainFinancePage from "../finanacing/page";
import PointsManagementPage from "../loyality/page";
// import CharitiesPage from "../donations/charity/page";
// import MainBlogsPage from "../blog/page";

const MainPage: React.FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<SidebarType>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleSelect = (section: SidebarType) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-16 bg-white shadow-md flex items-center px-4 justify-between border-b-[1px] border-gray-300">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-xl cursor-pointer text-gray-700 hover:text-pink-500"
          >
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <h1 className="text-lg font-semibold text-pink-500">
            Mecarvi Prints Admin
          </h1>
        </div>
        <div>
          <button className="text-gray-700 hover:text-pink-500">Logout</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          onSelect={handleSelect}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          activeSection={selectedSection}
        />

        {/* Main Content */}
        <main
          className={clsx(
            "flex-1 overflow-y-auto p-3 bg-[#e1e4e8d4] transition-all duration-300 w-full scrollbar-hide"
          )}
        >
          {/* <h2 className="text-xl font-bold capitalize mb-6 text-black">
            {selectedSection.replace(/-/g, ' ')}
          </h2> */}

          {/* Render the selected section */}
          {selectedSection === "order-details" && <OrderDetailsPage />}
          {selectedSection === "all-orders" && <AllOrdersPage />}
          {selectedSection === "refund-order" && <RefundOrdersPage />}
          {selectedSection === "order-proof" && <OrderProofsPage />}
          {selectedSection === "order-verification" && (
            <OrderVerificationPage />
          )}
          {selectedSection === "customers" && <CustomerSettingsPage />}
          {selectedSection === "quotation" && <QuotationsPage />}
          {selectedSection === "finance" && <MainFinancePage />}
          {selectedSection === "loyality" && <PointsManagementPage />}
          {selectedSection === "gift-cards" && <GiftCardsPage />}
          {selectedSection === "gift-card-transactions" && (
            <GiftCardTransactionsPage />
          )}
          {selectedSection === "marketing" && <MainMarketingPage />}
          {/* {selectedSection === "charity" && <CharitiesPage />} */}
          {/* {selectedSection === "donations" && <DonationsTable />} */}
          {selectedSection === "staff" && <StaffTable />}
          {selectedSection === "roles" && <RolesTable />}
          {selectedSection === "general-settings" && <GeneralSettingsPage />}
          {selectedSection === "payment-settings" && <PaymentSettingsPage />}
          {selectedSection === "home-page-settings" && <MainHomeSettingsPage />}
          {selectedSection === "product-management" && <MainProductPage />}
          {selectedSection === "product-category" && <ProductCategoriesPage />}
          {selectedSection === "menu-settings" && <MenuSettingsMainpage />}
          {selectedSection === "reports" && <MainReportPage />}
          {/* {selectedSection === "blog" && <MainBlogsPage />} */}
          {selectedSection === "email-settings" && <MainEmailSettingsPage />}
          {selectedSection === "social-settings" && <SocialLinksForm />}
          {selectedSection === "message" && <MessagesPage />}
        </main>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default MainPage;
