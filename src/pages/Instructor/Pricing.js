import { useEffect, useState } from "react";
import Input from "../../components/Instructor/Input";
import PageBox from "../../components/UI/PageBox";

const Pricing = (props) => {
  const { course } = props;
  const [price, setPrice] = useState(0);

  console.log(price);

  useEffect(() => {
    if (course.price) {
      setPrice(course.price);
    }
  }, [course]);

  return (
    <PageBox title="Pricing">
      <h5>Set a price for your course</h5>
      <p>
        Please select the currency and the price tier for your course. If you’d
        like to offer your course for free, it must have a total video length of
        less than 2 hours. Also, courses with practice tests can not be free.
      </p>
      <div className="d-flex align-items-center gap-3">
        <label className="fw-bold">USD</label>
        <Input
          content={price}
          onChange={(value) => setPrice(value)}
          type="number"
        >
          Enter your price
        </Input>
      </div>
    </PageBox>
  );
};

export default Pricing;
