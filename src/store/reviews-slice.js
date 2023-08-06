import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { items: [], isPaginated: false },
  reducers: {
    toggleIsPaginated(state, action = { payload: false }) {
      state.isPaginated = action.payload;
    },
    loadItems(state, action) {
      state.items = action.payload;
    },
    getMoreReviews(state, action) {
      state.items = [...state.items, ...action.payload];
    },
  },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
