import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import './CirriculumList.css'
import { useState } from "react";
import FileUploadButton from "./FileUploadButton";

function CurriculumList(props) {
  return (
    <>
      <div className="upload-container">
        <div className="item-bar">
          <div className="intro">
            <FontAwesomeIcon icon={faCircleCheck} className="me-1" />
            Lecture 1: {props.title} <FontAwesomeIcon icon={faFile} className="ms-3 me-1" />
          </div>
          <FileUploadButton>Content</FileUploadButton>

          {/* <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="fileToUpload" id="fileToUpload" />
            <input type="submit" value="Upload" />
          </form> */}

        </div>
        <div className="cirriculum-item">
          <FileUploadButton>Lecture</FileUploadButton>
        </div>
      </div>
    </>
  )
}

export default CurriculumList;