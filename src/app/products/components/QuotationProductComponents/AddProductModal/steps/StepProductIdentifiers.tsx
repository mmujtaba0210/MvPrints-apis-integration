"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Loader2 } from "lucide-react";
import { fetchBrands } from "@/redux/slices/Product/productBrandSlice/fetchBrandsSlice";

interface StepProductIdentifiersProps {
  formik: any;
}

export default function StepProductIdentifiers({
  formik,
}: StepProductIdentifiersProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading } = useSelector(
    (state: RootState) => state.fetchBrands
  );

  // ✅ Fetch brands once
  useEffect(() => {
    dispatch(fetchBrands(1));
  }, [dispatch]);

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-3">Product Identifiers</h3>

      {/* ✅ Brand Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2">Brand</label>
        {loading ? (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Loading brands...</span>
          </div>
        ) : (
          <select
            name="brand"
            value={formik.values.brand || ""}
            onChange={(e) => {
              const selectedBrand = brands.find(
                (brand) => brand.name === e.target.value
              );
              formik.setFieldValue("brand", e.target.value);
              formik.setFieldValue("brandId", selectedBrand?.id);
            }}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        )}
        {formik.touched.brand && formik.errors.brand && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.brand}</p>
        )}
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* ✅ SKU Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Product SKU</label>
          <input
            type="text"
            name="sku"
            placeholder="Enter product SKU"
            {...formik.getFieldProps("sku")}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary"
          />
          {formik.touched.sku && formik.errors.sku && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.sku}</p>
          )}
        </div>

        {/* ✅ Model Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Model</label>
          <input
            type="text"
            name="model"
            placeholder="Enter model"
            {...formik.getFieldProps("model")}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary"
          />
          {formik.touched.model && formik.errors.model && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.model}</p>
          )}
        </div>
      </main>
    </div>
  );
}
