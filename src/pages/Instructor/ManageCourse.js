import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Navigate, Route, Routes, useParams } from "react-router-dom";
import classes from "./ManageCourse.module.css";
import Goals from "./Goals";
import Curriculum from "./Curriculum";
import { useDispatch, useSelector } from "react-redux";
import jsonFile from "../../assets/dummy.json";
import Basics from "./Basics";
import Pricing from "./Pricing";
import { useEffect } from "react";
import { courseActions } from "../../store/course-slice";

const ManageCourse = (props) => {
  const { courseId } = useParams();
  const authedUser = useSelector((state) => state.auth.user);
  const course = useSelector((state) => state.course.course);
  const dispatch = useDispatch();
  const instructor = jsonFile.instructors.find(
    (i) => i.id === authedUser.instructor
  );

  useEffect(() => {
    if (!course || course.id !== courseId) {
      // GET request
      const data = jsonFile.courses.find((c) => c.id === courseId);
      dispatch(courseActions.setCourse(data));
    }
  }, [course, courseId, dispatch]);

  // The next statement is temporary till we link the backend!
  if (!instructor.courses.find((c) => c === courseId))
    return (
      <main className={`my-4 py-2 ${classes["manage-course"]}`}>
        <h3 className="text-center">You have no such a course</h3>
      </main>
    );

  const activeClassHandler = ({ isActive }) => {
    const bootstrapClasses = `px-4 py-2 d-block text-decoration-none ${classes.link}`;
    if (isActive) return `${bootstrapClasses} ${classes.active}`;
    else return bootstrapClasses;
  };

  return (
    <main
      className={`my-4 py-2 d-flex gap-4 flex-column flex-lg-row ${classes["manage-course"]}`}
    >
      <nav className="my-4">
        <div className="mb-4 mt-4">
          <h6 className="fw-bold ps-4 mt-2">Plan your course</h6>
          <NavLink className={activeClassHandler} to="goals">
            <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
            <span>Intended learners</span>
          </NavLink>
        </div>
        <div className="mb-4 mt-4">
          <h6 className="fw-bold ps-4 mt-2">Create your content</h6>
          <NavLink className={activeClassHandler} to="curriculum">
            <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
            <span>Curriculum</span>
          </NavLink>
        </div>
        <div className="mb-4 mt-4">
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
        <button
          className={`btn text-white rounded-0 my-3 py-3 w-100 fw-bold ${classes.submit}`}
        >
          Submit for Review
        </button>
      </nav>
      <Routes>
        <Route path="" element={<Navigate to="goals" replace />} />
        <Route path="goals" element={<Goals />} />
        <Route path="curriculum" element={<Curriculum course={course} />} />
        <Route path="basics" element={<Basics course={course} />} />
        <Route path="pricing" element={<Pricing course={course} />} />
        <Route path="*" element={<h3>No such a page</h3>} />
      </Routes>
    </main>
  );
};

export default ManageCourse;
