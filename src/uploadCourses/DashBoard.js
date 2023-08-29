import { Button, Col, Dropdown, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './DashBoard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PrepsCourse from "./uploadCourseComponents/PrepsCourses";
import { Link } from "react-router-dom";

function DashBoard() {
  return (
    <>
      <div className="dash-board">
        <Form inline className="search-courses">
          <form className={'search-container'}>
            <button className={"search-icon"}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input type="search" placeholder="   Search for anything" className="search-bar" />

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="ms-5 drop-down">
                Newest
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
                <Dropdown.Item href="#/action-3">A-Z</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Z-A</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Published First</Dropdown.Item>
                <Dropdown.Item href="#/action-6">Unpublished First</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </form>
          <Link to="/lecdetails" ><Button variant="info" className="new-btn">New Course</Button></Link>
        </Form>
      </div>
      <PrepsCourse />
      <PrepsCourse />
    </>
  )
}

export default DashBoard;