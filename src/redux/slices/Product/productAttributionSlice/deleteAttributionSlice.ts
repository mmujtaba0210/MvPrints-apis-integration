// src/redux/slices/Product/Attribution/deleteAttributionSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteAttribution = createAsyncThunk(
  "attributions/deleteAttribution",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/product-attributions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return {
        id,
        message: response.data.message || "Attribution deleted successfully",
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete attribution"
      );
    }
  }
);

interface DeleteAttributionState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: DeleteAttributionState = {
  loading: false,
  error: null,
  successMessage: null,
};

const deleteAttributionSlice = createSlice({
  name: "deleteAttribution",
  initialState,
  reducers: {
    clearDeleteAttributionState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAttribution.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteAttribution.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteAttribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDeleteAttributionState } = deleteAttributionSlice.actions;
export default deleteAttributionSlice.reducer;
