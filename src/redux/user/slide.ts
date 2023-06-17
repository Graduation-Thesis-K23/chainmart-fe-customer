import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { RootState } from "../store";
import { SignInPayload, SignUpPayload } from "~/interfaces";

export interface User {
  name: string;
  role: string;
  photo: string;
  username: string;
}

export interface UserState {
  data: User;
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
  message: string;
}

const initialState: UserState = {
  data: {} as unknown as User,
  status: ASYNC_STATUS.IDLE,
  message: "",
};

export const loginSlide = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkCookieToken.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = ASYNC_STATUS.SUCCEED;
    });
    builder.addCase(checkCookieToken.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(checkCookieToken.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = {} as unknown as User;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = {} as unknown as User;
      state.message = action.error.message as unknown as string;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = {} as unknown as User;
      state.message = action.error.message as unknown as string;
    });
    builder.addCase(changeAvatar.fulfilled, (state, { payload }) => {
      state.data.photo = payload;
    });
  },
});

export const checkCookieToken = createAsyncThunk(
  "user/checkCookie",
  async (): Promise<User> => {
    const response = await instance.post("/api/auth/check-token");

    if ("message" in response) {
      return Promise.reject(response);
    }

    return response as unknown as User;
  },
  {
    condition: (_, { getState }) => {
      const rootState: RootState = getState() as RootState;

      const loginStatus = rootState.user.status;

      if (
        loginStatus === ASYNC_STATUS.LOADING ||
        loginStatus === ASYNC_STATUS.SUCCEED
      ) {
        return false;
      } else {
        return true;
      }
    },
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (account: SignInPayload) => {
    const response = await instance.post("/api/auth/sign-in", account);

    if ("message" in response) {
      return await Promise.reject(response);
    }

    return response as unknown as User;
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (account: SignUpPayload) => {
    const response = await instance.post("/api/auth/sign-up", account);

    if ("message" in response) {
      return await Promise.reject(response);
    }

    return response as unknown as User;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async () => await instance.get("/api/auth/logout")
);

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  async (formData: FormData) => {
    const response = await instance.post("/api/users/change-avatar", formData);

    try {
      return String(response);
    } catch (error) {
      return await Promise.reject(response);
    }
  }
);

export default loginSlide.reducer;
