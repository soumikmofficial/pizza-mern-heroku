import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    },
  },
});

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFailed } = actions;

export default reducer;
