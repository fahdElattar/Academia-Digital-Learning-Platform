import React, { useEffect, useState } from 'react'
import StarterPage from '../Components/StarterPage'
import '../Css/Sectors.css'
import '../Css/Specialty.css'
import SpecialtyImg from '../assets/img/specialty1.jpg'
import axios from 'axios'

const Specialties = ({pageName='Specialties'}) => {
  
    const [activeSection, setActiveSection] = useState('specialties-list')

    // retreive specialties

    const [specialties, setSpecialties] = useState([])

    const getSpecialties = () => {
      axios.get('http://localhost:3000/specialties')
        .then(result => setSpecialties(result.data))
        .catch(err => console.log('error getting specialties: ', err));
    }    

    useEffect(() => {
      getSpecialties()
    }, []);

    // Add a specialty

    const [name, setName] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if(!name){
        alert('Please enter all inputs!!')
        return;
      }
      
      axios.post('http://localhost:3000/specialties', {name})
      .then(res =>{
        alert('Input added successfully')
        setName('')
        getSpecialties()
        setActiveSection('specialties-list')
      })
      .catch(err => {
        alert(err)
      })

    };

    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/specialties/'+ id)
      .then(res => 
        getSpecialties()
      )
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
          <div className="links">
            <ul className='list-unstyled d-flex flex-row'>
              <li className={`me-4 pt-2 ${activeSection === 'specialties-list' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('specialties-list')}
                >Content</a>
              </li>
              <li className={`pt-2 ${activeSection === 'add-specialty' ? 'li-active': ''}`}>
                <a
                className='text-decoration-none'
                onClick={(e) => setActiveSection('add-specialty')}
                >Add</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Page Body */}

        <div className="section-body mt-4">
          <div className="container-fluid p-0">

            <div className="tab-content">
              
              {/* sectors list */}

              <div className={`tab-pane ${activeSection === 'specialties-list' ? 'active': ''}`}>
                <div className="row">
                  {specialties.map(specialty => {
                    return (
                      <div className="col-xl-3 col-lg-3 col-md-6" key={specialty._id}>
                        <div className="card">
                          <a className="">
                            <img className="card-img-top" src={SpecialtyImg} alt="Course image"/>
                          </a>
                          <div className="card-body d-flex flex-column px-4 pb-2 pt-1">
                            <h6 className='blueHover mb-0'><a className='text-decoration-none textClr text-capitalize'>{specialty.name}</a></h6>
                            <p className="text-muted font-12 mt-1 mb-1">Specialty</p>
                          </div>
                          <div className="card-footer">
                            <div className="d-flex align-items-center justify-content-between mt-auto">
                              <div className="d-flex flex-row align-items-center">
                                <i className="bi bi-people-fill bg-light avatar avatar-md me-3" />
                                <div className='font-14'>
                                  <a className='text-decoration-none textClr'>Professors</a>
                                  <small className="d-block text-muted">{specialty.professorCount} Availables</small>
                                </div>
                              </div>
                              <div className="ml-auto text-muted float-end">
                                <button type="button" className="btn btn-icon btn-sm">
                                  <i className="bi bi-pencil text-success"></i>
                                </button>
                                <button type="button" className="btn btn-icon btn-sm js-sweetalert" onClick={(e) => handleDelete(specialty._id)}>
                                  <i className="bi bi-trash text-danger"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      // <div className="col-xl-4 col-md-6 col-sm-12" key={specialty._id}>
                      //   <div className="card">
                      //     <div className="card-body">
                      //       <div className="card-status bg-primary"></div>
                      //       <div className="mb-1">
                      //         <h5 className="mb-0 sectors-name text-capitalize">{specialty.name}</h5>
                      //       </div>
                      //       <div className="mb-0">
                      //         <h5 className="mb-0 sectors-label">Specialty</h5>
                      //       </div>
                      //     </div>
                      //     <div className="card-footer p-3">
                      //       <div className="d-flex align-items-center justify-content-between mt-auto">
                      //         <div className="d-flex flex-row align-items-center">
                      //           <i className="bi bi-award-fill avatar avatar-md me-3 text-light bg-primary"></i>
                      //           <div>
                      //             <a className='text-decoration-none text-primary'>Professors</a>
                      //             <small className="d-block text-muted">{specialty.professorCount} Availables</small>
                      //           </div>
                      //         </div>
                      //         <div className="ml-auto text-muted float-end">
                      //           <button type="button" className="btn btn-icon btn-sm">
                      //             <i className="bi bi-pencil text-success"></i>
                      //           </button>
                      //           <button type="button" className="btn btn-icon btn-sm js-sweetalert" onClick={(e) => handleDelete(specialty._id)}>
                      //             <i className="bi bi-trash text-danger"></i>
                      //           </button>
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </div>
                      // </div>
                    )
                  })}
                </div>
              </div>

              {/* add sector */}

              <div className={`tab-pane ${activeSection === 'add-specialty' ? 'active': ''}`}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title textColor">Specialty Basic Info</h3>
                  </div>
                  <div className="card-body pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-sm-12">
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

export default Specialties