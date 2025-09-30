import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [role, setRole] = useState('Admin');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpointMap = {
      Admin: 'http://localhost:3000/loginAdmin',
      Professor: 'http://localhost:3000/loginProfessor',
      Student: 'http://localhost:3000/loginStudent',
    };

    const endpoint = endpointMap[role];

    try {
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      const data = response.data;

      if (data.status === 'ok') {
        localStorage.setItem('token', data.user);
        navigate('/courses');
      } else {
        alert('Invalid login');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="row w-100 vh-100 bg-softGrey">
      <div className="d-flex justify-content-center align-items-center w-100">
        <div className="card login-card">
          <div className="card-body p-0">
            <div className="text-center">
              <Link className="header-brand" to="/">
                <i className="bi bi-mortarboard-fill login-i"></i>
              </Link>
              <div className="card-title mt-2 mb-4">LOGIN TO YOUR ACCOUNT</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <div className="input-group">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="Admin"
                      name="role"
                      value="Admin"
                      className="form-check-input"
                      checked={role === 'Admin'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="Admin" className="form-check-label font-14">Admin</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="Professor"
                      name="role"
                      value="Professor"
                      className="form-check-input"
                      checked={role === 'Professor'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="Professor" className="form-check-label font-14">Professor</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="Student"
                      name="role"
                      value="Student"
                      className="form-check-input"
                      checked={role === 'Student'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="Student" className="form-check-label font-14">Student</label>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary my-btn w-100">Sign in</button>
                <div className="textClr mt-4 font-14">
                  Don't have an account yet?
                  <Link to="/register" className="ms-1 text-decoration-none">Sign up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
