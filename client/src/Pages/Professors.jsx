import React, { useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Professors.css'
import avatar from '../assets/img/avatar1.jpg'

const Courses = ({pageName='Professors'}) => {
  
    const [activeSection, setActiveSection] = useState('prof-list')

    const [departmentName, setDepartmentName] = useState('');
    const [headOfDepartment, setHeadOfDepartment] = useState('');
    const [numberOfStudents, setNumberOfStudents] = useState('');
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
              <li className={`me-4 pt-2 ${activeSection === 'prof-list' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('prof-list')}
                >Content</a>
              </li>
              <li className={`pt-2 ${activeSection === 'add-prof' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('add-prof')}
                >Add</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Page Body */}

        <div className="section-body mt-4">
          <div className="container-fluid p-0">
            <div className="tab-content">

              {/* Professors list */}

              <div className={`tab-pane ${activeSection === 'prof-list' ? 'active': ''}`}>
                <div className="row">
                  {/* Professor */}
                  <div className="col-xl-3 col-lg-3 col-md-4">
                    <div className="card">
                      <div className="card-body text-center professor">
                        <img className="card-profile-img" src={avatar} alt="Profile" />
                        <h5 className="mb-0">M. Essalih</h5>
                        <span className="text-muted">Computer</span>
                        <div className="text-muted">0657225684</div>
                        <p className="mb-3 mt-1 text-muted">Artificiale Intelligence, Computer Science</p>
                        <button className="btn btn-primary btn-sm mb-1">Read More</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Professor */}

              <div className={`tab-pane ${activeSection === 'add-prof' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title textColor">Professor Basic Info</h3>
                  </div>
                  <div className="card-body pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formImage" class="form-control labelCursor textColor">
                              <i className='bi bi-image me-3 textColor'></i>
                              Choose an image for the professor
                            </label>
                            <input className="form-control d-none" type="file" accept='image/*' id="formImage" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              autoComplete='off'
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              autoComplete='off'
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              autoComplete='off'
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              autoComplete='off'
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 mt-0">
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