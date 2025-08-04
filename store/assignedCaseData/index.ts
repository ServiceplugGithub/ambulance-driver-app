import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: null,
  caseDetails: null,
};

const assignedCaseSlice = createSlice({
  name: "assignedCase",
  initialState,
  reducers: {
    setAssignedCase: (state, action: any) => {
      state.data = action.payload;
    },
  },
});

export const { setAssignedCase } = assignedCaseSlice.actions;
export default assignedCaseSlice.reducer;
