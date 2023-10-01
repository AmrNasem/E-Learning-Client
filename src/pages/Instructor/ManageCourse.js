import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Navigate, Route, Routes, useParams } from "react-router-dom";
import classes from "./ManageCourse.module.css";
import Goals from "./Goals";
import Curriculum from "./Curriculum";
import { useDispatch, useSelector } from "react-redux";
import Basics from "./Basics";
import Pricing from "./Pricing";
import { useEffect, useState } from "react";
import { courseActions } from "../../store/course-slice";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Settings from "./Settings";
import Footer from "../../components/Footer";
import useHttp from "../../hooks/use-http";
import ManageCourseHeader from "../../components/Instructor/ManageCourseHeader";

const ManageCourse = (props) => {
  const { courseId } = useParams();
  const [togglePages, setTogglePages] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const course = useSelector((state) => state.course.course);
  const dispatch = useDispatch();
  const { sendRequest: getCourse, error } = useHttp();

  useEffect(() => {
    // GET request
    getCourse(
      { endPoint: `courses/getCourseToEdit/${courseId}` },
      (payload) => {
        console.log(payload);
        dispatch(courseActions.setCourse(payload.course));
        dispatch(courseActions.updateCourse(payload.course));
      }
    );
    return () => {
      dispatch(courseActions.setCourse(null));
      dispatch(courseActions.updateCourse(null));
    };
  }, [getCourse, courseId, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activeClassHandler = ({ isActive }) => {
    const bootstrapClasses = `px-4 py-2 d-block text-decoration-none ${classes.link}`;
    if (isActive) return `${bootstrapClasses} ${classes.active}`;
    else return bootstrapClasses;
  };

  if (error)
    return (
      <main>
        <h3 className="text-center my-3">{error}</h3>
      </main>
    );

  return (
    <>
      {course && (
        <ManageCourseHeader status={course.status} title={course.title} />
      )}
      <main className={`my-4 py-2 px-md-4 px-3 ${classes["manage-course"]}`}>
        {windowWidth < 992 && (
          <div
            className={`${classes["toggle-nav"]} d-flex justify-content-between align-items-center`}
          >
            <button
              onClick={() => setTogglePages((prevState) => !prevState)}
              className="fs-4 border-0 bg-transparent p-2"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <button
              className={`btn text-white rounded-0 my-3 py-2 px-4 fw-bold ${classes.submit}`}
            >
              Submit for Review
            </button>
          </div>
        )}
        <div className="d-flex gap-4 flex-column flex-lg-row">
          {(togglePages || windowWidth >= 992) && (
            <nav
              className={`${classes.nav} my-4 d-flex d-lg-block gap-3 flex-wrap`}
            >
              <div className="mb-4 mt-4 text-nowrap flex-grow-1">
                <h6 className="fw-bold ps-4 mt-2">Plan your course</h6>
                <NavLink className={activeClassHandler} to="goals">
                  <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
                  <span>Intended learners</span>
                </NavLink>
              </div>
              <div className="mb-4 mt-4 text-nowrap flex-grow-1">
                <h6 className="fw-bold ps-4 mt-2">Create your content</h6>
                <NavLink className={activeClassHandler} to="curriculum">
                  <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
                  <span>Curriculum</span>
                </NavLink>
              </div>
              <div className="mb-4 mt-4 text-nowrap flex-grow-1">
                <h6 className="fw-bold ps-4 mt-2">Publish your course</h6>
                <NavLink className={activeClassHandler} to="basics">
                  <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
                  <span>Course landing page</span>
                </NavLink>
                <NavLink className={activeClassHandler} to="pricing">
                  <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
                  <span>Pricing</span>
                </NavLink>
              </div>
              {windowWidth >= 992 && (
                <button
                  className={`btn text-white rounded-0 my-3 py-3 w-100 fw-bold ${classes.submit}`}
                >
                  Submit for Review
                </button>
              )}
            </nav>
          )}
          <Routes>
            <Route path="" element={<Navigate to="goals" replace />} />
            <Route path="goals" element={<Goals />} />
            <Route path="curriculum" element={<Curriculum />} />
            <Route path="basics" element={<Basics />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<h3>No such a page</h3>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ManageCourse;
