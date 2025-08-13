// redux/slices/label/deleteLabelSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteLabel = createAsyncThunk(
  "labels/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}admin/product-labels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete label");
    }
  }
);

interface DeleteLabelState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteLabelState = {
  loading: false,
  success: false,
  error: null,
};

const deleteLabelSlice = createSlice({
  name: "deleteLabel",
  initialState,
  reducers: {
    resetDeleteLabel(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLabel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLabel.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteLabel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteLabel } = deleteLabelSlice.actions;
export default deleteLabelSlice.reducer;
