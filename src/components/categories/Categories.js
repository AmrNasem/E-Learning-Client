import { NavLink } from "react-router-dom";
import classes from "./Categories.module.css";

const Categories = (props) => {
  return (
    <div className={`${classes.categories} ${props.className}`}>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/uiux"
      >
        UI/UX
      </NavLink>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/ai"
      >
        AI
      </NavLink>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/web"
      >
        Web
      </NavLink>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/mobile"
      >
        Mobile
      </NavLink>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/desktop"
      >
        Desktop
      </NavLink>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/security"
      >
        Cyber Security
      </NavLink>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/datascience"
      >
        Data Science
      </NavLink>
      <NavLink
        className={(activeClass) =>
          activeClass.isActive ? classes.active : ""
        }
        to="category/machinelearning"
      >
        Machine Learning
      </NavLink>
    </div>
  );
};

export default Categories;
