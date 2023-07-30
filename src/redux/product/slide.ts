import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";
import { ProductType } from "~/shared";

export interface ProductState {
  data: ProductType;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: ProductState = {
  data: {} as unknown as ProductType,
  status: ASYNC_STATUS.IDLE,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductType>) {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(fetchProduct.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
  },
});

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (uuid: string): Promise<ProductType> =>
    await instance.get("/api/products/" + uuid)
);

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
