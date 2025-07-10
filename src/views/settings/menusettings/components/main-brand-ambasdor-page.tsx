"use client";

import CustomTabs from "@/common/customtabbar";
import { 
  FiBell, 
  FiMessageSquare, 
  FiAlertCircle,
  FiAward,
  FiSettings,
  FiCheckCircle,
  FiImage,
  FiHelpCircle
} from "react-icons/fi";
import BrandAmbassadorForm from "./brand-ambasdor/brand-ambasdor-form";
import BenefitsPage from "./brand-ambasdor/benefits-table";
import HowItWorksPage from "./brand-ambasdor/how-it-work.-table";
import EligibilityCriteriaPage from "./brand-ambasdor/eligibility-requirements-table";
import BottomBannerForm from "./brand-ambasdor/bottom-banner-form";

export const MainBrandAmbasdorPage = () => {
  const tabs = [
    {
      id: "brand-ambasdor-form",
      label: "Brand Ambassador",
      icon: <FiBell className="mr-2" />,
      content: <BrandAmbassadorForm/>,
    },
    {
      id: "benefits",
      label: "Benefits",
      icon: <FiAward className="mr-2" />,
      content: <BenefitsPage/>,
    },
    {
      id: "how-it-works",
      label: "How It Works",
      icon: <FiSettings className="mr-2" />,
      content: <HowItWorksPage/>,
    },
    {
      id: "eligibility",
      label: "Eligibility Requirements",
      icon: <FiCheckCircle className="mr-2" />,
      content: <EligibilityCriteriaPage/>,
    },
    {
      id: "bottom-banner",
      label: "Bottom Banner",
      icon: <FiImage className="mr-2" />,
      content: <BottomBannerForm/>,
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

export default MainBrandAmbasdorPage;