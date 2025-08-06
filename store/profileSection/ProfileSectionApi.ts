import axios from "@/utils/axios-instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

const urls = {
  getUserProfile: "/auth/profile",
};

export const getUserProfileApi = createAsyncThunk(
  "profile/getUserProfileApi",
  async (_, thunkApi) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const res = await axios.get(`${urls.getUserProfile}/${userId}`);

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
