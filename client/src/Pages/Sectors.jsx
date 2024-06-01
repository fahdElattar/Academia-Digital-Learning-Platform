import React from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Sectors.css'
import avatar from '../assets/img/avatar1.jpg'

const Courses = ({pageName='Sectors'}) => {
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
              <li className='li-active me-4 pt-2'>
                <a href='' className='text-decoration-none a-active'>List View</a>
              </li>
              <li className='pt-2'>
                <a href='' className='text-decoration-none'>Add</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Page Body */}

        <div className="section-body mt-4">
          <div className="container-fluid p-0">
            <div className="row">
              {/* Professor */}
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
                  <div className="card-footer px-3 py-1">
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <span className="font-12 text-muted">Professors</span>
                          <ul className="list-unstyled team-info">
                            <li><img src={avatar} alt="Professor" /></li>
                            <li><img src={avatar} alt="Professor" /></li>
                            <li><img src={avatar} alt="Professor" /></li>
                          </ul>
                        </div>
                      </div>
                      <div className="ml-auto text-muted float-end">
                        <button type="button" className="btn btn-outline-success btn-sm me-2">
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-sm">
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </div>
                    </div>
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