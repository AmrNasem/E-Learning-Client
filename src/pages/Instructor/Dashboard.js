import { useCallback, useEffect, useRef, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Course from "../../components/Instructor/Course";
import classes from "./Dashboard.module.css";
import Select from "../../components/Instructor/Select";
import { useNavigate } from "react-router-dom";
import InstructorHeader from "../../components/Header/InstructorHeader";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import Footer from "../../components/Footer";

const sort = (arr, option) => {
  if (option.id === "newest")
    return arr.sort(
      (a, b) =>
        new Date(b.course.createdAt).getTime() -
        new Date(a.course.createdAt).getTime()
    );
  if (option.id === "oldest")
    return arr.sort(
      (a, b) =>
        new Date(a.course.createdAt).getTime() -
        new Date(b.course.createdAt).getTime()
    );
  if (option.id === "a-z")
    return arr.sort((a, b) =>
      a.course.title > b.course.title
        ? 1
        : a.course.title < b.course.title
        ? -1
        : 0
    );
  if (option.id === "z-a")
    return arr.sort((a, b) =>
      a.course.title > b.course.title
        ? -1
        : a.course.title < b.course.title
        ? 1
        : 0
    );
};

const options = [
  { id: "newest", text: "Newest" },
  { id: "oldest", text: "Oldest" },
  { id: "a-z", text: "A-Z" },
  { id: "z-a", text: "Z-A" },
];
const defaultValue = options.find((o) => o.id === "newest");

const Dashboard = (props) => {
  const [initialCourses, setInitialCourses] = useState(null);
  const [courses, setCourses] = useState(null);
  const [query, setQuery] = useState("");
  const searchRef = useRef();
  const submitSearchRef = useRef();
  const navigate = useNavigate();
  const { isLoading, sendRequest: getCourses, error } = useHttp();

  useEffect(() => {
    getCourses({ endPoint: "courses/teachingCourses" }, (payload) => {
      console.log(payload);
      setInitialCourses(sort(payload.teachingCourses, defaultValue));
      setCourses(sort(payload.teachingCourses, defaultValue));
    });
  }, [getCourses]);

  const sortCoursesHandler = useCallback((option) => {
    setInitialCourses((prevState) => [...sort(prevState, option)]);
    setCourses((prevState) => [...sort(prevState, option)]);
  }, []);

  const filterCoursesHandler = (e) => {
    e.preventDefault();
    if (initialCourses) {
      setCourses(
        initialCourses.filter((course) =>
          new RegExp(searchRef.current.value, "ig").test(course.course.title)
        )
      );
      setQuery(searchRef.current.value);
    }
  };

  return (
    <>
      <InstructorHeader />
      <main className={`my-5 ${classes.dashboard}`}>
        <div className="d-flex justify-content-between">
          <h1>Courses</h1>
          <button
            onClick={() => navigate("course/create")}
            className={`btn d-md-none rounded-0 text-white ${classes["new-course"]}`}
          >
            New Course
          </button>
        </div>
        <div className="d-flex justify-content-between my-4">
          <div className="d-flex gap-3 justify-content-between custom-flex-grow-1">
            <form className={`d-flex ${classes.form}`}>
              <input
                ref={searchRef}
                onChange={filterCoursesHandler}
                className="p-2 border-0 form-control shadow-none rounded-0"
                type="text"
                placeholder="Search your courses"
              />
              <button
                ref={submitSearchRef}
                onClick={filterCoursesHandler}
                className="py-2 px-3 border-0"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            {!error && courses ? (
              <Select
                className={classes.sort}
                defaultValue={defaultValue}
                options={options}
                onChange={sortCoursesHandler}
              />
            ) : (
              isLoading && <LoadingSpinner side={30} />
            )}
          </div>
          <button
            onClick={() => navigate("course/create")}
            className={`btn d-none d-md-block rounded-0 py-2 text-white ${classes["new-course"]}`}
          >
            New Course
          </button>
        </div>
        {error ? (
          <h3 className="text-center my-3">{error}</h3>
        ) : courses ? (
          <div>
            {!courses.length && (
              <h4 className="text-center">No courses to show</h4>
            )}
            {courses.map((course, index) => (
              <Course key={index} query={query} course={course} />
            ))}
          </div>
        ) : (
          <LoadingSpinner side={60} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
