import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteSubCategory = createAsyncThunk(
  "subCategories/delete",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/product-sub-categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to delete";
      return rejectWithValue(errorMessage);
    }
  }
);

const deleteSubCategorySlice = createSlice({
  name: "deleteSubCategory",
  initialState: {
    loading: false,
    success: false,
    error: null as null | string,
  },
  reducers: {
    resetDeleteSubCategory: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteSubCategory } = deleteSubCategorySlice.actions;

export default deleteSubCategorySlice.reducer;
