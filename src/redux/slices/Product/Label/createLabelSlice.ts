// redux/slices/label/createLabelSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const createLabel = createAsyncThunk(
  "labels/create",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${BASE_URL}admin/product-labels`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create label");
    }
  }
);

interface CreateLabelState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CreateLabelState = {
  loading: false,
  success: false,
  error: null,
};

const createLabelSlice = createSlice({
  name: "createLabel",
  initialState,
  reducers: {
    resetCreateLabel(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLabel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLabel.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createLabel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateLabel } = createLabelSlice.actions;
export default createLabelSlice.reducer;
