import Input from "../../components/Instructor/Input";
import PageBox from "../../components/UI/PageBox";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { courseActions } from "../../store/course-slice";

const Pricing = (props) => {
  const price = useSelector((state) => state.course.price);
  const dispatch = useDispatch();

  const changePriceHandler = useCallback(
    (value) => dispatch(courseActions.changePrice(value)),
    [dispatch]
  );

  return (
    <PageBox title="Pricing">
      <h5>Set a price for your course</h5>
      <p>
        Please select the currency and the price tier for your course. If you’d
        like to offer your course for free, it must have a total video length of
        less than 2 hours. Also, courses with practice tests can not be free.
      </p>
      {price !== null ? (
        <div className="d-flex align-items-center gap-3">
          <label className="fw-bold">USD</label>
          <Input content={price} onChange={changePriceHandler} type="number">
            Enter your price
          </Input>
        </div>
      ) : (
        <LoadingSpinner side={60} />
      )}
    </PageBox>
  );
};

export default Pricing;
