import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.delete(`${BASE_URL}admin/product-colors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

interface DeleteColorState {
  loading: boolean;
  error: unknown | null;
  success: boolean;
}

const initialState: DeleteColorState = {
  loading: false,
  error: null,
  success: false,
};

const deleteColorSlice = createSlice({
  name: "deleteColor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteColor.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteColor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default deleteColorSlice.reducer;
