import React, { useEffect, useState } from 'react';
import StarterPage from '../Components/StarterPage';
import '../Css/Professors.css';
import axios from 'axios';

const Professors = ({ pageName = 'Professors' }) => {
  const [activeSection, setActiveSection] = useState('prof-list');
  const [professors, setProfessors] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  const getProfessors = () => {
    axios.get('http://localhost:3000/professors')
      .then(res => setProfessors(res.data))
      .catch(err => console.log(err));
  }

  const getSectors = () => {
    axios.get('http://localhost:3000/sectors')
      .then(res => setSectors(res.data))
      .catch(err => console.log(err));
  }

  const getSpecialties = () => {
    axios.get('http://localhost:3000/specialties')
      .then(res => setSpecialties(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getProfessors()
    getSectors()
    getSpecialties()
  }, []);

  const [last_name, setLast_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [img_path, setImg_path] = useState(null);
  const [img_name, setImg_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sector_id, setSector_id] = useState('');
  const [specialty_id, setSpecialty_id] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!last_name || !first_name || !phone_number || !img_path || !email || !password || !sector_id || !specialty_id) {
      alert('Please enter all inputs!!');
      return;
    }

    const formData = new FormData();
    formData.append('last_name', last_name);
    formData.append('first_name', first_name);
    formData.append('phone_number', phone_number);
    formData.append('img_path', img_path);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('sector_id', sector_id);
    formData.append('specialty_id', specialty_id);

    console.log(formData)

    axios.post('http://localhost:3000/professors', formData)
      .then(res => {
        alert('Input added successfully');
        // update the professor's inputs
        setLast_name('');
        setFirst_name('');
        setPhone_number('');
        setImg_name('');
        setImg_path(null);
        setEmail('');
        setPassword('');
        setSector_id('');
        setSpecialty_id('');
        // get all professors
        getProfessors()
        // change the section from add-prof to prof-list
        setActiveSection('prof-list')
      })
      .catch(err => {
        alert('An Error occurred whilst adding the input!!');
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/professors/${id}`)
    .then(res => {
      getProfessors()
    })
    .catch(err => alert(err))
  }

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
            <li className={`me-4 pt-2 ${activeSection === 'prof-list' ? 'li-active' : ''}`}>
              <a
                className='text-decoration-none'
                onClick={() => setActiveSection('prof-list')}
              >Content</a>
            </li>
            <li className={`pt-2 ${activeSection === 'add-prof' ? 'li-active' : ''}`}>
              <a
                className='text-decoration-none'
                onClick={() => setActiveSection('add-prof')}
              >Add</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Page Body */}
      <div className="section-body mt-4 pb-5">
        <div className="container-fluid p-0 pb-5">
          <div className="tab-content">

            {/* Professors list */}
            <div className={`tab-pane ${activeSection === 'prof-list' ? 'active' : ''}`}>
              <div className="row">
                {professors.map(professor => (
                  <div className="col-xl-3 col-lg-3 col-md-4" key={professor._id}>
                    <div className="card">
                      <div className="card-body text-center professor">
                        <img className="card-profile-img" src={'../../uploads/'+professor.img_path} alt="Profile" style={{width:"6rem", height:"6rem"}}/>
                        <h5 className="mb-0 text-capitalize">{professor.last_name} {professor.first_name}</h5>
                        <span className="text-muted text-capitalize">{professor.specialty_id?.name}</span>
                        <div className="text-muted">{professor.phone_number}</div>
                        <p className="mb-3 mt-1 text-muted text-capitalize">{professor.sector_id?.name}</p>
                        <div className="d-flex justify-content-center align-items-center mb-1">
                          <button className="btn btn-outline-success btn-sm me-3">
                            <i className='bi bi-pencil'></i>
                          </button>
                          <button type='button' onClick={(e) => handleDelete(professor._id)} className="btn btn-outline-danger btn-sm">
                            <i className='bi bi-trash'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Professor */}
            <div className={`tab-pane ${activeSection === 'add-prof' ? 'active' : ''}`}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title textColor">Professor Basic Info</h3>
                </div>
                <div className="card-body pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="formImage" className="form-control labelCursor textColor">
                            <i className='bi bi-image me-3 textColor'></i>
                            {img_path ? img_name : 'Choose an image for the professor' }
                            
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            accept='image/*'
                            id="formImage"
                            onChange={(e) => {
                              setImg_path(e.target.files[0])
                              setImg_name(e.target.files[0].name)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            autoComplete='off'
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            autoComplete='off'
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            value={phone_number}
                            onChange={(e) => setPhone_number(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            autoComplete='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <select className="form-control" value={sector_id} onChange={(e) => setSector_id(e.target.value)}>
                            <option value="" disabled>Select Sector</option>
                            {sectors.map(sector => (
                              <option className='text-capitalize' value={sector._id} key={sector._id}>{sector.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <select className="form-control" value={specialty_id} onChange={(e) => setSpecialty_id(e.target.value)}>
                            <option value="" disabled>Select Specialty</option>
                            {specialties.map(specialty => (
                              <option className='text-capitalize' value={specialty._id} key={specialty._id}>{specialty.name}</option>
                            ))}
                          </select>
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
  );
}

export default Professors;
