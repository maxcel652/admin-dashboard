// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; 
import logo from '../assets/logo.png'; 


const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); 

    if (email === 'admin@example.com' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); 
      navigate('/dashboard'); 
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-panel">
        <div className="login-header">
          <img src={logo} alt="Internship Manager Logo" className="login-logo" />
          <h1>Sign In</h1>
          <p>Your Account</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>👁️</span> {/* Placeholder for an eye icon */}
            </div>
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
     
    </div>
  );
};

export default Login;