import React, { useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Courses.css'
import Pc from '../assets/img/pc.jpg'
import { Link } from 'react-router-dom'

const MyCourses = ({pageName='My Courses'}) => {

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
            <div className="card">
                <div className="card-body">
                    <article className="media d-flex justify-content-start">
                        <div className="me-3 h-100">
                            <img className="h-100" src={Pc} alt="Course" style={{width: '12rem', borderRadius: '10px'}}/>
                        </div>
                        <div className="media-body textClr">
                            <div className="content">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to={'/courseDetails'} className='text-decoration-none'><h5 className="mb-2 textClr font-16 blueHover">PHP Backend Develepement</h5></Link>
                                    <small className="text-end text-muted font-12">By Prof Bakkas</small>
                                </div>
                                <p className="mb-1 font-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.</p>
                            </div>
                            <nav className="d-flex text-primary font-14">
                                <i className="bi bi-heart me-2"></i>
                                <p className='mb-0'>43</p>
                            </nav>
                        </div>
                    </article>
                </div>
            </div>
          </div>
        </div>
      </StarterPage>
    )
  }

export default MyCourses