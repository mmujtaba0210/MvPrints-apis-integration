import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

interface ProductSEO {
  title: string;
  slug: string;
  keywords: string;
  meta_tags: string[];
  tags: string[];
  meta_description: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  category: string;
  sub_category: string;
  child_category: string;
  brand: string;
  delivery_days: number | null;
  varient: string;
  is_shipping_cost: boolean;
  shipping_cost: string;
  shipping_location: string;
  model: string;
  description: string;
  specification: string;
  refund_policy: string;
  allow_wholesale: boolean;
  price: string;
  discount: string;
  sku: string;
  stock: number;
  is_active: boolean;
  seo: ProductSEO;
  media: any[];
  labels: string[];
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse {
  data: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

interface PaginatedProductsState {
  data: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: PaginatedProductsState = {
  data: [],
  totalPages: 1,
  totalItems: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

// ✅ Paginated Products Fetch Thunk
export const fetchPaginatedProducts = createAsyncThunk<
  PaginatedResponse,
  { page?: number; type?: string },
  { rejectValue: string }
>(
  "products/fetchPaginated",
  async ({ page = 1, type = "prints" }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${BASE_URL}admin/products/pagination/${type}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      return {
        data: res.data.data.records || [],
        totalPages: res.data.totalPages || 1,
        totalItems: res.data.totalItems || 0,
        currentPage: res.data.currentPage || page,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch paginated products"
      );
    }
  }
);

const paginatedProductsSlice = createSlice({
  name: "paginatedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPaginatedProducts.fulfilled,
        (state, action: PayloadAction<PaginatedResponse>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchPaginatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching paginated products";
      });
  },
});

export default paginatedProductsSlice.reducer;
