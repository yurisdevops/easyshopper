import { register, registerReducer } from "./registerSlice";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "teste@teste.com" },
  })),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe("authSlice", () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };

  it("should handle register.pending", () => {
    const nextState = registerReducer(
      initialState,
      register.pending("", { email: "", password: "" })
    );
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle register.fulfilled", () => {
    const mockUser = { uid: "123", email: "teste@teste.com" };
    const nextState = registerReducer(
      initialState,
      register.fulfilled(mockUser as any, "", {
        email: "teste@teste.com",
        password: "123456",
      })
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
  });

  it("should handle register.rejected", () => {
    const nextState = registerReducer(
      initialState,
      register.rejected(
        new Error(),
        "",
        { email: "teste@teste.com", password: "123456" },
        "Erro ao registrar"
      )
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Erro ao registrar");
  });
});
