import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  goals: [
    { text: "", id: Math.random().toString() },
    { text: "", id: Math.random().toString() },
    { text: "", id: Math.random().toString() },
    { text: "", id: Math.random().toString() },
  ],
  requirements: [{ text: "", id: Math.random().toString() }],
  beneficiaries: [{ text: "", id: Math.random().toString() }],
  price: 0,
};

const courseSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    setCourse(state, action) {
      const course = action.payload;
      state.course = course;
      if (course.price) {
        state.price = course.price;
      }
      if (state.course.gain && state.course.gain.length) {
        state.goals = course.gain.map((item) => {
          return { id: Math.random().toString(), text: item };
        });
      }

      if (state.course.requirements && state.course.requirements.length) {
        state.requirements = course.requirements.map((item) => {
          return { id: Math.random().toString(), text: item };
        });
      }

      if (state.course.beneficiaries && state.course.beneficiaries.length) {
        state.beneficiaries = course.beneficiaries.map((item) => {
          return { id: Math.random().toString(), text: item };
        });
      }
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
  },
});

export const courseActions = courseSlice.actions;
export default courseSlice.reducer;
