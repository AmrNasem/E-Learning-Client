import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Course from "../../components/Instructor/Course";
import classes from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import Select from "../../components/Instructor/Select";
import { useNavigate } from "react-router-dom";
import InstructorHeader from "../../components/Header/InstructorHeader";
// import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
// import { backend } from "../../App";

const sortReducer = (state, action) => {
  if (action.type === "toggleSort") {
    return {
      ...state,
      open: !state.open,
    };
  }

  if (action.type === "closeSort") {
    return {
      ...state,
      open: false,
    };
  }

  if (action.type === "changeSort") {
    let courses = [...state.courses];
    if (action.by === "Newest")
      courses.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    else if (action.by === "Oldest")
      courses.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    else if (action.by === "A-Z") {
      courses.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (action.by === "Z-A") {
      courses.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
    }

    return {
      ...state,
      by: action.by,
      courses,
    };
  }

  return {
    type: "",
    by: "",
    open: false,
    courses: [],
  };
};

const Dashboard = (props) => {
  const searchRef = useRef();
  const submitSearchRef = useRef();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.auth.user);
  // const [data, setData] = useState(null);
  // const {
  //   isLoading,
  //   sendRequest: getCourses,
  //   error,
  // } = useHttp(
  //   useCallback((data) => {
  //     setData(data);
  //   }, [])
  // );
  const instructor = props.dummyInstructors.find(
    (i) => i.id === authedUser.instructor
  );
  const [query, setQuery] = useState("");
  const options = useMemo(
    () => [
      { id: "Newest", text: "Newest" },
      { id: "Oldest", text: "Oldest" },
      { id: "A-Z", text: "A-Z" },
      { id: "Z-A", text: "Z-A" },
    ],
    []
  );

  const [sort, dispatchSort] = useReducer(sortReducer, {
    type: "",
    by: "Newest",
    open: false,
    courses: props.dummyCourses
      .filter((c) => instructor.courses.some((item) => item === c.id))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  });
  const [courses, setCourses] = useState(sort.courses);
  const defaultValue = useMemo(
    () => options.find((o) => o.id === "Newest"),
    [options]
  );
  // useEffect(() => {
  //   // getCourses({ endpoint: "courses/teachingCourses" });
  //   const data = fetch(`${backend}/courses/teachingCourses`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  //   console.log(data);
  // }, []);

  useEffect(() => {
    submitSearchRef.current.click();
  }, [sort.courses]);

  const filterCoursesHandler = (e) => {
    e.preventDefault();
    setCourses(
      sort.courses &&
        sort.courses.filter((course) =>
          new RegExp(searchRef.current.value, "ig").test(course.title)
        )
    );
    setQuery(searchRef.current.value);
  };

  return (
    <>
      <InstructorHeader />
      <main className={`my-5 ${classes.dashboard}`}>
        <div className="d-flex justify-content-between">
          <h1>Courses</h1>
          <button
            onClick={() => navigate("/course/create")}
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
                onChange={(e) => {
                  setCourses(
                    sort.courses.filter((course) =>
                      new RegExp(searchRef.current.value, "ig").test(
                        course.title
                      )
                    )
                  );
                  setQuery(e.target.value);
                }}
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
            <Select
              className={classes.sort}
              defaultValue={defaultValue}
              options={options}
              onChange={useCallback(
                (option) => dispatchSort({ type: "changeSort", by: option.id }),
                []
              )}
            />
          </div>
          <button
            onClick={() => navigate("/course/create")}
            className={`btn d-none d-md-block rounded-0 py-2 text-white ${classes["new-course"]}`}
          >
            New Course
          </button>
        </div>
        {courses ? (
          <div>
            {!courses.length && (
              <h4 className="text-center">No courses to show</h4>
            )}
            {courses.map((course, index) => (
              <Course key={index} query={query} {...course} />
            ))}
          </div>
        ) : (
          <LoadingSpinner side={60} />
        )}
      </main>
    </>
  );
};

export default Dashboard;
