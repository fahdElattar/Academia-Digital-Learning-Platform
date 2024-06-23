import React, { useEffect, useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Departements.css'
import Department_img from '../assets/img/department.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Courses = ({pageName='Departments'}) => {
  
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
  
    const [activeSection, setActiveSection] = useState('departments-list')

    // retreive departments

    const [departments, setDepartments] = useState([])

    const getDepartments = () => {
      axios.get('http://localhost:3000/departments')
      .then(result => setDepartments(result.data))
      .catch(err => console.log('error getting departments : ', err))
    } 

    useEffect(() => {
      getDepartments()
    }, [])

    // Add a department

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if(!name && !description){
        alert('Please enter both the department name and its description!!')
        return;
      }
      
      axios.post('http://localhost:3000/departments', {name, description})
      .then(res =>{
        alert('Department added successfully')
        setName('')
        setDescription('')
        getDepartments()
        setActiveSection('departments-list')
      })
      .catch(err => {
        alert(err)
      })

    };

    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/departments/'+ id)
      .then(res => {
        getDepartments()
      })
      .catch(err => {
        alert(err)
      })
    }

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
          
          { user?.type === 'admin' &&
          (
            <div className="links">
              <ul className='list-unstyled d-flex flex-row'>
                <li className={`me-4 pt-2 ${activeSection === 'departments-list' ? 'li-active': ''}`}>
                  <a
                  className='text-decoration-none'
                  onClick={(e) => setActiveSection('departments-list')}
                  >Content</a>
                </li>
                <li className={`pt-2 ${activeSection === 'add-department' ? 'li-active': ''}`}>
                  <a
                  className='text-decoration-none'
                  onClick={(e) => setActiveSection('add-department')}
                  >Add</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Page Body */}

        <div className="section-body mt-4 pb-5">
          <div className="container-fluid p-0">

            <div className="tab-content">

              {/* Departments list */}

              <div className={`tab-pane ${activeSection === 'departments-list' ? 'active': ''}`}>
                <div className="row">
                  {departments.map(department => {
                    return (
                      <div className="col-xl-4 col-lg-4 col-sm-12" key={department._id}>
                        <div className="card">
                          <a className="d-flex justify-content-center">
                            <img className="card-img-top department-img" src={Department_img} alt="department image" />
                          </a>
                          <div className="card-body d-flex flex-column px-4 pb-3 pt-3">
                            <h6 className='blueHover text-capitalize'><a className='text-decoration-none textClr'>{department.name}</a></h6>
                            <p className="text-muted text-capitalize font-14">{department.description}</p>
                          </div>
                          <div className="card-footer">
                            <div className="d-flex align-items-center justify-content-between mt-auto">
                              <div className="d-flex flex-row align-items-center">
                                <i className="bi bi-collection-fill bg-light avatar avatar-md me-3" />
                                <div className='font-14'>
                                  <a className='text-decoration-none textClr'>Sectors</a>
                                  <small className="d-block text-muted">{department.sectorCount} Availables</small>
                                </div>
                              </div>
                              { user?.type === 'admin' &&
                              (
                                <div className="ml-auto text-muted float-end">
                                  <button type="button" className="btn btn-icon btn-sm">
                                    <i className="bi bi-pencil text-success"></i>
                                  </button>
                                  <button type="button" className="btn btn-icon btn-sm js-sweetalert" onClick={(e) => handleDelete(department._id)}>
                                    <i className="bi bi-trash text-danger"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                    )
                  })}
                </div>
              </div>

              {/* Add department */}

              <div className={`tab-pane ${activeSection === 'add-department' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title textColor">Department Basic Info</h3>
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
                      </div>
                      <div className="row">
                        <div className="col-sm-12 mt-0">
                          <button type="submit" className="btn btn-primary me-2">Submit</button>
                          <button type="reset" className="btn btn-outline-secondary btn-default">Cancel</button>
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
    )
  }

export default Courses