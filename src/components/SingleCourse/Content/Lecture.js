import classes from "./Lecture.module.css";
import VideoIcon from "../../Icons/VideoIcon";
import FileIcon from "../../Icons/FileIcon";

const Lecture = (props) => {
  let icon = <VideoIcon />;
  if (props.type === "article") {
    icon = <FileIcon />;
  }

  return (
    <div className={classes.lecture}>
      {icon}
      <p>{props.title}</p>
      <span>{props.duration}</span>
    </div>
  );
};

export default Lecture;
