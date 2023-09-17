import { NavLink } from "react-router-dom";
import classes from "./Categories.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useSelector } from "react-redux";

const Categories = (props) => {
  const { isLoading, categories, error } = useSelector(
    (state) => state.categories
  );
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
            {cat.text}
          </NavLink>
        ))}
    </div>
  );
};

export default Categories;
