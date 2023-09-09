import { useCallback, useMemo } from "react";
import Input from "../../components/Instructor/Input";
import Select from "../../components/Instructor/Select";
import PageBox from "../../components/UI/PageBox";
import classes from "./Basics.module.css";

const Basics = (props) => {
  const { course } = props;
  const levelOptions = useMemo(
    () => [
      { id: "beginner", text: "Beginner level" },
      { id: "intermediate", text: "Intermediate level" },
      { id: "expert", text: "Expert level" },
      { id: "all", text: "All levels" },
    ],
    []
  );
  const langOptions = useMemo(
    () => [
      { id: "ar", text: "العربية" },
      { id: "en", text: "English" },
    ],
    []
  );

  const categoryOptions = useMemo(
    () => [
      { id: "uiux", text: "UI/UX Design" },
      { id: "ai", text: "Artificial Intelligence" },
      { id: "web", text: "Web Development" },
      { id: "mobile", text: "Mobile Development" },
      { id: "security", text: "Cyber Security" },
      { id: "datascience", text: "Data Science" },
      { id: "machinelearning", text: "Machine Learning" },
    ],
    []
  );

  return (
    <PageBox title="Course landing page">
      <p>
        Your course landing page is crucial to your success on Udemy. If it's
        done right, it can also help you gain visibility in search engines like
        Google. As you complete this section, think about creating a compelling
        Course Landing Page that demonstrates why someone would want to enroll
        in your course. Learn more about creating your course landing page and
        course title standards.
      </p>
      <div>
        <h5>Course title</h5>
        <Input max={60} className="mb-1" text={course.title} restricted>
          Insert you course title.
        </Input>
        <p>
          Your title should be a mix of attention-grabbing, informative, and
          optimized for search
        </p>
      </div>
      <div>
        <h5>Course subtitle</h5>
        <Input max={200} className="mb-1" text={course.subtitle}>
          Insert you course subtitle.
        </Input>
        <p>
          Use 1 or 2 related keywords, and mention 3-4 of the most important
          areas that you've covered during your course.
        </p>
      </div>
      <div>
        <h5>Course description</h5>
        <textarea
          className={`${classes.description} bg-transparent w-100 p-3`}
          // onChange={changeValueHandler}
          placeholder="Insert you course description."
        >
          {course.description}
        </textarea>
        <p>Description should have minimum 200 words.</p>
      </div>
      <div>
        <h5>Basic info</h5>
        <div className="d-flex gap-3 flex-wrap">
          <Select
            className="flex-grow-1"
            reverse
            defaultValue={
              langOptions.find((o) => o.id === course.lang) || {
                id: "none",
                text: "-- Select language --",
              }
            }
            options={langOptions}
            onChange={useCallback((option) => {}, [])}
          />
          <Select
            className="flex-grow-1"
            reverse
            defaultValue={
              levelOptions.find((o) => o.id === course.level) || {
                id: "none",
                text: "-- Select level --",
              }
            }
            options={levelOptions}
            onChange={useCallback((option) => {}, [])}
          />
          <Select
            className="flex-grow-1"
            reverse
            defaultValue={categoryOptions.find(
              (o) => o.id === course.categoryId
            )}
            options={categoryOptions}
            onChange={useCallback((option) => {}, [])}
          />
        </div>
      </div>
    </PageBox>
  );
};

export default Basics;
