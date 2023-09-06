import Form from 'react-bootstrap/Form';
import './lecDetails.css'
import CurriculumList from './CirriculumList';
import React, { useState } from 'react';

function LecDetails() {
  const [section, setSection] = useState('');
  const [titleField, setTitleField] = useState(true);
  const [addBTN, setAddBTN] = useState(false);
  const handleHide = () => {
    setTitleField(false);
    setAddBTN(true);

  };

  return (
    <>
      <div className='sec-contain'>
        {titleField && <Form className='Form' >
          <label><b>New Section:</b></label>
          <input required placeholder='Enter a Title' className='input' value={section} onChange={(e) => (setSection(e.target.value))} />
          {/* {titleField && <button className='add-btn' type='submit' onClick={(handleAddSection)}>Ok</button>} */}
          {<div className='buttons '>
            <div>
              <button className='add-btn' type='submit' onClick={(handleHide)}>Add Section</button>
            </div>
          </div>}
        </Form>}
      </div>
      {addBTN && <CurriculumList section={section} />}
    </>
  );
}

export default LecDetails;