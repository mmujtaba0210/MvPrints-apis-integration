// redux/slices/Product/updateProductSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      formData.append("_method", "PUT");
      const res = await axios.post(
        `${BASE_URL}admin/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
interface UpdateProductState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UpdateProductState = {
  loading: false,
  error: null,
  success: false,
};
const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : JSON.stringify(action.payload);
        state.success = false;
      });
  },
});

export default updateProductSlice.reducer;
