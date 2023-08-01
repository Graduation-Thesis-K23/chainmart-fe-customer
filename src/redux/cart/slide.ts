import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, ICart } from "~/shared";
import instance from "~/apis/axios-instance";

export interface CartQuantity {
  id: string;
  action: "increase" | "decrease";
}

export interface CartState {
  data: ICart[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: CartState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(fetchCarts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchCarts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
    builder.addCase(updateCarts.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(updateCarts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateCarts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
  },
});

export const fetchCarts = createAsyncThunk(
  "cart/fetchCarts",
  async (_, thunkApi) => {
    const response: ICart[] | ErrorPayload = await instance.get("/api/carts");

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const updateCarts = createAsyncThunk(
  "cart/updateCarts",
  async (carts: string, thunkApi) => {
    const response: ICart[] | ErrorPayload = await instance.patch(
      `/api/carts`,
      {
        carts,
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const { clearCart } = cartSlide.actions;

export default cartSlide.reducer;
