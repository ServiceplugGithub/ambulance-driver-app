// src/redux/api/authApi.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = "https://emsplug.com/api";

interface LoginParams {
  email: string;
  password: string;
  usertype: string;
}

interface LoginResponse {
  result: any;
}

export const loginUserApi = createAsyncThunk<
  any,
  LoginParams,
  { rejectValue: string }
>("auth/loginUserApi", async (params, thunkApi) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/auth/login`,
      params
    );

    if (response.data?.result) {
      return response.data.result;
    }

    return thunkApi.rejectWithValue("Login failed. Please try again.");
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error?.response?.data?.message || "Network error during login."
    );
  }
});
