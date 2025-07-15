// src/store/slice/profileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileApi } from "./ProfileSectionApi";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserProfileApi.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload ?? "Error loading profile";/
      });
  },
});

export default profileSlice.reducer;
