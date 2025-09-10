import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const deleteDeliveryTime = createAsyncThunk(
  "deliveryTime/deleteDeliveryTime",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}admin/product-deleivery-times/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete delivery time"
      );
    }
  }
);

interface DeleteState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DeleteState = {
  loading: false,
  error: null,
  success: false,
};

const deleteDeliveryTimeSlice = createSlice({
  name: "deleteDeliveryTime",
  initialState,
  reducers: {
    resetDeleteState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteDeliveryTime.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteDeliveryTime.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteDeliveryTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteState } = deleteDeliveryTimeSlice.actions;
export default deleteDeliveryTimeSlice.reducer;
