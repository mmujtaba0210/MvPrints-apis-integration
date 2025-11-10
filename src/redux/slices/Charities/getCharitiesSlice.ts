// redux/slices/charity/getCharitiesSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const fetchCharities = createAsyncThunk(
  "charity/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${BASE_URL}admin/charities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch charities"
      );
    }
  }
);

interface GetCharityState {
  loading: boolean;
  error: string | null;
  charities: any[];
}

const initialState: GetCharityState = {
  loading: false,
  error: null,
  charities: [],
};

const getCharitiesSlice = createSlice({
  name: "getCharities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharities.fulfilled, (state, action) => {
        state.loading = false;
        state.charities = action.payload?.data || [];
      })
      .addCase(fetchCharities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getCharitiesSlice.reducer;
