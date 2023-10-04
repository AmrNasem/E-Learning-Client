import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
  totalPrice: 0,
  totalAmount: 0,
  isOpened: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      const courses = action.payload;
      state.items = courses;
      state.totalAmount = !!courses && courses.length;
      if (courses && courses.length) {
        const netPrices = courses.map((course) => course.price);
        state.totalPrice =
          netPrices.reduce((prev, current) => prev + current) || 0;
      } else {
        state.totalPrice = 0;
      }
    },
    toggleCart(state, action) {
      state.isOpened = action.payload;
    },
    toggleError(state, action) {
      state.error = action.payload;
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => {
        if (item.id === action.payload) {
          state.totalPrice -=
            item.price - (item.price * (item.discount || 10)) / 100;
          state.totalAmount--;
        }
        return item.id !== action.payload;
      });
    },
    addToCart(state, action) {
      const newCourse = action.payload;
      const price =
        newCourse.price - (newCourse.price * (newCourse.discount || 10)) / 100;
      state.items.unshift(newCourse);
      state.totalPrice += price;
      state.totalAmount++;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
