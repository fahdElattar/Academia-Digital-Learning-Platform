import React from 'react'
import '../Css/Navbar.css'
import Person from '../assets/img/person.jpg'

const Navbar = () => {
  return (
    <div className={`navbar py-4 d-flex justify-content-between align-items-center w-100 overflow-x-hidden`}>
      <form className="d-flex align-items-center">
        <input type="text" placeholder='What you want to find' className='form-control px-3 py-2'/>
        <button className='search-btn btn btn-outline-secondary px-3 py-2'>Search</button>
      </form>
      <div className="navbar-links">
        <div className="notifications me-4">
          <i class="bi bi-gear-fill font-16"></i>
        </div>
        <div className="notifications me-4">
          <i class="bi bi-bell-fill font-16"></i>
        </div>
        <div className="user d-flex pe-3 m-0">
          <img src={Person} alt="Profile Image" />
          <p className='text-center m-0 p-0'>Fahd El Attar</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar