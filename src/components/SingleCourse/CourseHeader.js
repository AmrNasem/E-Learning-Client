import classes from "./CourseHeader.module.css";
import { Link } from "react-router-dom";
import Preview from "./Preview";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const CourseHeader = (props) => {
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const authedUser = useSelector((state) => state.auth.user);
  const { course } = props;
  const isPurchased = cartItems.find((item) => item.id === course.id);
  const { sendRequest: addToCart, isLoading: addToCartLoading } = useHttp();
  const { sendRequest: removeFromCart, isLoading: removeFromCartLoading } =
    useHttp();

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
    if (isPurchased) {
      if (authedUser) {
        removeFromCart(
          { endPoint: `carts/deleteFromCart/${course.id}`, method: "DELETE" },
          () => {
            dispatch(cartActions.removeFromCart(course.id));
          }
        );
      } else dispatch(cartActions.removeFromCart(course.id));
    } else {
      if (authedUser) {
        addToCart(
          {
            endPoint: "carts/addToCart",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { courseId: course.id },
          },
          () => {
            dispatch(cartActions.addToCart(course));
          }
        );
      } else dispatch(cartActions.addToCart(course));
    }
  };

  return (
    <div className={classes["course-header"]}>
      <h5>
        <Link to={`/category/${course.category.id}`} className={classes.link}>
          {course.category.categoryName}
        </Link>
      </h5>
      <Preview
        // lecId={
        //   course.sections
        //     .find((sec) => sec.lectures.find((lec) => lec.available))
        //     .lectures.find((lec) => lec.available).id
        // }
        thumbnail={course.thumbnailUrl}
        className={classes.preview}
      />
      <h1>{course.title}</h1>
      <p>{course.subtitle || "This is subtitle"}</p>
      <p className={classes.info}>
        Bestseller{" "}
        <a className={classes.rates} href="#reviews">
          ({(+course.totalReviewsRate).toFixed(1) || "20K"} ratings)
        </a>
        <span className={classes.students}>
          {" "}
          {course.students || "20K"} students
        </span>
      </p>
      <p className={classes.instructor}>
        Created by{" "}
        <a href="#instructor">
          {course.teachers.map((t) => t.fullname.split(" ")[0]).join()}
        </a>
      </p>
      <div className={classes.body}>
        <div className={classes.price}>
          <span className={classes["final-price"]}>
            $
            {!course.price
              ? 2000
              : course.price - (course.price * course.discount) / 100}
          </span>
          <span className={classes["initial-price"]}>
            <del>${course.price ? course.price : 2000}</del>
          </span>
          <span className={classes.discount}>{course.discount || 10}% off</span>
        </div>
        {addToCartLoading || removeFromCartLoading ? (
          <LoadingSpinner side={40} className="my-3" />
        ) : (
          <button onClick={addToCartHandler} className={classes["add-to-cart"]}>
            {isPurchased ? "Remove from cart" : "Add to cart"}
          </button>
        )}
        <button className={`${classes["buy"]} border-0`}>Buy now</button>
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
