import React, { useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Courses.css'
import Pc from '../assets/img/pc.jpg'
import avatar from '../assets/img/avatar.jpg'
import { Link } from 'react-router-dom'

const MyLikes = ({pageName='My Likes'}) => {

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
        </div>

        {/* Page Body */}

        <div className="section-body mt-4 pb-5">
          <div className="container-fluid p-0">

            {/* My courses */}
                <div className="row">
                  {/* Course */}
                  <div className="col-xl-3 col-lg-3 col-md-4">
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
                            <div className='font-14'>
                              <a href="" className='text-decoration-none'>Pro. Jane</a>
                              <small className="d-block text-muted">Head OF Dept.</small>
                            </div>
                          </div>
                          <div className="ml-auto text-muted float-end font-14">
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

export default MyLikes