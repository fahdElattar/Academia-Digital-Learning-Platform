import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='sidebar py-4 px-0'>
      <div className="left-side">
        <div className="top-area">
          <ul className='links'>
            <li className='link logo'><i className="bi bi-mortarboard-fill"></i></li>
            <li className='link'><i className="bi bi-grid"></i></li>
            <li className='link'><i className="bi bi-search"></i></li>
            <li className='link'><i className="bi bi-gear"></i></li>
          </ul>
        </div>
        <div className="down-area">
          <ul className='links'>
            <li className='link'>
              <button className='text-dark btn' onClick={handleLogout} style={{fontSize:'19px'}}>
                <i className="bi bi-power"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-side">
        <div className="logo-name">
          <h2>Academia</h2>
            <a href=''>
              <i className="bi bi-grid"></i>
            </a>
        </div>
        <div className="pagination">
          <ul className='links'>
            <li>
              <a href="index.html" className='active'>General</a>
            </li>
            <li>
              <a href="index.html">My Space</a>
            </li>
          </ul>
        </div>
        <ul className='links'>
          <li className='link'>
            <Link to='/professors'>
              <i className="bi bi-award-fill"></i>
              Professors
            </Link>
          </li>
          <li className='link'>
            <Link to='/students'>
              <i className="bi bi-people-fill"></i>
              Students
            </Link>
          </li>
          <li className='link'>
            <Link to='/courses'>
              <i className="bi bi-journal-bookmark-fill"></i>
              Courses
            </Link>
          </li>
          <li className='link'>
            <Link to='/sectors'>
              <i className="bi bi-collection-fill"></i>
              Sectors
            </Link>
          </li>
          <li className='link'>
            <Link to='/specialties'>
              <i className="bi bi-check-square-fill"></i>
              Specialties
            </Link>
          </li>
          <li className='link'>
            <Link to='/departements'>
              <i className="bi bi-building-fill"></i>
              Departments
            </Link>
          </li>
        </ul>
        <div className='extra'>
          <h6>EXTRA</h6>
          <ul className='links'>
            {/* <li className='link'>
              <a>
                <i className="bi bi-chat-dots-fill"></i>
                Contact
              </a>
            </li> */}
            <li className='link'>
              <Link to='/myCourses'>
                <i className="bi bi-building-fill"></i>
                My Courses
              </Link>
            </li>
            <li className='link'>
              <Link to='/myCourses'>
                <i className="bi bi-bookmark-check-fill"></i>
                My Certificates
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Sidebar