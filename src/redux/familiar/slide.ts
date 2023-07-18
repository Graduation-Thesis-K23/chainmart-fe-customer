import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";
import { RootState } from "../store";
import {
  ErrorPayload,
  FamiliarProduct,
  PaginationMetadata,
  PaginationResult,
} from "~/shared";

export interface FamiliarProductState {
  data: FamiliarProduct[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  metadata: PaginationMetadata;
}

const initialState: FamiliarProductState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
  metadata: {} as PaginationMetadata,
};

export const familiarSlide = createSlice({
  name: "familiar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFamiliarProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchFamiliarProduct.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      const { docs, totalDocs, limit, totalPages, page } = action.payload;
      state.data = docs;
      state.metadata = {
        totalDocs,
        limit,
        totalPages,
        page,
      };
    });
  },
});

export const fetchFamiliarProduct = createAsyncThunk(
  "familiar/fetchFamiliarProduct",
  async (_, thunkAPi) => {
    const result: PaginationResult<FamiliarProduct> | ErrorPayload =
      await instance.get("/api/products?limit=5");

    if ("message" in result) {
      return thunkAPi.rejectWithValue(result.message);
    }

    return thunkAPi.fulfillWithValue(result);
  },
  {
    condition: (_, { getState }) => {
      const rootState: RootState = getState() as RootState;

      const familiarStateStatus = rootState.familiar.status;

      if (
        familiarStateStatus === ASYNC_STATUS.LOADING ||
        familiarStateStatus === ASYNC_STATUS.SUCCEED
      ) {
        return false;
      } else {
        return true;
      }
    },
  }
);

export default familiarSlide.reducer;
