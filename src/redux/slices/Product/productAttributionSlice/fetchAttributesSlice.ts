// src/redux/slices/printAttributes/fetchAttributesSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Attribute {
  id: number;
  name: string;
  description: string;
  attribution_values: string[];
}

interface FetchAttributesState {
  attributes: Attribute[];
  current_page: number;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: FetchAttributesState = {
  attributes: [],
  current_page: 1,
  total: 1,
  loading: false,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

// Thunk to fetch attributes list
export const fetchAttributesWithPagination = createAsyncThunk(
  "printAttributes/fetchAllWithPagintaion",
  async ({ page = 1 }: { page: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}admin/product-attributions/pagination?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return {
        data: response.data.data.records,
        current_page: response.data.data.pagination.current_page,
        total: response.data.data.pagination.total,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Thunk to fetch attributes list
export const fetchAttributes = createAsyncThunk(
  "printAttributes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}admin/product-attributions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return console.log(error.response?.data || error.message);
    }
  }
);
const fetchAttributesSlice = createSlice({
  name: "fetchAttributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributesWithPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload.data;
        state.current_page = action.payload.current_page;
        state.total = action.payload.total;
        console.log("payload", action.payload);
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fetchAttributesSlice.reducer;
