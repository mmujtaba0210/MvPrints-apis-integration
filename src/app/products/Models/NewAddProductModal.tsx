"use client";

import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchBrands } from "@/redux/slices/Product/productBrandSlice/fetchBrandsSlice";
import { getAllDeliveryTimes } from "@/redux/slices/Product/DeliveryTime/getAllDeliveryTimesSlice";
import { getAllCategories } from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import { getAllSubCategoriesWithoutPagination } from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import { fetchChildCategories } from "@/redux/slices/productCategorySlices/ChildCategorySlices/fetchChildCategorySlice";

// ────────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────────
interface ProductFormDataUI {
  name: string;
  slug: string;
  sku: string;
  type: string;
  product_category_id: string;
  product_sub_category_id: string;
  product_child_category_id: string;
  product_brand_id: string;
  product_deleivery_time_id: string;
  varient: string;
  is_shipping_cost: string; // "0" | "1"
  shipping_cost: string;
  shipping_location: string; // free text to allow "Pakistan"
  model: string;
  description: string;
  specification: string;
  refund_policy: string;
  allow_wholesale: boolean; // UI boolean -> payload 0/1
  price: string;
  discount: string;
  stock: string;
  is_active: boolean; // UI boolean -> payload 0/1
  seo_title: string;
  seo_slug: string;
  seo_keywords: string; // Comma separated or free text
  seo_meta_tags: string; // Comma separated
  seo_tags: string; // Comma separated
  seo_meta_description: string;
  labels: string; // Comma separated (e.g., "1,2")
}

interface MediaItem {
  type?: "is_featured" | "gallery" | "pdf" | "video" | "";
  upload_by?: "upload_by_file" | "upload_by_url" | "";
  file?: File | null;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  // We pass the final backend-ready payload object to onSave
  onSave: (data: any) => void;
  initialData?: Partial<ProductFormDataUI>;
}

// ────────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────────
const NewAddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { allCategories = [] } = useSelector(
    (state: RootState) => state.getAllCategories || {}
  );
  const { subCategories = [] } = useSelector(
    (state: RootState) => state.getAllProductSubCategories || {}
  );
  const { childCategories = [] } = useSelector(
    (state: RootState) => state.fetchChildCategories || {}
  );
  const { brands = [] } = useSelector(
    (state: RootState) => state.fetchBrands || {}
  );
  const { deliveryTimes = [] } = useSelector(
    (state: RootState) => state.getAllDeliveryTimes || {}
  );

  // Default values pre-filled EXACTLY as requested
  const defaultValues: ProductFormDataUI = {
    name: "Smart LED TV11111178",
    slug: "smart-led-tv-1233322111111",
    sku: "TV-20125333111111",
    type: "Prints",
    product_category_id: "1",
    product_sub_category_id: "2",
    product_child_category_id: "3",
    product_brand_id: "2",
    product_deleivery_time_id: "1",
    varient: "per_item",
    is_shipping_cost: "1",
    shipping_cost: "1000",
    shipping_location: "Pakistan",
    model: "TX-2000",
    description: "Nice LED TV",
    specification: "Full HD, 55 inch",
    refund_policy: "7 days return",
    allow_wholesale: false, // 0
    price: "50000",
    discount: "5000",
    stock: "100",
    is_active: true, // 1
    seo_title: "SEO title",
    seo_slug: "SEO slug",
    seo_keywords: "SEO keyword",
    seo_meta_tags: "SeoMetaTag1,SeoMetaTag2",
    seo_tags: "SeoTag1,SeoTag2",
    seo_meta_description: "SEO meta description here",
    labels: "1,2",
  };

  const [formData, setFormData] = useState<ProductFormDataUI>({
    ...defaultValues,
    ...(initialData || {}),
  });

  // Media rows pre-populated to match the required indexes & fields
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { type: "is_featured", file: null }, // media[0][type]
    { type: "gallery", file: null }, // media[1][type]
    { type: "gallery", file: null }, // media[2][type]
    { upload_by: "upload_by_file", file: null }, // media[3][upload_by]
    { type: "pdf", file: null }, // media[4][type]
    { type: "video", file: null }, // media[5][type]
  ]);

  // ────────────────────────────────────────────────────────────────────────────
  // Effects: load dropdown data when opened
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      dispatch(getAllCategories());
      dispatch(getAllSubCategoriesWithoutPagination());
      dispatch(fetchChildCategories(1)); // initial page or default
      dispatch(fetchBrands(1));
      dispatch(getAllDeliveryTimes(1));
    }
  }, [isOpen, dispatch]);

  // ────────────────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────────────────
  const handleChange = (
    field: keyof ProductFormDataUI,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value } as ProductFormDataUI));
  };

  const splitCSV = (val: string) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const toNumberOrString = (v: string) => {
    if (v === "" || v === null || v === undefined) return v;
    const n = Number(v);
    return Number.isNaN(n) ? v : n;
  };

  const handleMediaTypeChange = (idx: number, value: MediaItem["type"]) => {
    setMediaItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], type: value };
      return next;
    });
  };

  const handleMediaUploadByChange = (
    idx: number,
    value: MediaItem["upload_by"]
  ) => {
    setMediaItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], upload_by: value };
      return next;
    });
  };

  const handleMediaFileChange = (
    idx: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    setMediaItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], file };
      return next;
    });
  };

  const payload = useMemo(() => {
    // Build the EXACT backend payload shape requested
    return {
      name: formData.name,
      slug: formData.slug,
      sku: formData.sku,
      type: formData.type,
      product_category_id: toNumberOrString(formData.product_category_id),
      product_sub_category_id: toNumberOrString(
        formData.product_sub_category_id
      ),
      product_child_category_id: toNumberOrString(
        formData.product_child_category_id
      ),
      product_brand_id: toNumberOrString(formData.product_brand_id),
      product_deleivery_time_id: toNumberOrString(
        formData.product_deleivery_time_id
      ),
      varient: formData.varient,
      is_shipping_cost: Number(formData.is_shipping_cost), // 0/1
      shipping_cost: toNumberOrString(formData.shipping_cost),
      shipping_location: formData.shipping_location,
      model: formData.model,
      description: formData.description,
      specification: formData.specification,
      refund_policy: formData.refund_policy,
      allow_wholesale: formData.allow_wholesale ? 1 : 0, // 0/1
      price: toNumberOrString(formData.price),
      discount: toNumberOrString(formData.discount),
      stock: toNumberOrString(formData.stock),
      is_active: formData.is_active ? 1 : 0, // 0/1
      seo_title: formData.seo_title,
      seo_slug: formData.seo_slug,
      seo_keywords: formData.seo_keywords,
      seo_meta_tags: splitCSV(formData.seo_meta_tags), // => ["SeoMetaTag1","SeoMetaTag2"]
      seo_tags: splitCSV(formData.seo_tags), // => ["SeoTag1","SeoTag2"]
      seo_meta_description: formData.seo_meta_description,
      labels: splitCSV(formData.labels).map((x) => {
        const n = Number(x);
        return Number.isNaN(n) ? x : n; // keep numeric labels as numbers
      }), // => [1,2]
      media: mediaItems.map((m) => {
        // Construct payload objects per item. Only include keys that exist.
        const base: any = {};
        if (m.type) base.type = m.type;
        if (m.upload_by) base.upload_by = m.upload_by;
        if (m.file) base.file = m.file; // File object if provided
        return base;
      }),
    };
  }, [formData, mediaItems]);

  const handleSave = () => {
    onSave(payload);
  };

  if (!isOpen) return null;

  // Simple card section wrapper
  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </div>
  );

  const inputCls =
    "border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-gray-200";
  const selectCls = inputCls;
  const textAreaCls =
    "border p-2 rounded-md w-full min-h-[90px] outline-none focus:ring-2 focus:ring-gray-200";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-50 w-full max-w-5xl p-6 rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Close
          </button>
        </div>

        {/* Grid layout for sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Product Details */}
          <Section title="Product Details">
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputCls}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className={inputCls}
              />
              <input
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className={selectCls}
              >
                <option value="">Select Type</option>
                <option value="Prints">Prints</option>
                <option value="Digital">Digital</option>
                <option value="Used">Used</option>
              </select>
              <select
                value={formData.varient}
                onChange={(e) => handleChange("varient", e.target.value)}
                className={selectCls}
              >
                <option value="">Select Variant</option>
                <option value="per_item">per_item</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={formData.product_category_id}
                onChange={(e) =>
                  handleChange("product_category_id", e.target.value)
                }
                className={selectCls}
              >
                <option value="">Select Category</option>
                {allCategories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={formData.product_sub_category_id}
                onChange={(e) =>
                  handleChange("product_sub_category_id", e.target.value)
                }
                className={selectCls}
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((sub: any) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={formData.product_child_category_id}
                onChange={(e) =>
                  handleChange("product_child_category_id", e.target.value)
                }
                className={selectCls}
              >
                <option value="">Select Child Category</option>
                {childCategories.map((child: any) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
              <select
                value={formData.product_brand_id}
                onChange={(e) =>
                  handleChange("product_brand_id", e.target.value)
                }
                className={selectCls}
              >
                <option value="">Select Brand</option>
                {brands.map((brand: any) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              placeholder="Model"
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              className={inputCls}
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                placeholder="Price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className={inputCls}
              />
              <input
                placeholder="Discount"
                value={formData.discount}
                onChange={(e) => handleChange("discount", e.target.value)}
                className={inputCls}
              />
              <input
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                className={inputCls}
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.allow_wholesale}
                  onChange={(e) =>
                    handleChange("allow_wholesale", e.target.checked)
                  }
                />
                <span>Allow Wholesale (0/1)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => handleChange("is_active", e.target.checked)}
                />
                <span>Active (0/1)</span>
              </label>
            </div>
          </Section>

          {/* Shipping & Delivery */}
          <Section title="Shipping & Delivery">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={formData.is_shipping_cost}
                onChange={(e) =>
                  handleChange("is_shipping_cost", e.target.value)
                }
                className={selectCls}
              >
                <option value="0">No Shipping Cost</option>
                <option value="1">Has Shipping Cost</option>
              </select>
              <input
                placeholder="Shipping Cost"
                value={formData.shipping_cost}
                onChange={(e) => handleChange("shipping_cost", e.target.value)}
                className={inputCls}
              />
            </div>
            <input
              placeholder="Shipping Location (e.g., Pakistan)"
              value={formData.shipping_location}
              onChange={(e) =>
                handleChange("shipping_location", e.target.value)
              }
              className={inputCls}
            />
            <select
              value={formData.product_deleivery_time_id}
              onChange={(e) =>
                handleChange("product_deleivery_time_id", e.target.value)
              }
              className={selectCls}
            >
              <option value="">Select Delivery Time</option>
              {deliveryTimes.map((dt: any) => (
                <option key={dt.id} value={dt.id}>
                  {dt.name || dt.title || `#${dt.id}`}
                </option>
              ))}
            </select>
          </Section>

          {/* Descriptions */}
          <Section title="Descriptions">
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={textAreaCls}
            />
            <textarea
              placeholder="Specification"
              value={formData.specification}
              onChange={(e) => handleChange("specification", e.target.value)}
              className={textAreaCls}
            />
            <textarea
              placeholder="Refund Policy"
              value={formData.refund_policy}
              onChange={(e) => handleChange("refund_policy", e.target.value)}
              className={textAreaCls}
            />
          </Section>

          {/* SEO */}
          <Section title="SEO">
            <input
              placeholder="SEO Title"
              value={formData.seo_title}
              onChange={(e) => handleChange("seo_title", e.target.value)}
              className={inputCls}
            />
            <input
              placeholder="SEO Slug"
              value={formData.seo_slug}
              onChange={(e) => handleChange("seo_slug", e.target.value)}
              className={inputCls}
            />
            <textarea
              placeholder="SEO Meta Description"
              value={formData.seo_meta_description}
              onChange={(e) =>
                handleChange("seo_meta_description", e.target.value)
              }
              className={textAreaCls}
            />
            <input
              placeholder="SEO Keywords (comma separated)"
              value={formData.seo_keywords}
              onChange={(e) => handleChange("seo_keywords", e.target.value)}
              className={inputCls}
            />
            <input
              placeholder="SEO Meta Tags (comma separated)"
              value={formData.seo_meta_tags}
              onChange={(e) => handleChange("seo_meta_tags", e.target.value)}
              className={inputCls}
            />
            <input
              placeholder="SEO Tags (comma separated)"
              value={formData.seo_tags}
              onChange={(e) => handleChange("seo_tags", e.target.value)}
              className={inputCls}
            />
            <input
              placeholder="Labels (comma separated, e.g., 1,2)"
              value={formData.labels}
              onChange={(e) => handleChange("labels", e.target.value)}
              className={inputCls}
            />
          </Section>

          {/* Media Manager */}
          <Section title="Media">
            <div className="space-y-3">
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center bg-gray-100 rounded-xl p-3"
                >
                  <div className="font-medium">Media[{idx}]</div>

                  <select
                    value={item.type || ""}
                    onChange={(e) =>
                      handleMediaTypeChange(
                        idx,
                        e.target.value as MediaItem["type"]
                      )
                    }
                    className={selectCls}
                  >
                    <option value="">(no type)</option>
                    <option value="is_featured">is_featured</option>
                    <option value="gallery">gallery</option>
                    <option value="pdf">pdf</option>
                    <option value="video">video</option>
                  </select>

                  <select
                    value={item.upload_by || ""}
                    onChange={(e) =>
                      handleMediaUploadByChange(
                        idx,
                        e.target.value as MediaItem["upload_by"]
                      )
                    }
                    className={selectCls}
                  >
                    <option value="">(no upload_by)</option>
                    <option value="upload_by_file">upload_by_file</option>
                    <option value="upload_by_url">upload_by_url</option>
                  </select>

                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      onChange={(e) => handleMediaFileChange(idx, e)}
                      className="block"
                    />
                    {item.file &&
                      item.type !== "pdf" &&
                      item.type !== "video" && (
                        // preview only for images
                        <img
                          src={URL.createObjectURL(item.file)}
                          alt={`preview-${idx}`}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                    {item.file &&
                      (item.type === "pdf" || item.type === "video") && (
                        <span className="text-sm text-gray-700 truncate">
                          {item.file.name}
                        </span>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {initialData ? "Update Product" : "Save Product"}
          </button>
        </div>

        {/* Debug (optional): show payload snapshot */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-600">
            Preview payload
          </summary>
          <pre className="text-xs bg-white p-3 rounded-lg overflow-x-auto border mt-2">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default NewAddProductModal;
