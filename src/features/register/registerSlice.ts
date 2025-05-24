import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, User } from "firebase/auth";

import { auth } from "../../services/firebaseConnection";

interface RegisterUserParams {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const register = createAsyncThunk<
  User,
  RegisterUserParams,
  { rejectValue: string }
>("auth/registerUser", async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authReducer = authSlice.reducer;
