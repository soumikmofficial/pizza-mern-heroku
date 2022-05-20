import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  error: null,
  deleting: false,
  deleted: false,
  userReview: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (url) => {
    const res = await axios.get(url);
    return res.data;
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (url) => {
    const res = await axios.delete(url);
    return res.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    removeReview: (state, { payload }) => {
      const removedList = state.reviews.filter(
        (review) => review._id !== payload
      );
      state.reviews = removedList;
    },
  },
  extraReducers: {
    [fetchReviews.pending]: (state) => {
      return {
        ...state,
        deleting: false,
        deleted: false,
        userReview: null,
      };
    },
    [fetchReviews.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        reviews: payload.reviews,
        userReview: payload.currentUserReview,
      };
    },
    [fetchReviews.rejected]: (state, { error }) => {
      return { ...state, error: error.response.data, userReview: null };
    },
    [deleteReview.pending]: (state) => {
      return { ...state, deleting: true, deleted: false };
    },
    [deleteReview.fulfilled]: (state, { payload }) => {
      return { ...state, deleting: false, deleted: true };
    },
    [deleteReview.rejected]: (state, { error }) => {
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: error.response.data,
      };
    },
  },
});

export const { removeReview } = reviewSlice.actions;

export default reviewSlice.reducer;
