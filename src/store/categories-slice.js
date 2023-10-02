import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    categories: null,
    error: null,
    isOpen: false,
  },
  reducers: {
    toggleCategories(state, action) {
      state.isOpen = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setStates(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
