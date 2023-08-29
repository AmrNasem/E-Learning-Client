import { Link } from 'react-router-dom';
import './LectureDetails.css'
import { useState } from 'react';

function LectureDetails() {
  // const x = document.querySelector('.continue-btn');
  // const y = document.querySelector('.title-input');
  // const z = document.querySelector('.cat-drop-down');

  // document.addEventListener('DOMContentLoaded', function () {
  //   y.addEventListener('input', fun);
  //   z.addEventListener('input', fun);
  //   const fun = function handleInputChange() {
  //     if (y.value !== null && z.value !== null) {
  //       x.disabled = false;
  //     } else {
  //       x.disabled = true;
  //       // alert('Please Fill in All Required Fields.');
  //     }
  //   }
  // })
  const [title, setTitle] = useState({
    title: ""
  })
  const [category, setCategory] = useState({
    category: ""
  })

  return (
    <>
      <div className="inputs-container">
        <h2>How About a Working Title?</h2>
        <input required value={title.title} className='title-input' type='text' placeholder='  eg. Learn JavaScript                                                                         60' maxLength={60}></input>
        <h2 className='category-title'>What category best fits the knowledge you'll share?</h2>
        <select required aria-invalid="false" class="cat-drop-down">
          <option selected value={"default"} hidden disabled className=''>Choose a category</option>
          <option>Development</option>
          <option>Business</option>
          <option>Finance &amp; Accounting</option>
          <option>IT &amp; Software</option>
          <option>Office Productivity</option>
          <option>Personal Development</option>
          <option>Design</option>
          <option>Marketing</option>
          <option>Lifestyle</option>
          <option>Photography &amp; Video</option>
          <option>Health &amp; Fitness</option>
          <option>Music</option>
          <option>Teaching &amp; Academics</option>
          <option value="-1">I don't know yet</option>
        </select>
      </div >
      <div class="toggel-bar">
        <Link to="/instractor/cirriculm"><button type="button" class="continue-btn" //</div>disabled={true}
        >
          <span>Continue</span>
        </button></Link>
      </div>
    </>
  )
}
export default LectureDetails;