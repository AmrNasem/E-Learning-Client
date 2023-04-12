import classes from "./Content.module.css";
import SectionList from "./SectionList";

const Content = (props) => {
  const { course } = props;
  const numOfLectures = course.sections
    .map((section) => section.lectures.length)
    .reduce((previous, current) => previous + current);

  return (
    <div className={classes.content}>
      <h2>Course content</h2>
      <p className={classes.info}>
        {course.sections.length} sections &bull; {numOfLectures} lectures &bull;
        65h 33m total length
      </p>
      <SectionList sections={course.sections} className={classes.section}/>
      <button>32 more sections</button>
    </div>
  );
};

export default Content;
