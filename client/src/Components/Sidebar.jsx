import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      verifyToken(token);
    }
  }, [navigate]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (data.status === 'ok') {
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      console.error('Token verification failed', err);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };
  
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

            <li className='link'>
              <Link to='/professors'>
                <i className="bi bi-award sidebar-icons"></i>
              </Link>
            </li>
            <li className='link'>
              <Link to='/students'>
                <i className="bi bi-people sidebar-icons"></i>
              </Link>
            </li>
            <li className='link'>
              <Link to='/courses'>
                <i className="bi bi-journal-bookmark sidebar-icons"></i>
              </Link>
            </li>
            <li className='link'>
              <Link to='/sectors'>
                <i className="bi bi-collection sidebar-icons"></i>
              </Link>
            </li>
            <li className='link'>
              <Link to='/specialties'>
                <i className="bi bi-check-square sidebar-icons"></i>
              </Link>
            </li>
            <li className='link'>
              <Link to='/departements'>
                <i className="bi bi-building sidebar-icons"></i>
              </Link>
            </li>
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
        </div>
        <div className="pagination">
          <ul className='links'>
            <li>
              <Link to="/courses" className='active'>General</Link>
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
        {user?.type === 'student' && 
        (
          <div className='extra'>
          <h6>EXTRA</h6>
          <ul className='links'>
            <li className='link'>
              <Link to='/mycourses'>
                <i className="bi bi-building-fill"></i>
                My Courses
              </Link>
            </li>
            <li className='link'>
              <Link to='/mycertificates'>
                <i className="bi bi-bookmark-check-fill"></i>
                My Certificates
              </Link>
            </li>
          </ul>
        </div>
        )}
        
      </div>
    </div>
  )
}


export default Sidebar