import classes from "./Preview.module.css";
import PlayIcon from "../Icons/PlayIcon";
import thumbnail from "../../assets/landing-page.jfif";

const Preview = (props) => {
  return (
    <div className={`${classes.preview} ${props.className}`}>
      <div className={classes.overlay}>
        <span>
          <PlayIcon />
        </span>
        <h5>Preview this course</h5>
      </div>
      <img src={thumbnail} alt="Thumbnail" />
    </div>
  );
};

export default Preview;
