import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/Instructor/Input";
import PageBox from "../../components/UI/PageBox";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./Goals.module.css";
import { useCallback } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";

const placeholders = [
  " Example: Define the roles and responsibilities of a project manager",
  "Example: Estimate project timelines and budgets",
  "Example: Identify and manage project risks",
  "Example: Complete a case study to manage a project from conception to completion",
];

const Goals = () => {
  const { goals, requirements, beneficiaries } = useSelector(
    (state) => state.course
  );
  const dispatch = useDispatch();

  const changeInputHandler = useCallback(
    (type, value) => dispatch(courseActions.editInfo({ type, value })),
    [dispatch]
  );

  const DeleteInputHandler = useCallback(
    (type, id) => dispatch(courseActions.deleteInfo({ type, id })),
    [dispatch]
  );

  const addInputHandler = (type) => dispatch(courseActions.addInfo(type));

  return (
    <PageBox title="Intended learners">
      <p>
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them.
      </p>
      <div className="my-5">
        <h6>What will students learn in your course?</h6>
        <p>
          You must enter at least 4 learning objectives or outcomes that
          learners can expect to achieve after completing your course.
        </p>
        <div>
          {goals ? (
            goals.map((goal, index) => (
              <Input
                key={index}
                id={goal.id}
                content={goal.text}
                onChange={changeInputHandler.bind(null, "goals")}
                onDelete={DeleteInputHandler.bind(null, "goals")}
                disabled={goals.length <= 4}
                max={160}
                removable
              >
                {placeholders[index % placeholders.length]}
              </Input>
            ))
          ) : (
            <LoadingSpinner side={60} />
          )}
        </div>
        <button
          onClick={() => addInputHandler("goals")}
          className={`btn rounded-0 text-white border-0 ${classes["new-input"]}`}
        >
          <FontAwesomeIcon icon={faPlus} /> Add more to your response
        </button>
      </div>
      <div className="my-5">
        <h6>
          What are the requirements or prerequisites for taking your course?
        </h6>
        <p>
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </p>
        <div>
          {requirements ? (
            requirements.map((item) => (
              <Input
                key={item.id}
                id={item.id}
                content={item.text}
                onChange={changeInputHandler.bind(null, "requirements")}
                onDelete={DeleteInputHandler.bind(null, "requirements")}
                removable
              >
                Example: No programming experience needed. You will learn
                everything you need to know
              </Input>
            ))
          ) : (
            <LoadingSpinner side={60} />
          )}
        </div>
        <button
          onClick={() => addInputHandler("requirements")}
          className={`btn rounded-0 text-white border-0 ${classes["new-input"]}`}
        >
          <FontAwesomeIcon icon={faPlus} /> Add more to your response
        </button>
      </div>
      <div className="my-5">
        <h6>Who is this course for?</h6>
        <p>
          Write a clear description of the intended learners for your course who
          will find your course content valuable. This will help you attract the
          right learners to your course.
        </p>
        <div>
          {beneficiaries ? (
            beneficiaries.map((item) => (
              <Input
                key={item.id}
                id={item.id}
                content={item.text}
                onChange={changeInputHandler.bind(null, "beneficiaries")}
                onDelete={DeleteInputHandler.bind(null, "beneficiaries")}
                removable
              >
                Example: No programming experience needed. You will learn
                everything you need to know
              </Input>
            ))
          ) : (
            <LoadingSpinner side={60} />
          )}
        </div>
        <button
          onClick={() => addInputHandler("beneficiaries")}
          className={`btn rounded-0 text-white border-0 ${classes["new-input"]}`}
        >
          <FontAwesomeIcon icon={faPlus} /> Add more to your response
        </button>
      </div>
    </PageBox>
  );
};

export default Goals;
