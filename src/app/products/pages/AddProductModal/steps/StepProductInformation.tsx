"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { getLabels } from "@/redux/slices/Product/Label/getLabelsSlice";
import { getAllCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { getAllSubCategoriesWithoutPagination } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import { fetchChildCategories } from "@/redux/slices/productCategorySlices/ChildCategorySlices/fetchChildCategorySlice";

const StepProductInformation = ({ formik, initialValues }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: labels, loading: labelsLoading } = useSelector(
    (state: RootState) => state.getLabels
  );
  const { allCategories, loading: categoryLoading } = useSelector(
    (state: RootState) => state.getAllCategories
  );
  const { subCategories, loading: subCategoryLoading } = useSelector(
    (state: RootState) => state.getAllProductSubCategories
  );
  const { childCategories, loading: childLoading } = useSelector(
    (state: RootState) => state.fetchChildCategories
  );

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubDropdown, setShowSubDropdown] = useState(false);
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [showLabelDropdown, setShowLabelDropdown] = useState(false);

  // ✅ Fetch data when component mounts
  useEffect(() => {
    dispatch(getLabels({ page: 1 }));
    dispatch(getAllCategories());
    dispatch(getAllSubCategoriesWithoutPagination());
    dispatch(fetchChildCategories(1));
  }, [dispatch]);

  // ✅ Pre-fill for Update mode (if initialValues provided)
  useEffect(() => {
    if (
      initialValues &&
      labels.length > 0 &&
      allCategories.length > 0 &&
      subCategories.length > 0 &&
      childCategories.length > 0
    ) {
      // ✅ Handle multiple labels
      const matchedLabelIds =
        labels
          .filter((l: any) => initialValues.labels?.includes(l.name))
          .map((l: any) => l.id) || [];

      const categoryId =
        allCategories.find((c: any) => c.name === initialValues.category)?.id ??
        null;
      const subCategoryId =
        subCategories.find((s: any) => s.name === initialValues.sub_category)
          ?.id ?? null;
      const childCategoryId =
        childCategories.find(
          (ch: any) => ch.name === initialValues.child_category
        )?.id || "";

      formik.setFieldValue("label_id", matchedLabelIds);
      formik.setFieldValue("product_category_id", categoryId);
      formik.setFieldValue("sub_category_id", subCategoryId);
      formik.setFieldValue("child_category_id", childCategoryId);

      setSelectedCategory(categoryId);
      setSelectedSubCategory(subCategoryId);
    }
  }, [initialValues, labels, allCategories, subCategories, childCategories]);

  // ✅ Handles selecting/unselecting labels
  const handleLabelClick = (labelId: number) => {
    const current = [...(formik.values.label_id || [])];
    const updated = current.includes(labelId)
      ? current.filter((id) => id !== labelId)
      : [...current, labelId];
    formik.setFieldValue("label_id", updated);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Product Name */}
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter product name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="Enter slug"
          value={formik.values.slug}
          onChange={formik.handleChange}
        />
        {formik.touched.slug && formik.errors.slug && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.slug}</p>
        )}
      </div>

      {/* Product Labels (Multi-Select) */}
      <div className="relative">
        <Label>Product Labels</Label>
        <div
          onClick={() => setShowLabelDropdown((prev) => !prev)}
          className="flex flex-wrap items-center gap-2 w-full border rounded-md p-2 min-h-[42px] cursor-pointer"
        >
          {formik.values.label_id && formik.values.label_id.length > 0 ? (
            formik.values.label_id.map((id: number) => {
              const label = labels.find((l: any) => l.id === id);
              if (!label) return null;
              return (
                <span
                  key={id}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                >
                  {label.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLabelClick(id);
                    }}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              );
            })
          ) : (
            <span className="text-gray-400 text-sm">Select product labels</span>
          )}
        </div>

        {/* Dropdown */}
        {showLabelDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto">
            {labels.map((label: any) => {
              const isSelected = formik.values.label_id?.includes(label.id);
              return (
                <div
                  key={label.id}
                  onClick={() => handleLabelClick(label.id)}
                  className={`px-3 py-2 text-sm cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                    isSelected ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {label.name}
                  {isSelected && <span className="text-primary">✔</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="relative">
        <Label>Category</Label>
        {categoryLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading categories...
          </div>
        ) : (
          <div className="relative">
            <Input
              readOnly
              placeholder="Select category"
              value={
                allCategories.find(
                  (c: any) =>
                    String(c.id) === String(formik.values.product_category_id)
                )?.name || ""
              }
              className="cursor-pointer"
              onClick={() => setShowCategoryDropdown((prev) => !prev)}
            />
            {showCategoryDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto">
                {allCategories.map((category: any) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      const id = Number(category.id);
                      setSelectedCategory(id);
                      setSelectedSubCategory(null);
                      formik.setFieldValue("product_category_id", id);
                      formik.setFieldValue("sub_category_id", "");
                      formik.setFieldValue("child_category_id", "");
                      setShowCategoryDropdown(false);
                    }}
                    className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                      String(category.id) ===
                      String(formik.values.product_category_id)
                        ? "bg-gray-100 font-medium"
                        : ""
                    }`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subcategory */}
      <div className="relative">
        <Label>Subcategory</Label>
        {subCategoryLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading...
          </div>
        ) : (
          <div className="relative">
            <Input
              readOnly
              disabled={!selectedCategory}
              placeholder={
                !selectedCategory
                  ? "Select category first"
                  : "Select subcategory"
              }
              value={
                subCategories.find(
                  (s: any) =>
                    String(s.id) === String(formik.values.sub_category_id)
                )?.name || ""
              }
              className={`cursor-pointer ${
                !selectedCategory ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                if (selectedCategory) setShowSubDropdown((prev) => !prev);
              }}
            />
            {showSubDropdown && selectedCategory && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto">
                {subCategories
                  .filter(
                    (s: any) => s.product_category_id === selectedCategory
                  )
                  .map((sub: any) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        const id = Number(sub.id);
                        setSelectedSubCategory(id);
                        formik.setFieldValue("sub_category_id", id);
                        formik.setFieldValue("child_category_id", "");
                        setShowSubDropdown(false);
                      }}
                      className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                        String(sub.id) === String(formik.values.sub_category_id)
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                    >
                      {sub.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Child Category */}
      <div className="relative">
        <Label>Child Category</Label>
        {childLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading...
          </div>
        ) : (
          <div className="relative">
            <Input
              readOnly
              disabled={!selectedSubCategory}
              placeholder={
                !selectedSubCategory
                  ? "Select subcategory first"
                  : "Select child category"
              }
              value={
                childCategories.find(
                  (ch: any) =>
                    String(ch.id) === String(formik.values.child_category_id)
                )?.name || ""
              }
              className={`cursor-pointer ${
                !selectedSubCategory ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                if (selectedSubCategory) setShowChildDropdown((prev) => !prev);
              }}
            />
            {showChildDropdown && selectedSubCategory && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto">
                {childCategories
                  .filter(
                    (ch: any) =>
                      ch.product_sub_category_id === selectedSubCategory
                  )
                  .map((ch: any) => (
                    <div
                      key={ch.id}
                      onClick={() => {
                        const id = Number(ch.id);
                        formik.setFieldValue("child_category_id", id);
                        setShowChildDropdown(false);
                      }}
                      className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                        String(ch.id) ===
                        String(formik.values.child_category_id)
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                    >
                      {ch.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepProductInformation;
