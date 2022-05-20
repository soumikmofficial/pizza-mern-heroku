import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get("/api/v1/auth/showMe");
  return res.data;
});

export const removeUser = createAsyncThunk("user/removeUser", async () => {
  await axios.delete("/api/v1/auth/logout");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, { payload }) => {
      return { ...state, user: payload.user };
    },
    [fetchUser.rejected]: (state) => {
      return { ...state, user: null };
    },
    [removeUser.fulfilled]: (state) => {
      return { ...state, user: null };
    },
    [removeUser.rejected]: (state) => {
      return state;
    },
  },
});

export default userSlice.reducer;
