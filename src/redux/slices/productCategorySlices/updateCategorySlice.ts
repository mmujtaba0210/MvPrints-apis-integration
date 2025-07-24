import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UpdateCategoryPayload {
  id: number;
  name: string;
  title: string;

  ordering: number;
  status: number;

  slug: string;
}

export interface UpdateCategoryState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UpdateCategoryState = {
  loading: false,
  success: false,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: UpdateCategoryPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("title", data.title);

      formData.append("ordering", data.ordering.toString());
      formData.append("status", data.status.toString());

      formData.append("slug", data.slug);
      formData.append("_method", "PUT");

      // typical REST style: PUT or POST with ID in URL
      const response = await axios.post(
        `${BASE_URL}admin/product-categories/${data.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      return console.log(error.response?.data || "Failed to update category");
    }
  }
);

export const updateCategorySlice = createSlice({
  name: "updateCategory",
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
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = updateCategorySlice.actions;

export default updateCategorySlice.reducer;
