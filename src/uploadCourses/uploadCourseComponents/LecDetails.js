import Form from 'react-bootstrap/Form';
import './lecDetails.css'
import CurriculumList from './CirriculumList';
import React, { useState } from 'react';
// function addFunction() {
//   const y = document.querySelector(".List")
//   const x = document.querySelector(".Form");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//     y.style.display = "block"
//   }
// }


function LecDetails() {
  const [title, setTitle] = useState('');
  const [titleField, setTitleField] = useState(true);
  const handleAddSection = () => {
    setTitleField(false);
  };
  const [addBTN, setAddBTN] = useState(true);
  const handleAddBTN = () => {
    setAddBTN(false);
  };


  return (
    <>
      <div className='sec-contain'>
        <Form className='Form' >
          {titleField && <label><b>New Section:</b></label>}
          {titleField && <input required placeholder='Enter a Title' className='input' value={title} onChange={(e) => (setTitle(e.target.value))} />}
          {titleField && <button className='add-btn' type='submit' onClick={(handleAddSection)}>Ok</button>}
        </Form>

        <div className='List mb-3 mt-3 d-flex'>
          <CurriculumList title={title} />
        </div>
        {<div className='buttons'>
          {/* <button className='cancel-btn'>Cancel</button> */}
          <div>
            {addBTN && <button className='add-btn' type='submit' onClick={(handleAddBTN)}>Add Section</button>}
          </div>
        </div>}

      </div>
    </>
  );
}

export default LecDetails;