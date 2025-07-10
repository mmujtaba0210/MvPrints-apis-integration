"use client";

import React, { useState } from "react";
import { CustomInput } from "@/common/customInputField";

interface EmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EmailTemplateModal: React.FC<EmailTemplateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    emailTitle: "",
    emailType: "",
    emailSubject: "",
    emailDesign: "design1",
    logo: "",
    emailBody: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to save the email template
    console.log("Saving email template:", formData);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Create Email Template</h2>
            <p className="text-blue-100 text-sm md:text-base mt-1">Configure your new email template</p>
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Email Title"
              name="emailTitle"
              required={true}
              placeholder="e.g. Welcome Email"
              value={formData.emailTitle}
              onChange={handleChange}
            />

            <div className="space-y-1">
              <label htmlFor="emailType" className="block text-sm font-medium text-gray-700">
                Email Type <span className="text-red-500">*</span>
              </label>
              <select
                id="emailType"
                name="emailType"
                value={formData.emailType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              >
                <option value="">Select type</option>
                <option value="welcome">Welcome Email</option>
                <option value="transactional">Transactional</option>
                <option value="marketing">Marketing</option>
                <option value="notification">Notification</option>
              </select>
            </div>

            <CustomInput
              label="Email Subject"
              name="emailSubject"
              required={true}
              placeholder="e.g. Welcome to Our Service!"
              value={formData.emailSubject}
              onChange={handleChange}
            />

            <div className="space-y-1">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setFormData(prev => ({
                          ...prev,
                          logo: event.target?.result as string
                        }));
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium transition-colors"
                >
                  Upload Logo
                </label>
                {formData.logo && (
                  <img 
                    src={formData.logo} 
                    alt="Logo preview" 
                    className="w-8 h-8 rounded object-cover border border-gray-200"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1 mt-4">
            <label htmlFor="emailDesign" className="block text-sm font-medium text-gray-700">
              Email Design <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div 
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${formData.emailDesign === 'design1' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setFormData(prev => ({...prev, emailDesign: 'design1'}))}
              >
                <div className="bg-white border border-gray-200 rounded p-1.5">
                  <div className="h-3 bg-blue-100 rounded mb-1.5"></div>
                  <div className="h-2 bg-gray-100 rounded mb-1 w-3/4"></div>
                  <div className="h-2 bg-gray-100 rounded mb-1 w-1/2"></div>
                  <div className="h-16 bg-gray-50 rounded mt-1.5 border border-gray-100"></div>
                </div>
                <p className="text-center mt-1.5 text-sm font-medium">Design One</p>
              </div>
              <div 
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${formData.emailDesign === 'design2' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => setFormData(prev => ({...prev, emailDesign: 'design2'}))}
              >
                <div className="bg-white border border-gray-200 rounded p-1.5">
                  <div className="h-3 bg-purple-100 rounded mb-1.5"></div>
                  <div className="h-2 bg-gray-100 rounded mb-1 w-full"></div>
                  <div className="h-2 bg-gray-100 rounded mb-1 w-2/3"></div>
                  <div className="h-16 bg-gray-50 rounded mt-1.5 border border-gray-100 grid grid-cols-2 gap-1.5">
                    <div className="bg-gray-100 rounded"></div>
                    <div className="bg-gray-100 rounded"></div>
                  </div>
                </div>
                <p className="text-center mt-1.5 text-sm font-medium">Design Two</p>
              </div>
            </div>
          </div>

          <div className="space-y-1 mt-4">
            <label htmlFor="emailBody" className="block text-sm font-medium text-gray-700">
              Email Body <span className="text-red-500">*</span>
            </label>
            <textarea
              id="emailBody"
              name="emailBody"
              rows={6}
              value={formData.emailBody}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              placeholder="Write your email content here..."
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm md:px-5 md:py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="emailTemplateForm"
              className="px-4 py-2 text-sm md:px-5 md:py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateModal;