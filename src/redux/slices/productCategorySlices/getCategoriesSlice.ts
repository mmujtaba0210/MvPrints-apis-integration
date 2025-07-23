import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Adjust to match your backend’s category object structure
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

export interface GetCategoriesState {
  loading: boolean;
  categories: any;
  error: string | null;
}

const initialState: GetCategoriesState = {
  loading: false,
  categories: [],
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}admin/product-categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("response", response);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const getCategoriesSlice = createSlice({
  name: "getCategories",
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.loading = false;
      state.categories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCategories } = getCategoriesSlice.actions;

export default getCategoriesSlice.reducer;
