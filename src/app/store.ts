import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartSlice";
import { searchReducer } from "../features/search/searchSlice";
import { productsReducer } from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
