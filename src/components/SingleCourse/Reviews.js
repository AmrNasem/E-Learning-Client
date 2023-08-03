import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Reviews.module.css";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import SingleReview from "./SingleReview";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Reviews = (props) => {
  const course = useSelector((state) => state.course.course);

  if (!course.reviews) return; // Because this component renders multiple times before collecting 'the reviews'

  const ratingAverage =
    course.reviews
      .map((review) => review.rating)
      .reduce((prev, current) => prev + current) / course.reviews.length;

  let ratings = course.reviews.length;
  if (ratings >= 1000000000)
    ratings = `${Math.floor((ratings / 1000000000) * 10) / 10}B`;
  else if (ratings >= 1000000)
    ratings = `${Math.floor((ratings / 1000000) * 10) / 10}M`;
  else if (ratings >= 1000)
    ratings = `${Math.floor((ratings / 1000) * 10) / 10}K`;

  return (
    <div className={classes.reviews}>
      <div className="my-4 d-flex gap-2 align-items-center">
        <FontAwesomeIcon className="text-warning fs-3" icon={faStar} />
        <h3 className="flex-grow-1 m-0">
          {ratingAverage} course rating &bull; {ratings} ratings
        </h3>
        {props.modal && (
          <button className={`btn fs-5 ${classes["close-button"]}`}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        )}
      </div>
      <Row className="gy-3">
        {course.reviews.map((review, id) => {
          if (!review.comment) return false;

          return (
            <Col md={6} key={id}>
              <SingleReview {...review} />
            </Col>
          );
        })}
      </Row>
      <Button
        className={`bg-transparent rounded-0 p-3 my-4 ${classes["show-all-reviews"]}`}
      >
        Show more reviews
      </Button>
    </div>
  );
};

export default Reviews;
