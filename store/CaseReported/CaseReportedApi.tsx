import axios from "@/utils/axios-instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

const urls = {
  getReportedCases: "/cases/reported-cases-driver",
};

export const getReportedCasesApi = createAsyncThunk(
  "ambulanceDriver/getReportedCasesApi",
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const response = await axios.get(`${urls.getReportedCases}/${userId}`);

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch reported cases"
      );
    }
  }
);
