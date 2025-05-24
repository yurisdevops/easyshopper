import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProductCartProps } from "../../utils/product.type";

interface CartState {
  cart: ProductCartProps[];
  total: string;
}

const initialState: CartState = {
  cart: [],
  total: "R$ 0,00",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart(state, action: PayloadAction<ProductCartProps>) {
      const product = action.payload;

      const index = state.cart.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        state.cart[index].quantity += 1;
        state.cart[index].totalPrice =
          state.cart[index].quantity * state.cart[index].price;
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
          totalPrice: product.price,
        });
      }

      uploadTotal(state);
    },
    removeItemCart(state, action: PayloadAction<ProductCartProps>) {
      const product = action.payload;

      const index = state.cart.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        state.cart.splice(index, 1);
        uploadTotal(state);
      }
      uploadTotal(state);
    },
    incrementItemCart(state, action: PayloadAction<number>) {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.cart[index].quantity += 1;
        state.cart[index].totalPrice =
          state.cart[index].quantity * state.cart[index].price;
        uploadTotal(state);
      }
    },
    decrementItemCart(state, action: PayloadAction<number>) {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1;
          state.cart[index].totalPrice =
            state.cart[index].quantity * state.cart[index].price;
        } else {
          state.cart.splice(index, 1);
        }
        uploadTotal(state);
      }
    },
  },
});

function uploadTotal(state: CartState) {
  const total = state.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  state.total = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const {
  addItemCart,
  removeItemCart,
  decrementItemCart,
  incrementItemCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
