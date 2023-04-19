import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { ProductType } from "./../products/slide";
import { RootState } from "../store";

export interface Product extends Omit<ProductType, "images" | "category"> {
  images: string[];
  category: string;
}
export interface ProductState {
  data: Product;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: ProductState = {
  data: {} as unknown as Product,
  status: ASYNC_STATUS.IDLE,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductType>) {
      state.status = ASYNC_STATUS.SUCCEED;

      state.data = {
        ...action.payload,
        images: action.payload.images.split(","),
        category: action.payload.category.name,
      };
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

      const product = {
        ...payload,
        images: payload.images.split(","),
        category: payload.category.name,
      };

      state.data = product;
    });
  },
});

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (uuid: string): Promise<ProductType> =>
    await instance.get("/api/products/" + uuid),
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

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
