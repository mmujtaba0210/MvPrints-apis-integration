"use client";

import React, { useState } from "react";
import { CustomInput } from "@/common/customInputField";
import { FiType, FiHeadphones, FiList, FiBriefcase, FiFileText } from "react-icons/fi";

const CareerPageForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    pageSubTitle: "",
    benefitsSubTitle: "",
    featuredJobSubTitle: "",
    careerApplicationTitle: "",
    careerApplicationDescription: ""
  });

  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and submit form
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Career Page Content
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Manage all content fields for your career page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <CustomInput
                label="Page Title"
                name="title"
                placeholder="Join Our Amazing Team"
                value={formData.title}
                onChange={handleChange}
                required
                errors={errors}
                icon={<FiType className="text-gray-400" />}
              />

              <CustomInput
                label="Page Subtitle"
                name="pageSubTitle"
                placeholder="Why work with us?"
                value={formData.pageSubTitle}
                onChange={handleChange}
                errors={errors}
                icon={<FiHeadphones className="text-gray-400" />}
              />

              <CustomInput
                label="Benefits Subtitle"
                name="benefitsSubTitle"
                placeholder="Our employee benefits"
                value={formData.benefitsSubTitle}
                onChange={handleChange}
                errors={errors}
                icon={<FiList className="text-gray-400" />}
              />

              <CustomInput
                label="Featured Jobs Subtitle"
                name="featuredJobSubTitle"
                placeholder="Current openings"
                value={formData.featuredJobSubTitle}
                onChange={handleChange}
                errors={errors}
                icon={<FiBriefcase className="text-gray-400" />}
              />

              <CustomInput
                label="Application Title"
                name="careerApplicationTitle"
                placeholder="Ready to join our team?"
                value={formData.careerApplicationTitle}
                onChange={handleChange}
                required
                errors={errors}
                icon={<FiFileText className="text-gray-400" />}
              />

              <div className="space-y-2">
                <label htmlFor="careerApplicationDescription" className="block text-sm font-medium text-gray-700">
                  Application Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="careerApplicationDescription"
                  name="careerApplicationDescription"
                  value={formData.careerApplicationDescription}
                  onChange={(e) => setFormData({...formData, careerApplicationDescription: e.target.value})}
                  required
                  rows={3}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Application process description..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 mt-6">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm flex items-center justify-center"
              >
                Save All Fields
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerPageForm;