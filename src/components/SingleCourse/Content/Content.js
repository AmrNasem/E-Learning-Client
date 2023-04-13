import { useEffect } from "react";
import classes from "./Content.module.css";
import SectionList from "./SectionList";
import { useDispatch } from "react-redux";
import { courseActions } from "../../../store/course-slice";

const Content = (props) => {
  const { course } = props;
  const dispatch = useDispatch();

  const numOfLectures = course.sections
    .map((section) => section.lectures.length)
    .reduce((previous, current) => previous + current);

  // Load course sections to course slice
  useEffect(() => {
    course.sections.map((section) =>
      dispatch(courseActions.addSection(section))
    );
  }, [dispatch, course]);

  return (
    <div className={classes.content}>
      <h2>Course content</h2>
      <p className={classes.info}>
        {course.sections.length} sections &bull; {numOfLectures} lectures &bull;
        65h 33m total length
      </p>
      <SectionList sections={course.sections} />
      <button>32 more sections</button>
    </div>
  );
};

export default Content;
