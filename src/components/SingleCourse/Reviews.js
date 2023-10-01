import React from "react";
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

const Reviews = (props) => {
  const reviews = useSelector((state) => state.reviews.items);
  const { wrap, modal, title, course, setIsModalOpen } = props;
  const dispatch = useDispatch();
  const { isLoading, sendRequest: getReviews } = useHttp();

  if (!reviews) return <LoadingSpinner side={60} />;
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
    if (!wrap) setIsModalOpen(true);
    else {
      getReviews(
        { endPoint: `reviews/getCourseReviews/${course.id}` },
        (payload) => {
          console.log(payload);
          dispatch(reviewsActions.getReviews(payload.reviews));
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
              {(+course.totalReviewsRate).toFixed(1)} course rating &bull;{" "}
              {ratings} ratings
            </h3>
            {modal && (
              <button
                className={`btn fs-5 ${classes["close-button"]}`}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            )}
          </>
        )}
        {title && <h3>Reviews</h3>}
      </div>
      <Row className="gy-3">
        {(wrap ? reviews : course.reviews).map((review, id) => {
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
      {isLoading && wrap ? (
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
