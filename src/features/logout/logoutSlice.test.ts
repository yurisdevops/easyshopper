import { logout, logoutReducer } from "./logoutSlice";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  signOut: jest.fn(),
}));

describe("logoutSlice", () => {
  const initialState = {
    user: { email: "test@example.com", password: "123456" },
    loading: false,
    error: null,
  };

  it("should handle logout.pending", () => {
    const nextState = logoutReducer(initialState, logout.pending(""));

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle logout.fulfilled", () => {
    const nextState = logoutReducer(
      initialState,
      logout.fulfilled(undefined, "")
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.user).toBe(null);
  });

  it("should handle logout.rejected", () => {
    const nextState = logoutReducer(
      initialState,
      logout.rejected(new Error(), "", undefined, "Erro ao fazer o logout")
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toEqual("Erro ao fazer o logout");
  });
});
