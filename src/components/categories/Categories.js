import { NavLink } from "react-router-dom";
import classes from "./Categories.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { categoriesActions } from "../../store/categories-slice";

const Categories = (props) => {
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.categories);
  const {
    isLoading,
    sendRequest: getCategories,
    error: categoriesError,
  } = useHttp();

  useEffect(() => {
    if (!categories) {
      getCategories({ endPoint: "categories/getAllCategories" }, (payload) => {
        console.log(payload);
        dispatch(
          categoriesActions.setCategories(
            payload.categories.map((cat) => {
              return {
                id: cat.id,
                createdAt: cat.createdAt,
                updatedAt: cat.updatedAt,
                text: cat.categoryName,
              };
            })
          )
        );
      });
    }
  }, [categories, getCategories, dispatch]);

  useEffect(() => {
    dispatch(
      categoriesActions.setStates({ isLoading, error: categoriesError })
    );
  }, [dispatch, isLoading, categoriesError]);

  return (
    <div className={`${classes.categories} ${props.className}`}>
      {error && <p className="text-center">{error}</p>}
      {!categories && !error ? (
        <LoadingSpinner side={40} className="my-3" />
      ) : (
        categories.map((cat, index) => (
          <NavLink
            key={index}
            className={(activeClass) =>
              activeClass.isActive ? classes.active : ""
            }
            to={`category/${cat.id}`}
          >
            {cat.text}
          </NavLink>
        ))
      )}
    </div>
  );
};

export default Categories;
