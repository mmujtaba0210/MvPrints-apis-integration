// getCategoriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// -------------------- Interfaces --------------------
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
  categories: Category[]; // paginated
  allCategories: Category[]; // full list
  error: string | null;
  totalPages: number;
}

// -------------------- Initial State --------------------
const initialState: GetCategoriesState = {
  loading: false,
  categories: [],
  allCategories: [],
  error: null,
  totalPages: 1,
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

// -------------------- Thunks --------------------

// ✅ Get all categories without pagination
export const getAllCategories = createAsyncThunk(
  "categories/getAllWithoutPagination",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}admin/product-categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.data; // Category[]
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all categories"
      );
    }
  }
);

// ✅ Get categories with pagination
export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}admin/product-categories/pagination?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data = response.data.data;

      return {
        categories: data.records,
        totalPages: data.pagination?.last_page || 1,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// -------------------- Slice --------------------
export const getCategoriesSlice = createSlice({
  name: "getCategories",
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.loading = false;
      state.categories = [];
      state.allCategories = [];
      state.error = null;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    // --- Paginated categories ---
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCategories.fulfilled,
        (
          state,
          action: PayloadAction<{ categories: Category[]; totalPages: number }>
        ) => {
          state.loading = false;
          state.categories = action.payload.categories;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- All categories without pagination ---
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.allCategories = action.payload;
        }
      )
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// -------------------- Exports --------------------
export const { resetCategories } = getCategoriesSlice.actions;
export default getCategoriesSlice.reducer;
