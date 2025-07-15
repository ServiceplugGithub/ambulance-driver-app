import { createSlice } from "@reduxjs/toolkit";
import { getReportedCasesApi } from "./CaseReportedApi";

const reportedCasesSlice = createSlice({
  name: "reportedCases",
  initialState: {
    cases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportedCasesApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportedCasesApi.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = action.payload;
      })
      .addCase(getReportedCasesApi.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload || "Error fetching cases";
      });
  },
});

export default reportedCasesSlice.reducer;
