import React, { useRef, useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FileUploadButton.css'

function FileUploadButton(props) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [btnAppear, setBtnAppear] = useState(true);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploaded(true);
    setBtnAppear(false);
  };


  return (
    <div>
      {btnAppear && <button onClick={handleButtonClick} className="content-btn mb-1"><FontAwesomeIcon icon={faPlus} className="me-1" />{props.children}</button>}
      {!uploaded && <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />}
      {selectedFile && uploaded && <p>file Name: {selectedFile.name}</p>}
    </div>
  );

}

export default FileUploadButton;