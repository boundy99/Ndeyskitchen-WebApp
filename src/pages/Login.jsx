import React from 'react';
import PasswordInput from '../components/PasswordInput';
import Image from '../components/Image';
export default function Login() {
  return (
    <div className="login-container">
      <Image className="logo-img" src={'logo.png'} />
      <div className="login-form-container">
        <form className="login-form">
          <h1 className="login-form-header">Login</h1>

          <label className="form-label" htmlFor="email">
            Email
          </label>

          <input className="input-box" type="email" id="email" />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <PasswordInput id="password" />
          <button type="submit" className="form-btn">
            Login
          </button>
          <p className="form-link">
            Don't have an account? <a href="/Signup">Signup here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
