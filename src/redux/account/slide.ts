import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";

export interface UserAccount {
  username: string;
  facebook: string;
  hasFacebookVerify: boolean;
  email: string;
  hasEmailVerify: boolean;
}

export interface AccountState {
  data: UserAccount;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: AccountState = {
  data: {} as UserAccount,
  status: ASYNC_STATUS.IDLE,
};

export const accountSlide = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
  },
});

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (username: string): Promise<UserAccount> =>
    await instance.get("/api/auth/" + username)
);

export default accountSlide.reducer;
