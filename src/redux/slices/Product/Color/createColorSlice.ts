import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const createColor = createAsyncThunk(
  "colors/createColor",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${BASE_URL}admin/product-colors`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

interface CreateColorState {
  loading: boolean;
  error: unknown;
  success: boolean;
}

const initialState: CreateColorState = {
  loading: false,
  error: null,
  success: false,
};

const createColorSlice = createSlice({
  name: "createColor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createColor.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createColor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default createColorSlice.reducer;
