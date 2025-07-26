// src/redux/slices/Product/productAttributionSlice/productAttributionSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UpdateAttributePayload {
  id: number;
  name: string;
  description: string;
  values: string[];
}

export const updateAttribute = createAsyncThunk(
  "productAttribution/update",
  async (payload: UpdateAttributePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}admin/product-attributions/${payload.id}`,
        {
          name: payload.name,
          description: payload.description,
          values: payload.values,
          _method: "PUT",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productAttributionSlice = createSlice({
  name: "updateProductAttributes",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAttribute.pending, (state) => {})
      .addCase(updateAttribute.fulfilled, (state, action) => {})
      .addCase(updateAttribute.rejected, (state, action) => {});
  },
});

export default productAttributionSlice.reducer;
