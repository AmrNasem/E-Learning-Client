import { createSlice } from "@reduxjs/toolkit";

const input = { text: "", id: Math.random().toString() };

const initialState = {
  course: null,
  goals: null,
  requirements: null,
  beneficiaries: null,
  price: null,
  privacy: null,
};

const courseSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    setCourse(state, action) {
      const fill = (arr, num) => {
        if (arr && arr.length) {
          return arr.map((item) => {
            return { id: Math.random().toString(), text: item };
          });
        } else {
          return new Array(num).fill(input);
        }
      };
      const course = action.payload;
      state.course = course;
      state.privacy = course.privacy || "public";
      state.price = course.price || 0;
      state.goals = fill(course.gain, 4);
      state.requirements = fill(course.requirements, 1);
      state.beneficiaries = fill(course.beneficiaries, 1);
    },
    editInfo(state, action) {
      const { type, value } = action.payload;
      if (type === "goals") {
        state.goals = state.goals.map((item) => {
          if (item.id === value.id) item = value;
          return item;
        });
        return;
      }

      if (type === "requirements") {
        state.requirements = state.requirements.map((item) => {
          if (item.id === value.id) item = value;
          return item;
        });
        return;
      }

      if (type === "beneficiaries") {
        state.beneficiaries = state.beneficiaries.map((item) => {
          if (item.id === value.id) item = value;
          return item;
        });
        return;
      }
    },
    addInfo(state, action) {
      const type = action.payload;
      if (type === "goals") {
        if (state.goals.every((item) => item.text !== "")) {
          state.goals.push({ id: Math.random(), text: "" });
        }
        return;
      }

      if (type === "requirements") {
        if (state.requirements.every((item) => item.text !== "")) {
          state.requirements.push({ id: Math.random(), text: "" });
        }
        return;
      }

      if (type === "beneficiaries") {
        if (state.beneficiaries.every((item) => item.text !== "")) {
          state.beneficiaries.push({ id: Math.random(), text: "" });
        }
        return;
      }
    },
    deleteInfo(state, action) {
      const payload = action.payload;
      if (payload.type === "goals") {
        state.goals = state.goals.filter((item) => item.id !== payload.id);
      }
      if (payload.type === "requirements") {
        state.requirements = state.requirements.filter(
          (item) => item.id !== payload.id
        );
      }
      if (payload.type === "beneficiaries") {
        state.beneficiaries = state.beneficiaries.filter(
          (item) => item.id !== payload.id
        );
      }
    },
    changePrice(state, action) {
      state.price = action.payload;
    },
    changePrivacy(state, action) {
      state.privacy = action.payload;
    },
  },
});

export const courseActions = courseSlice.actions;
export default courseSlice.reducer;
