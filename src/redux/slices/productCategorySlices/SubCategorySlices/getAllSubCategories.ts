import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductSubCategory {
  id: number;
  name: string;
  status: number;
  slug: string;
  product_category_id: number;
  category?: {
    id: number;
    name: string;
  };
}

export interface GetAllProductSubCategoriesState {
  loading: boolean;
  subCategories: ProductSubCategory[];
  error: string | null;
  totalPages: number;
}

const initialState: GetAllProductSubCategoriesState = {
  loading: false,
  subCategories: [],
  error: null,
  totalPages: 1,
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const getAllSubCategoriesWithoutPagination = createAsyncThunk(
  "productSubCategory/getAllWithoutPagination",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}admin/product-sub-categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data.data; // Assuming it's an array of subcategories
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch all product subcategories"
      );
    }
  }
);

//all sub categories
export const getAllProductSubCategories = createAsyncThunk(
  "productSubCategory/getAll",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}admin/product-sub-categories/pagination?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return {
        subCategories: response.data.data.records,
        totalPages: response.data.data.pagination.last_page,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product subcategories"
      );
    }
  }
);

export const getAllProductSubCategoriesSlice = createSlice({
  name: "getAllProductSubCategories",
  initialState,
  reducers: {
    resetSubCategories: (state) => {
      state.loading = false;
      state.subCategories = [];
      state.error = null;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProductSubCategories.fulfilled,
        (
          state,
          action: PayloadAction<{
            subCategories: ProductSubCategory[];
            totalPages: number;
          }>
        ) => {
          state.loading = false;
          state.subCategories = action.payload.subCategories;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(getAllProductSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubCategories } = getAllProductSubCategoriesSlice.actions;

export default getAllProductSubCategoriesSlice.reducer;
