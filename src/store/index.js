import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import courseSlice from "./course-slice";
import instructorSlice from "./instructor-slice";
import userSlice from "./user-slice";
import reviewsSlice from "./reviews-slice";
import questionsSlice from "./questions-slice";
import repliesSlice from "./replies-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    course: courseSlice,
    instructor: instructorSlice,
    user: userSlice,
    reviews: reviewsSlice,
    questions: questionsSlice,
    replies: repliesSlice,
  },
});

export default store;
