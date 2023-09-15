import { NavLink } from "react-router-dom";
import classes from "./Categories.module.css";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const Categories = (props) => {
  const { isLoading, sendRequest: getCategories, error } = useHttp();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getCategories({ endPoint: "categories/getAllCategories" }, (payload) => {
      console.log(payload);
      setCategories(payload.categories);
    });
  }, [getCategories]);

  const weired = !isLoading && !categories && !error;

  return (
    <div className={`${classes.categories} ${props.className}`}>
      {error && <p>{error}</p>}
      {isLoading && !weired && <LoadingSpinner side={40} className="my-3" />}
      {categories &&
        categories.map((cat, index) => (
          <NavLink
            key={index}
            className={(activeClass) =>
              activeClass.isActive ? classes.active : ""
            }
            to={`category/${cat.id}`}
          >
            {cat.categoryName}
          </NavLink>
        ))}
    </div>
  );
};

export default Categories;
