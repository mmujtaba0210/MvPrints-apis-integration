"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/common/customInputField";

interface PlanRow {
  id: string;
  title: string;
  affiliate: string;
  reseller: string;
  dealer: string;
}

interface PrintPlansFormData {
  plans: PlanRow[];
}

const PrintPlans = () => {
  const [planRows, setPlanRows] = useState<PlanRow[]>([
    { id: Date.now().toString(), title: "", affiliate: "", reseller: "", dealer: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PrintPlansFormData>();

  // Sync form values with planRows
  useEffect(() => {
    reset({ plans: planRows });
  }, [planRows, reset]);

  const addNewRow = () => {
    const newRow = { id: Date.now().toString(), title: "", affiliate: "", reseller: "", dealer: "" };
    setPlanRows([...planRows, newRow]);
  };

  const removeRow = (id: string) => {
    if (planRows.length > 1) {
      setPlanRows(planRows.filter((row) => row.id !== id));
    }
  };

  const onSubmit = (data: PrintPlansFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Print Plans</h1>
          <p className="mt-2 text-blue-600">
            Configure your print plans with different pricing tiers
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
            <div className="space-y-8">
              {planRows.map((row, index) => (
                <div key={row.id} className="relative">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-blue-50 p-4 rounded-lg">
                    <CustomInput
                      label="Title"
                      name={`plans.${index}.title`}
                      register={register}
                      required
                      placeholder="Enter title"
                      errors={errors.plans?.[index]?.title}
                    />
                    <CustomInput
                      label="Affiliate"
                      name={`plans.${index}.affiliate`}
                      register={register}
                      required
                      placeholder="Enter affiliate price"
                      errors={errors.plans?.[index]?.affiliate}
                    />
                    <CustomInput
                      label="Reseller"
                      name={`plans.${index}.reseller`}
                      register={register}
                      required
                      placeholder="Enter reseller price"
                      errors={errors.plans?.[index]?.reseller}
                    />
                    <CustomInput
                      label="Dealer"
                      name={`plans.${index}.dealer`}
                      register={register}
                      required
                      placeholder="Enter dealer price"
                      errors={errors.plans?.[index]?.dealer}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={addNewRow}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Row
              </button>

              <div className="space-x-4">
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
                  Save Plans
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrintPlans;