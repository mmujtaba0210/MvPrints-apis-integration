import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Type for single attribute
interface Attribute {
  id: number;
  name: string;
  description: string;
  values: string[];
  created_at: string;
  updated_at: string;
}

// State type
interface CreateAttributeState {
  loading: boolean;
  success: boolean;
  attribute: Attribute | null;
  error: string | null;
}

const initialState: CreateAttributeState = {
  loading: false,
  success: false,
  attribute: null,
  error: null,
};
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";
// Async thunk
export const createAttribute = createAsyncThunk(
  "attributes/create",
  async (
    {
      name,
      description,
      values,
    }: { name: string; description: string; values: string[] },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      values.forEach((value) => {
        formData.append("values[]", value);
      });

      const response = await axios.post(
        `${BASE_URL}admin/product-attributions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("response", response);

      return response.data.data;
    } catch (error: any) {
      return console.log(error.response?.data || "Failed to create attribute");
    }
  }
);

export const createAttributeSlice = createSlice({
  name: "createAttribute",
  initialState,
  reducers: {
    resetCreateAttribute: (state) => {
      state.loading = false;
      state.success = false;
      state.attribute = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAttribute.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        createAttribute.fulfilled,
        (state, action: PayloadAction<Attribute>) => {
          state.loading = false;
          state.success = true;
          state.attribute = action.payload;
        }
      )
      .addCase(createAttribute.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateAttribute } = createAttributeSlice.actions;
export default createAttributeSlice.reducer;
