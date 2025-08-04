import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://emsplug.com/api";

interface CaseUpdatePayload {
  event: string;
  userId: any;
  data?: any;
}

export const postCaseUpdateApi = createAsyncThunk(
  "caseUpdate/post",
  async (payload: CaseUpdatePayload, thunkAPI) => {
    try {
      console.log(payload, '<====Payload')
      const response = await axios.post(`${BASE_URL}/cases/case-updates`, payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to post case update"
      );
    }
  }
);
