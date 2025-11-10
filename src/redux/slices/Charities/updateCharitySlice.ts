// redux/slices/charity/updateCharitySlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateCharity = createAsyncThunk(
  "charity/update",
  async (
    { id, formData }: { id: string | number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      formData.append("_method", "put"); // Laravel-style update
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${BASE_URL}admin/charities/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update charity"
      );
    }
  }
);

interface UpdateCharityState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UpdateCharityState = {
  loading: false,
  success: false,
  error: null,
};

const updateCharitySlice = createSlice({
  name: "updateCharity",
  initialState,
  reducers: {
    resetUpdateCharity(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCharity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCharity.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCharity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateCharity } = updateCharitySlice.actions;
export default updateCharitySlice.reducer;
