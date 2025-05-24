import {
  addItemCart,
  cartReducer,
  decrementItemCart,
  incrementItemCart,
  removeItemCart,
} from "./cartSlice";

import { ProductCartProps } from "../../utils/product.type";

describe("cartReducer", () => {
  const initialState = { cart: [], total: "R$ 0,00" };

  const mockProduct: ProductCartProps = {
    id: 1,
    title: "Produto Teste",
    price: 100,
    quantity: 1,
    totalPrice: 100,
    image: "",
  };

  it("should return the initial state", () => {
    const nextState = cartReducer(undefined, { type: "" });
    expect(nextState).toEqual(initialState);
  });

  it("should add an item to he cart", () => {
    const nextState = cartReducer(initialState, addItemCart(mockProduct));

    expect(nextState.cart.length).toBe(1);
    expect(nextState.cart[0]).toEqual(mockProduct);
    expect(nextState.total.replace(/\s/g, "")).toBe("R$100,00");
  });

  it("should remove an item from the cart", () => {
    const stateWithItem = { cart: [mockProduct], total: "R$ 100,00" };
    const nextState = cartReducer(stateWithItem, removeItemCart(mockProduct));

    expect(nextState.cart.length).toBe(0);
    expect(nextState.total.replace(/\s/g, "")).toBe("R$0,00");
  });

  it("shloud increment item quantity in the cart", () => {
    const stateWithItem = { cart: [mockProduct], total: "R$ 100,00" };
    const nextState = cartReducer(
      stateWithItem,
      incrementItemCart(mockProduct.id)
    );
    expect(nextState.cart[0].quantity).toBe(2);
    expect(nextState.cart[0].totalPrice).toBe(200);
    expect(nextState.total.replace(/\s/g, "")).toBe("R$200,00");
  });

  it("should decrement item quantity and remove if quantity becomes 0", () => {
    const stateWithItem = {
      cart: [{ ...mockProduct, quantity: 2, totalPrice: 200 }],
      total: "R$ 200,00",
    };
    const nextState = cartReducer(
      stateWithItem,
      decrementItemCart(mockProduct.id)
    );

    expect(nextState.cart[0].quantity).toBe(1);
    expect(nextState.cart[0].totalPrice).toBe(100);
    expect(nextState.total.replace(/\s/g, "")).toBe("R$100,00");

    const nextState2 = cartReducer(
      nextState,
      decrementItemCart(mockProduct.id)
    );

    expect(nextState2.cart.length).toBe(0);
    expect(nextState2.total.replace(/\s/g, "")).toBe("R$0,00");
  });
});
