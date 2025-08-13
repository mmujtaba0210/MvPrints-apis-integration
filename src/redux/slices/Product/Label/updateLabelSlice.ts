// redux/slices/label/updateLabelSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateLabel = createAsyncThunk(
  "labels/update",
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      formData.append("_method", "PUT");
      const res = await axios.post(
        `${BASE_URL}admin/product-labels/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update label");
    }
  }
);

interface UpdateLabelState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UpdateLabelState = {
  loading: false,
  success: false,
  error: null,
};

const updateLabelSlice = createSlice({
  name: "updateLabel",
  initialState,
  reducers: {
    resetUpdateLabel(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLabel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLabel.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateLabel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateLabel } = updateLabelSlice.actions;
export default updateLabelSlice.reducer;
