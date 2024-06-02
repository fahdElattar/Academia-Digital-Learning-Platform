import React from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Courses.css'
import Pc from '../assets/img/pc.jpg'
import avatar from '../assets/img/avatar.jpg'

const Courses = ({pageName='Courses'}) => {
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
              {/* Course */}
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="card">
                  <a href="#">
                    <img className="card-img-top" src={Pc} alt="Course image" />
                  </a>
                  <div className="card-body d-flex flex-column px-4 pb-3">
                    <h6 className='blueHover'><a href="" className='text-decoration-none'>PHP Development Course</a></h6>
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
              {/* Course */}
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="card">
                  <a href="#">
                    <img className="card-img-top" src={Pc} alt="Course image" />
                  </a>
                  <div className="card-body d-flex flex-column px-4 pb-3">
                    <h6 className='blueHover'><a href="" className='text-decoration-none'>PHP Development Course</a></h6>
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
              {/* Course */}
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="card">
                  <a href="#">
                    <img className="card-img-top" src={Pc} alt="Course image" />
                  </a>
                  <div className="card-body d-flex flex-column px-4 pb-3">
                    <h6 className='blueHover'><a href="" className='text-decoration-none'>PHP Development Course</a></h6>
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
        </div>
      </StarterPage>
    )
  }

export default Courses