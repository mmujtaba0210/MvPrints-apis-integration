import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UpdateProductPayload {
  id: number | string;
  name: string;
  type: string;
  price: string;
  description: string;
  specification: string;
  return_policy: string;
  product_category_id: number;
  product_sub_category_id: number;
  product_child_category_id: number;
  label_ids: number[];
}

export interface Product {
  id: number;
  name: string;
  type: string;
  price: string;
  description: string;
  specification: string;
  return_policy: string;
  product_category_id: number;
  product_sub_category_id: number;
  product_child_category_id: number;
  label_ids: number[];
  // Add more if you get extra fields back
}

export interface UpdateProductState {
  loading: boolean;
  success: boolean;
  product: Product | null;
  error: string | null;
}

const initialState: UpdateProductState = {
  loading: false,
  success: false,
  product: null,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload: UpdateProductPayload, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = payload;
      const response = await axios.put(
        `${BASE_URL}/products/${id}`,
        updateData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateProduct: (state) => {
      state.loading = false;
      state.success = false;
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.success = true;
          state.product = action.payload;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateProduct } = updateProductSlice.actions;

export default updateProductSlice.reducer;
