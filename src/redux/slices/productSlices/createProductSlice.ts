// src/redux/slices/product/createProductSlice.ts
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

const buildFormData = (payload: ProductPayload): FormData => {
  const formData = new FormData();

  const normalizeValue = (key: string, val: any) => {
    // convert numbers (IDs) to string
    if (typeof val === "number") return val.toString();
    // otherwise leave as-is
    return val ?? "";
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          // handle array of objects (e.g., attributions)
          Object.entries(item).forEach(([innerKey, innerVal]) => {
            if (Array.isArray(innerVal)) {
              // nested arrays (e.g., options)
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
      // handle simple nested objects (like seo)
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

export const createProduct = createAsyncThunk<
  any,
  ProductPayload,
  { rejectValue: string }
>("product/create", async (payload, { rejectWithValue }) => {
  try {
    const formData = buildFormData(payload);

    const response = await axios.post(`${BASE_URL}admin/products`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("✅ Product created successfully");
    return response.data;
  } catch (error: any) {
    console.log(error);
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "❌ Failed to create product";

    toast.error(message);
    return rejectWithValue(message);
  }
});

/**
 * ✅ Slice definition
 */
const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    resetCreateProduct: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateProduct } = createProductSlice.actions;
export default createProductSlice.reducer;
