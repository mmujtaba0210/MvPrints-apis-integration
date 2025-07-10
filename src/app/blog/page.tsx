"use client";

import { FiDollarSign, FiUsers } from "react-icons/fi";
import BlogCategoriesTable from "./components/blog-category-table";
import BlogPostsTable from "./components/blog-post-table";
import CustomTabs from "@/common/customtabbar";

export const MainBlogsPage = () => {
  const tabs = [
    {
      id: "admin-sales-report",
      label: "Admin Sales Report",
      icon: <FiDollarSign />,
      content: <BlogCategoriesTable/>,
    },
    {
      id: "referral-report",
      label: "Referral Report",
      icon: <FiUsers />,
      content: <BlogPostsTable />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <CustomTabs
        tabs={tabs}
        variant="pill"
        size="md"
        className="mb-6"
        tabContainerClassName="bg-gray-50 rounded-lg p-1 text-black"
        tabClassName="hover:bg-gray-200"
        activeTabClassName="bg-blue-700 shadow-sm text-white"
      />
    </div>
  );
};

export default MainBlogsPage;