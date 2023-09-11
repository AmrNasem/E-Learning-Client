import { Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import ManageCourse from "./ManageCourse";
import Footer from "../../components/Footer";

const Instructor = (props) => {
  const { dummyInstructors, dummyCourses, dummyUsers } = props;
  return (
    <>
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
        <Route path="course/:courseId/*" element={<ManageCourse />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
};

export default Instructor;
