import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, ICart, SuccessPayload } from "~/shared";
import { INCREASE } from "~/constants";

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
    const response: ICart[] | ErrorPayload = await new Promise((resolve) => {
      resolve([
        {
          id: "1",
          name: "Áo thun nam",
          price: 100000,
          image: "2ba48c4c",
          slug: "ao-thun-nam",
          maxQuantity: 10,
          quantity: 1,
        },
      ]);
    });

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message as unknown as string);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const deleteItemCart = createAsyncThunk(
  "cart/deleteItemCart",
  async (id: string, thunkApi) => {
    // const response = await instance
    //   .delete(`/carts/${id}`)
    //   .then((res) => res.data);
    const response: ErrorPayload | SuccessPayload = await new Promise(
      (resolve) => {
        resolve({
          status: "success",
        });
      }
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
    // const response = await instance
    //   .delete(`/carts/${id}`)
    //   .then((res) => res.data);
    const response: ErrorPayload | SuccessPayload = await new Promise(
      (resolve) => {
        resolve({
          status: "success",
        });
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
    // const response = await instance
    //   .delete(`/carts/${id}`)
    //   .then((res) => res.data);
    const response: ErrorPayload | SuccessPayload = await new Promise(
      (resolve) => {
        resolve({
          status: "success",
        });
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
