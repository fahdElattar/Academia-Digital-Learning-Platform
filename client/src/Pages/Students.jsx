import React from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Students.css'
import avatar from '../assets/img/avatar1.jpg'

const Courses = ({pageName='Students'}) => {
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
              <div className="table-responsive card p-0 mb-0">
                <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                  <thead className=''>
                    <tr>
                      <th className='text-capitalize'>No.</th>
                      <th className='text-capitalize'>Name</th>
                      <th className='text-capitalize'></th>
                      <th className='text-capitalize'>Email</th>
                      <th className='text-capitalize'>Phone</th>
                      <th className='text-capitalize'>Sex</th>
                      <th className='text-capitalize'>Date of Birth</th>
                      <th className='text-capitalize'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-secondary'>16</td>
                      <td>
                        <img className="avatar" src={avatar} alt="Student" />
                      </td>
                      <td className='text-secondary'><span className="font-14">Fahd El Attar</span></td>
                      <td className='text-secondary'>Fahdelattar13@gmail.com</td>
                      <td className='text-secondary'>0638225678</td>
                      <td className='text-secondary'>Male</td>
                      <td className='text-secondary'>04 Jan, 2019</td>
                      <td>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-pencil text-success"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm js-sweetalert">
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className='text-secondary'>16</td>
                      <td>
                        <img className="avatar" src={avatar} alt="Student" />
                      </td>
                      <td className='text-secondary'><span className="font-14">Fahd El Attar</span></td>
                      <td className='text-secondary'>Fahdelattar13@gmail.com</td>
                      <td className='text-secondary'>0638225678</td>
                      <td className='text-secondary'>Male</td>
                      <td className='text-secondary'>04 Jan, 2019</td>
                      <td>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-pencil text-success"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm js-sweetalert">
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className='text-secondary'>16</td>
                      <td>
                        <img className="avatar" src={avatar} alt="Student" />
                      </td>
                      <td className='text-secondary'><span className="font-14">Fahd El Attar</span></td>
                      <td className='text-secondary'>Fahdelattar13@gmail.com</td>
                      <td className='text-secondary'>0638225678</td>
                      <td className='text-secondary'>Male</td>
                      <td className='text-secondary'>04 Jan, 2019</td>
                      <td>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-pencil text-success"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm js-sweetalert">
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className='text-secondary'>16</td>
                      <td>
                        <img className="avatar" src={avatar} alt="Student" />
                      </td>
                      <td className='text-secondary'><span className="font-14">Fahd El Attar</span></td>
                      <td className='text-secondary'>Fahdelattar13@gmail.com</td>
                      <td className='text-secondary'>0638225678</td>
                      <td className='text-secondary'>Male</td>
                      <td className='text-secondary'>04 Jan, 2019</td>
                      <td>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm">
                          <i className="bi bi-pencil text-success"></i>
                        </button>
                        <button type="button" className="btn btn-icon btn-sm js-sweetalert">
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
      </StarterPage>
    )
  }

export default Courses