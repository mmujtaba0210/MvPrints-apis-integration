import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateDeliveryTime = createAsyncThunk(
  "deliveryTimes/update",
  async (
    { id, payload }: { id: string; payload: { delivery_option: string; minimum_days: string; maximum_days: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}admin/delivery-times/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const updateDeliveryTimeSlice = createSlice({
  name: "updateDeliveryTime",
  initialState: {
    loading: false,
    success: false,
    error: null as string | null,
  },
  reducers: {
    resetUpdateDeliveryTime: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDeliveryTime.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateDeliveryTime.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateDeliveryTime.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateDeliveryTime } = updateDeliveryTimeSlice.actions;

export default updateDeliveryTimeSlice.reducer;
