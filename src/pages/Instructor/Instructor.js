import { Route, Routes } from "react-router";
import InstructorHeader from "../../components/Header/InstructorHeader";
import Dashboard from "./Dashboard";

const Instructor = (props) => {
  const { dummyInstructors, dummyCourses, dummyUsers } = props;
  return (
    <>
      <InstructorHeader />
      <Routes>
        <Route
          path=""
          element={
            <Dashboard
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
              dummyUsers={dummyUsers}
            />
          }
        />
        <Route path="course/:courseId" element={<h3>Manage course</h3>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default Instructor;
