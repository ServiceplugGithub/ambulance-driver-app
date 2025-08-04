import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserApi } from "./LoginApi";


const initialState: any = {
  token: "",
  user: null,
  isLoggedIn: false,
  rawResponse: null,
  isAuthenticated: false,
  isInitialized: false
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.token = "";
    //   state.user = "";
    //   state.isLoggedIn = false;
    //   state.rawResponse = null;
    //   AsyncStorage.removeItem("token");
    //   AsyncStorage.removeItem("userId");
    // },
    initialize: (state, action) => {
      const { isAuthenticated, user } = action.payload;

      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.isInitialized = true;
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
      }
    );
  },
});

export const authAction = loginSlice.actions;
export default loginSlice.reducer;
