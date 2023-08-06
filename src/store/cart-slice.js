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
      const removedItem = action.payload;
      const price =
        state.items[removedItem].price -
        (state.items[removedItem].price * state.items[removedItem].discount) /
          100;
      delete state.items[removedItem];
      state.totalPrice -= price;
      state.totalAmount--;
    },
    addToCart(state, action) {
      const newCourse = action.payload;
      if (state.items[newCourse.id]) {
        const price =
          newCourse.price - (newCourse.price * newCourse.discount) / 100;
        delete state.items[newCourse.id];
        state.totalPrice -= price;
        state.totalAmount--;
        return;
      }
      const courseObj = {};
      courseObj[newCourse.id] = newCourse;
      state.items = { ...courseObj, ...state.items };
      state.totalPrice +=
        newCourse.price - (newCourse.price * newCourse.discount) / 100;
      state.totalAmount++;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
