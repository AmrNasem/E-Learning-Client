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
        className={`d-flex align-items-center gap-1 p-1 rounded-1 mt-2 ${
          active && classes.active
        }`}
        to={`/course/${courseId}/preview?sec=${parentId}&lec=${id}`}
      >
        {icon}
        <p className="m-0 flex-grow-1">{title}</p>
        <span>{duration}</span>
      </Link>
    );
  }

  return (
    <div className="d-flex align-items-center gap-1 p-1 rounded-1 mt-2">
      {icon}
      <p className="m-0 flex-grow-1">{title}</p>
      <span>{duration}</span>
    </div>
  );
};

export default Lecture;
