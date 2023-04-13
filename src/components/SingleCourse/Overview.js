import classes from "./Overview.module.css";
import VideoIcon from "../Icons/VideoIcon";
import FileIcon from "../Icons/FileIcon";
import InfinityIcon from "../Icons/InfinityIcon";
import TVIcon from "../Icons/TVIcon";
import CupIcon from "../Icons/CupIcon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useState } from "react";
import Preview from "./Preview";

const Overview = (props) => {
  const { course } = props;
  let numOfArticles = 0;
  const dispatch = useDispatch();
  const [applyCoupon, setApplyCoupon] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  course.sections.forEach((section) =>
    section.lectures.forEach((lecture) =>
      lecture.type === "article" ? numOfArticles++ : ""
    )
  );

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(course));
  };

  return (
    <div className={classes.track}>
      <div className={`${classes.overview} ${props.hide && classes.float}`}>
        <Preview className={props.hide ? classes.hide : ""} />
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
          <button onClick={addToCartHandler} className={classes["add-to-cart"]}>
            {cartItems[course.id] ? "Remove from cart" : "Add to cart"}
          </button>
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
              <button
                onClick={() => setApplyCoupon((prevState) => !prevState)}
                className={classes.coupon}
              >
                Apply Coupon
              </button>
            </div>
            {applyCoupon && (
              <form>
                <input placeholder="Enter coupon" type="text" />
                <button>Apply</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
