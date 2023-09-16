import { useCallback, useEffect, useState } from "react";
import Input from "../../components/Instructor/Input";
import Select from "../../components/Instructor/Select";
import InstructorHeader from "../../components/Header/InstructorHeader";
import classes from "./NewCourse.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { courseActions } from "../../store/course-slice";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

// const categoryOptions = [
//   { id: "uiux", text: "UI/UX Design" },
//   { id: "ai", text: "Artificial Intelligence" },
//   { id: "web", text: "Web Development" },
//   { id: "mobile", text: "Mobile Development" },
//   { id: "security", text: "Cyber Security" },
//   { id: "datascience", text: "Data Science" },
//   { id: "machinelearning", text: "Machine Learning" },
//   { id: "none", text: "I don't know yet" },
// ];

const NewCourse = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState({
    id: "",
    text: "Choose Category",
  });
  const [isValid, setIsValid] = useState(false);
  const [categories, setCategories] = useState([]);
  const { isLoading: isCreating, sendRequest: createCourse, error } = useHttp();
  const { isLoading: gettingCategories, sendRequest: getCategories } =
    useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories({ endPoint: "categories/getAllCategories" }, (payload) => {
      console.log(payload);
      setCategories([
        ...payload.categories.map((cat) => {
          return { ...cat, text: cat.categoryName };
        }),
        { id: "none", text: "I don't know yet" },
      ]);
    });
  }, [getCategories]);

  useEffect(() => {
    if (title.trim() !== "" && category.id !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [title, category]);

  const changeCategoryHandler = useCallback((value) => setCategory(value), []);

  const createCourseHandler = () => {
    // POST request here
    createCourse(
      {
        endPoint: "courses/addCourse",
        method: "POST",
        body: { title, categoryId: category.id },
      },
      (payload) => {
        dispatch(courseActions.setCourse(payload.course));
        navigate(`/instructor/course/${payload.course.id}`);
      }
    );
  };

  return (
    <>
      <InstructorHeader />
      {error ? (
        <h3 className="text-center my-5">{error}</h3>
      ) : (
        <main
          className={` d-flex justify-content-center align-items-center text-center ${classes["new-course"]}`}
        >
          <div className={`${classes.content} d-flex flex-column`}>
            <div className="mt-4 mb-2">
              <h3>How about a working title?</h3>
              <p>
                It's ok if you can't think of a good title now. You can change
                it later.
              </p>
              <Input
                className="mt-4"
                max={60}
                content={title}
                onChange={(value) => setTitle(value)}
              >
                e.g. Learn Photoshop CS6 from Scratch
              </Input>
            </div>
            <div className="my-4">
              <h3>What category best fits the knowledge you'll share?</h3>
              <p>
                If you're not sure about the right category, you can change it
                later.
              </p>
              {gettingCategories ? (
                <LoadingSpinner side={40} />
              ) : (
                <Select
                  className="my-4"
                  buttonClassName="p-3"
                  reverse
                  defaultValue={category}
                  options={categories}
                  onChange={changeCategoryHandler}
                />
              )}
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
            {isCreating ? (
              <LoadingSpinner className="text-end" side={40} />
            ) : (
              <button
                onClick={createCourseHandler}
                disabled={!isValid}
                className="px-4 py-3 text-white fw-bold"
              >
                Create
              </button>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default NewCourse;
