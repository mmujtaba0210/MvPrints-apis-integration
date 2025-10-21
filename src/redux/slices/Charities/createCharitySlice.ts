// redux/slices/charity/createCharitySlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const createCharity = createAsyncThunk(
  "charity/create",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(`${BASE_URL}admin/charities`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("create", res);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create charity"
      );
    }
  }
);

interface CreateCharityState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CreateCharityState = {
  loading: false,
  success: false,
  error: null,
};

const createCharitySlice = createSlice({
  name: "createCharity",
  initialState,
  reducers: {
    resetCreateCharity(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCharity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCharity.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCharity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateCharity } = createCharitySlice.actions;
export default createCharitySlice.reducer;
