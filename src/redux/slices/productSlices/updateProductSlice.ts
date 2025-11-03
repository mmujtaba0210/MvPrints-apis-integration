// src/redux/slices/product/updateProductSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface MediaItem {
  type?: string;
  upload_by?: string;
}

interface AttributeOption {
  value: string;
  price: number;
  price_type: string;
}

interface Attribute {
  id: number;
  options: AttributeOption[];
}

interface Variation {
  name: string;
  quantity: number;
  price: number;
}

interface Wholesale {
  quantity: number;
  price: number;
}

interface ProductPayload {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  type: string;
  product_category_id: number;
  product_sub_category_id: number;
  product_child_category_id: number;
  product_brand_id?: number;
  product_deleivery_time_id: number;
  varient?: string;
  is_shipping_cost?: number;
  shipping_cost?: number;
  shipping_location?: string;
  model?: string;
  description: string;
  specification: string;
  refund_policy: string;
  allow_wholesale: number;
  price: number;
  discount?: number;
  stock?: number;
  is_active: number;

  seo_title: string;
  seo_slug: string;
  seo_keywords: string;
  seo_meta_tags: string[];
  seo_tags: string[];
  seo_meta_description: string;

  labels: number[];
  media: MediaItem[];
  variations?: Variation[];
  attributions?: Attribute[];
  wholesales?: Wholesale[];
}

interface ProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: any | null;
}

const initialState: ProductState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

/**
 * ✅ Converts payload to FormData (same logic as create)
 */
const buildFormData = (payload: ProductPayload): FormData => {
  const formData = new FormData();

  // Add Laravel-style PUT method override
  formData.append("_method", "PUT");

  const normalizeValue = (key: string, val: any) => {
    if (typeof val === "number") return val.toString();
    return val ?? "";
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || key === "id") return;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.entries(item).forEach(([innerKey, innerVal]) => {
            if (Array.isArray(innerVal)) {
              innerVal.forEach((opt, optIndex) => {
                if (typeof opt === "object" && opt !== null) {
                  Object.entries(opt).forEach(([optKey, optVal]) => {
                    formData.append(
                      `${key}[${index}][${innerKey}][${optIndex}][${optKey}]`,
                      normalizeValue(optKey, optVal)
                    );
                  });
                } else {
                  formData.append(
                    `${key}[${index}][${innerKey}][${optIndex}]`,
                    normalizeValue(innerKey, opt)
                  );
                }
              });
            } else {
              formData.append(
                `${key}[${index}][${innerKey}]`,
                normalizeValue(innerKey, innerVal)
              );
            }
          });
        } else {
          formData.append(`${key}[${index}]`, normalizeValue(key, item));
        }
      });
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([innerKey, innerVal]) => {
        formData.append(
          `${key}[${innerKey}]`,
          normalizeValue(innerKey, innerVal)
        );
      });
    } else {
      formData.append(key, normalizeValue(key, value));
    }
  });

  return formData;
};

/**
 * ✅ Update Product Thunk
 */
export const updateProduct = createAsyncThunk<
  any,
  ProductPayload,
  { rejectValue: string }
>("product/update", async (payload, { rejectWithValue }) => {
  try {
    const formData = buildFormData(payload);
    const response = await axios.post(
      `${BASE_URL}admin/products/${payload.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("✅ Product updated successfully");
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "❌ Failed to update product";
    toast.error(message);
    console.log(error.response);
    return rejectWithValue(message);
  }
});

/**
 * ✅ Slice Definition
 */
const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateProduct: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;
