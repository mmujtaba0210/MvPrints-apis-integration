// src/redux/slices/Product/productBrandSlice/deleteBrandSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/product-brands/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return {
        id,
        message: response.data.message || "Brand deleted successfully",
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete brand"
      );
    }
  }
);

interface DeleteBrandState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: DeleteBrandState = {
  loading: false,
  error: null,
  successMessage: null,
};

const deleteBrandSlice = createSlice({
  name: "deleteBrand",
  initialState,
  reducers: {
    clearDeleteState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDeleteState } = deleteBrandSlice.actions;
export default deleteBrandSlice.reducer;
