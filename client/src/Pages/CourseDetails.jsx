import React, { useEffect, useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/CourseDetails.css'
import Pc from '../assets/img/pc.jpg'
import avatar from '../assets/img/avatar.jpg'
import Angry_Video from '../assets/courses/angry.mp4'
import Fear_Audio from '../assets/courses/fear.wav'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CourseDetails = ({pageName='Course Details'}) => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [video, setVideo] = useState(false)
    const [audio, setAudio] = useState(false)
    const [courseText, setCourseText] = useState(false)

    const [activeSection, setActiveSection] = useState('course-details')
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [course, setCourse] = useState({})
  
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [img_path, setImg_path] = useState(null);
    const [course_path, setCourse_path] = useState(null);
    const [img_name, setImg_name] = useState('');
    const [course_name, setCourse_name] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [professor_id, setProfessor_id] = useState('');

    useEffect(() => {
      axios.get('http://localhost:3000/courses/' + id)
        .then(res => {
          const courseData = res.data;
          setCourse(courseData);
          setName(courseData.name);
          setType(courseData.type);
          setImg_path(courseData.img_path);
          setCourse_path(courseData.course_path);
          setDescription(courseData.description);
          setDetails(courseData.details);
          const formattedCourseDate = new Date(courseData.date).toLocaleDateString();
          setDate(formattedCourseDate);
          setProfessor_id(courseData.professor_id);
    
          if (courseData.type === 'Video') {
            setVideo(true);
          } else if (courseData.type === 'Audio') {
            setAudio(true);
          } else {
            setCourseText(true);
          }
        })
        .catch(err => console.log(err));
    }, [id]);
  
    const handleEditCourse = (e) => {
      e.preventDefault();
  
      if (!name || !type || !img_path || !course_path || !description || !details || !date || !professor_id) {
        alert('Please enter all inputs!!');
        return;
      }
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('img_path', img_path);
      formData.append('course_path', course_path);
      formData.append('description', description);
      formData.append('details', details);
      formData.append('date', date);
      formData.append('professor_id', professor_id);
  
      axios.put('http://localhost:3000/courses/'+id, formData)
        .then(res => {
          alert('Input updated successfully');
          window.location.reload();
        })
        .catch(err => {
          alert('An error occurred while adding the input!!');
          console.log(err);
        });
    };

    const handleDeleteCourse = (e) => {
      e.preventDefault()
      axios.delete('http://localhost:3000/courses/'+id)
      .then(res => {
        alert('Course deleted successfully')
        navigate('/courses')
      })
      .catch(err => alert(err))
    }

    return (
      <StarterPage>

        {/* Page Header */}

        <div className="page-head d-flex justify-content-between p-0 ">
          <div className="name d-flex flex-column justify-content-lg-start pt-2">
            <div className="top-name">
              <h6 className='fw-bold mb-1'>{pageName}</h6>
            </div>
            <div className="bottom-name mt-0">
              <p className='text-uppercase mb-0 fw-light'><span className='text-primary'>ACADEMIA</span> / {pageName}</p>
            </div>
          </div>
          <div className="links">
            <ul className='list-unstyled d-flex flex-row'>
              <li className={`me-4 pt-2 ${activeSection === 'course-details' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('course-details')}
                >Content</a>
              </li>
              <li className={`me-4 pt-2 ${activeSection === 'course-reviews' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('course-reviews')}
                >Reviews</a>
              </li>
              <li className={`pt-2 ${activeSection === 'edit-course' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('edit-course')}
                >Settings</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Page Body */}

        <div className="section-body my-4 pb-2">
          <div className="container-fluid p-0">

            <div className="tab-content">

              {/* Course Details */}

              <div className={`tab-pane ${activeSection === 'course-details' ? 'active': ''}`}>
                
                <div className="row">

                  {/* course infos */}

                  <div className="col-xl-4 col-lg-5 col-md-12">
                    <div className="card">
                      <Link to={`/courses/${course._id}`}>
                        <img className="card-img-top" src={'../../uploads/'+course.img_path} alt="Course image" style={{width: "100%", height: "12.4rem"}} />
                      </Link>
                      <div className="card-body d-flex flex-column px-4 pb-3">
                        <h6 className='blueHover'><a className='text-decoration-none text-capitalize'>{course.name}</a></h6>
                        <p className="text-muted text-capitalize small-para">{course.description}</p>
                      </div>

                      {/* table card info */}

                      <div className="d-flex align-items-between justify-content-between px-2 py-3 course-info course-grey">
                        <div className="d-flex align-items-center px-1">
                          <i className="bi bi-calendar text-blue me-4 font-14"></i>
                          <p className="tx-medium m-0">Date</p>
                        </div>
                        <div className="w-50">
                          <p className="text-right mb-0">{course.date}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-between justify-content-between px-2 py-3 course-info ">
                        <div className="d-flex align-items-center px-1">
                          <i className="bi bi-justify text-warning me-4 font-16"></i>
                          <p className="tx-medium m-0">Type</p>
                        </div>
                        <div className="w-50">
                          <p className="text-right mb-0">{course.type}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-between justify-content-between px-2 py-3 course-info course-grey">
                        <div className="d-flex align-items-center px-1">
                          <i className="bi bi-people-fill text-danger me-4 font-14"></i>
                          <p className="tx-medium m-0">Students</p>
                        </div>
                        <div className="w-50">
                          <p className="text-right mb-0">69 registered</p>
                        </div>
                      </div>
                      
                      {/* end table card info */}

                      <div className="card-footer">
                        <div className="d-flex align-items-center justify-content-between mt-auto">
                          <div className="d-flex flex-row align-items-center">
                              <img className="avatar avatar-md me-3" src={'../../uploads/'+course.professor_id?.img_path} alt="avatar" />
                            <div>
                              <a href="" className='text-decoration-none'>Pro. {course.professor_id?.last_name}</a>
                              <small className="d-block text-muted">Head OF Dept.</small>
                            </div>
                          </div>
                          <div className="ml-auto text-muted float-end">
                            <a href="" className="icon d-none d-md-inline-block ml-3"><i className="bi bi-heart mr-1"></i> {course.likes}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* course content */}

                  <div className="col-xl-8 col-lg-7 col-md-12">

                    {/* input course */}

                    <div className="card">
                      <div className="card-header pt-4 pb-2">
                        <h5 className="m-0">Course Content</h5>
                      </div>

                      {/* if the course is a video */}

                      { video && (
                          <div className="card-body pt-3 pb-4 course-content">
                            <video src={'../../uploads/'+course.course_path} className='w-100' controls></video>
                            <p className='mt-3'>{course.details}</p>
                          </div>
                        )
                      }

                      {/* if the course is an audio */}

                      { audio && (
                          <div className="card-body pt-3 pb-4 course-content">
                            <audio src={'../../uploads/'+course.course_path} className='w-100' controls></audio>
                            <p className='mt-3'>{course.details}</p>
                          </div>
                        )
                      }
                      
                      {/* if the course is a text */}

                      {courseText && (
                          <div className="card-body pt-2 pb-4 course-content">
                            <p>{course.details}</p>
                          </div>
                        )
                      }

                    </div>

                    {/* certificate */}

                    <div className="card">
                      <div className="card-header pt-4 pb-2">
                        <h5 className="m-0">Receive Certificate</h5>
                      </div>
                      <div className="card-body course-content pt-1">
                        <p className='mt-0 '>This course's certificate serves as a testament to your hard work and dedication throughout the program. However, before we can issue your certificate, we kindly request that you post a review of your experience. Your feedback is invaluable to us and helps future students make informed decisions.</p>
                        <button className='btn btn-primary mb-1' onClick={handleShow}>Post Review</button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Course Reviews */}

              <div className={`tab-pane ${activeSection === 'course-reviews' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header pb-3">
                    <h3 className="card-title textColor">Reviews Availables</h3>
                  </div>
                  <div className="card-body py-2">
                    {/* Review */}
                    <div className="timeline_item py-0 mb-4">
                      <img className="tl_avatar" src={avatar} alt="Avatar" />
                      <span className='d-flex justify-content-between'>
                        <a href="" className='text-decoration-none font-16 hoverBlue'>Fahd El Attar</a>
                        <small className="float-right text-right font-12 textColor">20-April-2019</small>
                      </span>
                      <div className="msg my-1 d-flex flex-column align-items-start">
                        <p className='my-1 mb-3 font-14 textColor'>
                          I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card.
                        </p>
                        {/* <video src={Angry_Video} controls width='25%' className='mb-3'></video> */}
                        <audio src={Angry_Video} controls width='25%' className='mb-3' style={{height: '3rem'}}></audio>
                        <a href="" className="mr-20 textColor text-decoration-none text-center font-14 fw-light" >
                          <i className="bi bi-heart text-pink me-1"></i> 12 Love
                        </a>
                      </div>
                    </div>
                    {/* Review */}
                    <div className="timeline_item py-0 mb-4">
                      <img className="tl_avatar" src={avatar} alt="Avatar" />
                      <span className='d-flex justify-content-between'>
                        <a href="" className='text-decoration-none font-16 hoverBlue'>Fahd El Attar</a>
                        <small className="float-right text-right font-12 textColor">20-April-2019</small>
                      </span>
                      <div className="msg my-1 d-flex flex-column align-items-start">
                        <p className='my-1 mb-3 font-14 textColor'>
                          I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card.
                        </p>
                        <video src={Angry_Video} controls width='27%' className='mb-3'></video>
                        <a href="" className="mr-20 textColor text-decoration-none text-center font-14 fw-light" >
                          <i className="bi bi-heart text-pink me-1"></i> 12 Love
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Course */}

              <div className={`tab-pane ${activeSection === 'edit-course' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title textColor">Course Basic Info</h3>
                  </div>
                  <div className="card-body pt-0">
                    <form onSubmit={handleEditCourse}>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              autoComplete='off'
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <select className="form-control font-14" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="" disabled>Select Type</option>
                            <option value="Video">Video</option>
                            <option value="Audio">Audio</option>
                            <option value="Text">Text</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Department Start Date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formImage" className="form-control labelCursor textColor">
                              <i className='bi bi-image me-3 textColor'></i>
                              {img_path ? img_name : 'Choose an image for the course'}
                            </label>
                            <input
                              className="form-control d-none"
                              type="file"
                              accept='image/*'
                              id="formImage"
                              onChange={(e) => {
                                setImg_path(e.target.files[0]);
                                setImg_name(e.target.files[0].name);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formInput" className="form-control labelCursor textColor">
                              <i className='bi bi-archive-fill me-3 textColor'></i>
                              {course_path ? course_name : 'Choose a file for the course'}
                            </label>
                            <input
                              className="form-control d-none"
                              type="file"
                              accept='video/*,audio/*'
                              id="formInput"
                              onChange={(e) => {
                                setCourse_path(e.target.files[0]);
                                setCourse_name(e.target.files[0].name);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <textarea
                              rows="4"
                              className="form-control no-resize"
                              placeholder="Details"
                              value={details}
                              onChange={(e) => setDetails(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-sm-12 mt-3">
                          <button type="submit" className="btn btn-primary me-2">Submit</button>
                          <button type="button" className="btn btn-outline-secondary btn-default">Cancel</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body py-4">
                    <form onSubmit={handleDeleteCourse}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column textColor">
                          <h6 className='mb-0 font-14 fw-semibold mb-1'>Delete this course</h6>
                          <p className='mb-0 font-12'>Once you delete your course, there is no going back. Please be certain.</p>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                          <button type="submit" className="btn dltBtn fw-semibold">Delete this course</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>

            </div>

            {showModal && (
              
              <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title textColor font-18" id="exampleModalLabel">My Review</h5>
                      <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body textColor py-2">
                      <form>
                        <div className="mb-2">
                          <label className="col-form-label font-14">Video/Audio :</label>
                          <label htmlFor="formReview" class="form-control labelCursor textColor">
                            <i className='bi bi-archive-fill me-3 textColor'></i>
                            Choose a file for your review
                          </label>
                          <input className="form-control d-none" type="file" id="formReview" accept='video/*,audio/*'/>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="message-text" className="col-form-label font-14">Description :</label>
                          <textarea className="form-control" id="message-text" placeholder='Description'></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                      <button type="button" className="btn btn-primary">Send review</button>
                    </div>
                  </div>
                </div>
              </div>

            )}

            {showModal && <div className="modal-backdrop fade show"></div>}

          </div>
        </div>
      </StarterPage>
    )
  }

export default CourseDetails