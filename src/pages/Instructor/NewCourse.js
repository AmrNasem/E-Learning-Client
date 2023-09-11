import { useCallback, useEffect, useState } from "react";
import Input from "../../components/Instructor/Input";
import Select from "../../components/Instructor/Select";
import InstructorHeader from "../../components/Header/InstructorHeader";
import classes from "./NewCourse.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";
import jsonFile from "../../assets/dummy.json";

const categoryOptions = [
  { id: "uiux", text: "UI/UX Design" },
  { id: "ai", text: "Artificial Intelligence" },
  { id: "web", text: "Web Development" },
  { id: "mobile", text: "Mobile Development" },
  { id: "security", text: "Cyber Security" },
  { id: "datascience", text: "Data Science" },
  { id: "machinelearning", text: "Machine Learning" },
  { id: "none", text: "I don't know yet" },
];

const NewCourse = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState({
    id: "",
    text: "Choose Category",
  });
  const [isValid, setIsValid] = useState(false);
  const authedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = {
    id: Math.random().toString(),
    title: title,
    subtitle: "",
    level: null,
    lang: null,
    date: new Date().getTime(),
    status: "draft",
    thumbnail: null,
    category: category.text,
    categoryId: category.id,
    instructor: jsonFile.instructors.find((i) => i.id === authedUser.instructor)
      .id,
    gain: null,
    sections: null,
    beneficiaries: null,
    requirements: null,
    description: null,

    discount: 0,
    price: null,
    reviews: [],
  };

  useEffect(() => {
    if (title.trim() !== "" && category.id !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [title, category]);

  const createCourseHandler = () => {
    // POST request here
    dispatch(courseActions.setCourse(course));
    navigate(`/instructor/course/${course.id}`);
  };

  return (
    <>
      <InstructorHeader />
      <main
        className={` d-flex justify-content-center align-items-center text-center ${classes["new-course"]}`}
      >
        <div className={`${classes.content} d-flex flex-column`}>
          <div className="my-4">
            <h2>How about a working title?</h2>
            <p>
              It's ok if you can't think of a good title now. You can change it
              later.
            </p>
            <Input
              className="my-4"
              max={60}
              content={title}
              onChange={(value) => setTitle(value)}
            >
              e.g. Learn Photoshop CS6 from Scratch
            </Input>
          </div>
          <div className="my-4">
            <h2>What category best fits the knowledge you'll share?</h2>
            <p>
              If you're not sure about the right category, you can change it
              later.
            </p>
            <Select
              className="my-4"
              reverse
              defaultValue={category}
              options={categoryOptions}
              onChange={useCallback((value) => setCategory(value), [])}
            />
          </div>
        </div>
        <div
          className={`${classes.actions} d-flex justify-content-between position-fixed bottom-0 start-0 w-100 px-4 py-3`}
        >
          <button
            onClick={() => navigate("/instructor")}
            className="px-4 py-3 bg-transparent"
          >
            Cancel
          </button>
          <button
            onClick={createCourseHandler}
            disabled={!isValid}
            className="px-4 py-3 text-white fw-bold"
          >
            Create
          </button>
        </div>
      </main>
    </>
  );
};

export default NewCourse;
