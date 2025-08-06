import axios from "@/utils/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const urls = {
  postCaseUpdate: '/cases/case-updates'
};

export const postCaseUpdateApi = createAsyncThunk(
  "ambulanceDriver/postCaseUpdateApi",
  async (payload: any, thunkAPI) => {
    try {
      const response = await axios.post(`${urls?.postCaseUpdate}`, payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to post case update"
      );
    }
  }
);
