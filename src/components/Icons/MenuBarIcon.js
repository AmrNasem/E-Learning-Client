import { useContext } from "react";
import HeaderContext from "../../store/header-context";
import classes from "./MenuBarIcon.module.css";

const MenuBarIcon = (props) => {
  const headerCtx = useContext(HeaderContext);

  return (
    <div
      onClick={props.onClick}
      className={`${classes["menu-bar"]} ${
        headerCtx.visibleCategories && classes["mob-active"]
      }`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MenuBarIcon;
