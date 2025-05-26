import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { AuthState, UserParams } from "../../utils/@types/user.type";

export const login = createAsyncThunk<
  User,
  UserParams,
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, trunkAPI) => {
  try {
    const credentialUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentialUser.user;
  } catch (error: any) {
    return trunkAPI.rejectWithValue(error.message);
  }
});

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload as string);
      });
  },
});

export const loginReducer = loginSlice.reducer;
