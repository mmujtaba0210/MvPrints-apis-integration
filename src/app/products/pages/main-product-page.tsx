// app/settings/products/page.tsx
"use client";

import LeftSideTabs from "@/common/customlefttabbar";
import { 
  FiBox, 
  FiLayers,
  FiFileText,
  FiStar,
  FiMessageSquare,
  FiHelpCircle,
  FiAlertCircle
} from "react-icons/fi";
import QuotationProductsPage from "../components/QuotationProductComponents/quotation-product-page";
import PopularProductsPage from "../components/PopularProductComponents/popular-products-page";
import ProductReviewsPage from "../components/ProductReviewsComponents/product-reviews-page";
import ProductQuestionsPage from "../components/ProductQuestionComponents/product-question-page";
import ReportedProductsPage from "../components/ReportedProductsComponents/reported-products-page";
import DeactivatedProductsPage from "../components/DeactivatedProductsComponents/deactivated-products-page";
import BrandsPage from "../components/BrandComponents/main-brand-page";
import PrintAttributesPage from "../components/other/print-attributes-page";
import ProductDeliveryTimeTable from "../components/ProductDeliveryComponents/product-delivery-time-page";
import AllProductsTable from "../components/all-prodcuts-table";
import DigitalProductsPage from "../components/DigitalProductComponents/digital-product-page";

export const MainProductPage = () => {
  const tabs = [
    {
      id: "all-products",
      label: "All Products",
      icon: <FiBox size={18} />,
      content: <AllProductsTable />,
    },
    {
      id: "digital-products",
      label: "Digital Products",
      icon: <FiLayers size={18} />,
      content: <DigitalProductsPage />,
    },
    {
      id: "quotation-products",
      label: "Quotation Products",
      icon: <FiFileText size={18} />,
      content: <QuotationProductsPage />,
    },
    {
      id: "popular-products",
      label: "Popular Products",
      icon: <FiStar size={18} />,
      content: <PopularProductsPage />,
    },
    {
      id: "product-reviews",
      label: "Product Reviews",
      icon: <FiMessageSquare size={18} />,
      content: <ProductReviewsPage />,
    },
    {
      id: "product-questions",
      label: "Product Questions",
      icon: <FiHelpCircle size={18} />,
      content: <ProductQuestionsPage />,
    },
    {
      id: "reported-products",
      label: "Reported Products",
      icon: <FiAlertCircle size={18} />,
      content: <ReportedProductsPage />,
    },
    {
      id : "deactivated-products",
      label : "Deactivated Products",
      icon: <FiAlertCircle size={18}/>,
      content: <DeactivatedProductsPage/>
    },
    {
      id : "print-brand",
      label : "Print Brands",
      icon: <FiAlertCircle size={18}/>,
      content: <BrandsPage/>
    },
    {
      id : "print-attribute",
      label : "Print Attributes",
      icon: <FiAlertCircle size={18}/>,
      content: <PrintAttributesPage/>
    },
     {
      id : "delivery-time",
      label : "Delivery Time",
      icon: <FiAlertCircle size={18}/>,
      content: <ProductDeliveryTimeTable/>
    }
  ];

  return (
    <div className="h-[calc(100vh-64px)] bg-white">
      <LeftSideTabs 
        tabs={tabs}
        defaultActiveTab="all-products"
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

export default MainProductPage;