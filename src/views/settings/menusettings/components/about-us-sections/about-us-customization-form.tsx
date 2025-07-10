"use client";

import React, { useState } from "react";

const AboutUsCustomizationForm = () => {
  const [toggleStates, setToggleStates] = useState({
    aboutUs: true,
    middleBanner: true,
    aboutUsInfo: true,
    coreValues: true,
    printLocation: false,
    partners: true
  });

  const handleToggle = (field: keyof typeof toggleStates) => {
    setToggleStates(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with toggle states:", toggleStates);
    // Add your form submission logic here
  };

  const toggleItems = [
    {
      id: 'aboutUs',
      title: 'About Us *',
      description: 'Main about us content section',
      enabled: toggleStates.aboutUs
    },
    {
      id: 'middleBanner',
      title: 'About us Middle Banner *',
      description: 'Middle banner section with image',
      enabled: toggleStates.middleBanner
    },
    {
      id: 'aboutUsInfo',
      title: 'About us Info *',
      description: 'Additional information section',
      enabled: toggleStates.aboutUsInfo
    },
    {
      id: 'coreValues',
      title: 'Core Values *',
      description: 'Company core values display',
      enabled: toggleStates.coreValues
    },
    {
      id: 'printLocation',
      title: 'Print Location *',
      description: 'Company location and map',
      enabled: toggleStates.printLocation
    },
    {
      id: 'partners',
      title: 'Partners *',
      description: 'Partner logos and information',
      enabled: toggleStates.partners
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-full">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">About Us Page Customization</h1>
          <p className="text-blue-100 mt-2">Toggle sections to show/hide on your About Us page</p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="p-8 flex-1 flex flex-col">
          {/* Toggle Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
            {toggleItems.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-lg border transition-all ${
                  item.enabled 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleToggle(item.id as keyof typeof toggleStates)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        item.enabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions - fixed at bottom */}
          <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Reset Defaults
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Save Visibility Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUsCustomizationForm;