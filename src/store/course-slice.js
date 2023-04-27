import { createSlice } from "@reduxjs/toolkit";

const initialState = { course: {} };
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetState(state, action) {
      state.course = action.payload;
    },
  },
});

export const courseActions = courseSlice.actions;
export default courseSlice.reducer;
