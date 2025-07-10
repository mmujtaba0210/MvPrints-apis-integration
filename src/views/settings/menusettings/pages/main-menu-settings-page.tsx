// app/settings/homepage/page.tsx
"use client";

import LeftSideTabs from "@/common/customlefttabbar";
import { 
  FiHome, 
  FiPrinter, 
  FiSliders, 
  FiImage, 
  FiBox,
  FiSettings,
  FiMail,
  FiHelpCircle,
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiBriefcase,
  FiAward,
  FiAlertCircle
} from "react-icons/fi";
import FaqsSectionEditor from "../components/main-faqs-page";
import MainPricingPlansPage from "../components/main-pricing-plan-page";
import { ContactUsForm } from "../components/main-contact-us-form";
import OtherPagesPage from "../components/otherPages/other-page";
import MainAboutUsPage from "../components/main-about-us-page";
import PartnerWithUsForm from "../components/partner-with-us-form";
import MainCareersPage from "../components/main-career-page";
import MainAlertMessagePage from "../components/main-alert-message-page";
import MainBrandAmbasdorPage from "../components/main-brand-ambasdor-page";

export const MenuSettingsMainpage = () => {
  const tabs = [
    {
      id: "contact-us",
      label: "Contact Us Page",
      icon: <FiMail size={18} />,
      content: <ContactUsForm />,
    },
    {
      id: "faq",
      label: "FAQ Page",
      icon: <FiHelpCircle size={18} />,
      content: <FaqsSectionEditor />,
    },
    {
      id: "pricing-plan",
      label: "Pricing Plan Page",
      icon: <FiDollarSign size={18} />,
      content: <MainPricingPlansPage />,
    },
    {
      id: "other-pages",
      label: "Other Pages",
      icon: <FiFileText size={18} />,
      content: <OtherPagesPage />,
    },
    {
      id: "about-us-customization",
      label: "About us Customization",
      icon: <FiUsers size={18} />,
      content: <MainAboutUsPage/>,
    },
    {
      id: "partner-with-us",
      label: "Partner With Us Page",
      icon: <FiUsers size={18} />,
      content: <PartnerWithUsForm />,
    },
    {
      id: "career-customization",
      label: "Career Customization",
      icon: <FiBriefcase size={18} />,
      content: <MainCareersPage />,
    },
    {
      id: "brand-ambassador",
      label: "Brand Ambassador",
      icon: <FiAward size={18} />,
      content: <MainBrandAmbasdorPage />,
    },
    {
      id: "alert-message",
      label: "Alert Message",
      icon: <FiAlertCircle size={18} />,
      content: <MainAlertMessagePage/>,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] bg-white">
      <LeftSideTabs 
        tabs={tabs}
        defaultActiveTab="contact-us"
        tabWidth="280px"
        tabStyle={{
          fontSize: '14px',
          padding: '12px 20px',
          margin: '4px 12px',
          borderRadius: '8px',
        }}
        activeTabStyle={{
          backgroundColor: '#f0f9ff',
          color: '#0369a1',
          fontWeight: '500'
        }}
        contentStyle={{
          padding: '28px',
          backgroundColor: '#f8fafc'
        }}
        showIcons={true}
        containerClassName="border-t"
      />
    </div>
  );
};

export default MenuSettingsMainpage;