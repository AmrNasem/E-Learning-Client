import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { items: [], isPaginated: false, page: 0 },
  reducers: {
    toggleIsPaginated(state, action = { payload: false }) {
      state.isPaginated = action.payload;
    },
    getReviews(state, action) {
      state.items = [...state.items, ...action.payload];
      state.page++;
    },
    resetPages(state) {
      state.page = 0;
      state.items = [];
    },
  },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;
