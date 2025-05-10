import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../utils/product.type";

interface SearchState {
  searchResults: ProductProps[];
}

const initialState: SearchState = {
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchProduct(
      state,
      action: PayloadAction<{ products: ProductProps[]; term: string }>
    ) {
      const { products, term } = action.payload;
      state.searchResults = products.filter((product) =>
        product.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      );
    },
    clearSearch(state) {
      state.searchResults = [];
    },
  },
});

export const { searchProduct, clearSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
