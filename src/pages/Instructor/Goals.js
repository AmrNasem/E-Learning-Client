import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/Instructor/Input";
import PageBox from "../../components/UI/PageBox";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./Goals.module.css";
import { useCallback, useEffect, useState } from "react";

const placeholders = [
  " Example: Define the roles and responsibilities of a project manager",
  "Example: Estimate project timelines and budgets",
  "Example: Identify and manage project risks",
  "Example: Complete a case study to manage a project from conception to completion",
];

const Goals = (props) => {
  const { course } = props;
  const [goals, setGoals] = useState([
    { text: "", id: Math.random().toString() },
    { text: "", id: Math.random().toString() },
    { text: "", id: Math.random().toString() },
    { text: "", id: Math.random().toString() },
  ]);
  const [requirements, setRequirements] = useState([
    { text: "", id: Math.random().toString() },
  ]);
  const [targets, setTargets] = useState([
    { text: "", id: Math.random().toString() },
  ]);

  useEffect(() => {
    if (course.gain && course.gain.length) {
      setGoals(
        course.gain.map((item) => {
          return { text: item, id: Math.random().toString() };
        })
      );
    }
    if (course.requirements && course.requirements.length) {
      setRequirements(
        course.requirements.map((item) => {
          return { text: item, id: Math.random().toString() };
        })
      );
    }
    if (course.beneficiaries && course.beneficiaries.length) {
      setTargets(
        course.beneficiaries.map((item) => {
          return { text: item, id: Math.random().toString() };
        })
      );
    }
  }, [course]);

  const changeInputHandler = useCallback((setValues, value) => {
    setValues((prevState) =>
      prevState.map((item) => {
        if (item.id === value.id) item = value;
        return item;
      })
    );
  }, []);

  const DeleteInputHandler = useCallback((setValues, id) => {
    setValues((prevState) => prevState.filter((item) => item.id !== id));
  }, []);

  const addInputHandler = (state, setState) =>
    state.every((item) => item.text !== "") &&
    setState((prevState) => [
      ...prevState,
      { text: "", id: Math.random().toString() },
    ]);

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
          {goals.map((goal, index) => (
            <Input
              key={index}
              id={goal.id}
              content={goal.text}
              onChange={(value) => changeInputHandler(setGoals, value)}
              onDelete={(id) => DeleteInputHandler(setGoals, id)}
              disabled={goals.length <= 4}
              max={160}
              removable
            >
              {placeholders[index % placeholders.length]}
            </Input>
          ))}
        </div>
        <button
          onClick={() => addInputHandler(goals, setGoals)}
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
          {requirements.map((item) => (
            <Input
              key={item.id}
              id={item.id}
              content={item.text}
              onChange={(value) => changeInputHandler(setRequirements, value)}
              onDelete={(id) => DeleteInputHandler(setRequirements, id)}
              removable
            >
              Example: No programming experience needed. You will learn
              everything you need to know
            </Input>
          ))}
        </div>
        <button
          onClick={() => addInputHandler(requirements, setRequirements)}
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
          {targets.map((item) => (
            <Input
              key={item.id}
              id={item.id}
              content={item.text}
              onChange={(value) => changeInputHandler(setTargets, value)}
              onDelete={(id) => DeleteInputHandler(setTargets, id)}
              removable
            >
              Example: No programming experience needed. You will learn
              everything you need to know
            </Input>
          ))}
        </div>
        <button
          onClick={() => addInputHandler(targets, setTargets)}
          className={`btn rounded-0 text-white border-0 ${classes["new-input"]}`}
        >
          <FontAwesomeIcon icon={faPlus} /> Add more to your response
        </button>
      </div>
    </PageBox>
  );
};

export default Goals;
