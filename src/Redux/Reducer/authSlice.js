
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: "",
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoading: (state) => {
      state.loading = true;
    },
    userLoaded: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.accessToken = action.payload.token;
    },
    saveUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    loginFail: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = ""
    },
  },
});

export const {
  userLoading,
  userLoaded,
  saveUser,
  setAccessToken,
  loginFail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
