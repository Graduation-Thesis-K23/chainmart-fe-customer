import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, Comment } from "~/shared";

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
    console.log(productId);
    const response: Rating | ErrorPayload = {
      averageStar: 4.5,
      star: 2,
      numberOfComment: 12,
      numberOfOneStar: 1,
      numberOfTwoStar: 2,
      numberOfThreeStar: 3,
      numberOfFourStar: 4,
      numberOfFiveStar: 12,
      comments: [
        {
          id: "1",
          name: "Nguyen Van Manh 1",
          createdAt: Date.now(),
          star: 4,
          content:
            "Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị,",
          avatar: "7200ed7e",
          images: ["7200ed7e", "2ba48c4c"],
        },
        {
          id: "2",
          name: "Nguyen Van Manh 2",
          createdAt: Date.now(),
          star: 3,
          content:
            "Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị,",
          avatar: "7200ed7e",
          images: ["7200ed7e", "2ba48c4c"],
        },
        {
          id: "3",
          name: "Nguyen Van Manh 3",
          createdAt: Date.now(),
          star: 2,
          content:
            "Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị,",
          avatar: "7200ed7e",
          images: ["7200ed7e", "2ba48c4c"],
        },
        {
          id: "4",
          name: "Nguyen Van Manh 4",
          createdAt: Date.now(),
          star: 1,
          content:
            "Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị, Chainmart - ứng dụng mua sắm trực tuyến thú vị,",
          avatar: "7200ed7e",
          images: ["7200ed7e", "2ba48c4c"],
        },
      ],
    };

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return response;
  }
);

export default ratingReducer.reducer;
