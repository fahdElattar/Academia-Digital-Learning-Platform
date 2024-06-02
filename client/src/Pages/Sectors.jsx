import React, { useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Sectors.css'

const Courses = ({pageName='Sectors'}) => {
  
    const [activeSection, setActiveSection] = useState('sectors-list')
    const [departmentName, setDepartmentName] = useState('');
    
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
              <li className={`me-4 pt-2 ${activeSection === 'sectors-list' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('sectors-list')}
                >Content</a>
              </li>
              <li className={`pt-2 ${activeSection === 'add-sector' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('add-sector')}
                >Add</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Page Body */}

        <div className="section-body mt-4">
          <div className="container-fluid p-0">

            <div className="tab-content">
              
              {/* sectors list */}

              <div className={`tab-pane ${activeSection === 'sectors-list' ? 'active': ''}`}>
                <div className="row">
                  {/* Sector */}
                  <div className="col-xl-4 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-status bg-blue"></div>
                        <div className="mb-1">
                          <h5 className="mb-0 sectors-name">Computer Science</h5>
                        </div>
                        <div className="mb-0">
                          <h5 className="mb-2 sectors-label">Sector</h5>
                          <span className='mt-0 sectors-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt</span>
                        </div>
                      </div>
                      <div className="card-footer p-3">
                        <div className="d-flex align-items-center justify-content-between mt-auto">
                          <div className="d-flex flex-row align-items-center">
                            <i className="bi bi-award-fill avatar avatar-md me-3 text-light bg-primary"></i>
                            <div>
                              <a href="" className='text-decoration-none'>Professors</a>
                              <small className="d-block text-muted">5 Availables</small>
                            </div>
                          </div>
                          <div className="ml-auto text-muted float-end">
                            <button type="button" className="btn btn-icon btn-sm">
                              <i className="bi bi-pencil text-success"></i>
                            </button>
                            <button type="button" className="btn btn-icon btn-sm js-sweetalert">
                              <i className="bi bi-trash text-danger"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* add sector */}

              <div className={`tab-pane ${activeSection === 'add-sector' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title textColor">Sector Basic Info</h3>
                  </div>
                  <div className="card-body pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-sm-4">
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
                        <div className="col-sm-4">
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
                        <div className="col-sm-4">
                          <select class="form-select font-14">
                            <option selected disabled>Select type</option>
                            <option value="departement">departement</option>
                            <option value="departement">departement</option>
                            <option value="departement">departement</option>
                          </select>
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