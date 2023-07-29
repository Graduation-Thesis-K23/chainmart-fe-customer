import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { Address } from "../setting";
import {
  OrderProductType,
  OrderStatus,
  Payment,
  SuccessPayload,
} from "~/shared";
import { ErrorPayload } from "~/shared";
import instance from "~/apis/axios-instance";

export interface OrderType {
  id: string;
  created_at: Date;
  address: Address;
  approved_date?: Date;
  packaged_date?: Date;
  started_date?: Date;
  returned_date?: Date;
  completed_date?: Date;
  return_date?: Date;
  cancelled_date?: Date;
  received_date?: Date;
  rating_date?: Date;
  status: OrderStatus;
  payment: Payment;
  order_details: OrderProductType[];
}

export interface OrdersState {
  data: OrderType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  activeKey: OrderStatus | "all" | "Rated";
}

const initialState: OrdersState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
  activeKey: "all",
};

export const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      const { id, cancelled_date } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index].status = OrderStatus.Cancelled;
      state.data[index].cancelled_date = cancelled_date;
      state.status = ASYNC_STATUS.SUCCEED;
      state.activeKey = OrderStatus.Cancelled;
    });
    builder.addCase(receivedOrder.fulfilled, (state, action) => {
      const { id, completed_date } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index].status = OrderStatus.Completed;
      state.data[index].completed_date = completed_date;
      state.status = ASYNC_STATUS.SUCCEED;
      state.activeKey = OrderStatus.Completed;
    });
    builder.addCase(returnOrder.fulfilled, (state, action) => {
      const { id, return_date } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index].status = OrderStatus.Returned;
      state.data[index].return_date = return_date;
      state.status = ASYNC_STATUS.SUCCEED;
      state.activeKey = OrderStatus.Returned;
    });
    builder.addCase(resellOrder.fulfilled, (state, action) => {
      const newOrder = action.payload;
      state.data.push(newOrder);
      state.activeKey = OrderStatus.Created;
      state.status = ASYNC_STATUS.SUCCEED;
    });
    builder.addCase(commentOrder.fulfilled, (state) => {
      state.activeKey = "Rated";
      state.status = ASYNC_STATUS.SUCCEED;
    });
    builder.addCase(commentOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
  },
});

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (status: OrderStatus | "all", thunkApi) => {
    console.log(status);
    const response: OrderType[] | ErrorPayload = await instance.get(
      "/api/orders?status=" + status
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id: string, thunkApi) => {
    console.log(id);
    const response: ErrorPayload | OrderType = await instance.patch(
      "/api/orders/" + id + "/cancel"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const receivedOrder = createAsyncThunk(
  "order/receivedOrder",
  async (id: string, thunkApi) => {
    const response: ErrorPayload | OrderType = await instance.patch(
      "/api/orders/" + id + "/received"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const returnOrder = createAsyncThunk(
  "order/returnOrder",
  async (id: string, thunkApi) => {
    const response: ErrorPayload | OrderType = await instance.patch(
      "/api/orders/" + id + "/return"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const resellOrder = createAsyncThunk(
  "order/resellOrder",
  async (id: string, thunkApi) => {
    const response: OrderType | ErrorPayload = await instance.post(
      "/api/orders/resell",
      {
        order_id: id,
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const commentOrder = createAsyncThunk(
  "order/commentOrder",
  async (data: FormData, thunkApi) => {
    const response: ErrorPayload | SuccessPayload = await instance.post(
      "/api/orders/comment",
      data
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const { setActiveKey } = orderSlice.actions;

export default orderSlice.reducer;
