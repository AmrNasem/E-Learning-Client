import { memo, useCallback, useMemo } from "react";
import Select from "../../components/Instructor/Select";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import PageBox from "../../components/UI/PageBox";
import classes from "./Settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";

const options = [
  { id: "public", text: "Public" },
  { id: "private", text: "Private" },
];

const Settings = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const privacy = useSelector((state) => state.course.privacy);
  const defaultValue = useMemo(
    () => options.find((o) => o.id === privacy),
    [privacy]
  );

  const changePrivacyHandler = useCallback(
    (value) => dispatch(courseActions.changePrivacy(value.id)),
    [dispatch]
  );
  return (
    <PageBox title="Settings">
      <div className={`${classes.status} mt-4`}>
        <h5 className="mb-3">Course status</h5>
        {course ? (
          <>
            <div className="d-flex align-items-start flex-sm-row flex-column gap-4 my-4">
              <button
                disabled={course.status !== "published"}
                className={`${classes.button} flex-grow-1 px-3 py-2 bg-transparent`}
              >
                Unpublish
              </button>
              <p className={classes.desc}>
                New students cannot find your course via search, but existing
                students can still access content.
              </p>
            </div>
            <div className="d-flex align-items-start flex-sm-row flex-column gap-4 my-4">
              <button
                className={`${classes.button} ${classes.delete} flex-grow-1 px-3 py-2 bg-transparent`}
              >
                Delete
              </button>
              <p className={classes.desc}>
                We promise students lifetime access, so courses cannot be
                deleted after students have enrolled.
              </p>
            </div>
          </>
        ) : (
          <LoadingSpinner className="my-5" side={50} />
        )}
      </div>
      <div className={`mt-5 ${classes.privacy}`}>
        <h6>Enrollment (Privacy)</h6>
        {privacy ? (
          <>
            <Select
              // reverse
              className="mb-4"
              buttonClassName="px-3 py-2"
              defaultValue={defaultValue}
              options={options}
              onChange={changePrivacyHandler}
            />
            <p>
              {privacy === "public" &&
                "Public courses show up in search results and are available for anyone to take."}
              {privacy === "private" &&
                "If a course's enrollment page is private, the course won't show up in search results."}
            </p>
          </>
        ) : (
          <LoadingSpinner className="my-5" side={50} />
        )}
      </div>
    </PageBox>
  );
};

export default memo(Settings);
