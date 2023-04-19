import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import instance from "~/services/axios-instance";
import { RootState } from "../store";
import { ProductType } from "../products";

export interface FamiliarProduct {
  id: string;
  name: string;
  price: number;
  sale?: number;
  images: Array<string>;
  slug: string;
}

export interface FamiliarProductState {
  data: FamiliarProduct[];
  status: typeof ASYNC_STATUS[keyof typeof ASYNC_STATUS];
}

const initialState: FamiliarProductState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const familiarSlide = createSlice({
  name: "familiar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFamiliarProduct.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchFamiliarProduct.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;

      const familiarProducts: FamiliarProduct[] = action.payload.map((p) => ({
        images: p.images.split(","),
        id: p.id,
        name: p.name,
        price: p.price,
        sale: p.sale,
        slug: p.slug,
      }));

      state.data = familiarProducts;
    });
  },
});

export const fetchFamiliarProduct = createAsyncThunk(
  "familiar/fetchFamiliarProduct",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (uuid: string): Promise<ProductType[]> =>
    await instance.get("/api/products"),
  {
    condition: (_, { getState }) => {
      const rootState: RootState = getState() as RootState;

      const familiarStateStatus = rootState.familiar.status;

      if (
        familiarStateStatus === ASYNC_STATUS.LOADING ||
        familiarStateStatus === ASYNC_STATUS.SUCCEED
      ) {
        return false;
      } else {
        return true;
      }
    },
  }
);

export default familiarSlide.reducer;
