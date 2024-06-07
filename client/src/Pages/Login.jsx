import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../Css/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log({ email, password, rememberMe });
  };
  return (
    <div className="row w-100 vh-100 bg-softGrey">
      <div className="d-flex justify-content-center align-items-center">
        <div className="card login-card">
          <div className="card-body p-0">
            <div className="text-center">
              <Link className="header-brand" to="/">
                <i className="bi bi-mortarboard-fill login-i"></i>
              </Link>
              <div className="card-title mt-2 mb-4">Academia</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='off'
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary my-btn w-100">Sign in</button>
                <div className="textClr mt-4 font-14">Don't have an account yet?
                  <Link to="/register" className='ms-1 text-decoration-none'>Sign up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login