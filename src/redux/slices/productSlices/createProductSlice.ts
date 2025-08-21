// src/redux/slices/product/createProductSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductPayload {
  name: string;
  slug: string;
  sku: string;
  type: string;
  product_category_id: number;
  product_sub_category_id: number;
  product_child_category_id: number;
  product_brand_id: number;
  product_deleivery_time_id: number;
  varient: string;
  is_shipping_cost: number;
  shipping_cost: number;
  shipping_location: string;
  model: string;
  description: string;
  specification: string;
  refund_policy: string;
  allow_wholesale: number;
  price: number;
  discount: number;
  stock: number;
  is_active: number;
  seo_title: string;
  seo_slug: string;
  seo_keywords: string;
  seo_meta_tags: string[];
  seo_tags: string[];
  seo_meta_description: string;
  labels: number[];
  media: {
    type?: string;
    upload_by?: string;
  }[];
}

interface ProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: any | null;
}

// Initial state
const initialState: ProductState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const createProduct = createAsyncThunk<
  any, // Response type
  ProductPayload, // Argument type
  { rejectValue: string }
>("product/create", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}admin/products`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || { message: "Failed to create product" }
    );
  }
});

// Slice
const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    resetCreateProduct: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateProduct } = createProductSlice.actions;
export default createProductSlice.reducer;
