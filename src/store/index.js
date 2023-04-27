import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import courseSlice from "./course-slice";
import instructorSlice from "./instructor-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    course: courseSlice,
    instructor: instructorSlice,
    user: userSlice,
  },
});

export default store;
