export const getAuth = jest.fn(() => ({
  currentUser: { uid: "123", email: "test@example.com" },
}));

export const createUserWithEmailAndPassword = jest.fn(async () => ({
  user: { uid: "123", email: "test@example.com" },
}));
