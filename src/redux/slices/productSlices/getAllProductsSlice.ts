import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  type: string;
  price: string;
  description: string;
  specification: string;
  return_policy: string;
  product_category_id: number;
  product_sub_category_id: number;
  product_child_category_id: number;
  label_ids: number[];
  // Add other fields if your API returns more
}

interface GetAllProductsState {
  loading: boolean;
  products: Product[];
  error: string | null;
}

const initialState: GetAllProductsState = {
  loading: false,
  products: [],
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getAllProductsSlice = createSlice({
  name: "getAllProducts",
  initialState,
  reducers: {
    resetGetAllProducts: (state) => {
      state.loading = false;
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetGetAllProducts } = getAllProductsSlice.actions;

export default getAllProductsSlice.reducer;
