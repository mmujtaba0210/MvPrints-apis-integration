// src/redux/slices/Product/childCategorySlices/createChildCategorySlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const createChildCategory = createAsyncThunk(
  "childCategories/create",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/product-child-categories`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.slug?.[0] ||
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const createChildCategorySlice = createSlice({
  name: "createChildCategory",
  initialState: {
    loading: false,
    success: false,
    error: null as null | string,
  },
  reducers: {
    resetCreateChildCategory: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChildCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createChildCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateChildCategory } = createChildCategorySlice.actions;

export default createChildCategorySlice.reducer;
