import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UpdateProductPayload {
  id: number;
  updatedData: any;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api/"; // ✅ added trailing slash

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }: UpdateProductPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}admin/products/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("❌ Update product error:", error.response?.data);

      // ✅ Properly return error so .rejected reducer can handle it
      return rejectWithValue(
        error.response?.data?.message || "Error updating product"
      );
    }
  }
);

interface UpdateProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UpdateProductState = {
  loading: false,
  success: false,
  error: null,
};

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateState } = updateProductSlice.actions;
export default updateProductSlice.reducer;
