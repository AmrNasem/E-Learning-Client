import classes from "./CourseHeader.module.css";
import { Link } from "react-router-dom";
import Preview from "./Preview";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useState } from "react";

const CourseHeader = (props) => {
  const { course, instructor } = props;
  const [applyCoupon, setApplyCoupon] = useState(false);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(course));
  };

  return (
    <div className={classes["course-header"]}>
      <h5>
        <Link to={`/category/${course.categoryId}`}>{course.category}</Link>
      </h5>
      <Preview className={classes.preview} />
      <h1>{course.title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        fugit sapiente explicabo dicta, eaque laudantium et minus vitae aliquam
        facere minima consectetur corrupti voluptatum veniam error, amet porro
        ea ipsum.
      </p>
      <div className={classes.info}>
        <span className={classes.badge}>Bestseller</span>
        <span className={classes.rates}>
          <a href="/">(275,583 ratings)</a>
        </span>
        <span className={classes.students}>933,032 students</span>
      </div>
      <p>
        Created by <a href="#instructor">{instructor.name}</a>
      </p>
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
  );
};

export default CourseHeader;
