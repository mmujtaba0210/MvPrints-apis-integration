"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductInformationForm } from "../../forms/components/ProductInformationForm";
import { DigitalPricingForm } from "../../forms/DigitalPricingForm";
import { EstimatedDeliveryForm } from "../../forms/EstimatedDeliveryForm";
import { ProductVariationForm } from "../../forms/components/ProductVariationForm";
import { ProductDetailsForm } from "../other/ProductDetailsForm";
import { MediaForm } from "../../forms/components/mediaForm";
import { SEOForm } from "../../forms/components/SeoForm";

const steps = [
  { id: "Product Information", component: ProductInformationForm },
  { id: "Pricing", component: DigitalPricingForm },
  { id: "Estimated Delivery", component: EstimatedDeliveryForm },
  { id: "Product Variation", component: ProductVariationForm },
  { id: "Product Details", component: ProductDetailsForm },
  { id: "Media", component: MediaForm },
  { id: "SEO", component: SEOForm },
];

export const AddDigitalProductForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // Mock data for categories
  const categories = [
    { id: "1", name: "E-books" },
    { id: "2", name: "Software" },
    { id: "3", name: "Digital Art" },
    { id: "4", name: "Music" },
    { id: "5", name: "Courses" },
  ];

  const subCategories = [
    { id: "1", name: "Fiction", parentId: "1" },
    { id: "2", name: "Non-Fiction", parentId: "1" },
    { id: "3", name: "Applications", parentId: "2" },
    { id: "4", name: "Games", parentId: "2" },
    { id: "5", name: "Illustrations", parentId: "3" },
  ];

  const childCategories = [
    { id: "1", name: "Science Fiction", parentId: "1" },
    { id: "2", name: "Fantasy", parentId: "1" },
    { id: "3", name: "Business Software", parentId: "3" },
    { id: "4", name: "Educational", parentId: "3" },
  ];

  const onSubmit = (data: any) => {
    console.log("Digital product submitted:", data);
    // Handle form submission here
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentFormComponent = steps[currentStep].component;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add New Digital Product
      </h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                index < steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  index <= currentStep ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step.id}
              </span>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CurrentFormComponent
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
          {...(CurrentFormComponent === ProductInformationForm ||
          CurrentFormComponent === ProductDetailsForm
            ? {
                categories,
                subCategories,
                childCategories,
              }
            : {})}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FiChevronLeft className="mr-1" /> Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              Next <FiChevronRight className="ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit Digital Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
