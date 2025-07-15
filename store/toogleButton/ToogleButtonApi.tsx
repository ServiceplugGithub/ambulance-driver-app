// src/redux/api/vehicleApi.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://emsplug.com/api";

// Types
interface ChangeStatusParams {
  driverId: string;
  status: boolean; // true for active, false for inactive
}

interface ChangeStatusResponse {
  success: boolean;
  message: string;
  result?: any;
}

export const changeVehicleAvailabilityApi = createAsyncThunk<
  any,
  ChangeStatusParams,
  { rejectValue: string }
>("vehicle/changeStatus", async (params, thunkApi) => {
  try {
    const response = await axios.post<ChangeStatusResponse>(
      `${BASE_URL}/ambulance-vehicle/change-status`,
      params
    );

    if (response.data?.success) {
      return response.data.result || true;
    }

    return thunkApi.rejectWithValue(
      response.data.message || "Failed to update status."
    );
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error?.response?.data?.message || "Network error while changing status."
    );
  }
});
