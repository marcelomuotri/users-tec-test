// Importaciones necesarias
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types";

const initialState: AuthState = {
  email: null,
  loading: true,
  error: null,
  token: null,
};

// Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFailure(state, action: PayloadAction<string>) {
      state.email = null;
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) {
      state.email = action.payload.email;
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
    },
    loginLoading(state) {
      state.loading = true;
    },
    loginLoadingReset(state) {
      state.loading = false;
    },
    logoutSuccess(state) {
      state.email = null;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
  },
});

export const {
  loginFailure,
  loginSuccess,
  logoutSuccess,
  loginLoading,
  loginLoadingReset,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
