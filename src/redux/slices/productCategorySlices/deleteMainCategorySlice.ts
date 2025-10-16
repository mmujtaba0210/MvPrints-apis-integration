import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteMainCategory = createAsyncThunk(
  "mainCategories/delete",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/product-categories/${id}`,
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

const deleteMainCategorySlice = createSlice({
  name: "deleteMainCategory",
  initialState: {
    loading: false,
    success: false,
    error: null as null | string,
  },
  reducers: {
    resetDeleteMainCategory: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteMainCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteMainCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteMainCategory } = deleteMainCategorySlice.actions;

export default deleteMainCategorySlice.reducer;
