"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";

// Step components
import StepProductInformation from "./steps/StepProductInformation";
import StepProductIdentifiers from "./steps/StepProductIdentifiers";
import StepPricing from "./steps/StepPricing";
import StepProductVariation from "./steps/StepProductVariation";
import StepProductDetails from "./steps/StepProductDetails";
import StepMedia from "./steps/StepMedia";
import StepShipping from "./steps/StepShipping";
import StepSEO from "./steps/StepSEO";
import { createProduct } from "@/redux/slices/productSlices/createProductSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateProduct } from "@/redux/slices/productSlices/updateProductSlice";
import { fetchPaginatedProducts } from "@/redux/slices/productSlices/paginationProductSlice";

interface MediaItem {
  type?: string;
  upload_by?: string;
}

interface AttributeOption {
  value: string;
  price: number;
  price_type: string;
}

interface Attribute {
  id: number;
  options: AttributeOption[];
}

interface Variation {
  name: string;
  quantity: number;
  price: number;
}

interface Wholesale {
  quantity: number;
  price: number;
}

interface ProductPayload {
  name: string;
  slug: string;
  sku: string;
  type: "prints";
  product_category_id: number;
  product_sub_category_id: number;
  product_child_category_id: number;
  product_brand_id: number;
  product_deleivery_time_id: number;
  varient: string;
  is_shipping_cost: number;
  shipping_cost?: number;
  shipping_location: string;
  model: string;
  description: string;
  specification: string;
  refund_policy: string;
  allow_wholesale: number;
  price: number;
  discount?: number;
  stock: number;
  is_active: number;

  seo_title: string;
  seo_slug: string;
  seo_keywords: string;
  seo_meta_tags: string[];
  seo_tags: string[];
  seo_meta_description: string;

  labels: number[];
  media: MediaItem[];
  variations?: Variation[];
  attributions?: Attribute[];
  wholesales?: Wholesale[];
}

interface ProductModalProps {
  open: boolean;
  mode: string;
  onClose: () => void;
  initialValues?: any;
  isEditMode?: boolean;
}

const steps = [
  "Product Information",
  "Product Identifiers",
  "Pricing",
  "Product Variation",
  "Product Details",
  "Media",
  "Shipping",
  "SEO",
];

export default function ProductModal({
  open,
  onClose,
  mode,
  initialValues,
}: ProductModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      slug: "",
      category: "",
      price: "",
      stock: "",
      brand: "",
      brandId: "",
      shipping_cost: "",
      seo: { title: "", keywords: "", meta_description: "" },
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      slug: Yup.string().required("Slug is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formattedData: ProductPayload = {
          name: values.name,
          slug: values.slug,
          type: "prints",
          product_category_id: values.product_category_id,
          product_sub_category_id: values.sub_category_id,
          product_child_category_id: values.child_category_id,
          product_brand_id: values.brandId,
          product_deleivery_time_id: values.delivery_time,
          varient: values.varient,
          is_shipping_cost: values.is_shipping_cost ? 1 : 0,
          shipping_cost: values.shipping_cost,
          shipping_location: values.shipping_location,
          model: values.model,
          description: values.description,
          specification: values.specification,
          refund_policy: values.refund_policy,
          allow_wholesale: values.allow_wholesale ? 1 : 0,
          price: values.price,
          discount: values.discount,
          sku: values.sku,
          stock: values.stock,
          is_active: values.is_active ? 1 : 0,
          seo_title: values.seo?.title || "",
          seo_slug: values.seo?.slug || "",
          seo_keywords: values.seo?.keywords || "",
          seo_meta_tags: values.seo?.meta_tags || [],
          seo_tags: values.seo?.tags || [],
          seo_meta_description: values.seo?.meta_description || "",
          labels: values.label_id || [],
          media:
            values.media?.map((item: any) => ({
              type: item.type,
              upload_by: item.upload_by,
              file: item.file,
            })) || [],
          variations:
            values.variations?.map((v: any) => ({
              name: v.name,
              quantity: v.quantity.toString(),
              price: v.price.toString(),
            })) || [],
          attributions:
            values.selectedAttributes?.map((attr: any) => ({
              id: attr.id.toString(),
              options: attr.values.map((v: any) => ({
                value: v.value,
                price: v.price.toString(),
                price_type: v.priceType,
              })),
            })) || [],
          wholesales:
            values.wholesales?.map((w: any) => ({
              quantity: w.quantity.toString(),
              price: w.price.toString(),
            })) || [],
        };

        // ✅ Dispatch add/update and wait for it to complete
        if (mode === "add") {
          await dispatch(createProduct(formattedData)).unwrap();
        } else {
          await dispatch(
            updateProduct({ id: initialValues.id, ...formattedData })
          ).unwrap();
        }

        // ✅ Re-fetch all products after success
        dispatch(fetchPaginatedProducts({ page: 1, type: "prints" }));

        // ✅ Reset form & close modal
        formik.resetForm();
        onClose();

        // Optional toast
      } catch (error) {
        console.error(error);
      }
    },
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const isLastStep = currentStep === steps.length - 1;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepProductInformation
            formik={formik}
            initialValues={initialValues}
          />
        );
      case 1:
        return <StepProductIdentifiers formik={formik} />;
      case 2:
        return <StepPricing formik={formik} />;
      case 3:
        return <StepProductVariation formik={formik} />;
      case 4:
        return <StepProductDetails formik={formik} />;
      case 5:
        return <StepMedia formik={formik} />;
      case 6:
        return <StepShipping formik={formik} />;
      case 7:
        return <StepSEO formik={formik} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className="max-w-6xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {mode === "edit" ? "Update Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        {/* Step Progress Info */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}:{" "}
              <span className="font-semibold">{steps[currentStep]}</span>
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="">{renderStep()}</Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {isLastStep ? (
            <Button onClick={() => formik.handleSubmit()}>
              {mode === "add" ? "Add Product" : "Update Product"}
            </Button>
          ) : (
            <Button variant={"primary"} onClick={nextStep}>
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
