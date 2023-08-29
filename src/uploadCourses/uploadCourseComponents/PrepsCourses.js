import './PrepsCourses.css'

function BasicExample() {
  return (
    <div className='courseContainer'>
      <img variant="top" src={require("../../assets/placeholder.jpg")} className='course-card-img' />
      <div className='course-details'>
        <h4>Card Title</h4>
        <h6 className='course-status'><b>Draft:</b> public</h6>
      </div>
      <h4 className='hidden-caption' >Edit/ Manage Course</h4>
    </div>
  );
}

export default BasicExample;