import { createSlice } from "@reduxjs/toolkit";
import { postCaseUpdateApi } from "./CaseUpdatesApi";
const caseUpdateSlice = createSlice({
  name: "caseUpdate",
  initialState: {
    loading: false,
    success: false,
    error: null as string | null,
  },
  reducers: {
    resetCaseUpdateStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCaseUpdateApi.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(postCaseUpdateApi.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(postCaseUpdateApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCaseUpdateStatus } = caseUpdateSlice.actions;
export default caseUpdateSlice.reducer;
