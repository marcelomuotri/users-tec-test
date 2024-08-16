import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
  loading: true,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      return { token: data.token, email };
    } catch (error) {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
  }
);

// Thunk para manejar el logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return;
    } catch (error) {
      console.error(error);
    }
  }
);

export const loadAuthFromStorage = createAsyncThunk(
  "auth/loadAuthFromStorage",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      return { token, email };
    } else {
      return thunkAPI.rejectWithValue("No authentication data found");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Acción para manejar el reset del loading
    loginLoadingReset(state) {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || null;
        state.email = action.payload?.email || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.email = null;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.email = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(loadAuthFromStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAuthFromStorage.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.loading = false;
        state.error = null;
      })
      .addCase(loadAuthFromStorage.rejected, (state, action) => {
        state.token = null;
        state.email = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { loginLoadingReset } = authSlice.actions;
export default authSlice.reducer;
