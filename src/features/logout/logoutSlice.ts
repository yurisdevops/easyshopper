import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";

interface UserState {
  user: { email: string; password: string } | null;
  loading: boolean;
  error: string | null;
}
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: UserState = {
  user: {
    email: "test@test.com",
    password: "123456",
  },
  loading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(logout.fulfilled, (state) => {
        (state.loading = false), (state.user = null);
      })
      .addCase(logout.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload as string);
      });
  },
});

export const logoutReducer = logoutSlice.reducer;
