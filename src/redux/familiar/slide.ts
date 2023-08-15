import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";
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
      console.log(action.payload);
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
  async (category: string, thunkAPi) => {
    const result: PaginationResult<FamiliarProduct> | ErrorPayload =
      await instance.get("/api/products/search-and-filter", {
        params: {
          categories: category,
          keyword: "",
          page: 1,
        },
      });

    if ("message" in result) {
      return thunkAPi.rejectWithValue(result.message);
    }

    return thunkAPi.fulfillWithValue(result);
  }
);

export default familiarSlide.reducer;
