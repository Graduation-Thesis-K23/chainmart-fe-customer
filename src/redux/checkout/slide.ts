import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, ICart, SuccessPayload } from "~/interfaces";

export interface CheckoutState {
  address: string;
  note: string;
  payment: string;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

export interface PlaceOrder {
  cart: Pick<ICart, "id" | "quantity">[];
  checkoutState: Omit<CheckoutState, "status">;
}

const initialState: CheckoutState = {
  address: "",
  note: "",
  payment: "CASH",
  status: ASYNC_STATUS.IDLE,
};

export const checkoutSlide = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clearCheckout: (state) => {
      state.address = "";
      state.note = "";
      state.payment = "";
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setNoteCheckout: (state, action) => {
      state.note = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.address = "";
      state.note = "";
      state.payment = "CASH";
    });
  },
});

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (checkoutState: PlaceOrder, thunkApi) => {
    console.log(checkoutState);
    const response: ErrorPayload | SuccessPayload = await new Promise(
      (resolve) => {
        resolve({
          status: "success",
        });
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const { clearCheckout, setAddress, setNoteCheckout, setPayment } =
  checkoutSlide.actions;

export default checkoutSlide.reducer;
