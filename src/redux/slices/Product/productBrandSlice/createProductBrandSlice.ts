// src/redux/slices/brand/createBrandSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface BrandFormData {
  name: string;
  logo: FileList | null;
  metaTitle: string;
  metaDescription: string;
}

interface CreateBrandState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CreateBrandState = {
  loading: false,
  success: false,
  error: null,
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export const createBrand = createAsyncThunk(
  "brand/create",
  async (formData: BrandFormData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("meta_title", formData.metaTitle);
      data.append("meta_description", formData.metaDescription);

      if (formData.logo && formData.logo.length > 0) {
        data.append("file_path", formData.logo[0]);
      }

      const response = await axios.post(
        `${BASE_URL}admin/product-brands`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Brand created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message === "Validation Error"
          ? "Name is already taken"
          : "Cannot create brand"
      );
      return console.log(error.response?.data || error.message);
    }
  }
);

const createBrandSlice = createSlice({
  name: "createBrand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default createBrandSlice.reducer;
