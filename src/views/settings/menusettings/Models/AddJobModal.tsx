"use client";

import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ isOpen, onClose, onSuccess }) => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    jobCategory: "",
    jobPartner: "",
    positionType: "",
    jobLocation: "",
    jobExperience: "",
    jobType: "",
    shiftAvailability: "",
    jobDueDate: "",
    gender: "",
    jobDescription: "",
    jobVacancy: "",
    salary: "",
    keyResponsibilities: [""],
    keySkills: [""],
    benefits: [""]
  });

  // Options for select fields
  const jobCategories = ["Engineering", "Marketing", "Design", "Finance", "HR"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const shiftOptions = ["Day Shift", "Night Shift", "Rotational", "Flexible"];
  const positionTypes = ["On-site", "Remote", "Hybrid"];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle array field changes
  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    const updatedArray = [...formData[field as keyof typeof formData] as string[]];
    updatedArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  // Add new field to array
  const addArrayField = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field as keyof typeof formData], ""] }));
  };

  // Remove field from array
  const removeArrayField = (field: string, index: number) => {
  const fieldValue = formData[field as keyof typeof formData];
  
  if (!Array.isArray(fieldValue)) {
    console.error(`Field ${field} is not an array`);
    return;
  }

  const updatedArray = fieldValue.filter((_, i) => i !== index);
  setFormData(prev => ({ ...prev, [field]: updatedArray }));
};

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job data:", formData);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Add New Job</h2>
            <p className="text-blue-100 text-sm mt-1">Enter all details for the new job posting</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body - Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700">
                  Job Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="jobCategory"
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
                  >
                    <option value="">Select Category</option>
                    {jobCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="jobPartner" className="block text-sm font-medium text-gray-700">
                  Job Partner
                </label>
                <input
                  type="text"
                  id="jobPartner"
                  name="jobPartner"
                  value={formData.jobPartner}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Partner company name"
                />
              </div>
            </div>

            {/* Job Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label htmlFor="positionType" className="block text-sm font-medium text-gray-700">
                  Position Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="positionType"
                    name="positionType"
                    value={formData.positionType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
                  >
                    <option value="">Select Type</option>
                    {positionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700">
                  Job Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobLocation"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="e.g. New York, USA"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="jobExperience" className="block text-sm font-medium text-gray-700">
                  Experience Required
                </label>
                <input
                  type="text"
                  id="jobExperience"
                  name="jobExperience"
                  value={formData.jobExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="e.g. 3-5 years"
                />
              </div>
            </div>

            {/* Additional Job Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
                  >
                    <option value="">Select Job Type</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="shiftAvailability" className="block text-sm font-medium text-gray-700">
                  Shift Availability
                </label>
                <div className="relative">
                  <select
                    id="shiftAvailability"
                    name="shiftAvailability"
                    value={formData.shiftAvailability}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
                  >
                    <option value="">Select Shift</option>
                    {shiftOptions.map(shift => (
                      <option key={shift} value={shift}>{shift}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="jobDueDate" className="block text-sm font-medium text-gray-700">
                  Application Due Date
                </label>
                <input
                  type="date"
                  id="jobDueDate"
                  name="jobDueDate"
                  value={formData.jobDueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender Preference</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500 "
                  />
                  <span className="ml-2 text-gray-600">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Any"
                    checked={formData.gender === "Any"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">Any</span>
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-1">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed job description..."
              />
            </div>

            {/* Vacancy and Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="jobVacancy" className="block text-sm font-medium text-gray-700">
                  Vacancy <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="jobVacancy"
                  name="jobVacancy"
                  value={formData.jobVacancy}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Number of openings"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="e.g. $80,000 - $100,000 per year"
                />
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Responsibilities <span className="text-red-500">*</span>
              </label>
              {formData.keyResponsibilities.map((responsibility, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => handleArrayFieldChange("keyResponsibilities", index, e.target.value)}
                    required={index === 0}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    placeholder={`Responsibility ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("keyResponsibilities", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("keyResponsibilities")}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                <FiPlus className="mr-1" /> Add Responsibility
              </button>
            </div>

            {/* Key Skills */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Skills <span className="text-red-500">*</span>
              </label>
              {formData.keySkills.map((skill, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayFieldChange("keySkills", index, e.target.value)}
                    required={index === 0}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    placeholder={`Skill ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("keySkills", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("keySkills")}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                <FiPlus className="mr-1" /> Add Skill
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Benefits <span className="text-red-500">*</span>
              </label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayFieldChange("benefits", index, e.target.value)}
                    required={index === 0}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    placeholder={`Benefit ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("benefits", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("benefits")}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                <FiPlus className="mr-1" /> Add Benefit
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;