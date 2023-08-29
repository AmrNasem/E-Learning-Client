import { Link } from "react-router-dom";
import "./Sidebar.css";

function SideBar() {
  return (
    <>
      <div className="d-flex flex-nowrap">
        <div
          className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary side-bar"
          style={{ width: "280px" }}
        >
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item" onClick={() => { }}>
              <Link
                to='/instractor/cirriculm'
                className="nav-link link-body-emphasis Home"
                aria-current="page"
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use href="/#home" />
                </svg>
                Cirriculum
              </Link>
            </li>
            <li onClick={() => { }}>
              <Link
                to="/instractor/courselandingpage"
                className="nav-link link-body-emphasis Add-Customer"
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use href="/#people-circle" />
                </svg>
                Course Landing Page
              </Link>
            </li>
            <li onClick={() => { }}>
              <Link
                to="/instractor/Pricing"
                className="nav-link link-body-emphasis Add-Customer"
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use href="/#people-circle" />
                </svg>
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </div >
    </>
  );
}

export default SideBar;
