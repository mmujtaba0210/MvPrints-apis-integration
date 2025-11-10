"use client";

import React, { useEffect, useState } from "react";

interface StepPricingProps {
  formik: any;
  initialValues?: any; // allows prefill in edit mode
}

const StepPricing: React.FC<StepPricingProps> = ({ formik, initialValues }) => {
  const [isWholesaleEnabled, setIsWholesaleEnabled] = useState(false);

  // ✅ Prefill data when editing a product
  useEffect(() => {
    if (initialValues) {
      const cleanedPrice = initialValues.price
        ? parseInt(initialValues.price, 10)
        : "";
      const cleanedDiscount = initialValues.discount
        ? parseInt(initialValues.discount, 10)
        : "";
      const cleanedStock = initialValues.stock ?? "";

      formik.setFieldValue("varient", initialValues.varient || "per_item");
      formik.setFieldValue("price", cleanedPrice);
      formik.setFieldValue("discount", cleanedDiscount);
      formik.setFieldValue("stock", cleanedStock);
      formik.setFieldValue(
        "allow_wholesale",
        initialValues.allow_wholesale || false
      );

      if (initialValues.wholesales && initialValues.wholesales.length > 0) {
        setIsWholesaleEnabled(true);
        formik.setFieldValue("wholesales", initialValues.wholesales);
      } else {
        setIsWholesaleEnabled(initialValues.allow_wholesale || false);
        formik.setFieldValue("wholesales", []);
      }
    }
  }, [initialValues]);

  // ✅ Ensure wholesales field exists
  useEffect(() => {
    if (!formik.values.wholesales) {
      formik.setFieldValue("wholesales", []);
    }
  }, [formik.values.wholesales]);

  // ✅ Add new wholesale entry
  const handleAddWholesale = () => {
    const newWholesale = { quantity: "", price: "" };
    formik.setFieldValue("wholesales", [
      ...(formik.values.wholesales || []),
      newWholesale,
    ]);
  };

  // ✅ Remove wholesale entry
  const handleRemoveWholesale = (index: number) => {
    const updated = formik.values.wholesales.filter(
      (_: any, i: number) => i !== index
    );
    formik.setFieldValue("wholesales", updated);
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-3">Pricing</h3>

      {/* === Main Pricing Fields === */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Retail Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Retail Price</label>
          <input
            type="number"
            name="price"
            value={formik.values.price || ""}
            onChange={formik.handleChange}
            placeholder="Enter retail price"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium mb-2">Discount</label>
          <input
            type="number"
            name="discount"
            value={formik.values.discount || ""}
            onChange={formik.handleChange}
            placeholder="Enter discount amount"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
      </main>
    </div>
  );
};

export default StepPricing;
