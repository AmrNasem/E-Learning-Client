import classes from "./Preview.module.css";
import PlayIcon from "../Icons/PlayIcon";
import thumbnail from "../../assets/desktop.jfif";
import { Link } from "react-router-dom";

const Preview = (props) => {
  return (
    <Link to="preview" className={`${classes.preview} ${props.className}`}>
      <div className={classes.overlay}>
        <span>
          <PlayIcon />
        </span>
        <h5>Preview this course</h5>
      </div>
      <img src={thumbnail} alt="Thumbnail" />
    </Link>
  );
};

export default Preview;
