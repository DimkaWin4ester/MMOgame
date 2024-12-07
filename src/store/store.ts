import { configureStore } from "@reduxjs/toolkit";
import {productsSlice} from "./products/productsSlice";
import { productOneSlice } from "./products/productOneSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productOne: productOneSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
