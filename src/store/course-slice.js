import { createSlice } from "@reduxjs/toolkit";

const initialState = { sections: [] };
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addSection(state, action) {
      const section = action.payload;
      state.sections.push(section);
    },
  },
});

export const courseActions = courseSlice.actions;
export default courseSlice.reducer;
