import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";
import {
  PaginationMetadata,
  PaginationResult,
  ProductListType,
} from "~/shared";

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
  page?: number;
}

export interface FilterState {
  data: ProductListType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  metadata: PaginationMetadata;
}

const initialState: FilterState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
  metadata: {} as PaginationMetadata,
};

export const filterSlide = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filterProducts.fulfilled, (state, action) => {
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
    builder.addCase(filterProducts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(filterProducts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(loadMoreProducts.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;

      const { docs, totalDocs, limit, totalPages, page } = action.payload;

      state.data.push(...docs);
      state.metadata = {
        totalDocs,
        limit,
        totalPages,
        page,
      };
    });
    builder.addCase(loadMoreProducts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const filterProducts = createAsyncThunk(
  "filter/filterProducts",
  async (obj: FilterPayload, thunkApi) => {
    const response: PaginationResult<ProductListType> | ErrorPayload =
      await instance.get("/api/products/search-and-filter", {
        params: obj,
      });

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const loadMoreProducts = createAsyncThunk(
  "filter/loadMoreProducts",
  async (obj: FilterPayload, thunkApi) => {
    const queryParam = new URLSearchParams(
      obj as unknown as Record<string, string>
    ).toString();

    const response: PaginationResult<ProductListType> | ErrorPayload =
      await instance.get("api/products?" + queryParam);

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default filterSlide.reducer;
