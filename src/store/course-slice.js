import { createSlice } from "@reduxjs/toolkit";
// import jsonFile from "../assets/dummy.json";

const initialState = { isListed: false };
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    expandSection(state, action) {
      state.isListed = !state.isListed;
    },
  },
});

export const courseActions = courseSlice.actions;
export default courseSlice.reducer;
