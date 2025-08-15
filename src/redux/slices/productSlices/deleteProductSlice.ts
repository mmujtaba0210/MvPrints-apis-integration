// src/redux/slices/productSlices/deleteProductSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

interface DeleteProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteProductState = {
  loading: false,
  success: false,
  error: null,
};

export const deleteProduct = createAsyncThunk<number, number>(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    resetDeleteState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteState } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
