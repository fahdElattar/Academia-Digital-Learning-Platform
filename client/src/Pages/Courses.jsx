import React, { useEffect, useState } from 'react';
import StarterPage from '../Components/StarterPage';
import '../Css/Courses.css';
import Pc from '../assets/img/pc.jpg';
import avatar from '../assets/img/avatar.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = ({pageName='Courses'}) => {
  const [activeSection, setActiveSection] = useState('courses-list');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [img_path, setImg_path] = useState(null);
  const [img_name, setImg_name] = useState('');
  const [course_path, setCourse_path] = useState(null);
  const [course_name, setCourse_name] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [professor_id, setProfessor_id] = useState('665fabb1c210b12359d3770f');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type || !img_path || !course_path || !description || !details || !date || !professor_id) {
      alert('Please enter all inputs!!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('img_path', img_path);
    formData.append('course_path', course_path);
    formData.append('description', description);
    formData.append('details', details);
    formData.append('date', date);
    formData.append('professor_id', professor_id);

    console.log(formData);

    axios.post('http://localhost:3000/courses', formData)
      .then(res => {
        alert('Input added successfully');
        setName('');
        setType('');
        setImg_path(null);
        setImg_name('');
        setCourse_path(null);
        setCourse_name('');
        setDescription('');
        setDetails('');
        setDate('');
        setProfessor_id('');
        window.location.reload();
      })
      .catch(err => {
        alert('An error occurred while adding the input!!');
        console.log(err);
      });
  };

  return (
    <StarterPage>
      {/* Page Header */}
      <div className="page-head d-flex justify-content-between p-0">
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
            <li className={`me-4 pt-2 ${activeSection === 'courses-list' ? 'li-active' : ''}`}>
              <a className='text-decoration-none' onClick={(e) => setActiveSection('courses-list')}>Content</a>
            </li>
            <li className={`pt-2 ${activeSection === 'add-course' ? 'li-active' : ''}`}>
              <a className='text-decoration-none' onClick={(e) => setActiveSection('add-course')}>Add</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Page Body */}
      <div className="section-body mt-4 pb-4">
        <div className="container-fluid p-0 pb-4">
          <div className="tab-content">
            {/* courses-list */}
            <div className={`tab-pane ${activeSection === 'courses-list' ? 'active' : ''}`}>
              <div className="row">
                {courses.map(course => {
                  return (
                    <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
                      <div className="card">
                        <Link to={`/courses/${course._id}`}>
                          <img className="card-img-top" src={'../../uploads/'+course.img_path} alt="Course image" style={{width: "100%", height: "12.4rem"}}/>
                        </Link>
                        <div className="card-body d-flex flex-column px-4 pb-3">
                          <h6 className='blueHover'><Link to={'/courses/'+course._id} className='text-decoration-none text-capitalize'>{course.name}</Link></h6>
                          <p className="text-muted text-capitalize small-para">{course.description}</p>
                        </div>
                        <div className="card-footer">
                          <div className="d-flex align-items-center justify-content-between mt-auto">
                            <div className="d-flex flex-row align-items-center">
                              <img className="avatar avatar-md me-3" src={'../../uploads/'+course.professor_id?.img_path} alt="avatar" />
                              <div>
                                <a href="" className='text-decoration-none'>Pro. {course.professor_id?.last_name}</a>
                                <small className="d-block text-muted">Head OF Dept.</small>
                              </div>
                            </div>
                            <div className="ml-auto text-muted float-end">
                              <a href="" className="icon d-none d-md-inline-block ml-3"><i className="bi bi-heart mr-1"></i> {course.likes}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Course */}
            <div className={`tab-pane ${activeSection === 'add-course' ? 'active' : ''}`}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title textColor">Course Basic Info</h3>
                </div>
                <div className="card-body pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            autoComplete='off'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <select className="form-control font-14" value={type} onChange={(e) => setType(e.target.value)}>
                          <option value="" disabled>Select Type</option>
                          <option value="Video">Video</option>
                          <option value="Audio">Audio</option>
                          <option value="Text">Text</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Department Start Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="formImage" className="form-control labelCursor textColor">
                            <i className='bi bi-image me-3 textColor'></i>
                            {img_path ? img_name : 'Choose an image for the course'}
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            accept='image/*'
                            id="formImage"
                            onChange={(e) => {
                              setImg_path(e.target.files[0]);
                              setImg_name(e.target.files[0].name);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="formInput" className="form-control labelCursor textColor">
                            <i className='bi bi-archive-fill me-3 textColor'></i>
                            {course_path ? course_name : 'Choose a file for the course'}
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            accept='video/*,audio/*'
                            id="formInput"
                            onChange={(e) => {
                              setCourse_path(e.target.files[0]);
                              setCourse_name(e.target.files[0].name);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <textarea
                            rows="4"
                            className="form-control no-resize"
                            placeholder="Details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-sm-12 mt-3">
                        <button type="submit" className="btn btn-primary me-2">Submit</button>
                        <button type="button" className="btn btn-outline-secondary btn-default">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StarterPage>
  );
};

export default Courses;
