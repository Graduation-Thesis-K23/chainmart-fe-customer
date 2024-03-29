import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import instance from "~/apis/axios-instance";
import { RootState } from "../store";
import { ErrorPayload, SignInPayload, SignUpPayload } from "~/shared";

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
      state.data = payload;
      state.status = ASYNC_STATUS.SUCCEED;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      const { message } = action.payload as ErrorPayload;
      state.status = ASYNC_STATUS.FAILED;
      state.data = {} as unknown as User;
      state.message = message;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      const { message } = action.payload as ErrorPayload;
      state.status = ASYNC_STATUS.FAILED;
      state.data = {} as unknown as User;
      state.message = message;
    });
    builder.addCase(changeAvatar.fulfilled, (state, { payload }) => {
      state.data.photo = payload.image;
    });
  },
});

export const checkCookieToken = createAsyncThunk(
  "user/checkCookie",
  async (_, thunkApi) => {
    const response: User | ErrorPayload = await instance.post(
      "/api/auth/check-token"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
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
  async (account: SignInPayload, thunkApi) => {
    const response: User | ErrorPayload = await instance.post(
      "/api/auth/sign-in",
      account
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (account: SignUpPayload, thunkApi) => {
    const response: User | ErrorPayload = await instance.post(
      "/api/auth/sign-up",
      account
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async () => await instance.get("/api/auth/logout")
);

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  async (formData: FormData, thunkApi) => {
    const response:
      | {
          image: string;
        }
      | ErrorPayload = await instance.post(
      "/api/users/change-avatar",
      formData
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default loginSlide.reducer;
