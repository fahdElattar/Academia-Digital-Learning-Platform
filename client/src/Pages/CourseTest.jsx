import React, { useEffect, useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/CourseDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CourseTest = ({pageName='Course Details'}) => {

    // Retrieve the course id from the URL params
    const { id } = useParams()

    // Variables related to the sections to show and the review modal
    const [activeSection, setActiveSection] = useState('course-details')
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Variables related to the course
    const [course, setCourse] = useState({})

    // Variables related to the reviews of the course
    const [reviews, setReviews] = useState([]);
    const [reviewFile, setReviewFile] = useState(null);
    const [reviewDescription, setReviewDescription] = useState('');
    const courseId = '665fb7232e7c7c34ec4e78da';
    const [reviewStudent, setReviewStudent] = useState('665e2e70c70fcf20f04d4474');
    const [reviewEmotion, setReviewEmotion] = useState('happy');

    // A hook to retrieve the reviews of the course
    useEffect(() => {
      axios.get(`http://localhost:3000/reviews/course/${courseId}`)
      .then(res => {
        setReviews(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }, [id])

    // A function to submit a review for the course
    const handleSubmitReview = (e) => {
      e.preventDefault();
      if(!reviewFile || !reviewDescription || !reviewStudent || !reviewEmotion){
          alert('Please enter all inputs');
          return;
      }
  
      const formData = new FormData();
      formData.append('student', reviewStudent);
      formData.append('course', courseId);
      formData.append('review_path', reviewFile);
      formData.append('description', reviewDescription);
      formData.append('emotion', reviewEmotion);
  
      axios.post('http://localhost:3000/reviews', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(res => {
          alert('succes');
      })
      .catch(err => alert('error'));
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

                  <div className="col-xl-8 col-lg-7 col-md-12">

                    {/* Certificate */}

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

            </div>

            {showModal && (

              // Review form
              <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={handleSubmitReview}>
                      <div className="modal-header">
                        <h5 className="modal-title textColor font-18" id="exampleModalLabel">My Review</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                      </div>
                      <div className="modal-body textColor py-2">
                        <div className="mb-2">
                          <label className="col-form-label font-14">Video/Audio :</label>
                          <label htmlFor="formReview" className="form-control labelCursor textColor">
                            <i className='bi bi-archive-fill me-3 textColor'></i>
                            {reviewFile ? reviewFile.name : 'Choose a file for your review'}
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            id="formReview"
                            accept='video/*,audio/*'
                            onChange={(e) => setReviewFile(e.target.files[0])}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="message-text" className="col-form-label font-14">Description :</label>
                          <textarea
                            className="form-control"
                            id="message-text"
                            placeholder='Description'
                            value={reviewDescription}
                            onChange={(e) => setReviewDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button type="submit" className="btn btn-primary">Send review</button>
                      </div>
                    </form>
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

export default CourseTest
