import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserApi } from "./LoginApi";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface LoginState {
  token: string;
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  token: "",
  user: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.user = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUserApi.fulfilled,
      (state, action: PayloadAction<any>) => {
        const { token, user } = action.payload;

        state.token = token;
        state.user = user;
        state.isLoggedIn = true;

        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("userId", user._id);
      }
    );
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
