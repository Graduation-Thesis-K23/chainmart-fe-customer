import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";
import { ErrorPayload, SuccessPayload } from "~/shared";

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

export const getUserInfo = createAsyncThunk(
  "setting/getUserInfo",
  async (_, thunkApi) => {
    const response: UserInfo | ErrorPayload = await instance.get(
      "/api/users/setting"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const updateUserInfo = createAsyncThunk(
  "setting/updateUserInfo",
  async (data: { [key: string]: string }, thunkApi) => {
    const response: UserInfo | ErrorPayload = await instance.post(
      "/api/users/setting",
      data
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const createAddress = createAsyncThunk(
  "setting/createAddress",
  async (data: Address, thunkApi) => {
    const response: Address | ErrorPayload = await instance.post<Address>(
      "/api/address",
      data
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const getAllAddress = createAsyncThunk(
  "setting/getAllAddress",
  async (_, thunkApi) => {
    const response: Address[] | ErrorPayload = await instance.get(
      "/api/address"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response as unknown as Address[]);
  }
);

export const deleteAddress = createAsyncThunk(
  "setting/deleteAddress",
  async (id: string, thunkApi) => {
    const response: SuccessPayload | ErrorPayload = await instance.delete(
      "/api/address/" + id
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(id);
  }
);

export const changePassword = createAsyncThunk(
  "setting/changePassword",
  async (data: ChangePasswordPayload, thunkApi) => {
    const response: { messageCode: string } | ErrorPayload =
      await instance.post("/api/users/change-password", data);

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default settingSlide.reducer;
