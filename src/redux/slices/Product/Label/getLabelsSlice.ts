// redux/slices/label/getLabelsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const getLabels = createAsyncThunk(
  "labels/getAll",
  async ({ page = 1 }: { page?: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${BASE_URL}admin/product-labels/pagination?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data.pagination.last_page);
      return res.data;
    } catch (error: any) {
      return console.log(error.response?.data || "Failed to fetch labels");
    }
  }
);

interface GetLabelsState {
  data: any[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  error: string | null;
}

const initialState: GetLabelsState = {
  data: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
  error: null,
};

const getLabelsSlice = createSlice({
  name: "getLabels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLabels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLabels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.records;
        state.totalPages = action.payload.data.pagination.last_page;
        state.currentPage = action.payload.data.pagination.current_page;
      })
      .addCase(getLabels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getLabelsSlice.reducer;
