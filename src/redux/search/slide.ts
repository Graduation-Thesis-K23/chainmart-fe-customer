import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";

export interface SearchProduct {
  phone: string;
  name: string;
  district: string;
  city: string;
  ward: string;
  street: string;
  id?: string;
}

export interface ProductState {
  data: SearchProduct[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: ProductState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const searchSlide = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload as unknown as SearchProduct[];
    });
    builder.addCase(searchProducts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
  },
});

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (searchText) => {
    return await instance.get("/api/products/search/" + searchText);
  }
);

export default searchSlide.reducer;
