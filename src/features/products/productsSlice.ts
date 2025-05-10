import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../utils/product.type";

interface ProductsState {
  products: ProductProps[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductProps[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProduct } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
