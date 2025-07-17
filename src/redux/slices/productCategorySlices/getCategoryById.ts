import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
  id: number;
  name: string;
  title: string;
  meta_tag: string[];
  meta_description: string;
  ordering: number;
  status: number;
  featured_bit: number;
  slug: string;
}

export interface GetCategoryByIdState {
  loading: boolean;
  category: Category | null;
  error: string | null;
}

const initialState: GetCategoryByIdState = {
  loading: false,
  category: null,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const getCategoryById = createAsyncThunk(
  "category/getById",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/product-categories/${id}`); // ✅ adjust to your endpoint
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  }
);

export const getCategoryByIdSlice = createSlice({
  name: "getCategoryById",
  initialState,
  reducers: {
    resetCategory: (state) => {
      state.loading = false;
      state.category = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCategoryById.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.loading = false;
          state.category = action.payload;
        }
      )
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCategory } = getCategoryByIdSlice.actions;

export default getCategoryByIdSlice.reducer;
