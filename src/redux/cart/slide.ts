import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, ICart, SuccessPayload } from "~/shared";
import { INCREASE } from "~/constants";
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
      state.data = action.payload as ICart[];
    });
    builder.addCase(fetchCarts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchCarts.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
    builder.addCase(deleteItemCart.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteItemCart.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(addItemCart.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      const { id, quantity } = action.payload;
      if (state.data.some((item) => item.id === id)) {
        state.data = state.data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
        return;
      } else {
        state.data.push(action.payload as unknown as ICart);
      }
    });
    builder.addCase(updateItemQuantity.fulfilled, (state, action) => {
      const { id, action: action1 } = action.payload;
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.map((item) => {
        if (item.id === id) {
          if (action1 === INCREASE) {
            return {
              ...item,
              quantity:
                item.quantity + 1 > item.maxQuantity
                  ? item.maxQuantity
                  : item.quantity + 1,
            };
          } else {
            return {
              ...item,
              quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1,
            };
          }
        }
        return item;
      });
    });
  },
});

export const fetchCarts = createAsyncThunk(
  "cart/fetchCarts",
  async (_, thunkApi) => {
    // const response = await instance.get("/carts").then((res) => res.data);
    const response: ICart[] | ErrorPayload = await instance.get("/api/carts");

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message as unknown as string);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const deleteItemCart = createAsyncThunk(
  "cart/deleteItemCart",
  async (id: string, thunkApi) => {
    const response: ErrorPayload | SuccessPayload = await instance.delete(
      `/api/carts/${id}`
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message as unknown as string);
    }

    return thunkApi.fulfillWithValue(id);
  }
);

export const addItemCart = createAsyncThunk(
  "cart/addItemCart",
  async (item: ICart, thunkApi) => {
    const response: ErrorPayload | SuccessPayload = await instance.post(
      "/api/carts",
      {
        product_id: item.id || new Date().getTime().toString(),
        quantity: item.quantity,
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response?.message as unknown as string);
    }

    return thunkApi.fulfillWithValue(item);
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async (item: CartQuantity, thunkApi) => {
    const response: ErrorPayload | SuccessPayload = await instance.patch(
      `/api/carts/${item.id}`,
      {
        action: item.action,
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response?.message as unknown as string);
    }

    return thunkApi.fulfillWithValue(item);
  }
);

export const { clearCart } = cartSlide.actions;

export default cartSlide.reducer;
