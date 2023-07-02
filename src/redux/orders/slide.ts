import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { Address } from "../setting";
import { OrderProductType, OrderStatus, Payment } from "~/shared";

export interface OrderType {
  id: string;
  create_at: Date;
  address: Address;
  estimated_shipped_date: Date;
  shipped_date: Date;
  approved_date: Date;
  return_date: Date;
  status: OrderStatus;
  payment: Payment;
  products: OrderProductType[];
}

export interface OrdersState {
  data: OrderType[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  activeKey: OrderStatus | "all";
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
      const index = state.data.findIndex((item) => item.id === action.payload);
      state.data[index].status = OrderStatus.Cancelled;
      state.status = ASYNC_STATUS.SUCCEED;
      state.activeKey = OrderStatus.Cancelled;
    });
    builder.addCase(receivedOrder.fulfilled, (state, action) => {
      const index = state.data.findIndex((item) => item.id === action.payload);
      state.data[index].status = OrderStatus.Completed;
      state.status = ASYNC_STATUS.SUCCEED;
      state.activeKey = OrderStatus.Completed;
    });
    builder.addCase(returnOrder.fulfilled, (state, action) => {
      const index = state.data.findIndex((item) => item.id === action.payload);
      state.data[index].status = OrderStatus.Returned;
      state.status = ASYNC_STATUS.SUCCEED;
      state.activeKey = OrderStatus.Returned;
    });
    builder.addCase(resellOrder.fulfilled, (state, action) => {
      const newOrder = action.payload;
      state.data.push(newOrder);
      state.activeKey = OrderStatus.Processing;
      state.status = ASYNC_STATUS.SUCCEED;
    });
  },
});

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkApi) => {
    const response = [
      {
        id: "1",
        create_at: new Date(2023, 7, 7),
        address: {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0123456789",
          street: "123 Đường ABC, Quận XYZ, TP. HCM",
          district: "Quận XYZ",
          city: "TP. HCM",
          ward: "Phường 123",
        },
        estimated_shipped_date: new Date(2023, 7, 7),
        shipped_date: new Date(2023, 7, 7),
        approved_date: new Date(2023, 7, 7),
        return_date: new Date(2023, 7, 7),
        status: OrderStatus.Processing,
        payment: Payment.Cash,
        products: [
          {
            id: "1",
            name: "Vỏ gối cotton Thắng Lợi chính hãng ( gối nằm - gối ôm ) [ảnh thất 2]",
            price: 100000,
            sale: 0,
            quantity: 1,
            image: "2ba48c4c",
          },
          {
            id: "2",
            name: "Vỏ gối cotton Thắng Lợi chính hãng ( gối nằm - gối ôm ) [ảnh thất 2] 21",
            price: 1000000,
            sale: 2,
            quantity: 2,
            image: "2ba48c4c",
          },
        ],
      },
      {
        id: "2",
        create_at: new Date(2023, 7, 7),
        address: {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0123456789",
          street: "123 Đường ABC, Quận XYZ, TP. HCM",
          district: "Quận XYZ",
          city: "TP. HCM",
          ward: "Phường 123",
        },
        estimated_shipped_date: new Date(2023, 7, 7),
        shipped_date: new Date(2023, 7, 7),
        approved_date: new Date(2023, 7, 7),
        return_date: new Date(2023, 7, 7),
        status: OrderStatus.Approved,
        payment: Payment.Cash,
        products: [
          {
            id: "1",
            name: "Áo thun nam",
            price: 100000,
            sale: 0,
            quantity: 1,
            image: "2ba48c4c",
          },
          {
            id: "2",
            name: "Áo thun nam 1",
            price: 1000000,
            sale: 2,
            quantity: 2,
            image: "2ba48c4c",
          },
        ],
      },
      {
        id: "3",
        create_at: new Date(2023, 7, 7),
        address: {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0123456789",
          street: "123 Đường ABC, Quận XYZ, TP. HCM",
          district: "Quận XYZ",
          city: "TP. HCM",
          ward: "Phường 123",
        },
        estimated_shipped_date: new Date(2023, 7, 7),
        shipped_date: new Date(2023, 7, 7),
        approved_date: new Date(2023, 7, 7),
        return_date: new Date(2023, 7, 7),
        status: OrderStatus.Shipping,
        payment: Payment.Cash,
        products: [
          {
            id: "1",
            name: "Áo thun nam",
            price: 100000,
            sale: 0,
            quantity: 1,
            image: "2ba48c4c",
          },
          {
            id: "2",
            name: "Áo thun nam 1",
            price: 1000000,
            sale: 2,
            quantity: 2,
            image: "2ba48c4c",
          },
        ],
      },
      {
        id: "4",
        create_at: new Date(2023, 7, 7),
        address: {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0123456789",
          street: "123 Đường ABC, Quận XYZ, TP. HCM",
          district: "Quận XYZ",
          city: "TP. HCM",
          ward: "Phường 123",
        },
        estimated_shipped_date: new Date(2023, 7, 7),
        shipped_date: new Date(2023, 7, 7),
        approved_date: new Date(2023, 7, 7),
        return_date: new Date(2023, 7, 7),
        status: OrderStatus.Completed,
        payment: Payment.Cash,
        products: [
          {
            id: "1",
            name: "Áo thun nam",
            price: 100000,
            sale: 0,
            quantity: 1,
            image: "2ba48c4c",
          },
          {
            id: "2",
            name: "Áo thun nam 1",
            price: 1000000,
            sale: 2,
            quantity: 2,
            image: "2ba48c4c",
          },
        ],
      },
      {
        id: "5",
        create_at: new Date(2023, 7, 7),
        address: {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0123456789",
          street: "123 Đường ABC, Quận XYZ, TP. HCM",
          district: "Quận XYZ",
          city: "TP. HCM",
          ward: "Phường 123",
        },
        estimated_shipped_date: new Date(2023, 7, 7),
        shipped_date: new Date(2023, 7, 7),
        approved_date: new Date(2023, 7, 7),
        return_date: new Date(2023, 7, 7),
        status: OrderStatus.Cancelled,
        payment: Payment.Cash,
        products: [
          {
            id: "1",
            name: "Áo thun nam",
            price: 100000,
            sale: 0,
            quantity: 1,
            image: "2ba48c4c",
          },
          {
            id: "2",
            name: "Áo thun nam 1",
            price: 1000000,
            sale: 2,
            quantity: 2,
            image: "2ba48c4c",
          },
        ],
      },
      {
        id: "6",
        create_at: new Date(2023, 7, 7),
        address: {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0123456789",
          street: "123 Đường ABC, Quận XYZ, TP. HCM",
          district: "Quận XYZ",
          city: "TP. HCM",
          ward: "Phường 123",
        },
        estimated_shipped_date: new Date(2023, 7, 7),
        shipped_date: new Date(2023, 7, 7),
        approved_date: new Date(2023, 7, 7),
        return_date: new Date(2023, 7, 7),
        status: OrderStatus.Returned,
        payment: Payment.Cash,
        products: [
          {
            id: "1",
            name: "Áo thun nam",
            price: 100000,
            sale: 0,
            quantity: 1,
            image: "2ba48c4c",
          },
          {
            id: "2",
            name: "Áo thun nam 1",
            price: 1000000,
            sale: 2,
            quantity: 2,
            image: "2ba48c4c",
          },
        ],
      },
    ];

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id: string, thunkApi) => {
    const response = {
      status: "success",
    };

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(id);
  }
);

export const receivedOrder = createAsyncThunk(
  "order/receivedOrder",
  async (id: string, thunkApi) => {
    const response = {
      status: "success",
    };

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(id);
  }
);

export const returnOrder = createAsyncThunk(
  "order/returnOrder",
  async (id: string, thunkApi) => {
    const response = {
      status: "success",
    };

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(id);
  }
);

export const resellOrder = createAsyncThunk(
  "order/resellOrder",
  async (id: string, thunkApi) => {
    const response = {
      id: "11",
      create_at: new Date(2023, 7, 7),
      address: {
        id: "1",
        name: "Nguyễn Văn A",
        phone: "0123456789",
        street: "123 Đường ABC, Quận XYZ, TP. HCM",
        district: "Quận XYZ",
        city: "TP. HCM",
        ward: "Phường 123",
      },
      estimated_shipped_date: new Date(2023, 7, 7),
      shipped_date: new Date(2023, 7, 7),
      approved_date: new Date(2023, 7, 7),
      return_date: new Date(2023, 7, 7),
      status: OrderStatus.Processing,
      payment: Payment.Cash,
      products: [
        {
          id: "1",
          name: "Vỏ gối cotton Thắng Lợi chính hãng ( gối nằm - gối ôm ) [ảnh thất 2]",
          price: 100000,
          sale: 0,
          quantity: 1,
          image: "2ba48c4c",
        },
        {
          id: "2",
          name: "Vỏ gối cotton Thắng Lợi chính hãng ( gối nằm - gối ôm ) [ảnh thất 2] 21",
          price: 1000000,
          sale: 2,
          quantity: 2,
          image: "2ba48c4c",
        },
      ],
    };

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const { setActiveKey } = orderSlice.actions;

export default orderSlice.reducer;
