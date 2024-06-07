import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../Css/Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [last_name, setLast_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [img_path, setImg_path] = useState(null);
  const [img_name, setImg_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!last_name || !first_name || !phone_number || !img_path || !email || !password || !sex || !dateBirth) {
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
    formData.append('sex', sex);
    formData.append('date_of_birth', dateBirth);

    axios.post('http://localhost:3000/students', formData)
    .then(res => {
      alert(`${first_name} ${last_name} is added successfully!!`);
      navigate('/login');
    })
    .catch(err => {
      console.error("There was an error creating the student:", err.response ? err.response.data : err);
      alert("An error occurred while registering. Please try again.");
    });
  };

  return (
    <div className="row w-100 min-vh-100 bg-softGrey py-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="card register-card">
          <div className="card-body p-0">
            <div className="text-center">
              <Link className="header-brand" to="/">
                <i className="bi bi-mortarboard-fill login-i"></i>
              </Link>
              <div className="card-title mt-2 mb-4">CREATE NEW ACCOUNT</div>
            </div>
            <form onSubmit={handleSubmit} className='row'>
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                  autoComplete='off'
                />
              </div>
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                  autoComplete='off'
                />
              </div>
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  autoComplete='off'
                />
              </div>
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>Image</label>
                <label htmlFor="formImage" className="form-control labelCursor textColor">
                  <i className='bi bi-image me-3 textColor'></i>
                  {img_path ? img_name : 'Choose an image' }
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
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>Sex</label>
                <select value={sex} className="form-control" onChange={(e) => setSex(e.target.value)}>
                  <option value="" disabled>Select your sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>Date Of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateBirth}
                  onChange={(e) => setDateBirth(e.target.value)}
                />
              </div>
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='off'
                />
              </div>
              <div className="form-group mb-4 col-sm-6">
                <label htmlFor="" className='form-label mb-2 textClr font-16'>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary my-btn w-100">Sign up</button>
                <div className="textClr mt-4 font-14">Already have an account?
                  <Link to="/login" className='ms-1 text-decoration-none'>Sign in</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;