"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductInformationForm } from "./components/ProductInformationForm";
import { ProductIdentifiersForm } from "./components/ProductIdentifiersForm";
import { PricingForm } from "./components/PricingForm";
import { ProductVariationForm } from "./components/ProductVariationForm";
import { ProductDetailsForm } from "../components/other/ProductDetailsForm";
import { MediaForm } from "./components/mediaForm";
import { ShippingForm } from "./components/ShippingForm";
import { SEOForm } from "./components/SeoForm";

const steps = [
  { id: "Product Information", component: ProductInformationForm },
  { id: "Product Identifiers", component: ProductIdentifiersForm},
  { id: "Pricing", component: PricingForm },
  { id: "Product Variation", component: ProductVariationForm},
  { id: "Product Details", component: ProductDetailsForm },
  { id: "Media", component: MediaForm },
  { id: "Shipping", component: ShippingForm },
  { id: "SEO", component: SEOForm},
];

export const AddProductForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [allowWholesale, setAllowWholesale] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // Mock data for categories
  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Home & Garden" },
  ];

  const subCategories = [
    { id: "1", name: "Smartphones", parentId: "1" },
    { id: "2", name: "Laptops", parentId: "1" },
    { id: "3", name: "Men's Clothing", parentId: "2" },
    { id: "4", name: "Women's Clothing", parentId: "2" },
  ];

  const childCategories = [
    { id: "1", name: "Android Phones", parentId: "1" },
    { id: "2", name: "iPhones", parentId: "1" },
    { id: "3", name: "Gaming Laptops", parentId: "2" },
    { id: "4", name: "Business Laptops", parentId: "2" },
  ];

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
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
          categories={categories}
          subCategories={subCategories}
          childCategories={childCategories}
          allowWholesale={allowWholesale}
          setAllowWholesale={setAllowWholesale}
          freeShipping={freeShipping}
          setFreeShipping={setFreeShipping}
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
              Submit Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};