"use client";

import CustomTabs from "@/common/customtabbar";
import {FiImage, FiFileText, FiUsers, FiHelpCircle } from "react-icons/fi";
import CareerPageForm from "./careers-sections/careers-form";
import JobCategoriesPage from "./careers-sections/job-categories-table";
import JobsTable from "./careers-sections/jobs-table";

export const MainCareersPage = () => {
  const tabs = [
    {
      id: "career-form",
      label: "Career Form",
      icon: <FiFileText className="mr-2" />,
      content: <CareerPageForm/>,
    },
    {
      id: "job-category",
      label: "Job Category",
      icon: <FiUsers className="mr-2" />,
      content: <JobCategoriesPage/>,
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: <FiHelpCircle className="mr-2" />,
      content: <JobsTable/>,
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
        />
      </div>
    </div>
  );
};

export default MainCareersPage;