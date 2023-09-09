import { createSlice } from "@reduxjs/toolkit";
import jsonFile from "../assets/dummy.json";

const initialState = { user: jsonFile.users[0] };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
