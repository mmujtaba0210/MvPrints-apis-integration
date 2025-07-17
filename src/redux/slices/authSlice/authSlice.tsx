import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Role {
  id: number;
  name: string;
  permissions: any[];
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  permissions: string[];
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  isAuthenticated: !!(
    typeof window !== "undefined" && localStorage.getItem("token")
  ),
  loading: false,
  error: null,
};

// Login thunk
export const loginUser = createAsyncThunk<
  { token: string; user: User },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      "https://testbackend.mecarviprints.com/api/auth/login",
      credentials,
      {
        headers: {
          allowCredentials: "true",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
    const token = res.data.data.token;
    const user = res.data.data.user;
    console.log(res);
    // Save to localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (err: any) {
    console.log(err);
    return rejectWithValue("Invalid email or password");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
