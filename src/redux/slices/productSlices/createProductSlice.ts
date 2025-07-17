// src/redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  success: false,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = new FormData();

      // Transform and append fields
      data.append("name", formData.productName);
      data.append("slug", formData.slug);
      data.append("type", formData.listingType || "Prints");
      data.append("product_category_id", formData.category);
      data.append("product_sub_category_id", formData.subCategory);
      data.append("product_child_category_id", formData.childCategory);
      data.append("product_brand_id", formData.manufacturer); // adjust if it's an ID
      data.append("product_deleivery_time_id", formData.deliveryTime);
      data.append("varient", "per_item");
      data.append("shipping_cost", formData.shippingCost);
      data.append("shipping_location", formData.shippingLocation);
      data.append("model", formData.model);
      data.append("description", formData.description);
      data.append("specification", formData.specifications);
      data.append("refund_policy", formData.returnPolicy);
      data.append("allow_wholesale", formData.wholesaleQuantity ? "1" : "0");
      data.append("price", formData.retailPrice);
      data.append("discount", formData.discountAmount);
      data.append("sku", formData.sku);
      data.append("stock", formData.wholesaleQuantity || "0");
      data.append("is_active", "true");
      data.append("seo_title", formData.seoTitle);
      data.append("seo_slug", formData.slug);
      data.append("seo_keywords", formData.keywords);
      data.append("seo_meta_description", formData.metaDescription);

      // ✅ Append metaTags as array
      formData.metaTags
        .split(",")
        .forEach((tag: string, i: number) =>
          data.append(`seo_meta_tags[${i}]`, tag.trim())
        );

      //  Append tags as array
      formData.tags
        .split(",")
        .forEach((tag: string, i: number) =>
          data.append(`seo_tags[${i}]`, tag.trim())
        );

      // Append files
      if (formData.featureImage) {
        data.append("feature_image", formData.featureImage);
      }

      if (formData.additionalFile && formData.additionalFile.length > 0) {
        (Array.from(formData.additionalFile) as File[]).forEach((file) =>
          data.append("additional_files[]", file)
        );
      }

      if (formData.pdfSpecification && formData.pdfSpecification.length > 0) {
        (Array.from(formData.pdfSpecification) as File[]).forEach((file) =>
          data.append("pdf_specification[]", file)
        );
      }

      if (formData.videoUpload && formData.videoUpload.length > 0) {
        (Array.from(formData.videoUpload) as File[]).forEach((file) =>
          data.append("video_upload[]", file)
        );
      }

      //  Make the API request
      const response = await axios.post(`${BASE_URL}products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;
