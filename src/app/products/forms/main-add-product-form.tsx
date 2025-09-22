"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductInformationForm } from "./components/ProductInformationForm";
import { ProductIdentifiersForm } from "./components/ProductIdentifiersForm";
import { PricingForm } from "./components/PricingForm";
import { ProductVariationForm } from "./components/ProductVariationForm";
import { ProductDetailsForm } from "../components/other/ProductDetailsForm";
import { MediaForm } from "./components/mediaForm";
import { ShippingForm } from "./components/ShippingForm";
import { SEOForm } from "./components/SeoForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  resetCreateProduct,
} from "@/redux/slices/productSlices/createProductSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { toast } from "react-toastify";

const steps = [
  { id: "Product Information", component: ProductInformationForm },
  { id: "Product Identifiers", component: ProductIdentifiersForm },
  { id: "Pricing", component: PricingForm },
  { id: "Product Variation", component: ProductVariationForm },
  { id: "Product Details", component: ProductDetailsForm },
  { id: "Media", component: MediaForm },
  { id: "Shipping", component: ShippingForm },
  { id: "SEO", component: SEOForm },
];

export const AddProductForm = () => {
  const [laststeps, setLastSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [allowWholesale, setAllowWholesale] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.createProduct
  );

  useEffect(() => {
    if (success) {
      toast.success("✅ Product created successfully!");
      dispatch(resetCreateProduct());
    }
  }, [success, dispatch]);
  useEffect(() => {
    if (error) {
      // If backend returns validation errors
      const errorObj = error as {
        errors?: Record<string, string[]>;
        message?: string;
      };
      if (typeof error === "object" && errorObj.errors) {
        Object.entries(errorObj.errors).forEach(([field, messages]) => {
          (messages as string[]).forEach((msg) =>
            toast.error(`${field}: ${msg}`)
          );
        });
      } else {
        toast.error(
          typeof error === "object" && "message" in error
            ? errorObj.message
            : error || "❌ Failed to create product"
        );
      }
      dispatch(resetCreateProduct());
    }
  }, [error, dispatch]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
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

  const nextStep = async () => {
    // Run validation for current step before moving forward

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: any) => {
    if (laststeps) {
      const formData = new FormData();

      // Basic product info
      formData.append("name", data.productName);
      formData.append("slug", data.slug);
      formData.append("type", data.listingType);
      formData.append("model", data.model);
      formData.append("description", data.description);
      formData.append("specification", data.specifications);
      formData.append("refund_policy", data.returnPolicy);

      // Categories & Brand
      formData.append("product_category_id", String(data.category));
      formData.append("product_sub_category_id", String(data.subCategory));
      formData.append("product_child_category_id", String(data.childCategory));
      formData.append("product_brand_id", String(data.product_brand_id));
      formData.append("product_deleivery_time_id", String(data.deliveryTimeId));

      // Pricing
      formData.append("varient", data.variant);
      formData.append("allow_wholesale", data.allowWholesale ? "1" : "0");
      formData.append("price", String(data.retailPrice));
      formData.append("discount", String(data.discountAmount));
      formData.append("sku", data.sku);
      formData.append("stock", String(data.stockNumber));

      // Shipping
      formData.append("is_shipping_cost", data.isShippingCost ? "1" : "0");
      formData.append("shipping_cost", String(data.shippingCost));
      formData.append("shipping_location", data.shippingLocation);

      // Status
      formData.append("is_active", data.isActive ? "1" : "0");

      // SEO
      formData.append("seo_title", data.seoTitle);
      formData.append("seo_slug", data.slug);
      formData.append("seo_keywords", data.keywords);
      formData.append("seo_meta_description", data.metaDescription);

      if (Array.isArray(data.metaTags)) {
        data.metaTags.forEach((tag: string, index: number) => {
          formData.append(`seo_meta_tags[${index}]`, tag);
        });
      }
      if (Array.isArray(data.tags)) {
        data.tags.forEach((tag: string, index: number) => {
          formData.append(`seo_tags[${index}]`, tag);
        });
      }

      // Labels
      if (Array.isArray(data.labels)) {
        data.labels.forEach((label: number, index: number) => {
          formData.append(`labels[${index}]`, String(label));
        });
      }

      // Media ✅
      if (Array.isArray(data.media)) {
        data.media.forEach((m: any, index: number) => {
          if (m.type) {
            formData.append(`media[${index}][type]`, m.type);
          }
          if (m.upload_by) {
            formData.append(`media[${index}][upload_by]`, m.upload_by);
          }
          if (m.file) {
            formData.append(`media[${index}][file_path]`, m.file); // File object
          }
          if (m.link) {
            formData.append(`media[${index}][link]`, m.link);
          }
        });
      }

      console.log("📤 Sending FormData:", [...formData.entries()]);

      dispatch(createProduct(formData as any)); // send to backend
      setLastSteps(false);
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
          watch={watch}
          errors={errors}
          control={control}
          setValue={setValue}
          allowWholesale={allowWholesale}
          setAllowWholesale={setAllowWholesale}
          freeShipping={freeShipping}
          setFreeShipping={setFreeShipping}
          {...(CurrentFormComponent === ProductInformationForm && {
            categories,
            subCategories,
            childCategories,
          })}
        />

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button
              type="button" // never submit
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Previous
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button" // prevent accidental submit
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                setLastSteps(true);
                onSubmit;
              }}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
