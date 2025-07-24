import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSubCategory {
  id: number;
  name: string;
  status: number;
  slug: string;
  product_category_id: number;
}

interface GetAllProductSubCategoriesState {
  loading: boolean;
  subCategories: ProductSubCategory[];
  error: string | null;
}

const initialState: GetAllProductSubCategoriesState = {
  loading: false,
  subCategories: [],
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const getAllProductSubCategories = createAsyncThunk(
  "productSubCategory/getAll",
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
      return response.data.data; // Should be an array of subcategories
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProductSubCategories.fulfilled,
        (state, action: PayloadAction<ProductSubCategory[]>) => {
          state.loading = false;
          state.subCategories = action.payload;
        }
      )
      .addCase(getAllProductSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getAllProductSubCategoriesSlice.reducer;
