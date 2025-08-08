import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UpdateSubCategoryPayload {
  id: number; // subcategory ID
  name: string;
  slug: string;
  status: number;
  product_category_id: number;
}
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const updateProductSubCategory = createAsyncThunk(
  "productSubCategory/update",
  async (payload: UpdateSubCategoryPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/product-sub-categories/${payload.id}`,
        {
          name: payload.name,
          slug: payload.slug,
          status: payload.status,
          product_category_id: payload.product_category_id,
          _method: "PUT",
        },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("accessToken") || ""
            }`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update subcategory"
      );
    }
  }
);

interface UpdateSubCategoryState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UpdateSubCategoryState = {
  loading: false,
  error: null,
  success: false,
};

const updateSubCategorySlice = createSlice({
  name: "updateSubCategory",
  initialState,
  reducers: {
    resetUpdateSubCategoryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProductSubCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProductSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateSubCategoryState } = updateSubCategorySlice.actions;
export default updateSubCategorySlice.reducer;
