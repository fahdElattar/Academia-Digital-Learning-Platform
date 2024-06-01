import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const StarterPage = ({ children }) => {
  return (
    <div className='min-vh-100 w-100 p-0 m-0 d-flex'>
        <div className="p-0 m-0" style={{width: '21%'}}>
          <Sidebar />
        </div>
          <div className="" style={{width: '79%', padding: '0 2.6rem'}}>
              <Navbar />
              {children}
          </div>
    </div>
  )
}

export default StarterPage