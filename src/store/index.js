import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import courseSlice from "./course-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    course: courseSlice,
  },
});

export default store;
