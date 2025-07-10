"use client";

import React, { useState } from "react";
import BrandForm from "./brandForm";
import BrandTable from "./brandTable";
import CustomTabs from "@/common/customtabbar";

interface Brand {
  id: number;
  name: string;
  logo: string;
  metaTitle: string;
  metaDescription: string;
  status: "Active" | "Inactive";
}

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [activeTab, setActiveTab] = useState("form");

  const handleAddBrand = (data: {
    name: string;
    logo: FileList | null;
    metaTitle: string;
    metaDescription: string;
  }) => {
    const newBrand: Brand = {
      id: brands.length + 1,
      name: data.name,
      logo: data.logo ? URL.createObjectURL(data.logo[0]) : "https://via.placeholder.com/40",
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      status: "Active",
    };
    
    setBrands([...brands, newBrand]);
    setActiveTab("table");
  };

  const tabs = [
    {
      id: "form",
      label: "Add Brand",
      content: (
        <div className="bg-white rounded-lg shadow p-6">
          <BrandForm onSubmit={handleAddBrand} />
        </div>
      ),
    },
    {
      id: "table",
      label: "View Brands",
      content: <BrandTable />, // BrandTable should not have its own wrapper
      notificationCount: brands.length > 0 ? brands.length : undefined,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="pill"
        size="md"
        className="mb-6"
        tabContainerClassName="bg-gray-50 rounded-lg p-1 text-black"
        tabClassName="hover:bg-gray-200"
        activeTabClassName="bg-white shadow-sm"
      />
      
      {/* Remove the extra wrapper here since it's now in the tab content */}
      {tabs.find(tab => tab.id === activeTab)?.content}
    </div>
  );
};

export default BrandsPage;