import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const createDeliveryTime = createAsyncThunk(
  "deliveryTimes/create",
  async (
    payload: {
      name: string;
      min_days: number;
      max_days: number;
      status: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("min_days", String(payload.min_days));
      formData.append("max_days", String(payload.max_days));
      formData.append("status", String(payload.status));
      const response = await axios.post(
        `${BASE_URL}admin/product-deleivery-times`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return console.log(error.response?.data || error.message);
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
