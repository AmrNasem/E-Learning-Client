import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { isLoading: false, categories: null, error: null },
  reducers: {
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
