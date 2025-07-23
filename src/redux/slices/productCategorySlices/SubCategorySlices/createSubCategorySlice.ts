import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSubCategory {
  id: number;
  name: string;
  status: number;
  slug: string;
  product_category_id: number;
}

interface CreateProductSubCategoryState {
  loading: boolean;
  subCategory: ProductSubCategory | null;
  success: boolean;
  error: string | null;
}

const initialState: CreateProductSubCategoryState = {
  loading: false,
  subCategory: null,
  success: false,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
export const createProductSubCategory = createAsyncThunk(
  "productSubCategory/create",
  async (
    subCategoryData: {
      name: string;
      status: number;
      slug: string;
      product_category_id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      // ✅ Build FormData
      const formData = new FormData();
      formData.append("name", subCategoryData.name);
      formData.append("status", subCategoryData.status.toString());
      formData.append("slug", subCategoryData.slug);
      formData.append(
        "product_category_id",
        subCategoryData.product_category_id.toString()
      );

      const response = await axios.post(
        `${BASE_URL}admin/product-sub-categories`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return console.log(
        error.response?.data || "Failed to create product subcategory"
      );
    }
  }
);

export const createProductSubCategorySlice = createSlice({
  name: "createProductSubCategory",
  initialState,
  reducers: {
    resetCreateProductSubCategory: (state) => {
      state.loading = false;
      state.subCategory = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductSubCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        createProductSubCategory.fulfilled,
        (state, action: PayloadAction<ProductSubCategory>) => {
          state.loading = false;
          state.success = true;
          state.subCategory = action.payload;
        }
      )
      .addCase(createProductSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateProductSubCategory } =
  createProductSubCategorySlice.actions;

export default createProductSubCategorySlice.reducer;
