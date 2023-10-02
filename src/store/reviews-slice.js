import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { items: [], courseId: null, page: 0 },
  reducers: {
    getReviews(state, action) {
      state.items = [...state.items, ...action.payload];
      state.page++;
    },
    setReviews(state, action) {
      state.page = 0;
      state.items = [];
      state.courseId = action.payload;
    },
  },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
