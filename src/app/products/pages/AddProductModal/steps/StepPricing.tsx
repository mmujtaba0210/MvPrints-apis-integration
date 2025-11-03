"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

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
        {/* Variant Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Variant Type</label>
          <select
            name="varient"
            value={formik.values.varient || ""}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Variant Type</option>
            <option value="per_item">Per Item</option>
            <option value="whole_order">Whole Order</option>
          </select>
        </div>

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

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formik.values.stock || ""}
            onChange={formik.handleChange}
            placeholder="Enter stock quantity"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
      </main>

      {/* === Wholesale Toggle === */}
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="wholesale-toggle"
          checked={isWholesaleEnabled}
          onChange={() => {
            const newState = !isWholesaleEnabled;
            setIsWholesaleEnabled(newState);
            formik.setFieldValue("allow_wholesale", newState);
          }}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="wholesale-toggle" className="text-sm font-medium">
          Enable Wholesale Pricing
        </label>
      </div>

      {/* === Wholesale Section === */}
      {isWholesaleEnabled && (
        <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
          <h4 className="text-sm font-semibold">Wholesale Entries</h4>

          {formik.values.wholesales.map((item: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
            >
              <div>
                <label className="block text-xs mb-1">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const updated = [...formik.values.wholesales];
                    updated[index].quantity = e.target.value;
                    formik.setFieldValue("wholesales", updated);
                  }}
                  placeholder="e.g. 10"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Price</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const updated = [...formik.values.wholesales];
                    updated[index].price = e.target.value;
                    formik.setFieldValue("wholesales", updated);
                  }}
                  placeholder="e.g. 40000"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              <Button
                variant="destructive"
                onClick={() => handleRemoveWholesale(index)}
                className="flex items-center justify-center w-max"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={handleAddWholesale}
            variant="outline"
            size="sm"
            className="mt-2 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Wholesale</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepPricing;
