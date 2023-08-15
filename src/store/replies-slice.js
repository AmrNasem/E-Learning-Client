import { createSlice } from "@reduxjs/toolkit";

const initialState = { question: null, items: [], pageNum: 0 };

const repliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    getReplies(state, action) {
      state.pageNum++;
      state.items = [...state.items, ...action.payload];
    },
    setQuestion(state, action) {
      state.question = action.payload;
      state.items = [];
      state.pageNum = 0;
    },
    removeReply(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.question.replies = state.question.replies.filter(
        (r) => r.id !== action.payload
      );
      if (state.items.length < state.question.replies.length) {
        state.items.push(state.question.replies[state.items.length]);
      }
    },
    addReply(state, action) {
      state.items.push(action.payload);
      state.question.replies.unshift(action.payload);
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
