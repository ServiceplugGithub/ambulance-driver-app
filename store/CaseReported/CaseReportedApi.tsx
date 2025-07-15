import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://emsplug.com/api";
const DEVICE_ID = "6853f0bf2fd5e36814c9cb5f";

export const getReportedCasesApi = createAsyncThunk(
  "reportedCases/fetch",
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const response = await axios.get(
        `${BASE_URL}/cases/reported-cases-driver/${DEVICE_ID}`,
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
