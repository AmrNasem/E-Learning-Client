import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lecture: null,
  items: [],
  pageNum: 0,
  isNewQuest: false,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestions(state, action) {
      state.pageNum++;
      state.items = [...state.items, ...action.payload];
    },
    toggleWannaAsk(state) {
      state.isNewQuest = !state.isNewQuest;
    },
    setLecture(state, action) {
      state.lecture = action.payload;
      state.items = [];
      state.pageNum = 0;
    },
    addQuestion(state, action) {
      const newQuestion = action.payload;
      state.items.unshift(newQuestion);
      state.lecture.questions.unshift(newQuestion);
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
