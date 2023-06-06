import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import Image from '../components/Image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const user = { email, password };

    const response = await fetch('api/users/user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (json.error === 'User not found') {
      setEmailError(true);
      setPasswordError(true);
    }

    if (json.error === 'Password Incorrect') {
      setPasswordError(true);
    }

    if (response.ok) {
      localStorage.setItem('token', json.token);
      navigate('/');
    }
  }

  return (
    <div className="login-container">
      <Image className="logo-img" src={'logo.png'} />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-form-header">
            <strong>Login</strong>
          </p>

          <label className="form-label" htmlFor="email">
            Email
          </label>

          <input
            className="input-box"
            type="email"
            id="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
            maxLength="100"
            minLength="7"
            style={{ border: emailError ? '0.15rem solid #DC952F' : '' }}
            onClick={() => setEmailError(false)}
            required
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <PasswordInput
            id="password"
            setValue={setPassword}
            value={password}
            error={passwordError}
            setErrorValue={setPasswordError}
          />

          <p className="forgot-password">
            <a>Forgot password</a>
          </p>

          <button type="submit" className="form-btn">
            Login
          </button>
          <p className="form-link">
            Don't have an account? <a href="/Signup">Signup here</a>
          </p>
        </form>
      </div>
      <button type="submit" className="continue-with-btn">
        Continue with
        <Image className="logos" src={'google.png'} alt="google-logo" />
      </button>
    </div>
  );
}
