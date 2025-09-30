import { useEffect, useState } from 'react'
import '../Css/Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {  // Authentication
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [imgPath, setImgPath] = useState('');

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
        setUserName(data.user?.first_name + ' ' + data.user?.last_name);
        setImgPath(data.user?.img_path);
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
  return (
    <div className={`navbar py-4 d-flex gap-3 justify-content-between align-items-center w-100 overflow-x-hidden`}>
      <form className="d-flex align-items-center">
        <input type="text" placeholder='What you want to find' className='form-control px-3 py-2'/>
        <button className='search-btn btn btn-outline-secondary px-3 py-2'>Search</button>
      </form>
      <div className="navbar-links">
        <div className="user d-flex pe-3 m-0">
          <img src={'../../uploads/'+imgPath} alt="Profile Image" />
          <p className='text-center m-0 p-0'>{userName}</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar