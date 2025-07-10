"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/common/customInputField";
interface PricingPlanFormData {
  planOne: string;
  planOnePrice: string;
  planTwo: string;
  planTwoPrice: string;
  planThree: string;
  planThreePrice: string;
  planFour: string;
  planFourPrice: string;
}

const PrintPricingPlanNames = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PricingPlanFormData>();

  const onSubmit = (data: PricingPlanFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-blue-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plan One */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Plan One
                </h3>
                <CustomInput
                  label="Plan Name"
                  name="planOne"
                  register={register}
                  required
                  placeholder="Enter plan name"
                  errors={errors}
                />
                <CustomInput
                  label="Price"
                  name="planOnePrice"
                  register={register}
                  required
                  placeholder="Enter price"
                  type="number"
                  errors={errors}
                />
              </div>

              {/* Plan Two */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Plan Two
                </h3>
                <CustomInput
                  label="Plan Name"
                  name="planTwo"
                  register={register}
                  required
                  placeholder="Enter plan name"
                  errors={errors}
                />
                <CustomInput
                  label="Price"
                  name="planTwoPrice"
                  register={register}
                  required
                  placeholder="Enter price"
                  type="number"
                  errors={errors}
                />
              </div>

              {/* Plan Three */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Plan Three
                </h3>
                <CustomInput
                  label="Plan Name"
                  name="planThree"
                  register={register}
                  required
                  placeholder="Enter plan name"
                  errors={errors}
                />
                <CustomInput
                  label="Price"
                  name="planThreePrice"
                  register={register}
                  required
                  placeholder="Enter price"
                  type="number"
                  errors={errors}
                />
              </div>

              {/* Plan Four */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Plan Four
                </h3>
                <CustomInput
                  label="Plan Name"
                  name="planFour"
                  register={register}
                  required
                  placeholder="Enter plan name"
                  errors={errors}
                />
                <CustomInput
                  label="Price"
                  name="planFourPrice"
                  register={register}
                  required
                  placeholder="Enter price"
                  type="number"
                  errors={errors}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
              >
                Save Pricing Plans
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrintPricingPlanNames;