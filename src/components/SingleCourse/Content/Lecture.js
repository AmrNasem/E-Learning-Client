import classes from "./Lecture.module.css";
import VideoIcon from "../../Icons/VideoIcon";
import FileIcon from "../../Icons/FileIcon";
import { Link, useParams } from "react-router-dom";

const Lecture = (props) => {
  const { type, available, id, parentId, active, title, duration } = props;
  const { courseId } = useParams();

  let icon = <VideoIcon />;
  if (type === "article") {
    icon = <FileIcon />;
  }

  if (available) {
    return (
      <Link
        className={`${classes.lecture} ${active && classes.active}`}
        to={`/course/${courseId}/preview?sec=${parentId}&lec=${id}`}
      >
        {icon}
        <p className={classes.title}>{title}</p>
        <span>{duration}</span>
      </Link>
    );
  }

  return (
    <div className={classes.lecture}>
      {icon}
      <p className={classes.title}>{title}</p>
      <span>{duration}</span>
    </div>
  );
};

export default Lecture;
