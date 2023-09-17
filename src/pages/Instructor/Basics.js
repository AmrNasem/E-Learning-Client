import Input from "../../components/Instructor/Input";
import Select from "../../components/Instructor/Select";
import PageBox from "../../components/UI/PageBox";
import classes from "./Basics.module.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useCallback, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";

const langOptions = [
  { id: "ar", text: "العربية" },
  { id: "en", text: "English" },
];

const levelOptions = [
  { id: "beginner", text: "Beginner level" },
  { id: "intermediate", text: "Intermediate level" },
  { id: "expert", text: "Expert level" },
  { id: "all", text: "All levels" },
];

const Basics = () => {
  const { course, level, lang, category, title, subtitle, description } =
    useSelector((state) => state.course);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const defaultLevel = useMemo(
    () =>
      course
        ? levelOptions.find((o) => o.id === level)
        : {
            id: "none",
            text: "-- Select level --",
          },
    [level, course]
  );

  const defaultLang = useMemo(
    () =>
      course
        ? langOptions.find((o) => o.id === lang)
        : {
            id: "none",
            text: "-- Select language --",
          },
    [course, lang]
  );

  const defaultCategory = useMemo(
    () =>
      course && categories
        ? categories.find((cat) => cat.id === category)
        : {
            id: "none",
            text: "-- Select category --",
          },
    [course, category, categories]
  );

  const changeTitleHandler = useCallback(
    (value) => dispatch(courseActions.changeTitle(value)),
    [dispatch]
  );

  const changeSubtitleHandler = useCallback(
    (value) => dispatch(courseActions.changeSubtitle(value)),
    [dispatch]
  );

  const changeDescriptionHandler = useCallback(
    (e) => dispatch(courseActions.changeDescription(e.target.value)),
    [dispatch]
  );

  const changeLanguageHandler = useCallback(
    (option) => {
      dispatch(courseActions.changeLang(option.id));
    },
    [dispatch]
  );

  const changeLevelHandler = useCallback(
    (option) => {
      dispatch(courseActions.changeLevel(option.id));
    },
    [dispatch]
  );

  const changeCategoryHandler = useCallback(
    (option) => {
      dispatch(courseActions.changeCategory(option.id));
    },
    [dispatch]
  );

  return (
    <PageBox title="Course landing page">
      <p>
        Your course landing page is crucial to your success on our platform. If
        it's done right, it can also help you gain visibility in search engines
        like Google. As you complete this section, think about creating a
        compelling Course Landing Page that demonstrates why someone would want
        to enroll in your course. Learn more about creating your course landing
        page and course title standards.
      </p>
      {course ? (
        <div>
          <div className="my-5">
            <h5>Course title</h5>
            <Input
              max={60}
              className="mb-1"
              onChange={changeTitleHandler}
              content={title}
              restricted
            >
              Insert you course title.
            </Input>
            <p>
              Your title should be a mix of attention-grabbing, informative, and
              optimized for search
            </p>
          </div>
          <div className="my-5">
            <h5>Course subtitle</h5>
            <Input
              max={200}
              className="mb-1"
              onChange={changeSubtitleHandler}
              content={subtitle || ""}
            >
              Insert you course subtitle.
            </Input>
            <p>
              Use 1 or 2 related keywords, and mention 3-4 of the most important
              areas that you've covered during your course.
            </p>
          </div>
          <div className="my-5">
            <h5>Course description</h5>
            <textarea
              className={`${classes.description} bg-transparent w-100 p-3`}
              placeholder="Insert you course description."
              onChange={changeDescriptionHandler}
              defaultValue={description || ""}
            ></textarea>
            <p>Description should have minimum 200 words.</p>
          </div>
          <div className="my-5">
            <h5>Basic info</h5>
            <div className="d-flex gap-3 flex-wrap">
              <Select
                className="flex-grow-1"
                buttonClassName="px-3 py-2"
                reverse
                defaultValue={defaultLang}
                options={langOptions}
                onChange={changeLanguageHandler}
              />
              <Select
                className="flex-grow-1"
                buttonClassName="px-3 py-2"
                reverse
                defaultValue={defaultLevel}
                options={levelOptions}
                onChange={changeLevelHandler}
              />
              <Select
                className="flex-grow-1"
                buttonClassName="px-3 py-2"
                reverse
                defaultValue={defaultCategory}
                options={categories}
                onChange={changeCategoryHandler}
              />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner side={60} />
      )}
    </PageBox>
  );
};

export default memo(Basics);
