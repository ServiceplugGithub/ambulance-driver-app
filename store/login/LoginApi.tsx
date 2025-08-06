import axios from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const urls = {
  loginUser: '/auth/login'
};


export const loginUserApi = createAsyncThunk("ambulanceDriver/loginUserApi", async (params, thunkApi) => {
  try {
    const response = await axios.post(`${urls?.loginUser}`, params);
    if (response.data) {
      return response.data;
    }

    return thunkApi.rejectWithValue("Login failed. Invalid credentials.");
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error?.response?.data?.message || "Network error during login."
    );
  }
});
