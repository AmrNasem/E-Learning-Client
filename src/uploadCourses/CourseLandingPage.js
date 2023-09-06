import './CourseLandingPage.css'
import SideBar from './Sidebar';
import FileUploadButton from './uploadCourseComponents/FileUploadButton';
function CourseLandingPage() {
  return (
    <>

      <div className="all-page">
        <SideBar />
        <form className='main-page'>
          <div>
            <h2 className='heading'> Course landing page</h2>
          </div>
          <hr />
          <div className='body-container'>
            <p className='paragraph'>
              Your course landing page is crucial to your success on Udemy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course. Learn more about creating your course landing page and course title standards.
            </p>
            <label className='title-lable'>Course title
            </label>
            <input required aria-invalid="false" placeholder="  Insert your course title.                                                                    60" name="title" data-purpose="edit-course-title" maxLength="60" type="text" className="title-input-edit ud-text-input-large ud-text-md"></input>
            <label className='title-lable'>Course Subtitle
            </label>
            <input required aria-invalid="false" placeholder="  Insert your course subtitle.                                                            120" name="subtitle" data-purpose="edit-course-title" maxLength="120" type="text" className="description-input ud-text-input-large ud-text-md"></input>
            <label className='title-lable'>Course description
            </label>
            <input required aria-invalid="false" placeholder="  Insert your course description." name="title" data-purpose="edit-course-title" maxLength="60" type="text" className="title-input-edit ud-text-input-large ud-text-md"></input>
            <label className='course-info-lable'>Course Basic info
            </label>
            <div className='course-basic-info'>
              <select required="" aria-invalid="false" title="Locale" name="locale" className="lang-select">
                <option>العربية</option>
                <option>English (US)</option>
              </select>
              <select required aria-invalid="false" className="level-drop-down">
                <option selected hidden disabled className=''>-- Select Level --</option>
                <option>Beginner Level</option>
                <option>Intermediate Level</option>
                <option>Expert Level</option>
                <option>All Levels</option>
              </select>
              <select required aria-invalid="false" className="edit-cat-drop-down col-12">
                <option selected hidden disabled className=''>Choose a category</option>
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
              <select required aria-invalid="false" className="edit-cat-drop-down col-12">
                <option selected hidden disabled className=''>-- Select Subcategory --</option>
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
              <label className='course-info-lable'>What is primarily taught in your course?
                <input aria-invalid="false" placeholder=" e.g. Landscape Photography" name="title" data-purpose="edit-course-title" maxLength="60" type="text" className="landscape"></input>
              </label>
            </div>
            <div className='course-image mb-4'>
              <img variant="top" src={require("../assets/placeholder.jpg")} className='course-img' />
              <div className='par&upload'>
                <p>Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</p>
                <div className="file-uploader-module" data-purpose="">
                  <label className="file-uploader-module-lbl">
                    <span className="file-uploader-module--fake-input">
                      <span className="file-uploader-module--fake-input-text--2n1U1">No file selected</span>
                    </span>
                    <FileUploadButton>Photo</FileUploadButton>
                  </label>
                </div>
              </div>
            </div>
            <div className='course-video'>
              <img variant="top" src={require("../assets/placeholder.jpg")} className='course-vid' />
              <div className='par&upload'>
                <p>Your promo video is a quick and compelling way for students to preview what they’ll learn in your course. Students considering your course are more likely to enroll if your promo video is well-made. Learn how to make your promo video awesome!</p>
                <div className="file-uploader-module" data-purpose="">
                  <label className="file-uploader-module-lbl">
                    <span className="file-uploader-module--fake-input">
                      <span className="file-uploader-module--fake-input-text--2n1U1">No file selected</span>
                    </span>
                    <FileUploadButton>Video</FileUploadButton>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button className='add-btn col-2' type='submit'>submit</button>
        </form>
      </div>
    </>
  )
}

export default CourseLandingPage;