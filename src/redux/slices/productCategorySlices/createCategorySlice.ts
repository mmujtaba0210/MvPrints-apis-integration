import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CreateCategoryPayload {
  name: string;
  title: string;
  meta_tag: string[]; // API expects array syntax
  meta_description: string;
  ordering: number;
  status: number;
  featured_bit: number;
  slug: string;
}

export interface CreateCategoryState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CreateCategoryState = {
  loading: false,
  success: false,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
// Async thunk
export const createCategory = createAsyncThunk(
  "category/create",
  async (data: CreateCategoryPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("title", data.title);

      // API syntax for arrays: meta_tag[0], meta_tag[1], ...
      data.meta_tag.forEach((tag, index) =>
        formData.append(`meta_tag[${index}]`, tag)
      );

      formData.append("meta_description", data.meta_description);
      formData.append("ordering", data.ordering.toString());
      formData.append("status", data.status.toString());
      formData.append("featured_bit", data.featured_bit.toString());
      formData.append("slug", data.slug);

      const response = await axios.post(
        `${BASE_URL}admin/product-categories`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const createCategorySlice = createSlice({
  name: "createCategory",
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
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = createCategorySlice.actions;

export default createCategorySlice.reducer;
