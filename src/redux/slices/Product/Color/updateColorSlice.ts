import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      formData.append("_method", "PUT");

      const res = await axios.post(
        `${BASE_URL}admin/product-colors/${id}`,
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

interface UpdateColorState {
  loading: boolean;
  error: unknown | null;
  success: boolean;
}

const initialState: UpdateColorState = {
  loading: false,
  error: null,
  success: false,
};

const updateColorSlice = createSlice({
  name: "updateColor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateColor.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateColor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default updateColorSlice.reducer;
