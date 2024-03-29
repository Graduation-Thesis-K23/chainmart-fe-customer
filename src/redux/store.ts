import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { productsReducer } from "./products";
import { productReducer } from "./product";
import { familiarReducer } from "./familiar";
import { userReducer } from "./user";
import { settingReducer } from "./setting";
import { searchReducer } from "./search";
import { accountReducer } from "./account";
import { filterReducer } from "./filter";
import { messagesReducer } from "./messages";
import { cartReducer } from "./cart";
import { checkoutReducer } from "./checkout";
import { ordersReducer } from "./orders";
import { ratingReducer } from "./rating";

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    familiar: familiarReducer,
    user: userReducer,
    setting: settingReducer,
    search: searchReducer,
    account: accountReducer,
    filter: filterReducer,
    messages: messagesReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    rating: ratingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
