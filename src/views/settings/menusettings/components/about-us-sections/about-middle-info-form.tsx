"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/common/customInputField";
import { FiMapPin, FiSmile, FiAward, FiHome } from "react-icons/fi";
import { toast } from "react-toastify";

interface AboutUsMiddleInfoFormData {
  titleOne: string;
  descriptionOne: string;
  titleTwo: string;
  descriptionTwo: string;
  coreValueDescription: string;
  locationTitle: string;
  locationDescription: string;
  happyClients: string;
  satisfactionRate: string;
  yearsInBusiness: string;
  locations: string;
}

export const AboutUsMiddleInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AboutUsMiddleInfoFormData>();

  // Handle form submission
  const onSubmit = async (data: AboutUsMiddleInfoFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically call your API
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("About us information saved successfully!");
      // You might want to reset the form after successful submission
      // reset();
    } catch (error) {
      toast.error("Failed to save about us information");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        About Us Middle Section Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Section One */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Section One</h3>
          </div>

          <CustomInput
            label="Title One"
            name="titleOne"
            register={register}
            required
            placeholder="Enter title for section one"
            errors={errors}
            validation={{ required: "Title is required" }}
            containerClass="lg:col-span-1"
          />

          <CustomInput
            label="Description One"
            name="descriptionOne"
            register={register}
            required
            placeholder="Enter description for section one"
            errors={errors}
            validation={{ required: "Description is required" }}
            containerClass="lg:col-span-2"
          />

          {/* Section Two */}
          <div className="lg:col-span-3 mt-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Section Two</h3>
          </div>

          <CustomInput
            label="Title Two"
            name="titleTwo"
            register={register}
            required
            placeholder="Enter title for section two"
            errors={errors}
            validation={{ required: "Title is required" }}
            containerClass="lg:col-span-1"
          />

          <CustomInput
            label="Description Two"
            name="descriptionTwo"
            register={register}
            required
            placeholder="Enter description for section two"
            errors={errors}
            validation={{ required: "Description is required" }}
            containerClass="lg:col-span-2"
          />

          {/* Core Values & Location */}
          <div className="lg:col-span-3 mt-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Core Values & Location</h3>
          </div>

          <CustomInput
            label="Core Value Description"
            name="coreValueDescription"
            register={register}
            required
            placeholder="Enter core value description"
            errors={errors}
            validation={{ required: "Core value description is required" }}
            containerClass="lg:col-span-3"
          />

          <CustomInput
            label="Location Title"
            name="locationTitle"
            register={register}
            required
            placeholder="Enter location title"
            errors={errors}
            validation={{ required: "Location title is required" }}
            containerClass="lg:col-span-1"
            icon={<FiMapPin className="text-gray-400" />}
          />

          <CustomInput
            label="Location Description"
            name="locationDescription"
            register={register}
            required
            placeholder="Enter location description"
            errors={errors}
            validation={{ required: "Location description is required" }}
            containerClass="lg:col-span-2"
          />

          {/* Statistics */}
          <div className="lg:col-span-3 mt-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Statistics</h3>
          </div>

          <CustomInput
            label="Happy Clients"
            name="happyClients"
            register={register}
            required
            placeholder="Enter number of happy clients"
            type="number"
            errors={errors}
            validation={{ 
              required: "This field is required",
              min: { value: 0, message: "Must be positive number" }
            }}
            containerClass="lg:col-span-1"
            icon={<FiSmile className="text-gray-400" />}
          />

          <CustomInput
            label="Satisfaction Rate (%)"
            name="satisfactionRate"
            register={register}
            required
            placeholder="Enter satisfaction rate"
            type="number"
            errors={errors}
            validation={{ 
              required: "This field is required",
              min: { value: 0, message: "Must be between 0-100" },
              max: { value: 100, message: "Must be between 0-100" }
            }}
            containerClass="lg:col-span-1"
            icon={<FiAward className="text-gray-400" />}
          />

          <CustomInput
            label="Years in Business"
            name="yearsInBusiness"
            register={register}
            required
            placeholder="Enter years in business"
            type="number"
            errors={errors}
            validation={{ 
              required: "This field is required",
              min: { value: 0, message: "Must be positive number" }
            }}
            containerClass="lg:col-span-1"
            icon={<FiHome className="text-gray-400" />}
          />

          <CustomInput
            label="Locations"
            name="locations"
            register={register}
            required
            placeholder="Enter number of locations"
            type="number"
            errors={errors}
            validation={{ 
              required: "This field is required",
              min: { value: 0, message: "Must be positive number" }
            }}
            containerClass="lg:col-span-1"
            icon={<FiMapPin className="text-gray-400" />}
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};