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
  watch: any;
  productData?: any; // 👈 for edit mode
}

export const ProductInformationForm = ({
  register,
  errors,
  setValue,
  watch,
  productData,
}: ProductInformationFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const selectedCategory = watch("category");
  const selectedSubCategory = watch("sub_category");

  // Fetch on mount
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getLabels({ page: 1 }));
    dispatch(fetchBrands(1));
  }, [dispatch]);

  // On edit: prefill fields
  useEffect(() => {
    if (productData) {
      setValue("name", productData.name || "");
      setValue("type", productData.type || "");

      // Labels
      if (Array.isArray(productData.labels)) {
        const labelIds = labels
          ?.filter((lbl: any) =>
            productData.labels.includes(lbl.name || lbl.id)
          )
          ?.map((lbl: any) => lbl.id);
        setSelectedLabels(labelIds || []);
        setValue("labels", labelIds || []);
      }

      // Category fields
      const categoryObj = allCategories.find(
        (cat: any) =>
          cat.name === productData.category || cat.id === productData.category
      );
      if (categoryObj) setValue("category", categoryObj.id);

      const subObj = subCategories.find(
        (sub: any) =>
          sub.name === productData.sub_category ||
          sub.id === productData.sub_category
      );
      if (subObj) setValue("sub_category", subObj.id);

      const childObj = childCategories.find(
        (child: any) =>
          child.name === productData.child_category ||
          child.id === productData.child_category
      );
      if (childObj) setValue("child_category", childObj.id);
    }
  }, [
    productData,
    allCategories,
    subCategories,
    childCategories,
    labels,
    setValue,
  ]);

  // When main category changes
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getAllSubCategoriesWithoutPagination());
      setValue("sub_category", "");
      setValue("child_category", "");
    }
  }, [selectedCategory, dispatch, setValue]);

  // When subcategory changes
  useEffect(() => {
    if (selectedSubCategory) {
      dispatch(fetchChildCategories(selectedSubCategory));
      setValue("child_category", "");
    }
  }, [selectedSubCategory, dispatch, setValue]);

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
            {...register("type", { required: "Listing type is required" })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select listing type</option>
            <option value="prints">prints</option>
            <option value="digital">digital</option>
            <option value="quotation">quotation</option>
          </select>
          {errors.type && (
            <p className="text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        {/* Labels Dropdown */}
        <div className="space-y-2 relative label-dropdown">
          <label className="block text-sm font-medium text-gray-700">
            Product Labels
          </label>
          <input
            type="hidden"
            {...register("labels", {
              required: "At least one label must be selected",
            })}
          />

          <div
            className="w-full min-h-[48px] flex flex-wrap items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {selectedLabels.length > 0 ? (
              labels
                ?.filter((lbl: any) => selectedLabels.includes(lbl.id))
                ?.map((lbl: any) => (
                  <span
                    key={lbl.id}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                  >
                    {lbl.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = selectedLabels.filter(
                          (x) => x !== lbl.id
                        );
                        setSelectedLabels(updated);
                        setValue("labels", updated);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✕
                    </button>
                  </span>
                ))
            ) : (
              <span className="text-gray-400 text-sm">Select labels...</span>
            )}
            <FiChevronDown className="ml-auto text-gray-400" />
          </div>

          {showDropdown && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {labels?.map((lbl: any) => (
                <div
                  key={lbl.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    const updated = selectedLabels.includes(lbl.id)
                      ? selectedLabels.filter((x) => x !== lbl.id)
                      : [...selectedLabels, lbl.id];
                    setSelectedLabels(updated);
                    setValue("labels", updated);
                  }}
                  className={`px-4 py-2 cursor-pointer text-sm ${
                    selectedLabels.includes(lbl.id)
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {lbl.name}
                </div>
              ))}
            </div>
          )}

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
          <select
            {...register("category", { required: "Category is required" })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select category</option>
            {allCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Sub Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sub Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("sub_category", {
              required: "Sub category is required",
            })}
            disabled={!selectedCategory}
            className={`block w-full px-4 py-3 border border-gray-300 rounded-lg ${
              !selectedCategory ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select sub category</option>
            {subCategories
              ?.filter(
                (sub: any) =>
                  sub.product_category_id === Number(selectedCategory)
              )
              ?.map((sub: any) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
          </select>
          {errors.sub_category && (
            <p className="text-sm text-red-600">
              {errors.sub_category.message}
            </p>
          )}
        </div>

        {/* Child Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Child Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("child_category", {
              required: "Child category is required",
            })}
            disabled={!selectedSubCategory}
            className={`block w-full px-4 py-3 border border-gray-300 rounded-lg ${
              !selectedSubCategory ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select child category</option>
            {childCategories?.map((child: any) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
          {errors.child_category && (
            <p className="text-sm text-red-600">
              {errors.child_category.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
