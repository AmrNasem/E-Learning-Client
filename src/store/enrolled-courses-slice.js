import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: null, error: null, isLoading: false };

const enrolledCoursesSlice = createSlice({
  name: "enrolled-courses",
  initialState,
  reducers: {
    setCourses(state, action) {
      state.items = action.payload;
    },
    setStates(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});
export const enrolledCoursesActions = enrolledCoursesSlice.actions;
export default enrolledCoursesSlice.reducer;
