import { createSlice } from "@reduxjs/toolkit";

const initialState = { instructor: {} };
const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    resetState(state, action) {
      state.instructor = action.payload;
    },
  },
});

export const instructorActions = instructorSlice.actions;
export default instructorSlice.reducer;
