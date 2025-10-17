"use client";

import { CustomInput } from "@/common/customInputField";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";

// slices
import { getAllCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { getAllSubCategoriesWithoutPagination } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import { fetchChildCategories } from "@/redux/slices/productCategorySlices/ChildCategorySlices/fetchChildCategorySlice";
import { getLabels } from "@/redux/slices/Product/Label/getLabelsSlice";
import { fetchBrands } from "@/redux/slices/Product/productBrandSlice/fetchBrandsSlice";

interface ProductInformationFormProps {
  register: any;
  errors: any;
  setValue: any;
  watch: any; // 👈 Add this prop from react-hook-form
}

export const ProductInformationForm = ({
  register,
  errors,
  setValue,
  watch,
}: ProductInformationFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);

  // Redux states
  const { allCategories } = useSelector(
    (state: RootState) => state.getAllCategories
  );
  const { subCategories } = useSelector(
    (state: RootState) => state.getAllProductSubCategories
  );
  const { childCategories } = useSelector(
    (state: RootState) => state.fetchChildCategories
  );
  const { data: labels } = useSelector((state: RootState) => state.getLabels);

  // Watch fields
  const selectedCategory = watch("category");
  const selectedSubCategory = watch("sub_category");

  // Fetch on mount
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getLabels({ page: 1 }));
    dispatch(fetchBrands(1));
  }, [dispatch]);

  // When main category changes, reset dependent fields
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getAllSubCategoriesWithoutPagination());
      setValue("sub_category", "");
      setValue("child_category", "");
    }
  }, [selectedCategory, dispatch, setValue]);

  // When subcategory changes, fetch child categories
  useEffect(() => {
    if (selectedSubCategory) {
      dispatch(fetchChildCategories(selectedSubCategory));
      setValue("child_category", "");
    }
  }, [selectedSubCategory, dispatch, setValue]);

  // Label toggle logic
  const toggleLabel = (id: number) => {
    setSelectedLabels((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      setValue("labels", updated);
      return updated;
    });
  };

  return (
    <form className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Product Information</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Product Name */}
        <CustomInput
          label="Product Name"
          name="name"
          register={register}
          required
          placeholder="Enter product name"
          errors={errors}
        />

        {/* Listing Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Listing Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("type", {
              required: "Listing type is required",
            })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select listing type</option>
            <option value="prints">prints</option>
            <option value="digital">digital</option>
            <option value="quotation">quotation</option>
          </select>
          {errors.listingType && (
            <p className="text-sm text-red-600">
              {errors.listingType.message as string}
            </p>
          )}
        </div>

        {/* Labels (multi-select) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Labels
          </label>
          <input
            type="hidden"
            {...register("labels", {
              required: "At least one label must be selected",
            })}
          />
          <div className="flex flex-wrap gap-2">
            {labels?.map((label: any) => (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  selectedLabels.includes(label.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {label.name}
              </button>
            ))}
          </div>
          {errors.labels && (
            <p className="text-sm text-red-600">
              {errors.labels.message as string}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("category", { required: "Category is required" })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none"
              defaultValue={watch("category") || ""} // ✅ ensures selected value shows on edit
            >
              <option value="">Select category</option>
              {allCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
          </div>
          {errors.category && (
            <p className="text-sm text-red-600">
              {errors.category.message as string}
            </p>
          )}
        </div>

        {/* SubCategory */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sub Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("sub_category", {
                required: "Sub category is required",
              })}
              disabled={!selectedCategory}
              className={`block w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none ${
                !selectedCategory ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              defaultValue={watch("sub_category") || ""}
            >
              <option value="">Select sub category</option>
              {subCategories
                .filter((sub) => sub.id === Number(selectedCategory)) // ✅ correct filter condition
                .map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
            </select>
            <FiChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
          </div>
          {errors.sub_category && (
            <p className="text-sm text-red-600">
              {errors.sub_category.message as string}
            </p>
          )}
        </div>

        {/* Child Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Child Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("child_category", {
                required: "Child category is required",
              })}
              disabled={!selectedSubCategory}
              className={`block w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none ${
                !selectedSubCategory ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              defaultValue={watch("child_category") || ""}
            >
              <option value="">Select child category</option>
              {childCategories.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
          </div>
          {errors.child_category && (
            <p className="text-sm text-red-600">
              {errors.child_category.message as string}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
