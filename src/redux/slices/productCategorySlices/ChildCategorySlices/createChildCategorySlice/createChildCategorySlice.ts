// src/redux/slices/Product/childCategorySlices/createChildCategorySlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Example: adjust to your real API endpoint
export const createChildCategory = createAsyncThunk(
  "childCategories/create",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product-child-categories`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
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
