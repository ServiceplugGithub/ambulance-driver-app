import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://emsplug.com/api";

interface LoginParams {
  email: string;
  password: string;
  usertype: string;
}

interface LoginResponse {
  token: string;
  user: any;
}

export const loginUserApi = createAsyncThunk<
  LoginResponse,
  LoginParams,
  { rejectValue: string }
>("auth/loginUserApi", async (params, thunkApi) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/auth/login`,
      params
    );
    if (response.data?.token && response.data?.user) {
      return response.data;
    }

    return thunkApi.rejectWithValue("Login failed. Invalid credentials.");
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error?.response?.data?.message || "Network error during login."
    );
  }
});
