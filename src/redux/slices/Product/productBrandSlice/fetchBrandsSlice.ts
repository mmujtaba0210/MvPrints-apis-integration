// src/redux/slices/brand/fetchBrandsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface Brand {
  id: number;
  name: string;
  file_path: string;
  meta_title: string;
  meta_description: string;
}

interface FetchBrandsState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: FetchBrandsState = {
  brands: [],
  loading: false,
  error: null,
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}admin/product-brands`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch brands");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const fetchBrandsSlice = createSlice({
  name: "fetchBrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fetchBrandsSlice.reducer;
