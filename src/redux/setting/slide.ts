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
  id?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
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
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.address = state.data.address.filter(
        (add) => add.id !== action.payload
      );
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.status = ASYNC_STATUS.SUCCEED;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
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
    const response = await instance.post<Address>("/api/address", data);

    return response as unknown as Address;
  }
);

export const getAllAddress = createAsyncThunk(
  "setting/getAllAddress",
  async () => {
    const response = await instance.get<Address[]>("/api/address");

    return response as unknown as Address[];
  }
);

export const deleteAddress = createAsyncThunk(
  "setting/deleteAddress",
  async (id: string) => {
    await instance.delete("/api/address/" + id);

    return id;
  }
);

export const changePassword = createAsyncThunk(
  "setting/changePassword",
  async (data: ChangePasswordPayload) => {
    await instance.post("/api/users/change-password", data);

    return "success";
  }
);

export default settingSlide.reducer;
