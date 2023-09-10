import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import reviewsSlice from "./reviews-slice";
import authSlice from "./auth-slice";
import qnaSlice from "./qna-slice";
import courseSlice from "./course-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    reviews: reviewsSlice,
    qna: qnaSlice,
    course: courseSlice,
  },
});

export default store;
