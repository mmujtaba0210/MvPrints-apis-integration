import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteChildCategory = createAsyncThunk(
  "childCategories/delete",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/product-child-categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data; // success response
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to delete";
      return rejectWithValue(errorMessage);
    }
  }
);

const deleteChildCategorySlice = createSlice({
  name: "deleteChildCategory",
  initialState: {
    loading: false,
    success: false,
    error: null as null | string,
  },
  reducers: {
    resetDeleteChildCategory: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChildCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteChildCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteChildCategory } = deleteChildCategorySlice.actions;

export default deleteChildCategorySlice.reducer;
