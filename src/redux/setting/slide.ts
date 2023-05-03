import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";

export interface UserInfo {
  name: string;
  birthday: string;
  gender: string;
  phone: string;
}

export interface Address {
  phone: string;
  name: string;
  district: string;
  city: string;
  ward: string;
  street: string;
}

export interface SettingState {
  data: { info: UserInfo; address: Address[] };
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: SettingState = {
  data: { info: {} as unknown as UserInfo, address: [] },
  status: ASYNC_STATUS.IDLE,
};

export const settingSlide = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.info = action.payload;
    });
    builder.addCase(getUserInfo.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.info = action.payload;
    });
    builder.addCase(updateUserInfo.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.address.push(action.payload);
    });
    builder.addCase(getAllAddress.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.address = action.payload;
    });
  },
});

export const getUserInfo = createAsyncThunk("setting/getUserInfo", async () => {
  const response = await instance.get("/api/users/setting");

  return response as unknown as UserInfo;
});

export const updateUserInfo = createAsyncThunk(
  "setting/updateUserInfo",
  async (data: { [key: string]: string }) => {
    const response = await instance.post("/api/users/setting", data);

    return response as unknown as UserInfo;
  }
);

export const createAddress = createAsyncThunk(
  "setting/createAddress",
  async (data: Address) => {
    const response = await instance.post("/api/address", data);

    if ("message" in response) {
      return Promise.reject(response.message);
    }

    return response as unknown as Address;
  }
);

export const getAllAddress = createAsyncThunk(
  "setting/getAllAddress",
  async () => {
    const response = await instance.get("/api/address");

    if ("message" in response) {
      return Promise.reject(response.message);
    }

    return response as unknown as Address[];
  }
);

export default settingSlide.reducer;
