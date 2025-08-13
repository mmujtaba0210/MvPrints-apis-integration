import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const getColors = createAsyncThunk(
  "colors/getColors",
  async ({ page }: { page: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${BASE_URL}admin/product-colors/pagination?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        data: res.data.data.records,
        currentPage: res.data.data.pagination.current_page,
        totalPages: res.data.data.pagination.last_page,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

interface ColorsState {
  data: any[];
  loading: boolean;
  error: any;
  currentPage: number;
  totalPages: number;
}

const initialState: ColorsState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const colorsSlice = createSlice({
  name: "getColors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default colorsSlice.reducer;
