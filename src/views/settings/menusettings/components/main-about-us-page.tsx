"use client";

import CustomTabs from "@/common/customtabbar";
import { FiInfo, FiLayout, FiImage, FiFileText, FiAward, FiMapPin, FiUsers } from "react-icons/fi";
import AboutUsForm from "./about-us-sections/about-us-form-page";
import { AboutUsMiddleBanner } from "./about-us-sections/about-middle-banner-page";
import AboutUsCustomizationForm from "./about-us-sections/about-us-customization-form";
import { AboutUsMiddleInfoForm } from "./about-us-sections/about-middle-info-form";
import CoreValuesPage from "./about-us-sections/about-core-values-page";
import PrintLocationPage from "./about-us-sections/print-location-page";
import PartnersPage from "./about-us-sections/partners-page";

export const MainAboutUsPage = () => {
  const tabs = [
    {
      id: "about-us",
      label: "About Us",
      icon: <FiInfo className="mr-2" />,
      content: <AboutUsForm />,
    },
    {
      id: "about-us-customization",
      label: "About us Customization",
      icon: <FiLayout className="mr-2" />,
      content: <AboutUsCustomizationForm />,
    },
    {
      id: "middle-banner",
      label: "Middle Banner",
      icon: <FiImage className="mr-2" />,
      content: <AboutUsMiddleBanner />,
    },
    {
      id: "middle-info",
      label: "Middle Info",
      icon: <FiFileText className="mr-2" />,
      content: <AboutUsMiddleInfoForm/>,
    },
    {
      id: "core-values",
      label: "Core Values",
      icon: <FiAward className="mr-2" />,
      content: <CoreValuesPage />,
    },
    {
      id: "print-locations",
      label: "Print Locations",
      icon: <FiMapPin className="mr-2" />,
      content: <PrintLocationPage />,
    },
    {
      id: "partners",
      label: "Partners",
      icon: <FiUsers className="mr-2" />,
      content: <PartnersPage />,
    },
  ];

  return (
    <div className=" bg-gray-50 h-fit">
      <div className="w-fit mx-auto">

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
    </div>
  );
};

export default MainAboutUsPage;