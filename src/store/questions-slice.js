import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  length: 0,
  pageNum: 0,
  isNewQuest: false,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    resetQuestions(state) {
      state.pageNum = 0;
      state.items = [];
      state.length = 0;
    },
    getQuestions(state, action) {
      state.pageNum++;
      state.items = [...state.items, ...action.payload];
    },
    toggleWannaAsk(state) {
      state.isNewQuest = !state.isNewQuest;
    },
    setLength(state, action) {
      state.length = action.payload;
    },
    addQuestion(state, action) {
      state.items = [action.payload, ...state.items];
      state.length++;
      state.isNewQuest = false;
    },
    addReply(state, action) {
      const { id, reply } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) item.replies.push(reply);
        return item;
      });
    },
    voteQuestion(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          if (item.isVoted) {
            item.isVoted = false;
            item.likes--;
          } else {
            item.isVoted = true;
            item.likes++;
          }
        }
        return item;
      });
    },
  },
});

export const questionsActions = questionsSlice.actions;
export default questionsSlice.reducer;
