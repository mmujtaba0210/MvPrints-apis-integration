// src/redux/slices/printAttributes/fetchAttributesSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Attribute {
  id: number;
  title: string;
  options: string[];
  status: string;
}

interface FetchAttributesState {
  attributes: Attribute[];
  loading: boolean;
  error: string | null;
}

const initialState: FetchAttributesState = {
  attributes: [],
  loading: false,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
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
      console.log(response.data.data);
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
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fetchAttributesSlice.reducer;
