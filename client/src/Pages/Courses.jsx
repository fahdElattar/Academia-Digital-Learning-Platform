import React, { useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Courses.css'
import Pc from '../assets/img/pc.jpg'
import avatar from '../assets/img/avatar.jpg'
import { Link } from 'react-router-dom'

const Courses = ({pageName='Courses'}) => {
  
    const [activeSection, setActiveSection] = useState('courses-list')
    const [departmentName, setDepartmentName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [brief, setBrief] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
    };

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
              <li className={`me-4 pt-2 ${activeSection === 'courses-list' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('courses-list')}
                >Content</a>
              </li>
              <li className={`pt-2 ${activeSection === 'add-course' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('add-course')}
                >Add</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Page Body */}

        <div className="section-body mt-4">
          <div className="container-fluid p-0">
            <div className="tab-content">

              {/* courses-list */}

              <div className={`tab-pane ${activeSection === 'courses-list' ? 'active': ''}`}>
                <div className="row">
                  {/* Course */}
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="card">
                      <a href="#">
                        <img className="card-img-top" src={Pc} alt="Course image" />
                      </a>
                      <div className="card-body d-flex flex-column px-4 pb-3">
                        <h6 className='blueHover'><Link to='/courseDetails' className='text-decoration-none'>PHP Development Course</Link></h6>
                        <p className="text-muted text-capitalize small-para">A full course on backend tech PHP Development!!!</p>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex align-items-center justify-content-between mt-auto">
                          <div className="d-flex flex-row align-items-center">
                            <img className="avatar avatar-md me-3" src={avatar} alt="avatar" />
                            <div>
                              <a href="" className='text-decoration-none'>Pro. Jane</a>
                              <small className="d-block text-muted">Head OF Dept.</small>
                            </div>
                          </div>
                          <div className="ml-auto text-muted float-end">
                            <a href="" className="icon d-none d-md-inline-block ml-3"><i className="bi bi-heart mr-1"></i> 521</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Course */}

              <div className={`tab-pane ${activeSection === 'add-course' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title textColor">Course Basic Info</h3>
                  </div>
                  <div className="card-body pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              autoComplete='off'
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <select class="form-select font-14">
                            <option selected disabled>Select type</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                            <option value="text">Text</option>
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
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Department Start Date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formImage" class="form-control labelCursor textColor">
                              <i className='bi bi-image me-3 textColor'></i>
                              Choose an image for your course
                            </label>
                            <input className="form-control d-none" type="file" accept='image/*' id="formImage" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formInput" class="form-control labelCursor textColor">
                              <i className='bi bi-archive-fill me-3 textColor'></i>
                              Choose a file for your course
                            </label>
                            <input className="form-control d-none" type="file" id="formInput" accept='video/*,audio/*'/>
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
                              value={brief}
                              onChange={(e) => setBrief(e.target.value)}
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
              </div>

            </div>
          </div>
        </div>
      </StarterPage>
    )
  }

export default Courses