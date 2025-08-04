import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserApi } from "./LoginApi";

interface LoginState {
  token: string;
  user: string;
  isLoggedIn: boolean;
  rawResponse: any; // NEW
}

const initialState: LoginState = {
  token: "",
  user: "",
  isLoggedIn: false,
  rawResponse: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.user = "";
      state.isLoggedIn = false;
      state.rawResponse = null;
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
        state.rawResponse = action.payload;

        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("userId", user._id);
      }
    );
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
