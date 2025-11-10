// src/redux/slices/productSlices/fetchProductsSlice.ts
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

interface FetchProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: FetchProductsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchPrints",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}admin/products/prints/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data.data || res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
export const fetchDigitalProducts = createAsyncThunk<Product[]>(
  "products/fetchDigital",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}admin/products/digital/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data.data || res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchQuotationProducts = createAsyncThunk<Product[]>(
  "products/fetchQuotation",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}admin/products/quotation/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data.data || res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

const fetchProductsSlice = createSlice({
  name: "fetchProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // prints
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // digital
    builder
      .addCase(fetchDigitalProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDigitalProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchDigitalProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // quotation
    builder
      .addCase(fetchQuotationProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQuotationProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchQuotationProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fetchProductsSlice.reducer;
