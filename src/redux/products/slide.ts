import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { RootState } from "../store";
import { ProductListType } from "~/shared";

export interface ProductsState {
  data: ProductListType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: ProductsState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
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
      state.data = action.payload;
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (): Promise<ProductListType[]> => await instance.get("/api/products"),
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
