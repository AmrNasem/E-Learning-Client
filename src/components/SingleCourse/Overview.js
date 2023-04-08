import classes from "./Overview.module.css";
import thumbnail from "../../assets/landing-page.jfif";
import PlayIcon from "../Icons/PlayIcon";
import VideoIcon from "../Icons/VideoIcon";
import FileIcon from "../Icons/FileIcon";
import InfinityIcon from "../Icons/InfinityIcon";
import TVIcon from "../Icons/TVIcon";
import CupIcon from "../Icons/CupIcon";

const Overview = (props) => {
  const { course } = props;
  let numOfArticles = 0;

  course.sections.forEach((section) =>
    section.lectures.forEach((lecture) =>
      lecture.type === "article" ? numOfArticles++ : ""
    )
  );

  return (
    <div className={classes.track}>
      <div className={`${classes.overview} ${props.hide && classes.float}`}>
        <div className={`${classes.thumbnail} ${props.hide && classes.hide}`}>
          <div className={classes.overlay}>
            <span>
              <PlayIcon />
            </span>
            <h5>Preview this course</h5>
          </div>
          <img src={thumbnail} alt="Thumbnail" />
        </div>
        <div className={classes.body}>
          <div className={classes.price}>
            <span className={classes["final-price"]}>
              ${course.price * (course.discount / 100)}
            </span>
            <span className={classes["initial-price"]}>
              <del>${course.price}</del>
            </span>
            <span className={classes.discount}>{course.discount}% off</span>
          </div>
          <button className={classes["add-to-cart"]}>Add to cart</button>
          <button className={classes["buy"]}>Buy now</button>
          <span>30-Day Money-Back Guarantee</span>
          <div className={classes["course-features"]}>
            <h5>This course includes:</h5>
            <ul>
              <li>
                <VideoIcon />
                <span>65 hours on-demand video</span>
              </li>
              {numOfArticles > 0 && (
                <li>
                  <FileIcon />
                  <span>{numOfArticles} articles</span>
                </li>
              )}
              <li>
                <InfinityIcon />
                <span>Full lifetime access</span>
              </li>
              <li>
                <TVIcon />
                <span>Access on mobile and TV</span>
              </li>
              <li>
                <CupIcon />
                <span>Certifictate of completion</span>
              </li>
            </ul>
            <div>
              <button className={classes.share}>Share</button>
              <button className={classes.coupon}>Apply Coupon</button>
            </div>
            <form>
              <input placeholder="Enter coupon" type="text" />
              <button>Apply</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
