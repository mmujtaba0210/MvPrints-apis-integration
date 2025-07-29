// fetchChildCategorySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChildCategories = createAsyncThunk(
  "childCategories/fetch",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/child-categories?page=${page}&limit=${limit}`
    );
    return response.data; // Should be { data: [], total: number }
  }
);

const fetchChildCategorySlice = createSlice({
  name: "childCategories",
  initialState: {
    childCategories: [],
    total: 0,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChildCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.childCategories = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchChildCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default fetchChildCategorySlice.reducer;
