import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import courseSlice from "./course-slice";
import instructorSlice from "./instructor-slice";
import userSlice from "./user-slice";
import reviewsSlice from "./reviews-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    course: courseSlice,
    instructor: instructorSlice,
    user: userSlice,
    reviews: reviewsSlice,
  },
});

export default store;
