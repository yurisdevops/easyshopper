import { ProductProps } from "../../utils/@types/product.type";
import { clearSearch, searchProduct, searchReducer } from "./searchSlice";

describe("searchReducer", () => {
  const initialState = { searchResults: [] };

  const mockProducts: ProductProps[] = [
    {
      id: 1,
      title: "Notebook Gamer Acer",
      price: 5000,
      category: "",
      description: "",
      images: [],
      rating: 0,
      stock: 0,
      brand: "",
      reviews: [],
      tags: [],
    },
    {
      id: 2,
      title: "Teclado Mecanico Red Dragon",
      price: 600,
      category: "",
      description: "",
      images: [],
      rating: 0,
      stock: 0,
      brand: "",
      reviews: [],
      tags: [],
    },
    {
      id: 3,
      title: "Mouse Optico Red Dragon",
      price: 200,
      category: "",
      description: "",
      images: [],
      rating: 0,
      stock: 0,
      brand: "",
      reviews: [],
      tags: [],
    },
  ];

  it("should return the initial state", () => {
    const nextState = searchReducer(undefined, { type: "" });
    expect(nextState).toEqual(initialState);
  });

  it("should search and filter products correctly", () => {
    const nextState = searchReducer(
      initialState,
      searchProduct({ products: mockProducts, term: "Notebook" })
    );

    expect(nextState.searchResults.length).toBe(1);
    expect(nextState.searchResults[0].title).toBe("Notebook Gamer Acer");
  });

  it("should handle case-insensitive search", () => {
    const nextState = searchReducer(
      initialState,
      searchProduct({ products: mockProducts, term: "mouse" })
    );
    expect(nextState.searchResults.length).toBe(1);
    expect(nextState.searchResults[0].title).toBe("Mouse Optico Red Dragon");
  });

  it("should return empty results if no products matches", () => {
    const nextState = searchReducer(
      initialState,
      searchProduct({ products: mockProducts, term: "Monitor" })
    );

    expect(nextState.searchResults.length).toBe(0);
  });

  it("should clear search results", () => {
    const stateWithResults = {
      searchResults: [mockProducts[0]],
    };

    const nextState = searchReducer(stateWithResults, clearSearch());

    expect(nextState.searchResults.length).toBe(0);
    expect(nextState).toEqual(initialState);
  });
});
