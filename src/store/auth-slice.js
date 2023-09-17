import { createSlice } from "@reduxjs/toolkit";
import jsonFile from "../assets/dummy.json";

const initialState = { user: null, instructor: null };
// const initialState = { user: jsonFile.users[0] };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
      if (user.role === "instructor") {
        state.instructor = jsonFile.instructors.find(
          (i) => i.id === user.instructor
        );
      } else {
        state.instructor = null;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
