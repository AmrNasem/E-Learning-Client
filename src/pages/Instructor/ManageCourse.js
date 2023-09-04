import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import classes from "./ManageCourse.module.css";

const ManageCourse = (props) => {
  const activeClassHandler = ({ isActive }) => {
    const bootstrapClasses = `px-4 py-2 d-block text-decoration-none ${classes.link}`;
    if (isActive) return `${bootstrapClasses} ${classes.active}`;
    else return bootstrapClasses;
  };

  return (
    <main className={`my-5 d-flex gap-4 ${classes["manage-course"]}`}>
      <nav className="my-4">
        <div className="mb-4">
          <h5 className="ps-4 mt-2">Plan your course</h5>
          <NavLink className={activeClassHandler} to="goals">
            <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
            <span>Intended learners</span>
          </NavLink>
        </div>
        <div className="mb-4">
          <h5 className="ps-4 mt-2">Create your content</h5>
          <NavLink className={activeClassHandler} to="curriculum">
            <FontAwesomeIcon className="me-2 fs-5" icon={faCircle} />
            <span>Curriculum</span>
          </NavLink>
        </div>
        <div className="mb-4">
          <h5 className="ps-4 mt-2">Publish your course</h5>
          <NavLink className={activeClassHandler} to="landing">
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
        <Route path="goals" element={<h3>Intended learners</h3>} />
        <Route path="curriculum" element={<h3>Curriculum</h3>} />
        <Route path="landing" element={<h3>Landing page</h3>} />
        <Route path="pricing" element={<h3>Pricing</h3>} />
        <Route path="*" element={<h3>No such a page</h3>} />
      </Routes>
    </main>
  );
};

export default ManageCourse;
