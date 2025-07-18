import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AssignedCaseState {
  data: any;
  caseDetails: any; // You can type this better later
}

const initialState: AssignedCaseState = {
  data: null,
  caseDetails: null,
};

const assignedCaseSlice = createSlice({
  name: "assignedCase",
  initialState,
  reducers: {
    setAssignedCase: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setAssignedCase } = assignedCaseSlice.actions;
export default assignedCaseSlice.reducer;
