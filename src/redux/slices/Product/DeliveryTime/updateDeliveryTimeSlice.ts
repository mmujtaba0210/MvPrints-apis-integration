import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

// ✅ Update Delivery Time (PUT with FormData)
export const updateDeliveryTime = createAsyncThunk(
  "deliveryTimes/update",
  async (
    {
      id,
      payload,
    }: {
      id: string;
      payload: {
        name: string;
        min_days: number;
        max_days: number;
        status: number;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("min_days", String(payload.min_days));
      formData.append("max_days", String(payload.max_days));
      formData.append("status", String(payload.status));
      formData.append("_method", "PUT");
      // 1 = active, 0 = inactive

      const response = await axios.post(
        `${BASE_URL}admin/product-deleivery-times/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      return console.log(
        error.response?.data || error.message || "Something went wrong"
      );
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
