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
  data: [
    {
      id: "1",
      content: "Hello",
      createdAt: "2021-08-01T00:00:00.000Z",
      sender: "anonymous",
      status: "read",
    },
    {
      id: "2",
      content: "Hi how are you? I'm fine thank you and you? I'm fine too.",
      createdAt: "2021-08-01T00:00:00.000Z",
      sender: "chatbot",
      receiver: "anonymous",
    },
    {
      id: "3",
      content:
        "How are you? How are you? How are you? How are you? How are you? How are you?",
      createdAt: "2021-08-01T00:00:00.000Z",
      sender: "anonymous",
    },
    {
      id: "4",
      content: "I'm fine",
      createdAt: "2021-08-01T00:00:00.000Z",
      sender: "chatbot",
      receiver: "anonymous",
    },
  ],
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
  },
});

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (message: string) => {
    return Promise.resolve({
      id: "5",
      content: message,
      createdAt: Date.now().toString(),
      sender: "anonymous",
    });
  }
);

export default messagesSlide.reducer;
