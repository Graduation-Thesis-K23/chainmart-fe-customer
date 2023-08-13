import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";

export type MessageOrder = {
  type: "search_orders";
  orders: {
    status: string;
    total: number;
    address: string;
  }[];
};

export type MessageProduct = {
  type: "search_product";
  products: {
    name: string;
    price: number;
    slug: string;
    image: string;
    sale: number;
  }[];
};

export type MessageText = {
  type: "text";
  text: string;
};

export type Message = MessageOrder | MessageProduct | MessageText | string;

export interface MessageState {
  data: Message[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: MessageState = {
  data: [],
  status: ASYNC_STATUS.SUCCEED,
};

export const messagesSlide = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(action.payload);
    });
    builder.addCase(receiveMessage.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(action.payload);
    });
  },
});

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (message: string) => {
    return Promise.resolve<string>(message);
  }
);

export const receiveMessage = createAsyncThunk(
  "message/receiveMessage",
  async (message: Message) => {
    console.log(message);
    return Promise.resolve(message);
  }
);

export default messagesSlide.reducer;
