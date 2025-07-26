import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface UpdateBrandPayload {
  id: number;
  name: string;
  logo?: FileList | null;
  metaTitle: string;
  metaDescription: string;
}

interface UpdateBrandState {
  loading: boolean;
  error: string | null;
}

const initialState: UpdateBrandState = {
  loading: false,
  error: null,
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async (payload: UpdateBrandPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("meta_title", payload.metaTitle);
      formData.append("meta_description", payload.metaDescription);
      if (payload.logo && payload.logo[0]) {
        formData.append("logo", payload.logo[0]);
      }
      formData.append("_method", "PUT");

      const response = await axios.post(
        `${BASE_URL}admin/product-brands/${payload.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Brand updated successfully");
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update brand");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const updateBrandSlice = createSlice({
  name: "updateBrand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default updateBrandSlice.reducer;
