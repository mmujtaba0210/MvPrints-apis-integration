// redux/slices/charity/deleteCharitySlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteCharity = createAsyncThunk(
  "charity/delete",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.delete(`${BASE_URL}admin/charities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id, data: res.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete charity"
      );
    }
  }
);

interface DeleteCharityState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteCharityState = {
  loading: false,
  success: false,
  error: null,
};

const deleteCharitySlice = createSlice({
  name: "deleteCharity",
  initialState,
  reducers: {
    resetDeleteCharity(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCharity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCharity.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCharity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteCharity } = deleteCharitySlice.actions;
export default deleteCharitySlice.reducer;
