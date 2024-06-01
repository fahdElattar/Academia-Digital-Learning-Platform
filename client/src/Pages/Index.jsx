import React from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Index.css'

const Index = ({pageName='Courses'}) => {
    return (
      <StarterPage>
        <div className="page-head d-flex justify-content-between p-0 mt-2">
          <div className="name d-flex flex-column justify-content-lg-start">
            <div className="top-name">
              <h6 className='fw-bold mb-1'>{pageName}</h6>
            </div>
            <div className="bottom-name mt-0">
              <p className='text-uppercase mb-0 fw-light'><span className='text-primary'>ACADEMIA</span> / {pageName}</p>
            </div>
          </div>
          <div className="links">

          </div>
        </div>
      </StarterPage>
    )
  }

export default Index