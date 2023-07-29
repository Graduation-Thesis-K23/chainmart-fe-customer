import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, Comment } from "~/shared";
import instance from "~/apis/axios-instance";

export interface Rating {
  averageStar: number;
  star: number;
  numberOfComment: number;
  numberOfOneStar: number;
  numberOfTwoStar: number;
  numberOfThreeStar: number;
  numberOfFourStar: number;
  numberOfFiveStar: number;
  comments: Comment[];
}

export interface RatingState {
  data: Rating;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: RatingState = {
  data: {} as Rating,
  status: ASYNC_STATUS.IDLE,
};

export const ratingReducer = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRating.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchRating.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload as Rating;
    });
  },
});

export const fetchRating = createAsyncThunk(
  "rating/fetchRating",
  async (productId: string, thunkApi) => {
    const response: Rating | ErrorPayload = await instance.get(
      `/api/comments/${productId}/product`
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default ratingReducer.reducer;
