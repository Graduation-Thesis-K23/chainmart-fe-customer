import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";
import { RootState } from "../store";
import {
  ErrorPayload,
  PaginationMetadata,
  PaginationResult,
  ProductListType,
} from "~/shared";

export interface ProductsState {
  data: ProductListType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  metadata: PaginationMetadata;
}

const initialState: ProductsState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
  metadata: {} as PaginationMetadata,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
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

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPi) => {
    const result: PaginationResult<ProductListType> | ErrorPayload =
      await instance.get("/api/products");

    if ("message" in result) {
      return thunkAPi.rejectWithValue(result.message);
    }

    return thunkAPi.fulfillWithValue(result);
  },
  {
    condition: (_, { getState }) => {
      const rootState: RootState = getState() as RootState;

      const productsStateStatus = rootState.products.status;

      if (
        productsStateStatus === ASYNC_STATUS.LOADING ||
        productsStateStatus === ASYNC_STATUS.SUCCEED
      ) {
        return false;
      } else {
        return true;
      }
    },
  }
);

export default productsSlice.reducer;
