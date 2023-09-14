import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Reviews.module.css";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import SingleReview from "./SingleReview";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { reviewsActions } from "../../store/reviews-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";

// const reviewsPerPage = 5;

const Reviews = (props) => {
  // const page = useSelector((state) => state.reviews.page);
  const reviews = useSelector((state) => state.reviews.items);
  const { wrap, modal, title, course } = props;
  const dispatch = useDispatch();
  const { isLoading, sendRequest: getReviews } = useHttp();

  useEffect(() => {
    if (!wrap) dispatch(reviewsActions.resetPages());
  }, [dispatch, wrap]);

  // useEffect(() => {
  //   if (!items.length && !modal && course.reviews) {
  //     dispatch(
  //       reviewsActions.getReviews(course.reviews)
  //     );
  //   }
  // }, [items, course, dispatch, modal]);

  if (!reviews) return <LoadingSpinner side={60} />;
  if (!course.reviews) return; // Because this component renders multiple times before collecting 'the reviews'
  const ratingAverage = 3.9;
  //   course.reviews
  //     .map((review) => review.rating)
  //     .reduce((prev, current) => prev + current) / course.reviews.length;

  let ratings = course.reviews.length;
  if (ratings >= 1000000000)
    ratings = `${Math.floor((ratings / 1000000000) * 10) / 10}B`;
  else if (ratings >= 1000000)
    ratings = `${Math.floor((ratings / 1000000) * 10) / 10}M`;
  else if (ratings >= 1000)
    ratings = `${Math.floor((ratings / 1000) * 10) / 10}K`;

  const getMoreHandler = () => {
    if (!wrap) dispatch(reviewsActions.toggleIsPaginated(true));
    else {
      getReviews(
        { endPoint: `reviews/getCourseReviews/${course.id}` },
        (data) => {
          console.log(data);
          if (!data.error)
            dispatch(reviewsActions.getReviews(data.payload.reviews));
        }
      );
      // dispatch(
      //   reviewsActions.getReviews(
      //     course.reviews.slice(
      //       page * reviewsPerPage,
      //       (page + 1) * reviewsPerPage
      //     )
      //   )
      // );
    }
  };

  return (
    <div className={classes.reviews} id="reviews">
      <div className="my-4 d-flex gap-2 align-items-center">
        {!title && (
          <>
            <FontAwesomeIcon className="text-warning fs-3" icon={faStar} />
            <h3 className="flex-grow-1 m-0">
              {ratingAverage.toFixed(1)} course rating &bull; {ratings} ratings
            </h3>
            {modal && (
              <button
                className={`btn fs-5 ${classes["close-button"]}`}
                onClick={() => dispatch(reviewsActions.toggleIsPaginated())}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            )}
          </>
        )}
        {title && <h3>Reviews</h3>}
      </div>
      <Row className="gy-3">
        {reviews.map((review, id) => {
          if (wrap) {
            return <SingleReview key={id} {...review} />;
          }

          return (
            <Col md={6} key={id}>
              <SingleReview {...review} />
            </Col>
          );
        })}
      </Row>
      {isLoading ? (
        <LoadingSpinner side={50} />
      ) : (
        <Button
          className={`bg-transparent rounded-0 p-3 my-4 ${
            classes["show-all-reviews"]
          } ${wrap && "w-100"}`}
          onClick={getMoreHandler}
        >
          {wrap ? "Show more reviews" : "Show all reviews"}
        </Button>
      )}
    </div>
  );
};

export default React.memo(Reviews);
