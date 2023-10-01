import classes from "./Overview.module.css";
import VideoIcon from "../Icons/VideoIcon";
import FileIcon from "../Icons/FileIcon";
import InfinityIcon from "../Icons/InfinityIcon";
import TVIcon from "../Icons/TVIcon";
import CupIcon from "../Icons/CupIcon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import React, { useEffect, useState } from "react";

const Overview = (props) => {
  // let numOfArticles = 0;
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const { course } = props;
  const cartItems = useSelector((state) => state.cart.items);
  const price = course.price || 404;
  const isPurchased = cartItems.find((item) => item.id === course.id);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsCopied(false);
    }, 3900);
    return () => clearTimeout(time);
  }, [isCopied]);

  const copyURL = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => console.log("Text copied to clipboard"))
      .catch((err) => console.error("Error in copying text: ", err));
    setIsCopied(true);
  };

  // course.sections.forEach((section) =>
  //   section.lectures.forEach((lecture) =>
  //     lecture.type === "article" && numOfArticles++
  //   )
  // );

  const addToCartHandler = () => {
    if (isPurchased) dispatch(cartActions.removeFromCart(course.id));
    else dispatch(cartActions.addToCart(course));
  };

  return (
    <div className={`d-none d-lg-block ${classes.overview} ${props.className}`}>
      {props.Preview}
      <div className={classes.body}>
        <div className={classes.price}>
          <span className={classes["final-price"]}>
            ${price - price * (course.discount || 10 / 100)}
          </span>
          <span className={classes["initial-price"]}>
            <del>${price}</del>
          </span>
          {/* <span className={classes.discount}>{course.discount}% off</span> */}
        </div>
        <button onClick={addToCartHandler} className={classes["add-to-cart"]}>
          {isPurchased ? "Remove from cart" : "Add to cart"}
        </button>
        <button className={classes["buy"]}>Buy now</button>
        <h6 className={classes.refund}>30-Day Money-Back Guarantee</h6>
        <div className={classes["course-features"]}>
          <h5>This course includes:</h5>
          <ul>
            <li>
              <VideoIcon />
              <span className={classes.ListItem}>
                {course.totalLength} on-demand video
              </span>
            </li>
            <li>
              <FileIcon />
              <span>10 articles</span>
            </li>
            <li>
              <InfinityIcon />
              <span className={classes.ListItem}>Full lifetime access</span>
            </li>
            <li>
              <TVIcon />
              <span className={classes.ListItem}>Access on mobile and TV</span>
            </li>
            <li>
              <CupIcon />
              <span className={classes.ListItem}>
                Certifictate of completion
              </span>
            </li>
          </ul>
          <div>
            {isCopied && <div className={classes.popup}>Link Copied!</div>}
            <button onClick={copyURL} className={classes.share}>
              Share
            </button>
            <button
              onClick={() => setApplyCoupon((prevState) => !prevState)}
              className={classes.coupon}
            >
              Apply Coupon
            </button>
          </div>
          {applyCoupon && (
            <form className={classes.couponform}>
              <input
                placeholder="Enter coupon"
                type="text"
                className={classes.ApplyCoupon}
              />
              <button className={classes.ApplyCouponButton}>Apply</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Overview);
