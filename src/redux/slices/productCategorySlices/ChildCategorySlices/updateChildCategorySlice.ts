import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateChildCategory = createAsyncThunk(
  "childCategories/update",
  async (
    { id, payload }: { id: string; payload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/product-child-categories/${id}`,
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

const updateChildCategorySlice = createSlice({
  name: "updateChildCategory",
  initialState: {
    loading: false,
    success: false,
    error: null as string | null,
  },
  reducers: {
    resetUpdateChildCategory: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateChildCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateChildCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateChildCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateChildCategory } = updateChildCategorySlice.actions;

export default updateChildCategorySlice.reducer;
