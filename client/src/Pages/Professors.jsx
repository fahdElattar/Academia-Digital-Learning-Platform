import React from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Professors.css'
import avatar from '../assets/img/avatar1.jpg'

const Courses = ({pageName='Professors'}) => {
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
        </div>
      </StarterPage>
    )
  }

export default Courses