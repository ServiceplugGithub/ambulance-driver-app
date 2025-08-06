import axios from "@/utils/axios-instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

const urls = {
  getReportedCases: '/cases/reported-cases-driver'
};

const DEVICE_ID = "6853f0bf2fd5e36814c9cb5f";

export const getReportedCasesApi = createAsyncThunk(
  "ambulanceDriver/getReportedCasesApi",
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const response = await axios.get(
        `${urls.getReportedCases}/${DEVICE_ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch reported cases"
      );
    }
  }
);
