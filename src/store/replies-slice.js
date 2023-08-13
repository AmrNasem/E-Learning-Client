import { createSlice } from "@reduxjs/toolkit";

const initialState = { question: {}, items: [], pageNum: 0 };

const repliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    resetReplies(state, action) {
      const question = action.payload;
      state.question = question;
      state.pageNum = 1;
      state.items = question.replies.slice(0, 3);
    },
    getReplies(state, action) {
      state.pageNum++;
      state.items = [...state.items, ...action.payload];
    },
    addReply(state, action) {
      state.question.replies.push(action.payload);
      state.items.push(action.payload);
    },
    voteQuestion(state) {
      if (state.question.isVoted) {
        state.question.isVoted = false;
        state.question.likes--;
      } else {
        state.question.isVoted = true;
        state.question.likes++;
      }
    },
  },
});

export const repliesActions = repliesSlice.actions;
export default repliesSlice.reducer;
