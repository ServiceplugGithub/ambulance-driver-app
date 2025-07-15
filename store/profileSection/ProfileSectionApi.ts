import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserProfileApi = createAsyncThunk(
  "profile/getUserProfileApi",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(
        "https://emsplug.com/api/auth/profile/6853f0bf2fd5e36814c9cb5f"
      );

      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data[0];
      } else {
        return thunkApi.rejectWithValue("Profile not found");
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
