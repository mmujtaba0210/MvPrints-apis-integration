import React, { useState } from "react";
import { FiAlertCircle, FiImage, FiUser, FiBriefcase, FiMessageSquare } from "react-icons/fi";
import { CustomInput } from "@/common/customInputField"; // Adjust the import path as needed

const PartnerWithUsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    slogan: "",
    title: "",
    description: "",
    clientName: "",
    clientDesignation: "",
    clientQuote: "",
    currentBackgroundImage: "",
    clientImage: ""
  });

  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation logic here
    console.log("Form submitted:", formData);
    // Submit to API
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Partner With Us
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Fill out the form below to become our partner
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white shadow rounded-lg p-6 sm:p-8">
            {/* Section Header */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
              <p className="mt-1 text-sm text-gray-500">General details about your partnership</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <CustomInput
                label="Slogan"
                name="slogan"
                placeholder="Your partnership slogan"
                value={formData.slogan}
                onChange={handleChange}
                required
                errors={errors}
                containerClass="sm:col-span-2"
              />

              <CustomInput
                label="Title"
                name="title"
                placeholder="Partnership title"
                value={formData.title}
                onChange={handleChange}
                required
                errors={errors}
              />

              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={4}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Detailed description about the partnership..."
                />
                {errors.description && (
                  <span className="inline-flex items-center text-xs text-red-500">
                    <FiAlertCircle className="mr-1" />
                    {errors.description.message || "This field is required"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Client Testimonial Section */}
          <div className="bg-white shadow rounded-lg p-6 sm:p-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-medium text-gray-900">Client Testimonial</h2>
              <p className="mt-1 text-sm text-gray-500">Details about your representative</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <CustomInput
                label="Client Name"
                name="clientName"
                placeholder="Client's full name"
                value={formData.clientName}
                onChange={handleChange}
                required
                errors={errors}
                icon={<FiUser className="text-gray-400" />}
              />

              <CustomInput
                label="Client Designation"
                name="clientDesignation"
                placeholder="Client's position"
                value={formData.clientDesignation}
                onChange={handleChange}
                required
                errors={errors}
                icon={<FiBriefcase className="text-gray-400" />}
              />

              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="clientQuote" className="block text-sm font-medium text-gray-700">
                  Client Quote <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="clientQuote"
                  name="clientQuote"
                  value={formData.clientQuote}
                  onChange={(e) => setFormData({...formData, clientQuote: e.target.value})}
                  required
                  rows={3}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="What your client says about the partnership..."
                />
                {errors.clientQuote && (
                  <span className="inline-flex items-center text-xs text-red-500">
                    <FiAlertCircle className="mr-1" />
                    {errors.clientQuote.message || "This field is required"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-white shadow rounded-lg p-6 sm:p-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-medium text-gray-900">Media</h2>
              <p className="mt-1 text-sm text-gray-500">Upload images for your partnership</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Background Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-full">
                    <input
                      type="file"
                      id="currentBackgroundImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "currentBackgroundImage")}
                      className="hidden"
                    />
                    <label
                      htmlFor="currentBackgroundImage"
                      className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 flex flex-col items-center justify-center"
                    >
                      {formData.currentBackgroundImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={formData.currentBackgroundImage}
                            alt="Background preview"
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                      ) : (
                        <>
                          <FiImage className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Recommended size: 1920x1080px</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Client Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-full">
                    <input
                      type="file"
                      id="clientImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "clientImage")}
                      className="hidden"
                    />
                    <label
                      htmlFor="clientImage"
                      className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 flex flex-col items-center justify-center"
                    >
                      {formData.clientImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={formData.clientImage}
                            alt="Client preview"
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                      ) : (
                        <>
                          <FiUser className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Recommended size: 400x400px</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Submit Partnership
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerWithUsForm;