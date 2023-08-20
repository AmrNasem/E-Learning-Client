import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
  isOpened: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpened = !state.isOpened;
    },
    removeFromCart(state, action) {
      let removedItem;
      state.items = state.items.filter((item) => {
        if (item.id === action.payload) removedItem = item;
        return item.id !== action.payload;
      });

      state.totalPrice -=
        removedItem.price - (removedItem.price * removedItem.discount) / 100;
      state.totalAmount--;
    },
    addToCart(state, action) {
      const newCourse = action.payload;
      const price =
        newCourse.price - (newCourse.price * newCourse.discount) / 100;
      state.items.unshift(newCourse);
      state.totalPrice += price;
      state.totalAmount++;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
