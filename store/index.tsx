import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../store/login/index";
import profileReducer from "../store/profileSection/index";
import assignedCaseReducer from "./assignedCaseData/index";
import reportedCasesReducer from "./caseReported/index";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    reportedCases: reportedCasesReducer,
    profile: profileReducer,
    assignedCase: assignedCaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
