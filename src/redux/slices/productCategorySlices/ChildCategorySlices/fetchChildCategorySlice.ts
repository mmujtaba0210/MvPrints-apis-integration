// fetchChildCategorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ChildCategory {
  id: number;
  name: string;
  title: string;
  meta_tag: string[];
  meta_description: string;
  ordering: number;
  status: number;
  featured_bit: number;
  slug: string;
  category_id: number;
}

export interface GetChildCategoriesState {
  loading: boolean;
  childCategories: ChildCategory[];
  error: string | null;
  totalPages: number;
}

const initialState: GetChildCategoriesState = {
  loading: false,
  childCategories: [],
  error: null,
  totalPages: 1,
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const fetchChildCategories = createAsyncThunk(
  "childCategories/fetchAll",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}admin/product-child-categories/pagination?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data = response.data.data;

      return {
        childCategories: data.records,
        totalPages: data.pagination?.last_page || 1,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch child categories"
      );
    }
  }
);

export const fetchChildCategorySlice = createSlice({
  name: "fetchChildCategories",
  initialState,
  reducers: {
    resetChildCategories: (state) => {
      state.loading = false;
      state.childCategories = [];
      state.error = null;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchChildCategories.fulfilled,
        (
          state,
          action: PayloadAction<{
            childCategories: ChildCategory[];
            totalPages: number;
          }>
        ) => {
          state.loading = false;
          state.childCategories = action.payload.childCategories;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchChildCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetChildCategories } = fetchChildCategorySlice.actions;
export default fetchChildCategorySlice.reducer;
