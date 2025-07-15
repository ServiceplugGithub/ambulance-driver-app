import { configureStore } from "@reduxjs/toolkit";
// import reportAccidentReducer from "./caseReported/index";
import loginReducer from "../store/login/index";
import profileReducer from "../store/profileSection/index";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    // reportAccident: reportAccidentReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
