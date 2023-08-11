import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";

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
      slug: "search?categories=softDrinks&keyword=",
      name: "softDrinks",
    },
    {
      slug: "search?categories=noodles&keyword=",
      name: "noodles",
    },
    {
      slug: "search?categories=vegetables&keyword=",
      name: "vegetables",
    },
    {
      slug: "search?categories=fishSauce&keyword=",
      name: "fishSauce",
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
