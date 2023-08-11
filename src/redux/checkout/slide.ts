import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { Payment } from "~/shared";
import instance from "~/apis/axios-instance";

export interface CheckoutState {
  address_id: string;
  note: string;
  payment: Payment;
  currentBankingOrder: CurrentBankingOrder | null;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

export interface CurrentBankingOrder {
  id: string;
  expiration_timestamp: string;
  user_id: string;
}

export interface Order {
  product_id: string;
  quantity: number;
}

export interface PlaceOrder
  extends Omit<CheckoutState, "status" | "currentBankingOrder"> {
  order_details: Order[];
}

const initialState: CheckoutState = {
  address_id: "",
  note: "",
  payment: Payment.Cash,
  currentBankingOrder: null,
  status: ASYNC_STATUS.IDLE,
};

export const checkoutSlide = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clearCheckout: (state) => {
      state.address_id = "";
      state.note = "";
      state.payment = Payment.Cash;
    },
    setAddress: (state, action) => {
      state.address_id = action.payload;
    },
    setNoteCheckout: (state, action) => {
      state.note = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setCurrentBankingOrder: (state, action) => {
      state.currentBankingOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.address_id = "";
      state.note = "";
      state.payment = Payment.Cash;
    });

    builder.addCase(findBankingOrder.fulfilled, (state, action) => {
      state.currentBankingOrder =
        action.payload as unknown as CurrentBankingOrder;
    });
  },
});

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (checkoutState: PlaceOrder, thunkApi) => {
    const response = await instance.post("/api/orders", checkoutState);

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const findBankingOrder = createAsyncThunk(
  "checkout/banking",
  async (checkoutState, thunkApi) => {
    const response = await instance.get("/api/orders/banking");
    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }
    return thunkApi.fulfillWithValue(response);
  }
);

export const cancelBankingOrder = createAsyncThunk(
  "checkout/cancel-banking",
  async (orderId: string, thunkApi) => {
    const response = await instance.post("/api/orders/banking/cancel", orderId);
    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }
    return thunkApi.fulfillWithValue(response);
  }
);

export const {
  clearCheckout,
  setAddress,
  setNoteCheckout,
  setPayment,
  setCurrentBankingOrder,
} = checkoutSlide.actions;

export default checkoutSlide.reducer;
