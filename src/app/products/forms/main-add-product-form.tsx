"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { createProduct } from "@/redux/slices/productSlices/createProductSlice";
import { updateProduct } from "@/redux/slices/productSlices/updateProductSlice";
import { toast } from "react-toastify";
import { ProductInformationForm } from "./components/ProductInformationForm";
import { ProductIdentifiersForm } from "./components/ProductIdentifiersForm";
import { PricingForm } from "./components/PricingForm";
import { ProductVariationForm } from "./components/ProductVariationForm";
import { ProductDetailsForm } from "../components/other/ProductDetailsForm";
import { MediaForm } from "./components/mediaForm";
import { ShippingForm } from "./components/ShippingForm";
import { SEOForm } from "./components/SeoForm";
import { fetchProducts } from "@/redux/slices/productSlices/getAllProductsSlice";

export const AddProductForm = ({
  mode = "add", // 'add' or 'update'
  defaultValues = {},
  onSuccess,
  onClose,
}: {
  mode?: "add" | "update";
  defaultValues?: any;
  onSuccess?: () => void;
  onClose?: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Step navigation state
  const [currentStep, setCurrentStep] = useState(0);
  const [allowWholesale, setAllowWholesale] = useState(
    defaultValues.allowWholesale || false
  );
  const [freeShipping, setFreeShipping] = useState(
    defaultValues.is_shipping_cost === 0 || false
  );

  // ✅ Initialize React Hook Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // ✅ Step configuration
  const steps = [
    {
      title: "Product Information",
      component: (
        <ProductInformationForm
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      ),
    },
    {
      title: "Product Identifiers",
      component: (
        <ProductIdentifiersForm
          setValue={setValue}
          register={register}
          errors={errors}
          watch={watch}
        />
      ),
    },
    {
      title: "Pricing",
      component: (
        <PricingForm
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          allowWholesale={allowWholesale}
          setAllowWholesale={setAllowWholesale}
        />
      ),
    },
    {
      title: "Product Variation",
      component: (
        <ProductVariationForm
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      ),
    },
    {
      title: "Product Details",
      component: <ProductDetailsForm register={register} errors={errors} />,
    },
    {
      title: "Media",
      component: (
        <MediaForm
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      ),
    },
    {
      title: "Shipping",
      component: (
        <ShippingForm
          register={register}
          errors={errors}
          freeShipping={freeShipping}
          setFreeShipping={setFreeShipping}
        />
      ),
    },
    {
      title: "SEO",
      component: <SEOForm register={register} errors={errors} />,
    },
  ];

  // ✅ Step Navigation
  const nextStep = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: any) => {
    console.log("data before", data);

    try {
      // ✅ Convert keywords and tags only if they are strings
      if (data.seo) {
        if (typeof data.seo.keywords === "string") {
          data.seo.keywords = data.seo.keywords
            .split(",")
            .map((k: string) => k.trim())
            .filter(Boolean);
        }

        if (typeof data.seo.tags === "string") {
          data.seo.tags = data.seo.tags
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean);
        }
      }

      const formData = new FormData();

      // 🟩 Basic product info
      formData.append("name", data.name || "");
      formData.append(
        "slug",
        data.seo_slug ||
          data.slug ||
          Math.random().toString(36).substring(2, 15)
      );
      formData.append("type", data.type || "");
      formData.append("model", data.model || "");
      formData.append("description", data.description || "");
      formData.append("specification", data.specification || "");
      formData.append("refund_policy", data.refund_policy || "");

      // 🟩 Category & Brand (fix for update mode where field names differ)
      formData.append(
        "product_category_id",
        String(data.product_category_id || data.category || "")
      );
      formData.append(
        "product_sub_category_id",
        String(data.product_sub_category_id || data.sub_category || "")
      );
      formData.append(
        "product_child_category_id",
        String(data.product_child_category_id || data.child_category || "")
      );
      formData.append(
        "product_brand_id",
        String(data.product_brand_id || data.brand || "")
      );
      formData.append(
        "product_deleivery_time_id",
        String(data.product_deleivery_time_id || data.delivery_days || "")
      );

      // 🟩 Pricing & Variant
      formData.append("varient", data.varient || "");
      formData.append("allow_wholesale", data.allowWholesale ? "1" : "0");
      formData.append("price", String(data.price || ""));
      formData.append("discount", String(data.discount || ""));
      formData.append("sku", data.sku || "");
      formData.append("stock", String(data.stock || ""));

      // 🟩 Shipping
      formData.append("is_shipping_cost", data.isShippingCost ? "1" : "0");
      formData.append("shipping_cost", String(data.shipping_cost || 0));
      formData.append("shipping_location", data.shipping_location || "");

      // 🟩 Status
      formData.append("is_active", data.isActive ? "1" : "0");

      // 🟩 SEO
      formData.append("seo_title", data.seo.title || "");
      formData.append("seo_slug", data.seo_slug || "");
      formData.append(
        "seo_keywords",
        Array.isArray(data.seo.keywords)
          ? data.seo.keywords.join(",")
          : data.seo.keywords || ""
      );
      formData.append("seo_meta_description", data.seo.meta_description || "");

      if (Array.isArray(data.seo.meta_tags)) {
        data.seo.meta_tags.forEach((tag: string, index: number) => {
          formData.append(`seo_meta_tags[${index}]`, tag);
        });
      }

      if (Array.isArray(data.seo.tags)) {
        data.seo.tags.forEach((tag: string, index: number) => {
          formData.append(`seo_tags[${index}]`, tag);
        });
      }

      // 🟩 Labels
      if (Array.isArray(data.labels)) {
        data.labels.forEach((label: number, index: number) => {
          formData.append(`labels[${index}]`, String(label));
        });
      }

      // 🟩 Media (with video support)
      if (Array.isArray(data.media)) {
        data.media.forEach((m: any, index: number) => {
          if (m.type) formData.append(`media[${index}][type]`, m.type);
          if (m.upload_by)
            formData.append(`media[${index}][upload_by]`, m.upload_by);

          const fileToAppend =
            m.file instanceof File
              ? m.file
              : Array.isArray(m.file) && m.file[0] instanceof File
              ? m.file[0]
              : m.file?.file instanceof File
              ? m.file.file
              : null;

          if (fileToAppend)
            formData.append(`media[${index}][file_path]`, fileToAppend);

          if (m.link) formData.append(`media[${index}][link]`, m.link);
        });
      }

      // ✅ Include videos array
      if (Array.isArray(data.videos)) {
        data.videos.forEach((video: any, index: number) => {
          if (video.file instanceof File) {
            formData.append(`videos[${index}][file]`, video.file);
          } else if (video.link) {
            formData.append(`videos[${index}][link]`, video.link);
          }
        });
      }

      // 🟩 Variations → sizes
      if (Array.isArray(data.sizes)) {
        data.sizes.forEach((size: any, index: number) => {
          formData.append(`variations[${index}][name]`, size.name || "");
          formData.append(
            `variations[${index}][quantity]`,
            String(size.qty || 0)
          );
          formData.append(
            `variations[${index}][price]`,
            String(size.price || 0)
          );
        });
      }

      // ✅ Attributes (with values, price, price_type)
      if (Array.isArray(data.attributeValues) && data.selectedAttributeId) {
        formData.append(
          `attributions[0][id]`,
          String(data.selectedAttributeId)
        );

        data.attributeValues.forEach((opt: any, index: number) => {
          formData.append(
            `attributions[0][options][${index}][value]`,
            opt.value
          );
          formData.append(
            `attributions[0][options][${index}][price]`,
            String(opt.price)
          );
          formData.append(
            `attributions[0][options][${index}][price_type]`,
            opt.price_type
          );
        });
      }

      // 🟩 Wholesale
      if (data.allowWholesale) {
        formData.append(
          `wholesales[0][quantity]`,
          String(data.wholesaleQuantity || 0)
        );
        formData.append(
          `wholesales[0][price]`,
          String(data.wholesalePrice || 0)
        );
      }

      console.log("📤 Sending FormData:", [...formData.entries()]);

      // 🟩 Submit to API
      if (mode === "add") {
        await dispatch(createProduct(formData as any)).unwrap();
        dispatch(fetchProducts());
        toast.success("✅ Product created successfully!");
      } else if (mode === "update") {
        formData.append("_method", "PUT");

        await dispatch(
          updateProduct({
            id: data.id,
            updatedData: formData,
          })
        ).unwrap();

        toast.success("✅ Product updated successfully!");
      }

      onSuccess?.();
      onClose?.();
    } catch (error: any) {
      console.error("❌ Update product error:", error);
      toast.error(error?.message || "❌ Something went wrong");
    }
  };

  const current = steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {mode === "add" ? "Add Product" : "Update Product"}
        </h2>
        <p className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}: {current.title}
        </p>
      </div>

      {/* Step Form */}
      <form
        onSubmit={(e) => e.preventDefault()} // ❌ prevent default submit
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault(); // ❌ disable enter submit
        }}
        className="space-y-8"
      >
        {current.component}

        {/* Step Controls */}
        <div className="flex justify-between pt-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Previous
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button" // ✅ ensure only button click triggers
              onClick={handleSubmit(onSubmit)} // ✅ manual trigger
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {mode === "add" ? "Create Product" : "Update Product"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
