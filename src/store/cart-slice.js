import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalPrice: 0, isOpened: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpened = !state.isOpened;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
