import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { ProductListType } from "~/shared";

interface ErrorPayload {
  statusCode: number;
  message: string;
  error: string;
}

export interface FilterPayload {
  keyword: string;
  categories?: string;
  maxPrice?: string;
  minPrice?: string;
  orderBy?: string;
}

export interface FilterState {
  data: ProductListType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: FilterState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const filterSlide = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload as unknown as ProductListType[];
    });
    builder.addCase(filterProducts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(filterProducts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
  },
});

export const filterProducts = createAsyncThunk(
  "filter/filterProducts",
  async (obj: FilterPayload, thunkApi) => {
    const queryParam = new URLSearchParams(
      obj as unknown as Record<string, string>
    ).toString();

    const response = await instance.get<ProductListType[], ErrorPayload>(
      "api/products/search-and-filter?" + queryParam
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response?.message as unknown as string);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default filterSlide.reducer;
