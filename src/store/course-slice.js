import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  goals: null,
  requirements: null,
  beneficiaries: null,
  price: null,
  privacy: null,
  title: null,
  subtitle: null,
  description: null,
  lang: null,
  level: null,
  category: null,
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
          return new Array(num).fill(null).map(() => {
            return {
              text: "",
              id: Math.random().toString(),
            };
          });
        }
      };
      const course = action.payload;

      state.course = course;
      state.privacy = course ? course.privacy || "public" : null;
      state.price = course ? course.price : null;
      state.goals = course ? fill(course.gain, 4) : null;
      state.requirements = course ? fill(course.requirements, 1) : null;
      state.beneficiaries = course ? fill(course.beneficiaries, 1) : null;
      state.title = course ? course.title : null;
      state.subtitle = course ? course.subtitle : null;
      state.description = course ? course.description : null;
      state.lang = course ? course.lang : null;
      state.level = course ? course.level : null;
      state.category = course ? course.categoryId : null;
    },
    addGoal(state) {
      if (state.goals.every((item) => item.text !== "")) {
        state.goals.push({ id: Math.random(), text: "" });
      }
    },
    addRequirement(state) {
      if (state.requirements.every((item) => item.text !== "")) {
        state.requirements.push({ id: Math.random(), text: "" });
      }
    },
    addBeneficiary(state) {
      if (state.beneficiaries.every((item) => item.text !== "")) {
        state.beneficiaries.push({ id: Math.random(), text: "" });
      }
    },
    changeGoals(state, action) {
      const value = action.payload;
      state.goals = state.goals.map((item) => {
        if (item.id === value.id) item = value;
        return item;
      });
    },
    changeRequirements(state, action) {
      const value = action.payload;
      state.requirements = state.requirements.map((item) => {
        if (item.id === value.id) item = value;
        return item;
      });
    },
    changeBeneficiaries(state, action) {
      const value = action.payload;
      state.beneficiaries = state.beneficiaries.map((item) => {
        if (item.id === value.id) item = value;
        return item;
      });
    },
    deleteGoal(state, action) {
      state.goals = state.goals.filter((item) => item.id !== action.payload);
    },
    deleteRequirement(state, action) {
      state.requirements = state.requirements.filter(
        (item) => item.id !== action.payload
      );
    },
    deleteBeneficiary(state, action) {
      state.beneficiaries = state.beneficiaries.filter(
        (item) => item.id !== action.payload
      );
    },
    changeTitle(state, action) {
      state.title = action.payload;
    },
    changeSubtitle(state, action) {
      state.subtitle = action.payload;
    },
    changeDescription(state, action) {
      state.description = action.payload;
    },
    changeLang(state, action) {
      state.lang = action.payload;
    },
    changeLevel(state, action) {
      state.level = action.payload;
    },
    changeCategory(state, action) {
      state.category = action.payload;
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
