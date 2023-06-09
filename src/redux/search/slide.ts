import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";

export interface SearchProduct {
  name: string;
  slug: string;
  images?: string;
}

export interface SearchState {
  data: SearchProduct[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: SearchState = {
  data: [
    {
      slug: "categories/soft-drinks",
      name: "categories.softDrinks",
    },
    {
      slug: "categories/noodles",
      name: "categories.noodles",
    },
    {
      slug: "categories/vegetables",
      name: "categories.vegetables",
    },
    {
      slug: "categories/fish-sauce",
      name: "categories.fishSauce",
    },
  ],
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
  async (searchText: string) => {
    if (searchText === "") {
      return initialState.data;
    }
    return await instance.get("/api/products/search/" + searchText);
  }
);

export default searchSlide.reducer;
