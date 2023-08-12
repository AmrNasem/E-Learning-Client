import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
    },
    getQuestions(state, action) {
      state.pageNum++;
      state.items = [...state.items, ...action.payload];
    },
    toggleWannaAsk(state) {
      state.isNewQuest = !state.isNewQuest;
    },
    addQuestion(state, action) {
      state.items = [action.payload, ...state.items];
      state.isNewQuest = false;
    },
  },
});

export const questionsActions = questionsSlice.actions;
export default questionsSlice.reducer;
