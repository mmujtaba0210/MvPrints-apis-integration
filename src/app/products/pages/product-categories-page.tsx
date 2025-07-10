// app/settings/product-categories/page.tsx
"use client";

import LeftSideTabs from "@/common/customlefttabbar";
import { FiLayers,FiFolder,FiFolderPlus,FiGrid,FiSettings } from "react-icons/fi";
import MainCategoryPage from "../components/ProductCategoriesComponents/main-category-page";
import SubCategoryPage from "../components/ProductCategoriesComponents/sub-category-page";
import ChildCategoryPage from "../components/ProductCategoriesComponents/child-category-page";

export const ProductCategoriesPage = () => {
  const tabs = [
    {
      id: "main-categories",
      label: "Main Categories",
      icon: <FiLayers size={18} />,
      content: <MainCategoryPage />,
    },
    {
      id: "sub-categories",
      label: "Sub Categories",
      icon: <FiFolder size={18} />,
      content: <SubCategoryPage  />,
    },
    {
      id: "child-categories",
      label: "Child Categories",
      icon: <FiFolderPlus size={18} />,
      content: <ChildCategoryPage  />,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] bg-white">
      <LeftSideTabs 
        tabs={tabs}
        defaultActiveTab="main-categories"
        tabWidth="220px"
        tabStyle={{
          fontSize: '14px',
          padding: '12px 16px',
          margin: '4px 8px',
          borderRadius: '6px',
        }}
        activeTabStyle={{
          backgroundColor: '#f0f9ff',
          color: '#0369a1',
          fontWeight: '500'
        }}
        contentStyle={{
          padding: '24px',
          backgroundColor: '#f8fafc'
        }}
        showIcons={true}
        containerClassName="border-t"
      />
    </div>
  );
};

export default ProductCategoriesPage;