import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartSlice";
import { loginReducer } from "../features/login/loginSlice";
import { logoutReducer } from "../features/logout/logoutSlice";
import { productsReducer } from "../features/products/productsSlice";
import { registerReducer } from "../features/register/registerSlice";
import { searchReducer } from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    products: productsReducer,
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
