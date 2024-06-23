import React, { useEffect, useState } from 'react';
import StarterPage from '../Components/StarterPage';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyCertificates = ({ pageName = 'My Certificates' }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

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

  const getStudentCourses = () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/students/student/665e2e70c70fcf20f04d4474`)
      .then(res => {
        setMyCourses(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (user) {
      getStudentCourses();
    }
  }, [user]);

  const handleClick = ()=> {
    window.location.href= 'C:/Users/DESKTOP-A0/Desktop/academia/client/src/assets/academia_certificate.pdf'
  }

  return (
    <StarterPage>
      <div className="page-head d-flex justify-content-between p-0">
        <div className="name d-flex flex-column justify-content-lg-start pt-2">
          <div className="top-name">
            <h6 className='fw-bold mb-1'>{pageName}</h6>
          </div>
          <div className="bottom-name mt-0">
            <p className='text-uppercase mb-0 fw-light'><span className='text-primary'>ACADEMIA</span> / {pageName}</p>
          </div>
        </div>
      </div>

      <div className="section-body mt-4 pb-5">
        <div className="container-fluid p-0">
          <div className="row">
            {myCourses.length > 0 ? (
              myCourses.map((course) => (
                <div className="col-xl-6 col-lg-6 col-md-6" key={course._id}>
                  <div className="card">
                    <div className="card-body">
                      <article className="media d-flex justify-content-start">
                        <div className="media-body">
                          <div className="content">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <Link to={`/courses/${course._id}`} className='text-decoration-none'>
                                <h5 className="mb-0 font-16 blueHover">{course.name}</h5>
                              </Link>
                              <small className="text-end text-muted font-12 ms-4">By {course.professor_id?.first_name} {course.professor_id?.last_name}</small>
                            </div>
                            <p className="mb-3 font-14">{course.description}</p>
                          </div>
                          <a onClick={handleClick} className='btn btn-primary btn-sm' download={true}>Print Certificate</a>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses found</p>
            )}
          </div>
        </div>
      </div>
    </StarterPage>
  );
};

export default MyCertificates;
