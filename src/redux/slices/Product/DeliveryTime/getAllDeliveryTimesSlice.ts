import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const getAllDeliveryTimes = createAsyncThunk(
  "deliveryTimes/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}admin/delivery-times`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const getAllDeliveryTimesSlice = createSlice({
  name: "getAllDeliveryTimes",
  initialState: {
    deliveryTimes: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeliveryTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDeliveryTimes.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryTimes = action.payload;
      })
      .addCase(getAllDeliveryTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getAllDeliveryTimesSlice.reducer;
