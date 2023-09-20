import { createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  course: null,
  goals: null,
  requirements: null,
  beneficiaries: null,
  sections: null,
  price: null,
  privacy: "public",
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
      state.course = action.payload;
    },
    updateCourse(state, action) {
      const course = action.payload;
      state.privacy = course ? course.privacy || state.privacy : null;
      state.price = course ? course.price || state.price : null;
      state.goals = course ? fill(course.outline, 4) || state.goals : null;
      state.requirements = course
        ? fill(course.prerequisites, 1) || state.requirements
        : null;
      state.beneficiaries = course
        ? fill(course.beneficiaries, 1) || state.beneficiaries
        : null;
      state.title = course ? course.title || state.title : null;
      state.subtitle = course ? course.subtitle || state.subtitle : null;
      state.description = course ? course.desc || state.description : null;
      state.lang = course ? course.lang || state.lang : null;
      state.level = course ? course.level || state.level : null;
      state.category = course ? course.categoryId || state.category : null;
      if (course) {
        if (course.sections) {
          state.sections = course.sections.map((sec, index) => {
            if (index === 0) {
              if (!sec.videos || !sec.videos.length) {
                return {
                  ...sec,
                  videos: [
                    { id: Math.random().toString(), title: "Introduction" },
                  ],
                };
              }
            }
            return sec;
          });
        }
      } else state.sections = null;
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
    addSection(state, action) {
      state.sections.push(action.payload);
    },
    deleteSection(state, action) {
      const id = action.payload;
      state.sections = state.sections.filter((sec) => sec.id !== id);
    },
    editSection(state, action) {
      const section = action.payload;
      state.sections = state.sections.map((sec) => {
        if (sec.id === section.id) {
          sec.title = section.title;
        }
        return sec;
      });
    },
    changeSectionOrder(state, action) {
      const { from, to } = action.payload;
      [state.sections[from], state.sections[to]] = [
        state.sections[to],
        state.sections[from],
      ];
    },
    addLecture(state, action) {
      const { secId, lec } = action.payload;
      state.sections.find((sec) => {
        if (sec.id === secId) {
          sec.videos.push(lec);
        }
        return sec.id === secId;
      });
    },
    editLecture(state, action) {
      const { secId, lec } = action.payload;
      state.sections.find((sec) => {
        if (sec.id === secId) {
          sec.videos.find((vid) => {
            if (vid.id === lec.id) vid.title = lec.title;
            return vid.id === lec.id;
          });
        }
        return sec.id === secId;
      });
    },
    deleteLecture(state, action) {
      const { secId, lecId } = action.payload;
      const section = state.sections.find((sec) => sec.id === secId);
      section.videos = section.videos.filter((vid) => vid.id !== lecId);
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
