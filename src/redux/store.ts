import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { productsReducer } from "./products";
import { productReducer } from "./product";
import { familiarReducer } from "./familiar";

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    familiar: familiarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
