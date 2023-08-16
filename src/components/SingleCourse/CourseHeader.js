import classes from "./CourseHeader.module.css";
import { Link } from "react-router-dom";
import Preview from "./Preview";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import React, { useEffect, useState } from "react";

const CourseHeader = (props) => {
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { course, instructor } = props;

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

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(course));
  };

  return (
    <div className={classes["course-header"]}>
      <h5>
        <Link to={`/category/${course.categoryId}`} className={classes.link}>
          {course.category}
        </Link>
      </h5>
      <Preview
        lecId={
          course.sections
            .find((sec) => sec.lectures.find((lec) => lec.available))
            .lectures.find((lec) => lec.available).id
        }
        className={classes.preview}
      />
      <h1>{course.title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        fugit sapiente explicabo dicta, eaque laudantium et minus vitae aliquam
        facere minima consectetur corrupti voluptatum veniam error, amet porro
        ea ipsum.
      </p>
      <p className={classes.info}>
        Bestseller{" "}
        <a className={classes.rates} href="#reviews">
          ({course.reviews.length} ratings)
        </a>
        <span className={classes.students}>
          {" "}
          {instructor.students} students
        </span>
      </p>
      <p className={classes.instructor}>
        Created by <a href="#instructor">{instructor.name}</a>
      </p>
      <div className={classes.body}>
        <div className={classes.price}>
          <span className={classes["final-price"]}>
            ${course.price - (course.price * course.discount) / 100}
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
        <span className={classes.refund}>30-Day Money-Back Guarantee</span>
        <div className={classes.buyButtons}>
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
  );
};

export default React.memo(CourseHeader);
