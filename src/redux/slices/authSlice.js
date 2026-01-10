import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/profile');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
);

export const getBalance = createAsyncThunk(
  'auth/getBalance',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/balance');
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  balance: null,
  isProfileLoading: false,
  isBalanceLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isProfileLoading = false
      })
      .addCase(getBalance.pending, (state) => {
        state.isBalanceLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isBalanceLoading = false;
        state.balance = action.payload.balance
      })
      .addCase(getBalance.rejected, (state) => {
        state.isBalanceLoading = false;
      })
  }
});

export const { loginSuccess, logout, updateBalance } = authSlice.actions;
export default authSlice.reducer;