import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Dashboard = lazy(() => import("./Dashboard"));
const ManageCourse = lazy(() => import("./ManageCourse"));
const NewCourse = lazy(() => import("./NewCourse"));

const Instructor = (props) => {
  return (
    <Suspense fallback={<LoadingSpinner side={70} />}>
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
    </Suspense>
  );
};

export default Instructor;
