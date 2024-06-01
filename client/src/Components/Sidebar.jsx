import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar py-4 px-0'>
      <div className="left-side">
        <div className="top-area">
          <ul className='links'>
            <li className='link logo'><i className="bi bi-mortarboard-fill"></i></li>
            <li className='link'><i class="bi bi-grid"></i></li>
            <li className='link'><i class="bi bi-search"></i></li>
            <li className='link'><i class="bi bi-gear"></i></li>
          </ul>
        </div>
        <div className="down-area">
          <ul className='links'>
            <li className='link'><i className="bi bi-power"></i></li>
          </ul>
        </div>
      </div>
      <div className="right-side">
        <div className="logo-name">
          <h2>Academia</h2>
            <a href='javascript:void(0)'>
              <i className="bi bi-grid"></i>
            </a>
        </div>
        <div className="pagination">
          <ul className='links'>
            <li>
              <a href="index.html" className='active'>University</a>
            </li>
            <li>
              <a href="index.html">Admin</a>
            </li>
          </ul>
        </div>
        <ul className='links'>
          <li className='link'>
            <Link to='/login'>
              <i className="bi bi-award-fill"></i>
              Professors
            </Link>
          </li>
          <li className='link'>
            <a href='index'>
              <i className="bi bi-people-fill"></i>
              Students
            </a>
          </li>
          <li className='link'>
            <a href='index'>
              <i className="bi bi-journal-bookmark-fill"></i>
              Courses
            </a>
          </li>
          <li className='link'>
            <a href='index'>
              <i className="bi bi-collection-fill"></i>
              Sectors
            </a>
          </li>
          <li className='link'>
            <a href='index'>
              <i className="bi bi-building-fill"></i>
              Departments
            </a>
          </li>
        </ul>
        <div className='extra'>
          <h6>EXTRA</h6>
          <ul className='links'>
            <li className='link'>
              <a href='index'>
                <i className="bi bi-chat-dots-fill"></i>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Sidebar