import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, instructor: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
