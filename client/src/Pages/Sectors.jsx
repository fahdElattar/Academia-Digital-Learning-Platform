import React, { useEffect, useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Sectors.css'
import axios from 'axios'
import Department_img from '../assets/img/department4.jpg'
import { useNavigate } from 'react-router-dom'

const Sectors = ({pageName='Sectors'}) => {

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
  
    const [activeSection, setActiveSection] = useState('sectors-list')

    // retreive departments

    const [sectors, setSectors] = useState([])
    const [departments, setDepartments] = useState([])

    const getSectors = () => {
      axios.get('http://localhost:3000/sectors')
        .then(result => setSectors(result.data))
        .catch(err => console.log('error getting sectors: ', err));
    }

    const getDepartments = () => {
      axios.get('http://localhost:3000/departments')
        .then(result => setDepartments(result.data))
        .catch(err => console.log('error getting departments: ', err));
    }

    useEffect(() => {
      getSectors();
      getDepartments();
    }, []);

    // Add a department

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [department_id, setDepartmentId] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if(!name && !description && !department_id){
        alert('Please enter all inputs!!')
        return;
      }
      
      axios.post('http://localhost:3000/sectors', {name, description, department_id})
      .then(res =>{
        alert('Input added successfully')
        getSectors()
        setActiveSection('sectors-list')
      })
      .catch(err => {
        alert(err)
      })

    };

    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/sectors/'+ id)
      .then(res => {
        getSectors()
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
                <li className={`me-4 pt-2 ${activeSection === 'sectors-list' ? 'li-active': ''}`}>
                  <a
                  className='text-decoration-none'
                  onClick={(e) => setActiveSection('sectors-list')}
                  >Content</a>
                </li>
                <li className={`pt-2 ${activeSection === 'add-sector' ? 'li-active': ''}`}>
                  <a
                  className='text-decoration-none'
                  onClick={(e) => setActiveSection('add-sector')}
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
              
              {/* sectors list */}

              <div className={`tab-pane ${activeSection === 'sectors-list' ? 'active': ''}`}>
                <div className="row">
                  { sectors.map(sector => {
                    return (
                      <div className="col-xl-4 col-lg-4 col-md-6" key={sector._id}>
                        <div className="card">
                          <a className="">
                            <img className="card-img-top" src={Department_img} alt="Course image" />
                          </a>
                          <div className="card-body d-flex flex-column px-4 pb-3 pt-1">
                            <h6 className='blueHover'><a className='text-decoration-none text-capitalize textClr'>{sector.name}</a></h6>
                            <p className="text-muted text-capitalize font-14">{sector.description}</p>
                          </div>
                          <div className="card-footer">
                            <div className="d-flex align-items-center justify-content-between mt-auto">
                              <div className="d-flex flex-row align-items-center">
                                <i className="bi bi-people-fill bg-light avatar avatar-md me-3" />
                                <div className='font-14'>
                                  <a className='text-decoration-none textClr'>Professors</a>
                                  <small className="d-block text-muted">{sector.professorCount} Availables</small>
                                </div>
                              </div>
                              
                              { user?.type === 'admin' &&
                              (
                                <div className="ml-auto text-muted float-end">
                                  <button type="button" className="btn btn-icon btn-sm">
                                    <i className="bi bi-pencil text-success"></i>
                                  </button>
                                  <button type="button" className="btn btn-icon btn-sm js-sweetalert" onClick={(e) => handleDelete(sector._id)}>
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

              {/* add sector */}

              <div className={`tab-pane ${activeSection === 'add-sector' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title textColor">Sector Basic Info</h3>
                  </div>
                  <div className="card-body pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-sm-4">
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
                        <div className="col-sm-4">
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
                        <div className="col-sm-4">
                          <select 
                            className="form-select font-14"
                            value={department_id}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            >
                            <option selected disabled>Select type</option>
                            {departments.map(department => {
                              return (
                                <option key={department._id} value={department._id} className='text-capitalize'>{department.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 mt-0">
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
    )
  }

export default Sectors