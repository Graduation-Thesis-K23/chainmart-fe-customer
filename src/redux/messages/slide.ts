import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
export interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: string;
  receiver?: string;
  status?: string;
}

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
      state.data.push(action.payload as unknown as Message);
    });
    builder.addCase(receiveMessage.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(action.payload as unknown as Message);
    });
  },
});

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (message: string) => {
    return Promise.resolve({
      id: Date.now().toString(),
      content: message,
      createdAt: Date.now().toString(),
      sender: "anonymous",
    });
  }
);

export const receiveMessage = createAsyncThunk(
  "message/receiveMessage",
  async (message: string) => {
    return Promise.resolve({
      id: Date.now().toString(),
      content: message,
      createdAt: Date.now().toString(),
      sender: "chatbot",
    });
  }
);

export default messagesSlide.reducer;
