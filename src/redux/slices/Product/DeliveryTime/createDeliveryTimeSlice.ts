import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const createDeliveryTime = createAsyncThunk(
  "deliveryTimes/create",
  async (
    payload: {
      delivery_option: string;
      minimum_days: string;
      maximum_days: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/delivery-times`,
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

const createDeliveryTimeSlice = createSlice({
  name: "createDeliveryTime",
  initialState: {
    loading: false,
    success: false,
    error: null as string | null,
  },
  reducers: {
    resetCreateDeliveryTime: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDeliveryTime.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createDeliveryTime.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createDeliveryTime.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateDeliveryTime } = createDeliveryTimeSlice.actions;

export default createDeliveryTimeSlice.reducer;
