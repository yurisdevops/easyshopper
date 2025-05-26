import { login, loginReducer } from "./loginSlice";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("loginSlice", () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };

  it("should handle login.pending", () => {
    const nextState = loginReducer(
      initialState,
      login.pending("", { email: "", password: "" })
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle login.fulfilled", () => {
    const mockUser = { uid: "123", email: "test@test.com", password: "123456" };
    const nextState = loginReducer(
      initialState,
      login.fulfilled(mockUser as any, "", {
        email: "test@test.com",
        password: "123456",
      })
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
  });

  it("should handle login.rejected", () => {
    const nextState = loginReducer(
      initialState,
      login.rejected(
        new Error(),
        "",
        {
          email: "test@test.com",
          password: "123456",
        },
        "Erro ao efetuar o login"
      )
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Erro ao efetuar o login");
  });
});
