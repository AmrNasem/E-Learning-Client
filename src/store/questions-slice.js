import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lecture: null,
  items: [],
  pageNum: 0,
  isNewQuest: false,
  isEditing: null,
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
    togglewannaEdit(state, action) {
      state.isEditing = action.payload;
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
    removeQuestion(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.lecture.questions = state.lecture.questions.filter(
        (q) => q.id !== action.payload
      );
      if (state.items.length < state.lecture.questions.length) {
        state.items.push(state.lecture.questions[state.items.length]);
      }
    },
    editQuestion(state, action) {
      const { id, title, details } = action.payload;
      const edit = (arr) => {
        arr.find((item) => {
          if (item.id === id) {
            item.title = title;
            item.content = details;
          }
          return item.id === id;
        });
      };
      edit(state.items);
      edit(state.lecture.questions);
      state.isNewQuest = false;
      state.isEditing = null;
    },
    addReply(state, action) {
      const { id, reply } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) item.replies.push(reply);
        return item;
      });
    },
    editReply(state, action) {
      const { id, text } = action.payload;
      state.items.find((item) =>
        item.replies.find((reply) => {
          if (reply.id === id) {
            reply.content = text;
          }
          return reply.id === id;
        })
      );
    },
    removeReply(state, action) {
      for (let i = 0; i < state.items.length; i++) {
        let found = false;
        state.items[i].replies = state.items[i].replies.filter((reply) => {
          if (reply.id === action.payload) found = true;

          return reply.id !== action.payload;
        });
        if (found) return;
      }
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
