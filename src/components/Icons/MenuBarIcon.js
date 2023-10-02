import classes from "./MenuBarIcon.module.css";
import { useSelector } from "react-redux";

const MenuBarIcon = (props) => {
  const areCategoriesOpen = useSelector((state) => state.categories.isOpen);

  return (
    <div
      onClick={props.onClick}
      className={`${classes["menu-bar"]} ${
        areCategoriesOpen && classes["mob-active"]
      }`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MenuBarIcon;
