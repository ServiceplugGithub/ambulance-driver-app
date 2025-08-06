import axios from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const urls = {
  getUserProfile: "/auth/profile",
};

const DEVICE_ID = "6853f0bf2fd5e36814c9cb5f";

export const getUserProfileApi = createAsyncThunk(
  "profile/getUserProfileApi",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${urls.getUserProfile}/${DEVICE_ID}`);

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
