import { Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import ManageCourse from "./ManageCourse";
import NewCourse from "./NewCourse";

const Instructor = (props) => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="course/create" element={<NewCourse />} />
      <Route path="course/:courseId/*" element={<ManageCourse />} />
      <Route
        path="*"
        element={
          <main>
            <h1 className="text-center my-4">Page Not Found</h1>
          </main>
        }
      />
    </Routes>
  );
};

export default Instructor;
