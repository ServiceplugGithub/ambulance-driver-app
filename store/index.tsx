import { configureStore } from "@reduxjs/toolkit";
import reportAccidentReducer from "../store/CaseReported/index";
import loginReducer from "../store/login/index";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    reportAccident: reportAccidentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
