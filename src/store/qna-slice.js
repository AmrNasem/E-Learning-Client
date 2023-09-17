import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lecture: null,
  questions: [],
  isNewQuest: false,
  isEditing: null,
  questionPage: 0,
  replyPage: 0,
  activeQuestion: null,
  replies: [],
};

const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    setLecture(state, action) {
      state.lecture = action.payload;
      state.questions = [];
      state.questionPage = 0;
      state.activeQuestion = null;
      state.isNewQuest = false;
      state.isEditing = null;
    },
    getQuestions(state, action) {
      state.questions.push(
        ...state.lecture.videoQuestions.slice(
          state.questionPage * action.payload,
          (state.questionPage + 1) * action.payload
        )
      );
      state.questionPage++;
    },
    toggleNewQuest(state, action) {
      state.isNewQuest = action.payload;
    },
    toggleIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    voteQuestion(state, action) {
      function vote(question) {
        if (question.isVoted) {
          question.isVoted = false;
          question.likes--;
        } else {
          question.isVoted = true;
          question.likes++;
        }
      }

      const mainVotedQuestion = state.lecture.videoQuestions.find(
        (q) => q.id === action.payload
      );
      const votedQuestion = state.questions.find(
        (q) => q.id === action.payload
      );

      vote(mainVotedQuestion);
      if (votedQuestion) vote(votedQuestion);

      if (state.activeQuestion && state.activeQuestion.id === action.payload) {
        vote(state.activeQuestion);
      }
    },
    addQuestion(state, action) {
      state.questions.unshift(action.payload);
      state.lecture.videoQuestions.unshift(action.payload);
      state.isNewQuest = false;
    },
    editQuestion(state, action) {
      const { id, title, details } = action.payload;
      function edit(arr) {
        const question = arr.find((q) => q.id === id);
        if (question) {
          question.title = title;
          question.content = details;
        }
      }
      edit(state.lecture.videoQuestions);
      edit(state.questions);
      if (state.activeQuestion && state.activeQuestion.id === id) {
        edit([state.activeQuestion]);
      }
      state.isNewQuest = false;
      state.isEditing = false;
    },
    removeQuestion(state, action) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
      state.lecture.videoQuestions = state.lecture.videoQuestions.filter(
        (q) => q.id !== action.payload
      );
      if (state.questions.length < state.lecture.videoQuestions.length) {
        state.questions.push(
          state.lecture.videoQuestions[state.questions.length]
        );
      }
      if (state.activeQuestion && state.activeQuestion.id === action.payload)
        state.activeQuestion = null;
    },
    setActiveQuestion(state, action) {
      state.activeQuestion = state.lecture.videoQuestions.find(
        (q) => q.id === action.payload
      );
      state.replies = [];
      state.replyPage = 0;
      state.isEditing = null;
    },
    getReplies(state, action) {
      state.replies.push(
        ...state.activeQuestion.replies.slice(
          state.replyPage * action.payload,
          (state.replyPage + 1) * action.payload
        )
      );
      state.replyPage++;
    },
    addReply(state, action) {
      const { id, reply } = action.payload;
      const add = (question) => {
        if (question) question.replies.unshift(reply);
      };

      add(state.lecture.videoQuestions.find((q) => q.id === id));
      add(state.activeQuestion);
      add(state.questions.find((q) => q.id === id));
      state.replies.unshift(reply);
    },
    editReply(state, action) {
      const { questionId, id, text } = action.payload;
      const edit = (question) => {
        if (question) question.replies.find((r) => r.id === id).content = text;
      };

      edit(state.lecture.videoQuestions.find((q) => q.id === questionId));
      edit(state.questions.find((q) => q.id === questionId));
      state.replies.find((r) => r.id === id).content = text;

      state.isEditing = false;
    },
    removeReply(state, action) {
      const { questionId, id } = action.payload;
      const remove = (question) => {
        if (question)
          question.replies = question.replies.filter((r) => r.id !== id);
      };

      remove(state.lecture.videoQuestions.find((q) => q.id === questionId));
      remove(state.questions.find((q) => q.id === questionId));
      remove(state.activeQuestion);
      state.replies = state.replies.filter((r) => r.id !== id);

      if (state.replies.length < state.activeQuestion.replies.length)
        state.replies.push(state.activeQuestion.replies[state.replies.length]);
    },
    voteReply(state, action) {
      const { questionId, id } = action.payload;
      const vote = (question) => {
        if (question) {
          const reply = question.replies.find((r) => r.id === id);
          if (reply.isVoted) {
            reply.isVoted = false;
            reply.likes--;
          } else {
            reply.isVoted = true;
            reply.likes++;
          }
        }
      };
      vote(state.lecture.videoQuestions.find((q) => q.id === questionId));
      vote(state.questions.find((q) => q.id === questionId));
      vote(state.activeQuestion);
      const reply = state.replies.find((r) => r.id === id);
      if (reply.isVoted) {
        reply.isVoted = false;
        reply.likes--;
      } else {
        reply.isVoted = true;
        reply.likes++;
      }
    },
  },
});

export const qnaActions = qnaSlice.actions;
export default qnaSlice.reducer;
