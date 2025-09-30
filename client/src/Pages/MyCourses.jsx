import { useEffect, useState } from 'react';
import StarterPage from '../Components/StarterPage';
import '../Css/Courses.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyCourses = ({ pageName = 'My Courses' }) => {
  // Authentication
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

  const [myCourses, setMyCourses] = useState([]);

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
      </div>

      {/* Page Body */}
      <div className="section-body mt-4 pb-5">
        <div className="container-fluid p-0">
    {/* My courses */}
        {myCourses.length > 0 ? (
          myCourses.map((course) => (
            <div className="card">
              <div className="card-body">
                <article className="media d-flex justify-content-start" key={course._id}>
                  <div className="me-3 h-100">
                    <img className="h-100" src={'../../uploads/'+course.img_path} alt="Course" style={{ width: '12rem', borderRadius: '10px' }} />
                  </div>
                  <div className="media-body textClr">
                    <div className="content">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link to={`/courses/${course._id}`} className='text-decoration-none'>
                          <h5 className="mb-0 textClr font-16 blueHover">{course.name}</h5>
                        </Link>
                        <small className="text-end text-muted font-12 ms-4">By {course.professor_id?.first_name} {course.professor_id?.last_name}</small>
                      </div>
                      <p className="mb-2 font-14">{course.description}</p>
                    </div>
                    <nav className="d-flex text-primary font-14">
                      <i className="bi bi-heart me-2"></i>
                      <p className='mb-0'>{course.likes}</p>
                    </nav>
                  </div>
                </article>
              </div>
            </div>
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      </div>
    </StarterPage>
  );
};

export default MyCourses;
